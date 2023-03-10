(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/knife/KnifeOutOfWallComponent.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '90b6467cRNHOZLAobccaHNV', 'KnifeOutOfWallComponent', __filename);
// scripts/battle/component/knife/KnifeOutOfWallComponent.js

"use strict";

/**
 * @fileoverview 刀是否出枪组件
 * @author meifan@gameley.cn (梅凡)
 */

cc.Class({
    extends: cc.Component,
    properties: {
        width: 640,
        height: 1136,
        isOut: false
    },

    init: function init(knife, width, height) {
        this.knife = knife;
        this.refresh(width, height);
        this.isOut = false;
    },

    refresh: function refresh(width, height) {
        this.width = width / 2;
        this.height = height / 2;
    },

    updateGameLogic: function updateGameLogic(dt) {
        if (this.isOut) return;
        if (!this.knife) return;
        if (!this.knife.isOnLand()) return;

        var v = this.node.position;
        if (v.magSqr() > this.width * this.width + this.height * this.height) {
            this.isOut = true;
        }
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
        //# sourceMappingURL=KnifeOutOfWallComponent.js.map
        