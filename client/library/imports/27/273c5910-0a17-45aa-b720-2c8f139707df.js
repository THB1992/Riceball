"use strict";
cc._RF.push(module, '273c5kQChdFqrcgLI8Tlwff', 'CondtionTrue');
// scripts/battle/component/player/AI/CondtionTrue.js

'use strict';

/**
 * @fileoverview CondtionTrue
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');

var CondtionTrue = cc.Class({
    extends: ConditionBaseComponent,

    properties: {},

    init: function init() {},

    /** overwrite */
    isTrue: function isTrue() {
        return true;
    }

    // updateGameLogic: function (dt) {}

    // update: {}
});

cc._RF.pop();