"use strict";
cc._RF.push(module, 'efaa3yoOiJI2LNjR0ED/6h8', 'HeroRotate');
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