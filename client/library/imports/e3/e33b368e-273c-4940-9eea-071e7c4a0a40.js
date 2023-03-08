"use strict";
cc._RF.push(module, 'e33b3aOJzxJQJ7qBx58SgpA', 'ConditionHighKnifeNum');
// scripts/battle/component/player/AI/ConditionHighKnifeNum.js

'use strict';

/**
 * @fileoverview ConditionHighKnifeNum
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');

var ConditionHighKnifeNum = cc.Class({
    extends: ConditionBaseComponent,

    properties: {
        _player: null
    },

    init: function init(entityPlayer) {
        this._player = entityPlayer;
    },

    /** overwrite */
    doResult: function doResult() {
        this.result = this._player.getKnifeNum() > 6;
    }

    // updateGameLogic: function (dt) {}

    // update: {}
});

cc._RF.pop();