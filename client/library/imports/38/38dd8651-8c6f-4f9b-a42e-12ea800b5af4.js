"use strict";
cc._RF.push(module, '38dd8ZRjG9Pm6QuEuqAC1r0', 'ConditionNearKnife');
// scripts/battle/component/player/AI/ConditionNearKnife.js

'use strict';

/**
 * @fileoverview 有离很近的刀
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');

// result从PlayerDistanceSystem确定，就是entityKnife
var ConditionNearKnife = cc.Class({
    extends: ConditionBaseComponent,

    properties: {},

    init: function init() {},

    /** overwrite */
    doResultWithParam: function doResultWithParam(entityKnife) {
        this.result = entityKnife;
    }

    // updateGameLogic: function (dt) {}

    // update: {}
});

cc._RF.pop();