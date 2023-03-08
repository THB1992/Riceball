"use strict";
cc._RF.push(module, 'f79fb3Qb9FLNYcGRpEWgnrx', 'PanelCheat');
// scripts/battle/ui/PanelCheat.js

'use strict';

var PlayerData = require('PlayerData');
var ConfigData = require('ConfigData');
var GameData = require('GameData');
var PlatformMgr = require('PlatformMgr');

cc.Class({
    extends: cc.Component,

    properties: {
        goldEditBox: cc.EditBox,
        scoreEditBox: cc.EditBox,
        killEditBox: cc.EditBox,
        playEditBox: cc.EditBox,
        timeEditBox: cc.EditBox,
        signEditBox: cc.EditBox,
        offlineEditBox: cc.EditBox,
        GrowEditBoxs: [cc.EditBox],
        adverEditBox: cc.EditBox,

        timeOffsetEditBox: cc.EditBox,
        setkillEditBox: cc.EditBox
    },

    onClose: function onClose() {
        this.node.active = false;
    },
    onAddMoney: function onAddMoney() {
        PlayerData.instance.showGold = Number(this.goldEditBox.string);
        PlayerData.instance.gold = Number(this.goldEditBox.string);
        PlayerData.instance.zongZi = Number(this.goldEditBox.string);
        PlayerData.instance.saveUserData();
        cc.director.loadScene("Battle");
    },
    onAddScore: function onAddScore() {
        PlayerData.instance.rankStar = Number(this.scoreEditBox.string);
        PlayerData.instance.oldRankData = ConfigData.instance.getRankDataByStar(PlayerData.instance.rankStar);
        PlayerData.instance.rankData = ConfigData.instance.getRankDataByStar(PlayerData.instance.rankStar);
        PlayerData.instance.saveUserData();
        cc.director.loadScene("Battle");
    },
    onAddKill: function onAddKill() {
        PlayerData.instance.killCount = Number(this.killEditBox.string);
        PlayerData.instance.saveUserData();
        cc.director.loadScene("Battle");
    },
    onSetKill: function onSetKill() {
        PlayerData.instance.setHolidayScore(Number(this.setkillEditBox.string));
        PlayerData.instance.saveUserData();
        cc.director.loadScene("Battle");
    },
    onAddPlay: function onAddPlay() {
        PlayerData.instance.showPanelSignFlag = false;
        PlayerData.instance.playCount = Number(this.playEditBox.string);
        PlayerData.instance.saveUserData();
        cc.director.loadScene("Battle");
    },
    onAddTime: function onAddTime() {
        GameData.instance.gameTime = Number(this.timeEditBox.string);
        // PlayerData.instance.saveUserData()
        cc.director.loadScene("Battle");
    },
    onAddSign: function onAddSign() {
        PlayerData.instance.onDaySpan();
        PlayerData.instance.cheatOffset += 86400000;
        PlayerData.instance.showPanelSignFlag = false;
        PlayerData.instance.saveUserData();
        cc.director.loadScene("Battle");
    },
    onResetShareDailyRequest: function onResetShareDailyRequest() {
        var _this = this;

        PlatformMgr.resetShareDailyRequest(function () {
            _this.onAddSign();
        });
    },
    onAddTimeOffset: function onAddTimeOffset() {
        PlayerData.instance.cheatOffset += Number(this.timeOffsetEditBox.string) * 60000;
        PlayerData.instance.saveUserData();
        cc.director.loadScene("Battle");
    },
    onAddOffline: function onAddOffline() {
        PlayerData.instance.getOfflineGoldTime -= Number(this.offlineEditBox.string) * 3600000;
        PlayerData.instance.lastChangeGoldMultipTime -= Number(this.offlineEditBox.string) * 3600000;
        PlayerData.instance.offlineFlag = false;
        PlayerData.instance.saveUserData();
        cc.director.loadScene("Battle");
    },

    // update (dt) {},
    onAddRepay: function onAddRepay() {
        PlayerData.instance.hasRepay = false;
        PlayerData.instance.saveUserData();
        cc.director.loadScene("Battle");
    },
    onSetGrow: function onSetGrow(event, type) {
        var index = Number(type);
        PlayerData.instance.growLevel[index] = Number(this.GrowEditBoxs[index].string) - 1;
        PlayerData.instance.saveUserData();
        cc.director.loadScene("Battle");
    },
    onAddWatchAdver: function onAddWatchAdver() {
        PlayerData.instance.totalAdverCount = Number(this.adverEditBox.string);
        PlayerData.instance.saveUserData();
        cc.director.loadScene("Battle");
    },
    onClearTreasure: function onClearTreasure() {
        PlayerData.instance.treasureTurn = 0;
        PlayerData.instance.saveUserData();
        cc.director.loadScene("Battle");
    },
    onOpenMaxAdDebugView: function onOpenMaxAdDebugView() {
        // PlayerData.instance.treasureTurn = 0;
        // PlayerData.instance.saveUserData()
        // cc.director.loadScene("Battle");
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManage", "openMaxAdDebug", "()V");
    },
    onAddDiamond: function onAddDiamond() {
        PlayerData.instance.zongZi = Number(this.goldEditBox.string);
        PlayerData.instance.saveUserData();
        cc.director.loadScene("Battle");
    }
});

cc._RF.pop();