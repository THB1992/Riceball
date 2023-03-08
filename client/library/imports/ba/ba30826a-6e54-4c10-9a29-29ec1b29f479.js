"use strict";
cc._RF.push(module, 'ba308JqblRMEJopKewbKfR5', 'ConditionReviveTotal');
// scripts/battle/component/player/AI/ConditionReviveTotal.js

'use strict';

/**
 * @fileoverview ConditionReviveTotal新手期不再捡的起刀的数量
 * @author meifan@gameley.cn (梅凡)
 */
var ConditionBaseComponent = require('ConditionBaseComponent');

var ConditionReviveTotal = cc.Class({
    extends: ConditionBaseComponent,

    properties: {},

    init: function init(num) {
        this.result = num;
    }

    // updateGameLogic: function (dt) {}

    // update: {}
});

cc._RF.pop();