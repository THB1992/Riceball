(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/BodyRectComponent.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9994f/0X6lLFoSN8wdJFFvY', 'BodyRectComponent', __filename);
// scripts/battle/component/player/BodyRectComponent.js

'use strict';

/**
 * @fileoverview 身体矩形，用于简单判断是否发生碰撞
 * @author meifan@gameley.cn (梅凡)
 */

var Tools = require('Tools');

// result从PlayerDistanceSystem确定，是另一个ai的Entity
var BodyRectComponent = cc.Class({
    extends: cc.Component,

    properties: {
        _rect: cc.rect
    },

    init: function init(width, height, canMove) {
        var needGraphics = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        var scale = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1.0;

        this.scale = scale;
        width = width * scale;
        height = height * scale;
        this._rect = new cc.rect(this.node.x - width / 2, this.node.y - height / 2, width, height);
        this._canMove = canMove;

        this.needGraphics = needGraphics;

        if (this.needGraphics) {
            this.ctx = Tools.getOrAddComponent(this.node, cc.Graphics);

            // 红色矩形
            this.ctx.lineWidth = 6;
            this.ctx.strokeColor = cc.Color.RED;
            this.ctx.rect(-this._rect.width / 2, -this._rect.height / 2, this._rect.width, this._rect.height);
            this.ctx.stroke();
        }

        this.node.on('radiusChange', this.setRect, this);
    },

    setRect: function setRect(radius) {
        radius = Math.max(radius, 180);
        this._rect.width = radius * this.scale * 2;
        this._rect.height = radius * this.scale * 2;
        // console.log('radius: ' + radius + ', width: ' +  this._rect.width + ', height: ' +  this._rect.height);
    },

    // updateGameLogic: function (dt) {}

    update: function update(dt) {
        if (this._canMove) {
            this._rect.center = this.node.position;

            if (this.needGraphics) {
                this.ctx.clear();
                // 红色矩形
                this.ctx.rect(-this._rect.width / 2, -this._rect.height / 2, this._rect.width, this._rect.height);
                this.ctx.stroke();
            }
        }
    },

    contains: function contains(point) {
        return this._rect.contains(point);
    },

    intersects: function intersects(rect) {
        return this._rect.intersects(rect);
    },

    getRect: function getRect() {
        return this._rect;
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
        //# sourceMappingURL=BodyRectComponent.js.map
        