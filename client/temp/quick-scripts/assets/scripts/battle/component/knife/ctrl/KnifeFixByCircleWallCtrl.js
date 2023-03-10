(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/knife/ctrl/KnifeFixByCircleWallCtrl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7098eN0ktNM5KKNsa12uc9P', 'KnifeFixByCircleWallCtrl', __filename);
// scripts/battle/component/knife/ctrl/KnifeFixByCircleWallCtrl.js

'use strict';

var KnifeState = require('Types').KnifeState;
var KnifeMomentState = require('Types').KnifeMomentState;
cc.Class({
    extends: cc.Component,

    properties: {
        lastPos: cc.v2(0, 0)
    },

    init: function init() {
        this.knifeStateComp = this.node.getComponent('KnifeStateComponent');
        this.knifeMomentStateComp = this.node.getComponent('KnifeMomentStateComponent');
    },

    refresh: function refresh(width, height) {
        this.width = width / 2;
        this.height = height / 2;
    },

    updateLogic: function updateLogic(dt) {
        if (!this.knifeOwnerComp) this.knifeOwnerComp = this.node.getComponent('KnifeOwnerComponent');
        if (this.knifeOwnerComp.owner) {

            var comp = this.knifeOwnerComp.owner.getComponent('EntityFollowPlayer').knivesCmp;
            if (comp.isCollCircleWall || comp.isCollisionWall) {

                var relativePos = this.node.parent.convertToWorldSpaceAR(this.node.position);
                var pos = this.node.parent.parent.convertToNodeSpaceAR(relativePos);
                var dir = pos.normalize();
                var distance = this.width - pos.mag() - 25;
                if (distance < 0) {
                    // if (!this.isColl) {
                    //     this.isColl = true;
                    //     this.node.emit('isCollCircleWall', true);
                    // }
                    pos = pos.add(dir.mul(distance));
                    relativePos = this.node.parent.parent.convertToWorldSpaceAR(pos);
                    pos = this.node.parent.convertToNodeSpaceAR(relativePos);
                    this.node.position = pos;
                } else {
                    // if (this.isColl) {
                    //     this.isColl = false;
                    //     this.node.emit('isCollCircleWall', false);
                    // }
                }
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
        //# sourceMappingURL=KnifeFixByCircleWallCtrl.js.map
        