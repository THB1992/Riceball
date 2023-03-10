(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/move/HeroMoveFix.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '801beZ2wztG3awu8hV9+di0', 'HeroMoveFix', __filename);
// scripts/battle/component/move/HeroMoveFix.js

'use strict';

/**
 * @fileoverview 玩家移动校正
 * @author jinhaitao@gameley.cn (金海涛)
 */
var Tools = require('Tools');

cc.Class({
    extends: cc.Component,
    properties: {
        lastPos: cc.v2(0, 0),
        // _collisionWalls: [],
        _collider: null,
        _collisionBlocks: [],
        _fixDir: null,
        _minX: null,
        _maxX: null,
        _minY: null,
        _maxY: null,

        _collisionFix: [],
        _offset: 6,
        _wallColliders: []
    },

    onLoad: function onLoad() {
        // this.node.on('fixByWall', this.fixByWall, this);
        // this.node.on('fixByBlock', this.fixByBlock, this);
    },

    init: function init(_collider) {
        this._collider = _collider;
    },

    initWalls: function initWalls(walls) {
        this._wallColliders = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = walls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var wall = _step.value;

                this._wallColliders.push(wall.getComponent('EntityWall').wallCollider);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    },
    // 将碰撞存至list中，update中修改
    refresh: function refresh(detail) {},

    fixByBlock: function fixByBlock(detail) {
        if (!Tools.arrContains(this._collisionBlocks, detail)) {
            this._collisionBlocks.push(detail);
        }
    },

    updateGameLogic: function updateGameLogic(dt) {
        if (this.lastPos.x === this.node.position.x && this.lastPos.y === this.node.position.y) {
            return;
        }
        this.lastPos = this.node.position;

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = this._wallColliders[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var wall = _step2.value;

                this.fixPositionByWall(wall);
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = this._collisionBlocks[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var block = _step3.value;

                this.fixPositionByBlock(block);
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        this.checkNeedDie();
        this.reset();
    },

    fixPositionByBlock: function fixPositionByBlock(block) {
        var radius = this._collider.radius * this._collider.node.parent.scale;
        var worldPos = this.node.convertToWorldSpaceAR(this._collider.node.position);
        var relativePos = block.node.convertToNodeSpaceAR(worldPos);
        var fixDir = null;
        var moveLength = 0;
        if (relativePos.x <= block.size.width / 2 && relativePos.x >= -block.size.width / 2) {
            var n = relativePos.y >= 0 ? 1 : -1;
            fixDir = cc.v2(0, n);
            moveLength = Math.abs(relativePos.y) - (block.size.height / 2 + radius);
        } else if (relativePos.y <= block.size.height / 2 && relativePos.y >= -block.size.height / 2) {
            var n = relativePos.x >= 0 ? 1 : -1;
            fixDir = cc.v2(n, 0);
            moveLength = Math.abs(relativePos.x) - (block.size.width / 2 + radius);
        } else {
            var anchor = cc.v2((relativePos.x >= 0 ? 1 : -1) * block.size.width / 2, (relativePos.y >= 0 ? 1 : -1) * block.size.height / 2);
            fixDir = relativePos.sub(anchor).normalize();
            moveLength = relativePos.sub(anchor).mag() - radius;
        }
        if (moveLength > 0) {
            return;
        }
        var targetRot = fixDir.rotate(block.node.rotation);
        moveLength -= this._offset;
        this.node.position = this.node.position.add(targetRot.mul(-moveLength));
    },

    fixPositionByWall: function fixPositionByWall(wall) {
        var other = wall;
        var self = this._collider;
        switch (other.tag) {
            case 0:
                // 上
                this._maxY = other.node.parent.y - other.size.height / 2 - self.radius * self.node.parent.scale - this._offset;
                if (this.node.y > this._maxY) {
                    this.node.y = this._maxY;
                }

                break;
            case 1:
                // 下
                this._minY = other.node.parent.y + other.size.height / 2 + self.radius * self.node.parent.scale + this._offset;
                if (this.node.y < this._minY) {
                    this.node.y = this._minY;
                }
                break;
            case 2:
                // 左
                this._minX = other.node.parent.x + other.size.width / 2 + self.radius * self.node.parent.scale + this._offset;
                if (this.node.x < this._minX) {
                    this.node.x = this._minX;
                }
                break;
            case 3:
                // 右
                this._maxX = other.node.parent.x - other.size.width / 2 - self.radius * self.node.parent.scale - this._offset;
                if (this.node.x > this._maxX) {
                    this.node.x = this._maxX;
                }
                break;
        }
    },

    checkNeedDie: function checkNeedDie() {
        var pos = this.node.position;
        if (this._minX !== null && pos.x < this._minX - 1 || this._maxX !== null && pos.x > this._maxX + 1 || this._minY !== null && pos.y < this._minY - 1 || this._maxY !== null && pos.y > this._maxY + 1) {
            this.die();
        }
    },

    die: function die() {
        this.node.emit('die');
    },

    // 修正后重置
    reset: function reset() {
        this._collisionWalls = [];
        this._collisionBlocks = [];
        this._collisionFix = [];
        this._minX = null;
        this._maxX = null;
        this._minY = null;
        this._maxY = null;
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=HeroMoveFix.js.map
        