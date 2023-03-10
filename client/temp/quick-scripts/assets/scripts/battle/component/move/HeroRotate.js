(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/move/HeroRotate.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'efaa3yoOiJI2LNjR0ED/6h8', 'HeroRotate', __filename);
// scripts/battle/component/move/HeroRotate.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        rotateSpeed: 150,
        isStop: false,
        stopKeepTime: 0.1,
        _stopTime: 0
    },

    onLoad: function onLoad() {
        this.node.on('stopParentRotate', this.stopRotate, this);
    },

    stopRotate: function stopRotate() {
        this.isStop = true;
        this._stopTime = 0;
    },

    updateLogic: function updateLogic(dt) {
        //一次isStop只暂停一帧
        if (this.isStop) {
            if (this._stopTime < this.stopKeepTime) {
                this._stopTime += dt;
                return;
            } else {
                this.isStop = false;
            }
        }
        this.node.rotation += this.rotateSpeed * dt;
        if (this.node.rotation >= 360) {
            this.node.rotation -= 360;
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
        //# sourceMappingURL=HeroRotate.js.map
        