"use strict";
cc._RF.push(module, '282c49ErtxLApObZ7Cmr+XI', 'PanelSubscribeReward');
// scripts/battle/ui/PanelSubscribeReward.js

'use strict';

var ConfigData = require('ConfigData');
var PlayerData = require('PlayerData');

var Tools = require('Tools');
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init: function init(world, callback) {
        this.world = world;
        this.callback = callback;
        PlayerData.instance.updateZongZi(10);
        PlayerData.instance.updateDaySubscribeReward();
    },
    onClose: function onClose() {
        this.node.active = false;
        this.world.uiMgr.showTips(Tools.getStringByFormat(ConfigData.instance.getUITipStr(15), 10));
        if (this.callback) this.callback();
    },
    update: function update(dt) {}
});

cc._RF.pop();