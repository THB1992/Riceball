"use strict";
cc._RF.push(module, '47ab9kBe7VPZanXdmk8hVMg', 'PanelRewardDetail');
// scripts/battle/ui/PanelRewardDetail.js

'use strict';

var Tools = require('Tools');
var ConfigData = require('ConfigData');
var PlayerData = require('PlayerData');
var AdvertMgr = require('AdvertMgr');
var AdverType = require('Types').AdverType;
var ShareMgr = require('ShareMgr');
var ShareType = require('Types').ShareType;
var TaskType = require('Types').TaskType;
var GameData = require('GameData');
var PlatformMgr = require('PlatformMgr');
cc.Class({
    extends: cc.Component,

    properties: {
        itemDetailPrefab: cc.Prefab,
        itemScrollView: cc.ScrollView,
        content: cc.Node,
        tips: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init: function init() {
        // PlatformMgr.getHolidayWorldRewardInfo((data) => {
        var data = PlayerData.instance.playerWorldRewardDetail;
        if (!data) return;
        this._itemScrollView = Tools.getOrAddComponent(this.itemScrollView, 'MyScrollView');
        this._itemScrollView.init(data.rewardInfo, {
            itemPrefab: this.itemDetailPrefab,
            className: 'ItemRewardDetail',
            startX: 0,
            gapX: 15,
            gapY: 10,
            perLine: 1
            // })
        });
    },
    closeNode: function closeNode() {
        this.node.active = false;
    }
}
// update (dt) {},

);

cc._RF.pop();