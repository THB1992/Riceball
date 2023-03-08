"use strict";
cc._RF.push(module, '5462a5a2/tI+KpKkhT11IXN', 'ConditionHighKnifeNumLocalHero');
// scripts/battle/component/player/AI/ConditionHighKnifeNumLocalHero.js

'use strict';

/**
 * @fileoverview ConditionHighKnifeNumLocalHero
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');

var ConditionHighKnifeNumLocalHero = cc.Class({
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
        this.result = this._localHero ? this._localHero.getKnifeNum() > 6 : false;
    }

    // updateGameLogic: function (dt) {}

    // update: {}
});

cc._RF.pop();