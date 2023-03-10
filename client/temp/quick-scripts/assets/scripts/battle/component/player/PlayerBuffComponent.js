(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/PlayerBuffComponent.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'aaf010WktdERpw7dxxsiSLQ', 'PlayerBuffComponent', __filename);
// scripts/battle/component/player/PlayerBuffComponent.js

'use strict';

var BuffState = require('Types').BuffState;
var ConfigData = require('ConfigData');
cc.Class({
    extends: cc.Component,

    properties: {
        buffRemainTimes: []
    },

    onLoad: function onLoad() {
        // this.node.on('die', this.die, this);
        this.node.on('updateBuffState', this.updateBuffState, this);
    },

    die: function die() {
        for (var i = 0; i < this.buffRemainTimes.length; i++) {
            if (this.buffRemainTimes[i]) {
                var data = ConfigData.instance.getBuffDataById(i);
                this.node.emit('onBuffChange', data, false);
                this.buffRemainTimes[i] = 0;
            }
        }
    },

    updateBuffState: function updateBuffState(buffState) {
        var customTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

        var data = ConfigData.instance.getBuffDataById(buffState);
        // var buffTime = this.buffRemainTimes[buffState] ? this.buffRemainTimes[buffState] : 0;
        if (!this.buffRemainTimes[buffState]) {
            this.node.emit('onBuffChange', data, true);
        }
        this.buffRemainTimes[buffState] = customTime > 0 ? customTime : data.keepTime;
        // this.buffCount[buffState]++;
        // setTimeout(() => {
        //     this.buffCount[buffState]--;
        //     if (this.buffCount[buffState] === 0) {
        //         //通知回归
        //     }
        // }, this.buffKeepTimes)

        // switch (buffState) {
        //     case BuffState.BIG:

        //         break;
        // }
    },

    updateGameLogic: function updateGameLogic(dt) {
        for (var i = 0; i < this.buffRemainTimes.length; i++) {
            if (this.buffRemainTimes[i]) {
                this.buffRemainTimes[i] -= dt;
                if (this.buffRemainTimes[i] <= 0) {
                    this.buffRemainTimes[i] = 0;
                    var data = ConfigData.instance.getBuffDataById(i);
                    this.node.emit('onBuffChange', data, false);
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
        //# sourceMappingURL=PlayerBuffComponent.js.map
        