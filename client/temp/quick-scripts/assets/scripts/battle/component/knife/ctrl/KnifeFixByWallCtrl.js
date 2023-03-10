(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/knife/ctrl/KnifeFixByWallCtrl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '53c891FvuFCW5lzs+LemtMc', 'KnifeFixByWallCtrl', __filename);
// scripts/battle/component/knife/ctrl/KnifeFixByWallCtrl.js

'use strict';

var KnifeState = require('Types').KnifeState;

cc.Class({
    extends: cc.Component,

    properties: {
        resetTime: 0.25,
        _curResetTime: 0,
        _waitResetTime: 0,
        allWaitTime: 0.1
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

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

                var distanceX = this.width - Math.abs(pos.x) - 20;
                if (distanceX < 0) {
                    var dir = cc.v2(pos.x, 0).normalize();
                    pos = pos.add(dir.mul(distanceX));
                    relativePos = this.node.parent.parent.convertToWorldSpaceAR(pos);
                    pos = this.node.parent.convertToNodeSpaceAR(relativePos);
                    this.node.position = pos;
                }

                var distanceY = this.height - Math.abs(pos.y) - 20;
                if (distanceY < 0) {
                    var dir = cc.v2(0, pos.y).normalize();
                    pos = pos.add(dir.mul(distanceY));
                    relativePos = this.node.parent.parent.convertToWorldSpaceAR(pos);
                    pos = this.node.parent.convertToNodeSpaceAR(relativePos);
                    this.node.position = pos;
                }
            }
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
        //# sourceMappingURL=KnifeFixByWallCtrl.js.map
        