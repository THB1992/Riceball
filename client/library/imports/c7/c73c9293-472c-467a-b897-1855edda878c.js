"use strict";
cc._RF.push(module, 'c73c9KTRyxGeriXGFXt2oeM', 'ConditionInThenOutLocalHero');
// scripts/battle/component/player/AI/ConditionInThenOutLocalHero.js

'use strict';

/**
 * @fileoverview 离玩家近而后离开玩家
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');

// result从PlayerDistanceSystem确定，就是entityPlayer
var ConditionInThenOutLocalHero = cc.Class({
    extends: ConditionBaseComponent,

    properties: {
        _heroIn: false
    },

    init: function init() {},

    /** overwrite */
    doResultWithParam: function doResultWithParam(heroIn) {
        if (this._heroIn && !heroIn) {
            this.result = true;
        }
        this._heroIn = heroIn;
    }

    // updateGameLogic: function (dt) {}

    // update: {}
});

cc._RF.pop();