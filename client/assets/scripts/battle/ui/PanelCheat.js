const PlayerData = require('PlayerData');
const ConfigData = require('ConfigData');
const GameData = require('GameData');
const PlatformMgr = require('PlatformMgr');

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
        setkillEditBox: cc.EditBox,
    },

    onClose() {
        this.node.active = false;
    },

    onAddMoney() {
        PlayerData.instance.showGold = Number(this.goldEditBox.string);
        PlayerData.instance.gold = Number(this.goldEditBox.string);
        PlayerData.instance.zongZi = Number(this.goldEditBox.string);
        PlayerData.instance.saveUserData()
        cc.director.loadScene("Battle");
    },

    onAddScore() {
        PlayerData.instance.rankStar = Number(this.scoreEditBox.string);
        PlayerData.instance.oldRankData = ConfigData.instance.getRankDataByStar(PlayerData.instance.rankStar);
        PlayerData.instance.rankData = ConfigData.instance.getRankDataByStar(PlayerData.instance.rankStar);
        PlayerData.instance.saveUserData()
        cc.director.loadScene("Battle");
    },

    onAddKill() {
        PlayerData.instance.killCount = Number(this.killEditBox.string);
        PlayerData.instance.saveUserData()
        cc.director.loadScene("Battle");
    },

    onSetKill() {
        PlayerData.instance.setHolidayScore(Number(this.setkillEditBox.string));
        PlayerData.instance.saveUserData()
        cc.director.loadScene("Battle");
    },

    onAddPlay() {
        PlayerData.instance.showPanelSignFlag = false;
        PlayerData.instance.playCount = Number(this.playEditBox.string);
        PlayerData.instance.saveUserData()
        cc.director.loadScene("Battle");
    },

    onAddTime() {
        GameData.instance.gameTime = Number(this.timeEditBox.string);
        // PlayerData.instance.saveUserData()
        cc.director.loadScene("Battle");
    },

    onAddSign() {
        PlayerData.instance.onDaySpan()
        PlayerData.instance.cheatOffset += 86400000;
        PlayerData.instance.showPanelSignFlag = false;
        PlayerData.instance.saveUserData()
        cc.director.loadScene("Battle");
    },

    onResetShareDailyRequest() {
        PlatformMgr.resetShareDailyRequest(() => {
            this.onAddSign();
        })
    },

    onAddTimeOffset() {
        PlayerData.instance.cheatOffset += Number(this.timeOffsetEditBox.string) * 60000;
        PlayerData.instance.saveUserData()
        cc.director.loadScene("Battle");
    },

    onAddOffline() {
        PlayerData.instance.getOfflineGoldTime -= Number(this.offlineEditBox.string) * 3600000;
        PlayerData.instance.lastChangeGoldMultipTime -= Number(this.offlineEditBox.string) * 3600000;
        PlayerData.instance.offlineFlag = false;
        PlayerData.instance.saveUserData()
        cc.director.loadScene("Battle");
    },
    // update (dt) {},
    onAddRepay() {
        PlayerData.instance.hasRepay = false;
        PlayerData.instance.saveUserData()
        cc.director.loadScene("Battle");
    },

    onSetGrow(event, type) {
        var index = Number(type);
        PlayerData.instance.growLevel[index] = Number(this.GrowEditBoxs[index].string) - 1;
        PlayerData.instance.saveUserData();
        cc.director.loadScene("Battle");
    },

    onAddWatchAdver() {
        PlayerData.instance.totalAdverCount = Number(this.adverEditBox.string);
        PlayerData.instance.saveUserData()
        cc.director.loadScene("Battle");
    },

    onClearTreasure() {
        PlayerData.instance.treasureTurn = 0;
        PlayerData.instance.saveUserData()
        cc.director.loadScene("Battle");
    },

    onOpenMaxAdDebugView() {
        // PlayerData.instance.treasureTurn = 0;
        // PlayerData.instance.saveUserData()
        // cc.director.loadScene("Battle");
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManage", 
        "openMaxAdDebug", 
        "()V");
    },

    onAddDiamond() {
        PlayerData.instance.zongZi = Number(this.goldEditBox.string);
        PlayerData.instance.saveUserData()
        cc.director.loadScene("Battle");
    },
});