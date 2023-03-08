"use strict";
cc._RF.push(module, '24f97ijfgFKN4C0SmkxsWGs', 'PanelEvaulate');
// scripts/battle/ui/PanelEvaulate.js

'use strict';

var GameData = require('GameData');
var PlatformMgr = require('PlatformMgr');
var PlayerData = require('PlayerData');

cc.Class({
    extends: cc.Component,

    properties: {
        bgNode: cc.Node,
        starNode: cc.Node,
        btnBgNode: cc.Node,
        blackBtnBgNode: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init: function init(callback, world) {
        this.callback = callback;
        this.world = world;
        this.stars = this.starNode.children;
        for (var i = 0; i < this.stars.length; i++) {
            this.stars[i].active = false;
        }
        this.btnBgNode.active = false;
        this.blackBtnBgNode.active = true;
        this.bgNode.height = GameData.instance.screenHeight;

        //评分界面展示
        AdvertMgr.instance.fireBaseEvent("page_show_rating");
    },
    onClick: function onClick(event, data) {
        var count = Number.parseInt(data);
        for (var i = 0; i < this.stars.length; i++) {
            this.stars[i].active = i < count;
        }
        this.count = count;
        this.btnBgNode.active = true;
        this.blackBtnBgNode.active = false;

        //用户点击输入评分
        AdvertMgr.instance.fireBaseEvent("click_rating", "stars", count);
    },
    onRate: function onRate() {
        if (this.count === 5) {
            PlatformMgr.openStoreComment();
        } else {
            this.world.uiMgr.showTips('Rating success');
        }
        this.onClose();
        PlayerData.instance.endEvaulateCount();
    },
    onClose: function onClose() {
        this.node.active = false;
        if (this.callback) this.callback();
    }
    // update (dt) {},

});

cc._RF.pop();