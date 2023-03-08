"use strict";
cc._RF.push(module, '52922FzstdGGIIpRwfTz58i', 'ConditionNearLocalHero');
// scripts/battle/component/player/AI/ConditionNearLocalHero.js

'use strict';

/**
 * @fileoverview 离玩家很近
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');

// result从PlayerDistanceSystem确定，就是entityPlayer
var ConditionNearLocalHero = cc.Class({
    extends: ConditionBaseComponent,

    properties: {},

    init: function init() {},

    /** overwrite */
    doResultWithParam: function doResultWithParam(entityPlayer) {
        this.result = entityPlayer;
    }

    // updateGameLogic: function (dt) {}

    // update: {}
});

cc._RF.pop();