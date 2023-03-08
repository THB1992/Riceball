const ConfigData = require('ConfigData');
const PlayerData = require('PlayerData');

const Tools = require('Tools');
cc.Class({
    extends: cc.Component,

    properties: {

        topBg: cc.Node,
        bottomBg: cc.Node,
    },

    init(world, callback) {
        this.world = world;
        this.callback = callback;


    },

    onSubscribe() {
        PlayerData.instance.updateSubscribeTime()
        this.onClose();
    },

    onClose() {
        this.node.active = false;
        if (this.callback) this.callback();
    },

    // update(dt) {},
});