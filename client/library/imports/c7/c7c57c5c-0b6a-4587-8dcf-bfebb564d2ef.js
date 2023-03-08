"use strict";
cc._RF.push(module, 'c7c57xcC2pFh43Pv+u1ZNLv', 'CollisionManager');
// scripts/common/CollisionManager.js

'use strict';

/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var Contact = require('Contact');
var CollisionType = Contact.CollisionType;
var NodeEvent = cc.Node.EventType;

var math = cc.vmath;

var _vec2 = cc.v2();

function obbApplyMatrix(rect, mat4, out_bl, out_tl, out_tr, out_br) {
    var x = rect.x;
    var y = rect.y;
    var width = rect.width;
    var height = rect.height;

    var mat4m = mat4.m;
    var m00 = mat4m[0],
        m01 = mat4m[1],
        m04 = mat4m[4],
        m05 = mat4m[5];
    var m12 = mat4m[12],
        m13 = mat4m[13];

    var tx = m00 * x + m04 * y + m12;
    var ty = m01 * x + m05 * y + m13;
    var xa = m00 * width;
    var xb = m01 * width;
    var yc = m04 * height;
    var yd = m05 * height;

    out_tl.x = tx;
    out_tl.y = ty;
    out_tr.x = xa + tx;
    out_tr.y = xb + ty;
    out_bl.x = yc + tx;
    out_bl.y = yd + ty;
    out_br.x = xa + yc + tx;
    out_br.y = xb + yd + ty;
}

/**
 * !#en
 * A simple collision manager class. 
 * It will calculate whether the collider collides other colliders, if collides then call the callbacks.
 * !#zh
 * 一个简单的碰撞组件管理类，用于处理节点之间的碰撞组件是否产生了碰撞，并调用相应回调函数。
 *
 * @class CollisionManager
 * @uses EventTarget
 * @example
 *
 * // Get the collision manager.
 * let manager = cc.director.getCollisionManager();
 *
 * // Enabled the colider manager.
 * manager.enabled = true;
 *
 * // Enabled draw collider
 * manager.enabledDebugDraw = true;
 *
 * // Enabled draw collider bounding box
 * manager.enabledDrawBoundingBox = true;
 *
 * 
 * // Collision callback
 * onCollisionEnter: function (other, self) {
 *     this.node.color = cc.Color.RED;
 *     this.touchingNumber ++;
 *
 *     // let world = self.world;
 *     // let aabb = world.aabb;
 *     // let preAabb = world.preAabb;
 *     // let m = world.matrix;
 *
 *     // for circle collider
 *     // let r = world.radius;
 *     // let p = world.position;
 *
 *     // for box collider and polygon collider
 *     // let ps = world.points;
 * },
 *   
 * onCollisionStay: function (other, self) {
 *     console.log('on collision stay');
 * },
 *   
 * onCollisionExit: function (other, self) {
 *     this.touchingNumber --;
 *     if (this.touchingNumber === 0) {
 *         this.node.color = cc.Color.WHITE;
 *     }
 * }
 */
var CollisionManager = cc.Class({
    mixins: [cc.EventTarget],

    properties: {
        /**
         * !#en
         * !#zh
         * 是否开启碰撞管理，默认为不开启
         * @property {Boolean} enabled
         * @default false
         */
        enabled: false,
        /**
         * !#en
         * !#zh
         * 是否绘制碰撞组件的包围盒，默认为不绘制
         * @property {Boolean} enabledDrawBoundingBox
         * @default false
         */
        enabledDrawBoundingBox: false
    },

    ctor: function ctor() {
        this._contacts = [];
        this._colliders = [];
        this._debugDrawer = null;
        this._enabledDebugDraw = false;

        cc.director._scheduler && cc.director._scheduler.enableForTarget(this);
    },

    update: function update(dt) {
        if (!this.enabled) {
            return;
        }

        var i = void 0,
            l = void 0;

        // update collider
        var colliders = this._colliders;
        for (i = 0, l = colliders.length; i < l; i++) {
            this.updateCollider(colliders[i]);
        }

        // do collide
        var contacts = this._contacts;
        var results = [];

        for (i = 0, l = contacts.length; i < l; i++) {
            var collisionType = contacts[i].updateState();
            if (collisionType === CollisionType.None) {
                continue;
            }

            results.push([collisionType, contacts[i]]);
        }

        // handle collide results, emit message
        for (i = 0, l = results.length; i < l; i++) {
            var result = results[i];
            this._doCollide(result[0], result[1]);
        }

        // draw colliders
        this.drawColliders();
    },

    _doCollide: function _doCollide(collisionType, contact) {
        var contactFunc = void 0;
        switch (collisionType) {
            case CollisionType.CollisionEnter:
                contactFunc = 'onCollisionEnter';
                break;
            case CollisionType.CollisionStay:
                contactFunc = 'onCollisionStay';
                break;
            case CollisionType.CollisionExit:
                contactFunc = 'onCollisionExit';
                break;
        }

        var collider1 = contact.collider1;
        var collider2 = contact.collider2;

        var comps1 = collider1.node._components;
        var comps2 = collider2.node._components;

        var i = void 0,
            l = void 0,
            comp = void 0;
        for (i = 0, l = comps1.length; i < l; i++) {
            comp = comps1[i];
            if (comp[contactFunc]) {
                comp[contactFunc](collider2, collider1);
            }
        }

        for (i = 0, l = comps2.length; i < l; i++) {
            comp = comps2[i];
            if (comp[contactFunc]) {
                comp[contactFunc](collider1, collider2);
            }
        }
    },

    shouldCollide: function shouldCollide(c1, c2) {
        var node1 = c1.node,
            node2 = c2.node;
        var collisionMatrix = cc.game.collisionMatrix;
        return node1 !== node2 && collisionMatrix[node1.groupIndex][node2.groupIndex];
    },

    initCollider: function initCollider(collider) {
        if (!collider.world) {
            var world = collider.world = {};
            world.aabb = cc.rect();
            world.preAabb = cc.rect();
            world.matrix = math.mat4.create();

            world.radius = 0;

            if (collider instanceof cc.BoxCollider) {
                world.position = null;
                world.points = [cc.v2(), cc.v2(), cc.v2(), cc.v2()];
            } else if (collider instanceof cc.PolygonCollider) {
                world.position = null;
                world.points = collider.points.map(function (p) {
                    return cc.v2(p.x, p.y);
                });
            } else if (collider instanceof cc.CircleCollider) {
                world.position = cc.v2();
                world.points = null;
            }
        }
    },

    updateCollider: function updateCollider(collider) {
        var offset = collider.offset;
        var world = collider.world;
        var aabb = world.aabb;

        var m = world.matrix;
        collider.node.getWorldMatrix(m);

        var preAabb = world.preAabb;
        preAabb.x = aabb.x;
        preAabb.y = aabb.y;
        preAabb.width = aabb.width;
        preAabb.height = aabb.height;

        if (collider instanceof cc.BoxCollider) {
            var size = collider.size;

            aabb.x = offset.x - size.width / 2;
            aabb.y = offset.y - size.height / 2;
            aabb.width = size.width;
            aabb.height = size.height;

            var wps = world.points;
            var wp0 = wps[0],
                wp1 = wps[1],
                wp2 = wps[2],
                wp3 = wps[3];
            obbApplyMatrix(aabb, m, wp0, wp1, wp2, wp3);

            var minx = Math.min(wp0.x, wp1.x, wp2.x, wp3.x);
            var miny = Math.min(wp0.y, wp1.y, wp2.y, wp3.y);
            var maxx = Math.max(wp0.x, wp1.x, wp2.x, wp3.x);
            var maxy = Math.max(wp0.y, wp1.y, wp2.y, wp3.y);

            aabb.x = minx;
            aabb.y = miny;
            aabb.width = maxx - minx;
            aabb.height = maxy - miny;
        } else if (collider instanceof cc.CircleCollider) {
            // calculate world position
            math.vec2.transformMat4(_vec2, collider.offset, m);

            world.position.x = _vec2.x;
            world.position.y = _vec2.y;

            // calculate world radius
            var mm = m.m;
            var tempx = mm[12],
                tempy = mm[13];
            mm[12] = mm[13] = 0;

            _vec2.x = collider.radius;
            _vec2.y = 0;

            math.vec2.transformMat4(_vec2, _vec2, m);
            var d = Math.sqrt(_vec2.x * _vec2.x + _vec2.y * _vec2.y);

            world.radius = d;

            aabb.x = world.position.x - d;
            aabb.y = world.position.y - d;
            aabb.width = d * 2;
            aabb.height = d * 2;

            mm[12] = tempx;
            mm[13] = tempy;
        } else if (collider instanceof cc.PolygonCollider) {
            var points = collider.points;
            var worldPoints = world.points;

            worldPoints.length = points.length;

            var _minx = 1e6,
                _miny = 1e6,
                _maxx = -1e6,
                _maxy = -1e6;
            for (var i = 0, l = points.length; i < l; i++) {
                if (!worldPoints[i]) {
                    worldPoints[i] = cc.v2();
                }

                _vec2.x = points[i].x + offset.x;
                _vec2.y = points[i].y + offset.y;

                math.vec2.transformMat4(_vec2, _vec2, m);

                var x = _vec2.x;
                var y = _vec2.y;

                worldPoints[i].x = x;
                worldPoints[i].y = y;

                if (x > _maxx) _maxx = x;
                if (x < _minx) _minx = x;
                if (y > _maxy) _maxy = y;
                if (y < _miny) _miny = y;
            }

            aabb.x = _minx;
            aabb.y = _miny;
            aabb.width = _maxx - _minx;
            aabb.height = _maxy - _miny;
        }
    },

    addCollider: function addCollider(collider) {
        var colliders = this._colliders;
        var index = colliders.indexOf(collider);
        if (index === -1) {
            for (var i = 0, l = colliders.length; i < l; i++) {
                var other = colliders[i];
                if (this.shouldCollide(collider, other)) {
                    var contact = new Contact(collider, other);
                    this._contacts.push(contact);
                }
            }

            colliders.push(collider);
            this.initCollider(collider);
        }

        collider.node.on(NodeEvent.GROUP_CHANGED, this.onNodeGroupChanged, this);
    },

    removeCollider: function removeCollider(collider) {
        var colliders = this._colliders;
        var index = colliders.indexOf(collider);
        if (index >= 0) {
            colliders.splice(index, 1);

            var contacts = this._contacts;
            for (var i = contacts.length - 1; i >= 0; i--) {
                var contact = contacts[i];
                if (contact.collider1 === collider || contact.collider2 === collider) {
                    if (contact.touching) {
                        this._doCollide(CollisionType.CollisionExit, contact);
                    }

                    contacts.splice(i, 1);
                }
            }

            collider.node.off(NodeEvent.GROUP_CHANGED, this.onNodeGroupChanged, this);
        } else {
            // cc.errorID(6600);
        }
    },

    onNodeGroupChanged: function onNodeGroupChanged(node) {
        if (node.lastGroupIndex === node.groupIndex) return;
        node.lastGroupIndex = node.groupIndex;

        var colliders = node.getComponents(cc.Collider);

        for (var i = 0, l = colliders.length; i < l; i++) {
            var collider = colliders[i];
            if (cc.PhysicsCollider && collider instanceof cc.PhysicsCollider) {
                continue;
            }
            this.removeCollider(collider);
            this.addCollider(collider);
        }
    },

    drawColliders: function drawColliders() {
        if (!this._enabledDebugDraw) {
            return;
        }

        this._checkDebugDrawValid();

        var debugDrawer = this._debugDrawer;
        debugDrawer.clear();

        var colliders = this._colliders;

        for (var i = 0, l = colliders.length; i < l; i++) {
            var collider = colliders[i];

            debugDrawer.strokeColor = cc.Color.WHITE;
            if (collider instanceof cc.BoxCollider || collider instanceof cc.PolygonCollider) {
                var ps = collider.world.points;
                if (ps.length > 0) {
                    debugDrawer.moveTo(ps[0].x, ps[0].y);
                    for (var j = 1; j < ps.length; j++) {
                        debugDrawer.lineTo(ps[j].x, ps[j].y);
                    }
                    debugDrawer.close();
                    debugDrawer.stroke();
                }
            } else if (collider instanceof cc.CircleCollider) {
                debugDrawer.circle(collider.world.position.x, collider.world.position.y, collider.world.radius);
                debugDrawer.stroke();
            }

            if (this.enabledDrawBoundingBox) {
                var aabb = collider.world.aabb;

                debugDrawer.strokeColor = cc.Color.BLUE;

                debugDrawer.moveTo(aabb.xMin, aabb.yMin);
                debugDrawer.lineTo(aabb.xMin, aabb.yMax);
                debugDrawer.lineTo(aabb.xMax, aabb.yMax);
                debugDrawer.lineTo(aabb.xMax, aabb.yMin);

                debugDrawer.close();
                debugDrawer.stroke();
            }
        }
    },

    _checkDebugDrawValid: function _checkDebugDrawValid() {
        if (!this._debugDrawer || !this._debugDrawer.isValid) {
            var node = new cc.Node('COLLISION_MANAGER_DEBUG_DRAW');
            node.zIndex = cc.macro.MAX_ZINDEX;
            cc.game.addPersistRootNode(node);
            this._debugDrawer = node.addComponent(cc.Graphics);
        }
    }
});

/**
 * !#en
 * !#zh
 * 是否绘制碰撞组件的形状，默认为不绘制
 * @property {Boolean} enabledDebugDraw
 * @default false
 */
cc.js.getset(CollisionManager.prototype, 'enabledDebugDraw', function () {
    return this._enabledDebugDraw;
}, function (value) {
    if (value && !this._enabledDebugDraw) {
        this._checkDebugDrawValid();
        this._debugDrawer.node.active = true;
    } else if (!value && this._enabledDebugDraw) {
        this._debugDrawer.clear(true);
        this._debugDrawer.node.active = false;
    }

    this._enabledDebugDraw = value;
});

module.exports = CollisionManager;

cc._RF.pop();