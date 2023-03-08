"use strict";
cc._RF.push(module, '8097e3CYCZFTJr+tsFgY3Tm', 'ConditionNearAnotherAI');
// scripts/battle/component/player/AI/ConditionNearAnotherAI.js

'use strict';

/**
 * @fileoverview 离其他ai太近条件
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');

// result从PlayerDistanceSystem确定，是另外多个ai的Entity的数组
var ConditionNearAnotherAI = cc.Class({
    extends: ConditionBaseComponent,

    properties: {},

    init: function init() {
        this.result = [];
    },

    /** overwrite */
    clearResult: function clearResult() {
        this.result = [];
    },

    /** overwrite */
    doResultWithParam: function doResultWithParam(otherHero) {
        if (!this.result) {
            this.result = [];
        }
        this.result.push(otherHero);
    },

    /** overwrite */
    isTrue: function isTrue() {
        return this.result && this.result.length > 0;
    }

    // updateGameLogic: function (dt) {}

    // update: {}
});

cc._RF.pop();