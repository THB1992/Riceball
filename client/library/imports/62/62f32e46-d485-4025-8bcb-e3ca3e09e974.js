"use strict";
cc._RF.push(module, '62f325G1IVAJYvL48o+Cel0', 'HeroFrenzyBar');
// scripts/battle/component/player/HeroFrenzyBar.js

'use strict';

/**
 * @fileoverview HeroKnifeNum
 * @author meifan@gameley.cn (梅凡)
 */

var HeroKnifeNum = cc.Class({
    extends: cc.Component,

    properties: {
        _player: null,
        _frenzyComp: null,
        frenzyBar: cc.Sprite,
        activeNode: cc.Node
    },

    init: function init(entityPlayer) {
        this._player = entityPlayer;
        this._frenzyComp = entityPlayer.node.getComponent('PlayerFrenzyComponent');
    },

    update: function update(dt) {
        if (this._active !== this._player.activeNode.active) {
            this._active = this._player.activeNode.active && this._frenzyComp;
            this.activeNode.active = this._active;
        }

        if (this._frenzyComp && this.frenzyBar) {
            this.frenzyBar.fillRange = this._frenzyComp.getFrenzyRate();
        }
    }

});

cc._RF.pop();