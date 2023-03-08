"use strict";
cc._RF.push(module, '2d1b8RJhKFIvLdEviQyz+iT', 'CondtionLastTimeNearLocalHero');
// scripts/battle/component/player/AI/CondtionTimes/CondtionLastTimeNearLocalHero.js

'use strict';

/**
 * @fileoverview 玩家在附近龟缩，ai进入逃跑或龟缩的思考时间
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');
var Tools = require('Tools');

// result从PlayerDistanceSystem确定，就是entityPlayer
var CondtionLastTimeNearLocalHero = cc.Class({
    extends: ConditionBaseComponent,

    properties: {
        canBeDo: true
    },

    init: function init() {
        this.result = -1;
        this.canBeDo = true;
    },

    /** overwrite */
    doResultWithParam: function doResultWithParam(time) {
        if (this.canBeDo) {

            var rate = Tools.getRandomFloat(0.8, 1.2);
            this.result = time * rate;
            this.canBeDo = false;
        }
    },
    /** overwrite */
    isTrue: function isTrue() {
        return this.result < 0;
    },

    /** overwrite */
    clearResult: function clearResult() {
        this.canBeDo = true;
        this.result = -1;
    },
    // updateGameLogic: function (dt) {}

    update: function update(dt) {
        this.result -= dt;
    }
});

cc._RF.pop();