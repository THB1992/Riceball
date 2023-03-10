(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/effect/PowerArrow.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8fa4a0GdLtIS7s6660m2woS', 'PowerArrow', __filename);
// scripts/battle/component/effect/PowerArrow.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        weakNode: cc.Node,
        weakArrow: cc.Node,
        strongNode: cc.Node,
        strongArrow: cc.Node
    },

    refresh: function refresh(player, localPlayer) {

        var dir = localPlayer.node.position.sub(player.node.position).normalize();
        var radius = player.logicPlayer.radius;
        var finalPos = player.node.position.add(dir.mul(radius));

        var roll = dir.angle(cc.v2(0, 1)) * 180 / Math.PI;
        if (dir.x < 0) roll = -roll;

        if (localPlayer.isDefence) {
            if (this.strongNode.active) this.strongNode.active = false;
            if (this.weakNode.active) this.weakNode.active = false;
            if (player.attackPower > localPlayer.defencePower) {
                if (!localPlayer._dangerousEffect.node.active) {
                    localPlayer._dangerousEffect.node.active = true;
                    // _attackStartEffect
                    // _dangerousEffect
                    localPlayer._dangerousEffect.play();
                    this.isPlay = true;
                    setTimeout(function () {
                        localPlayer._dangerousEffect.node.active = false;
                    }, 1500);
                }
            }
        } else if (player.isDefence) {
            if (localPlayer.attackPower <= player.defencePower) {
                if (!this.strongNode.active) this.strongNode.active = true;
                if (this.weakNode.active) this.weakNode.active = false;

                this.strongNode.position = finalPos;
                this.strongArrow.rotation = roll - 180;
            } else {
                if (this.strongNode.active) this.strongNode.active = false;
                if (!this.weakNode.active) this.weakNode.active = true;

                this.weakNode.position = finalPos;
                this.weakArrow.rotation = roll - 180;
            }
        } else {
            if (this.strongNode.active) this.strongNode.active = false;
            if (this.weakNode.active) this.weakNode.active = false;
        }
    },
    close: function close() {
        if (this.strongNode.active) this.strongNode.active = false;
        if (this.weakNode.active) this.weakNode.active = false;
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
        //# sourceMappingURL=PowerArrow.js.map
        