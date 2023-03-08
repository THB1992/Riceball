"use strict";
cc._RF.push(module, 'ad7c9T0sjRBNrqbCIlP2DHs', 'ConditionRandomBool');
// scripts/battle/component/player/AI/ConditionRandomBool.js

'use strict';

/**
 * @fileoverview 得到随机值
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');
var Tools = require('Tools');

// result从PlayerDistanceSystem确定，就是entityPlayer
var ConditionRandom = cc.Class({
    extends: ConditionBaseComponent,

    properties: {},

    init: function init() {},

    /** overwrite */
    doResult: function doResult() {
        this.result = Tools.getRandomBool();
    }

    // updateGameLogic: function (dt) {}

    // update: {}
});

cc._RF.pop();