"use strict";
cc._RF.push(module, 'd1535gorLlL07MVWsMtH8Cv', 'ConditionLowKnifeNum');
// scripts/battle/component/player/AI/ConditionLowKnifeNum.js

'use strict';

/**
 * @fileoverview ConditionLowKnifeNum
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');

var ConditionLowKnifeNum = cc.Class({
    extends: ConditionBaseComponent,

    properties: {
        _player: null
    },

    init: function init(entityPlayer) {
        this._player = entityPlayer;
    },

    /** overwrite */
    doResult: function doResult() {
        this.result = this._player.getKnifeNum() < 3;
    }

    // updateGameLogic: function (dt) {}

    // update: {}
});

cc._RF.pop();