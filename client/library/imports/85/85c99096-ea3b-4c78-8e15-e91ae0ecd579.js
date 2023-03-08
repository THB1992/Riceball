"use strict";
cc._RF.push(module, '85c99CW6jtMeI4V6Rrg7NV5', 'ConditionKilled');
// scripts/battle/component/player/AI/ConditionKilled.js

'use strict';

/**
 * @fileoverview ConditionKilled
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');

var ConditionKilled = cc.Class({
    extends: ConditionBaseComponent,

    properties: {
        _player: null
    },

    init: function init(entityPlayer) {
        this._player = entityPlayer;
    },

    /** overwrite */
    doResult: function doResult() {
        this.result = this._player.beKilled();
    }

    // updateGameLogic: function (dt) {}

    // update: {}
});

cc._RF.pop();