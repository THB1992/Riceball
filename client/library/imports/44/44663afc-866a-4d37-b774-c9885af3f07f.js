"use strict";
cc._RF.push(module, '44663r8hmpNN7d0yYha8/B/', 'ConditionLowKnifeNumLocalHero');
// scripts/battle/component/player/AI/ConditionLowKnifeNumLocalHero.js

'use strict';

/**
 * @fileoverview ConditionLowKnifeNumLocalHero
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');

var ConditionLowKnifeNumLocalHero = cc.Class({
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
        this.result = this._localHero ? this._localHero.getKnifeNum() < 3 : false;
    }

    // updateGameLogic: function (dt) {}

    // update: {}
});

cc._RF.pop();