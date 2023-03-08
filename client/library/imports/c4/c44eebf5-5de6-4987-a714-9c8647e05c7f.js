"use strict";
cc._RF.push(module, 'c44eev1XeZJh6cUnIZH4Fx/', 'ConditionNearBlock');
// scripts/battle/component/player/AI/ConditionNearBlock.js

'use strict';

/**
 * @fileoverview 离障碍太近条件
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');

// result从PlayerDistanceSystem确定，是另外多个ai的Entity的数组
var ConditionNearBlock = cc.Class({
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
    doResultWithParam: function doResultWithParam(block) {
        if (!this.result) {
            this.result = [];
        }
        this.result.push(block);
    },

    /** overwrite */
    isTrue: function isTrue() {
        return this.result && this.result.length > 0;
    }

    // updateGameLogic: function (dt) {}

    // update: {}
});

cc._RF.pop();