"use strict";
cc._RF.push(module, 'd4e44n/t/lOd5QXYMYzFXdy', 'ConditionKnifeMoreThenLocalHero');
// scripts/battle/component/player/AI/ConditionKnifeMoreThenLocalHero.js

'use strict';

/**
 * @fileoverview ConditionKnifeMoreThenLocalHero
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');

var ConditionKnifeMoreThenLocalHero = cc.Class({
    extends: ConditionBaseComponent,

    properties: {
        _player: null,
        _localHero: null
    },

    init: function init(entityPlayer) {
        var extra = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        this._player = entityPlayer;
        this._extraNum = extra;
    },

    setLocalHero: function setLocalHero(hero) {
        this._localHero = hero;
    },

    /** overwrite */
    doResult: function doResult() {
        this.result = this._localHero ? this._player.getKnifeNum() - this._localHero.getKnifeNum() >= this._extraNum : false;
    }

    // updateGameLogic: function (dt) {}

    // update: {}
});

cc._RF.pop();