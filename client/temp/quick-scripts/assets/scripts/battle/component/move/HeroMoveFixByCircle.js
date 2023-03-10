(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/move/HeroMoveFixByCircle.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '798564vaPNPY4uA17ovYpWR', 'HeroMoveFixByCircle', __filename);
// scripts/battle/component/move/HeroMoveFixByCircle.js

'use strict';

/**
 * @fileoverview 玩家在圆形地图的移动校正
 * @author zhangzhuang@gameley.cn (张庄)
 */
cc.Class({
    extends: cc.Component,

    properties: {
        lastPos: cc.v2(0, 0)
    },

    init: function init(_collider, followPlayer) {
        this.followPlayer = followPlayer;
        this._collider = _collider;
        this.attackRadius = 0;
    },

    onLoad: function onLoad() {
        this.node.on('radiusChange', this.radiusChange, this);
    },

    radiusChange: function radiusChange(detail) {
        this.attackRadius = detail;
    },

    refresh: function refresh(width, height) {
        this.width = width / 2;
        this.height = height / 2;
    },

    updateGameLogic: function updateGameLogic() {
        if (this.lastPos.x === this.node.position.x && this.lastPos.y === this.node.position.y) {
            return;
        }
        this.lastPos = this.node.position;

        var heroRadius = this._collider.radius * this._collider.node.parent.scale;
        var dir = this.node.position.normalize();
        var distance = this.width - heroRadius - this.node.position.mag();
        if (distance < 0) {
            this.node.position = this.node.position.add(dir.mul(distance));
        }
        var heroAttackRadius = 0;
        if (this.followPlayer) heroAttackRadius = this.attackRadius * this.followPlayer.node.scale;

        var dir = this.node.position.normalize();
        var distance = this.width - heroAttackRadius - this.node.position.mag();
        if (distance < 0) {
            if (!this.isColl) {
                this.isColl = true;
                this.node.emit('isCollCircleWall', true);
            }
        } else {
            if (this.isColl) {
                this.isColl = false;
                this.node.emit('isCollCircleWall', false);
            }
        }
        // var coll=this.mapRadius - heroRadius 
        // if(distance)
    }
    // update (dt) {},
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
        //# sourceMappingURL=HeroMoveFixByCircle.js.map
        