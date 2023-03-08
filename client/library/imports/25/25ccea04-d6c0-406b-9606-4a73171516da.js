"use strict";
cc._RF.push(module, '25cceoE1sBAa5YGSnMXFRba', 'PanelSubscribe');
// scripts/battle/ui/PanelSubscribe.js

'use strict';

var ConfigData = require('ConfigData');
var PlayerData = require('PlayerData');

var Tools = require('Tools');
cc.Class({
    extends: cc.Component,

    properties: {

        topBg: cc.Node,
        bottomBg: cc.Node
    },

    init: function init(world, callback) {
        this.world = world;
        this.callback = callback;
    },
    onSubscribe: function onSubscribe() {
        PlayerData.instance.updateSubscribeTime();
        this.onClose();
    },
    onClose: function onClose() {
        this.node.active = false;
        if (this.callback) this.callback();
    }
}

// update(dt) {},
);

cc._RF.pop();