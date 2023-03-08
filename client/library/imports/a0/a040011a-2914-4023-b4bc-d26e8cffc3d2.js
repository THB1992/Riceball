"use strict";
cc._RF.push(module, 'a0400EaKRRAI7S80m6M/8PS', 'ConditionAISlow');
// scripts/battle/component/player/AI/ConditionAISlow.js

'use strict';

/**
 * @fileoverview ai慢速
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');

var ConditionAISlow = cc.Class({
    extends: ConditionBaseComponent,

    properties: {},

    /** overwrite */
    doResult: function doResult() {
        this.result = 0.8;
    }

    // updateGameLogic: function (dt) {}

    // update: {}
});

cc._RF.pop();