"use strict";
cc._RF.push(module, 'f3d4eBSmIJIH7SkFVH4Uo6N', 'ConditionHignKnifeNumNoPick');
// scripts/battle/component/player/AI/ConditionHignKnifeNumNoPick.js

'use strict';

/**
 * @fileoverview ConditionHighKnifeNum
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionHighKnifeNum = require('ConditionHighKnifeNum');

var ConditionHignKnifeNumNoPick = cc.Class({
    extends: ConditionHighKnifeNum,

    properties: {
        _knifeNum: 10
    },

    init: function init(entityPlayer, knifeNum) {
        this._player = entityPlayer;
        this._knifeNum = knifeNum;
    },

    /** overwrite */
    doResult: function doResult() {
        this.result = this._player.getKnifeNum() > this._knifeNum;
    }

    // updateGameLogic: function (dt) {}

    // update: {}
});

cc._RF.pop();