"use strict";
cc._RF.push(module, '01a40b+Y4FHJ5doUc+8p3St', 'ConditionNoMoreKnife');
// scripts/battle/component/player/AI/ConditionNoMoreKnife.js

'use strict';

/**
 * @fileoverview ConditionNoMoreKnife新手期不再捡的起刀的数量
 * @author meifan@gameley.cn (梅凡)
 */
var ConditionBaseComponent = require('ConditionBaseComponent');

var ConditionNoMoreKnife = cc.Class({
    extends: ConditionBaseComponent,

    properties: {},

    init: function init(num) {
        this.result = num;
    }

    // updateGameLogic: function (dt) {}

    // update: {}
});

cc._RF.pop();