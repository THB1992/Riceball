"use strict";
cc._RF.push(module, '816c9eetDpHbYI+tXhVgTZH', 'ConditionLocalHeroDefence');
// scripts/battle/component/player/AI/ConditionLocalHeroDefence.js

'use strict';

/**
 * @fileoverview 玩家处于龟缩
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');

// result从PlayerDistanceSystem确定，就是entityPlayer
var ConditionLocalHeroDefence = cc.Class({
    extends: ConditionBaseComponent,

    properties: {
        _localHero: null
    },

    init: function init() {},

    setLocalHero: function setLocalHero(hero) {
        this._localHero = hero;
    },

    /** overwrite */
    doResult: function doResult() {
        this.result = this._localHero ? this._localHero.isDefence : false;
    }

    // updateGameLogic: function (dt) {}

    // update: {}
});

cc._RF.pop();