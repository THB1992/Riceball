"use strict";
cc._RF.push(module, 'afa0aV/OxBM+a9QxXeol/eC', 'MoveStateNotice');
// scripts/battle/component/move/MoveStateNotice.js

'use strict';

/**
 * @fileoverview 玩家移动状态通知器
 * @author meifan@gameley.cn (梅凡)
 */

var MoveStateNotice = cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {

        this.node.on('heroMoveStart', this._heroMoveStart, this);
        this.node.on('onStopMoving', this._heroMoveEnd, this);
    },

    init: function init(entityPlayer, knivesComp) {
        this.knivesComp = knivesComp;
        this.entityPlayer = entityPlayer;
    },

    _heroMoveStart: function _heroMoveStart(event) {
        this.knivesComp.heroStartMove();
        this.entityPlayer.heroStartMove(); //.isDefence = false;
    },

    _heroMoveEnd: function _heroMoveEnd(event) {
        this.knivesComp.heroStopMove();
        this.entityPlayer.heroStopMove(); //.isDefence = true;
    }

});

cc._RF.pop();