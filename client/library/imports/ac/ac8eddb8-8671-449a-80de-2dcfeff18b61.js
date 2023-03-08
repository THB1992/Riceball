"use strict";
cc._RF.push(module, 'ac8ed24hnFEmoDeLc/v8Yth', 'ConditionLastTime');
// scripts/battle/component/player/AI/CondtionTimes/ConditionLastTime.js

'use strict';

/**
 * @fileoverview 倒计时
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');
var Tools = require('Tools');

// result从PlayerDistanceSystem确定，就是entityPlayer
var ConditionLastTime = cc.Class({
    extends: ConditionBaseComponent,

    properties: {},

    init: function init() {
        this.result = -1;
    },

    /** overwrite */
    doResultWithParam: function doResultWithParam(time) {
        this.result = time;
    },

    isTrue: function isTrue() {
        return this.result < 0;
    },
    // updateGameLogic: function (dt) {}

    update: function update(dt) {
        this.result -= dt;
    }
});

cc._RF.pop();