(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/data/singleton/PlayerData.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5e32fdc6j9Gh6cn94HDvTMb', 'PlayerData', __filename);
// scripts/data/singleton/PlayerData.js

'use strict';

var Tools = require('Tools');
var ConfigData = require('ConfigData');
var PlatformMgr = require('PlatformMgr');
var PlatformType = require('Types').PlatformType;
var GameData = require('GameData');
var TaskType = require('Types').TaskType;
var DailyTaskType = require('Types').DailyTaskType;
var GrowType = require('Types').GrowType;

var PlayerData = cc.Class({
    statics: {
        instance: null,

        init: function init() {
            if (PlayerData.instance === null) {
                PlayerData.instance = new PlayerData();
                PlayerData.instance.init();
            }
        },

        cleanUp: function cleanUp() {
            if (PlayerData.instance) {
                Tools.cleanUp(PlayerData.instance);
            }
            PlayerData.instance = null;
        }
    },

    properties: {
        name: 'player',
        gold: 200,
        showGold: 200,
        getGoldCount: 0,
        knifeSkinId: 1,
        heroSkinId: 1,
        ownKnifeSkins: [],
        ownHeroSkins: [],
        completeTaskIds: [], //已完成任务的id
        showTaskInGameIds: [], //已完成并在游戏中展示解锁的任务id
        completeRankRewardIds: [], //已获取段位奖励的任务id
        needCheckTaskIds: [], //新获得标识
        taskProcess: [],
        knifeSkin: null,
        extraKnifeCount: 0, //每次游戏开始前看广告额外得到的刀
        isExtraKnife: false,
        allShareCount: 0, //生涯累计分享次数
        //建号时间
        bornTime: 0,
        //上次保存数据的时间戳
        saveTime: 0,
        //上次领取离线金币的时间戳
        getOfflineGoldTime: 0,
        offlineGoldCount: 0,
        lastChangeGoldMultipTime: 0,
        //游戏场次
        playCount: 0,
        //游戏总获胜场次
        winCount: 0,
        //日统计
        dayKillCount: 0,
        dayTotalPickKnifeCount: 0,
        dayMaxPickKnifeCount: 0,
        dayKillKnifeCount: 0,
        dayPlayCount: 0,
        dayWinCount: 0,
        dayRefreshTaskCount: 0,
        dayRefreshShareScore: false,

        dayTotalAdsRevenue: 0,
        dayCanReportTotalAdsRevenue: true,

        bitverseWallet: "",

        //每日通过分享或广告成功获得奖励的次数
        dayGetPrizeCount: 0,
        dayWin: false,
        dayLoseCount: 0,
        dayProtectCount: 0,
        dailyShowTask: [],
        dailyOldTask: [], //已经出现过的任务

        dayMultAgainCDCount: 0,
        dayMultAgainCloseCount: 0,
        //升级时金币不足看视频得金币的次数
        dayGetGoldCount: 0,
        //击杀人数
        killCount: 0,
        oldKillCount: 0,
        //幸运大奖次数
        luckyRewardCount: 0,

        level: 0,
        rankScore: 0,
        rankId: 0,
        rankStar: 0,
        hideScore: 0,

        iconUrl: 1,

        //签到天数
        signCount: 0,
        //当天是否签过到
        daySign: false,
        //是否初始化签到天数
        initSignCount: false,
        //皮肤对应的广告观看次数
        adverCountDatas: [],
        //连输次数
        continuityLoseCount: 0,
        //累计看广告次数
        totalAdverCount: 0,
        //上次进主页到这次进主页间看的广告
        changeAdverCount: 0,
        //已经查看过的皮肤
        hasCheckNewSkin: [],
        //领取过的排行轮次日期
        receiveRound: [],

        // 需要上行玩家数据
        needUpdateUserData: false,

        //成长属性 依次是攻击，防御，速度，离线收益，金币加成
        growLevel: [],
        randomCount: 0,

        //是否已经领取过赔偿
        hasRepay: false,
        hawkeyeFunnelIDs: [],

        //新手任务完成情况
        completeGuideDailyTask: [],

        zongZi: 0,

        //作弊时间偏移，可在作弊按钮中修改
        cheatOffset: 0,

        //是否提示过粽子转钻石
        zongZiToDaoBi: false,

        //分享分数，根据这个来决定每天前几次是分享
        shareScore: 0,

        inviteDatas: [],

        checkInviteLength: 0,

        //是否继承了老段位数据
        extendOldRank: false,

        //每日展示置顶
        dayShowTop: false,

        //世界排行数据
        holidayWorldRankData: [],
        updatePKRankTime: 0,
        dayRefreshPKReward: false,
        dayRefreshWorldReward: false,
        dayFirstEnterPKTop20: false,
        //客户端时间偏移
        timeOffset: 0,
        //每轮登录游戏后游戏的场次
        perPlayCount: 0,

        //订阅到期时间戳
        subscribeTime: 0,
        daySubscribeReward: false,
        country: 'US',

        refuseBuyPool: null,
        refuseAdverPool: null,

        keyCount: 0,
        treasureTurn: 0, //宝箱轮数
        showKeyCount: 2, //出现钥匙的局数，当大于等于2局时可以出现钥匙
        hasGetKey: false,

        evaulateCount: 0,

        vipWithoutInterstitial: 0, //充值用户屏蔽插屏广告
        lastFreeDiamondTime: 0,

        isShowOpenAdCold: false

        //nft按钮解锁

    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init: function init() {
        this.randomCount = 0;
        this.ownKnifeSkins = [1];
        this.ownHeroSkins = [1];
        this.growLevel = [0, 0, 0, 0, 0];
        this.needUpdateUserData = false;
        this.bornTime = this.getCurTime();
        this.updateSaveTime();
        this.getOfflineGoldTime = this.getCurTime();
        this.lastChangeGoldMultipTime = this.getCurTime();
        this.loadUserCidData();
        this.refuseBuyPool = {};
        this.refuseAdverPool = {};
        PlatformMgr.setPlayerData(this);

        //-----NFT测试------------
        PlatformMgr.qureyBalance();
        PlatformMgr.checkUserNFT();
        //------------------------
    },

    initUserData: function initUserData(callback) {
        this.getUserData(callback);
        this.saveUserCidData();
        console.log('---------------------------初始化实物获奖信息');
        this.updateWorldRewardDetail();
        console.log('---------------------------初始化小组PK榜数据');
        this.getHolidayPKRank(function () {});
        this.getCountry();
    },

    initConfigData: function initConfigData() {
        if (!this.isOwnKnifeSkin(this.knifeSkinId)) {
            this.knifeSkinId = 1;
        }
        if (!this.isOwnHeroSkin(this.heroSkinId)) {
            this.heroSkinId = 1;
        }
        this.knifeSkin = ConfigData.instance.getKnifeSkinById(this.knifeSkinId);
        this.heroSkin = ConfigData.instance.getHeroSkinById(this.heroSkinId);
        this.rankData = ConfigData.instance.getRankDataByStar(this.rankStar);
        this.rankId = this.rankData.id;
        this.offlineGoldInterval = ConfigData.instance.clientData.offlineGoldInterval * 1000;
        this.offlineGoldNormalCount = ConfigData.instance.clientData.offlineGoldNormalCount;
        this.level = ConfigData.instance.getLevelByHideScore(this.hideScore);

        if (this.dailyShowTask.length === 0) {
            this.updateDailyShowTask();
        }

        this.level = this.protectLevel(this.level);

        this.isGuide = false; //this.playCount === 0 ? true : false;

        if (GameData.instance.isShowLog()) {
            console.log('playerdata.initConfigData level: ' + this.level);
        }
        this.extendOldData();

        PlatformMgr.hawkeye_level = this.rankId + 1;

        this.remainPKDay = Tools.getTimeCount(this.getCurTime(), Tools.getTimeStampByTimeStr(ConfigData.instance.holidayDatas.startDate)).day + 1;
    },

    //继承老数据
    extendOldData: function extendOldData() {
        var needSave = false;
        if (this.rankScore !== -1) {
            var starId = ConfigData.instance.convertScoreIdToStarId(this.rankScore);
            this.rankData = ConfigData.instance.getRankDataById(starId);
            this.rankStar = this.rankData.star;
            this.rankId = this.rankData.id;
            this.rankScore = -1;
            needSave = true;
        }

        if (!this.initSignCount) {
            this.initSignCount = true;
            var dayCount = Tools.getRealDayTimeCount(this.bornTime, this.getCurTime()) - 1;
            dayCount = dayCount < 0 ? 0 : dayCount;
            this.signCount += dayCount;
            if (this.signCount >= 7) {
                this.signCount = 6;
                this.daySign = true;
            }
            needSave = true;
        }

        if (!this.extendOldRank) {
            this.extendOldRank = true;
            if (this.rankStar >= 103) {
                this.rankStar += 60;
                this.rankData = ConfigData.instance.getRankDataByStar(this.rankStar);
                this.rankId = this.rankData.id;
            }
            needSave = true;
        }

        if (needSave) this.saveUserData('老用户数据继承');
    },

    convertZongZi: function convertZongZi() {
        if (this.zongZi > 0) {
            this.gold += this.zongZi * 10;
            this.zongZi = 0;
            this.saveUserData('转化粽子');
        }
    },

    setData: function setData(data) {
        var self = this;
        if (data) {
            self.name = data.name ? data.name : 'player';
            self.gold = data.gold ? data.gold : 0;
            self.knifeSkinId = data.knifeSkinId ? data.knifeSkinId : 1;
            self.ownKnifeSkins = data.ownKnifeSkins ? data.ownKnifeSkins : [1];
            self.ownHeroSkins = data.ownHeroSkins ? data.ownHeroSkins : [1];
            self.heroSkinId = data.heroSkinId ? data.heroSkinId : 1;
            self.completeTaskIds = data.completeTaskIds ? data.completeTaskIds : [];
            self.showTaskInGameIds = data.showTaskInGameIds ? data.showTaskInGameIds : [];
            self.needCheckTaskIds = data.needCheckTaskIds ? data.needCheckTaskIds : [];
            self.completeRankRewardIds = data.completeRankRewardIds ? data.completeRankRewardIds : [];
            self.adverCountDatas = data.adverCountDatas ? data.adverCountDatas : [];
            self.totalAdverCount = data.totalAdverCount ? data.totalAdverCount : 0;
            self.hasCheckNewSkin = data.hasCheckNewSkin ? data.hasCheckNewSkin : [];
            self.receiveRound = data.receiveRound ? data.receiveRound : [];

            self.bornTime = data.bornTime ? data.bornTime : this.getCurTime();
            self.saveTime = data.saveTime ? data.saveTime : this.getCurTime();
            self.getOfflineGoldTime = data.getOfflineGoldTime ? data.getOfflineGoldTime : this.getCurTime();
            self.lastChangeGoldMultipTime = data.lastChangeGoldMultipTime ? data.lastChangeGoldMultipTime : this.getCurTime();
            self.offlineGoldCount = data.offlineGoldCount ? data.offlineGoldCount : 0;

            self.playCount = data.playCount ? data.playCount : 0;
            self.winCount = data.winCount ? data.winCount : 0;

            self.dayPlayCount = data.dayPlayCount ? data.dayPlayCount : 0;
            self.dayGetPrizeCount = data.dayGetPrizeCount ? data.dayGetPrizeCount : 0;
            self.dayWin = data.dayWin ? data.dayWin : 0;
            self.dayLoseCount = data.dayLoseCount ? data.dayLoseCount : 0;
            self.dayProtectCount = data.dayProtectCount ? data.dayProtectCount : 0;
            self.dayGetGoldCount = data.dayGetGoldCount ? data.dayGetGoldCount : 0;
            self.dayKillCount = data.dayKillCount ? data.dayKillCount : 0;
            self.dayTotalPickKnifeCount = data.dayTotalPickKnifeCount ? data.dayTotalPickKnifeCount : 0;
            self.dayMaxPickKnifeCount = data.dayMaxPickKnifeCount ? data.dayMaxPickKnifeCount : 0;
            self.dayKillKnifeCount = data.dayKillKnifeCount ? data.dayKillKnifeCount : 0;
            self.dayWinCount = data.dayWinCount ? data.dayWinCount : 0;
            self.dayRefreshTaskCount = data.dayRefreshTaskCount ? data.dayRefreshTaskCount : 0;
            self.dayRefreshShareScore = data.dayRefreshShareScore ? data.dayRefreshShareScore : false;

            self.dayTotalAdsRevenue = data.dayTotalAdsRevenue ? data.dayTotalAdsRevenue : 0;

            self.bitverseWallet = data.bitverseWallet ? data.bitverseWallet : "";

            self.dailyShowTask = data.dailyShowTask ? data.dailyShowTask : [];
            self.dailyOldTask = data.dailyOldTask ? data.dailyOldTask : [];

            self.dayMultAgainCDCount = data.dayMultAgainCDCount ? data.dayMultAgainCDCount : 0;
            self.dayMultAgainCloseCount = data.dayMultAgainCloseCount ? data.dayMultAgainCloseCount : 0;

            self.killCount = data.killCount ? data.killCount : 0;
            self.allShareCount = data.allShareCount ? data.allShareCount : 0;
            self.luckyRewardCount = data.luckyRewardCount ? data.luckyRewardCount : 0;
            // self.level = data.level ? data.level : 0;

            self.rankStar = data.rankStar ? data.rankStar : 0;
            self.rankId = data.rankId ? data.rankId : 0;
            self.rankScore = data.rankScore ? data.rankScore : 0;
            self.hideScore = data.hideScore ? data.hideScore : 0;

            self.signCount = data.signCount ? data.signCount : 0;
            self.daySign = data.daySign ? data.daySign : false;
            self.initSignCount = data.initSignCount ? data.initSignCount : false;

            self.iconUrl = data.iconUrl ? data.iconUrl : Tools.getRandomInt(1, 7);
            self.continuityLoseCount = data.continuityLoseCount ? data.continuityLoseCount : 0;

            self.growLevel = data.growLevel ? data.growLevel : [0, 0, 0, 0, 0];

            self.hasRepay = data.hasRepay ? data.hasRepay : false;
            self.hawkeyeFunnelIDs = data.hawkeyeFunnelIDs ? data.hawkeyeFunnelIDs : self.hawkeyeFunnelIDs;
            self.completeGuideDailyTask = data.completeGuideDailyTask ? data.completeGuideDailyTask : [];

            self.zongZi = data.zongZi ? data.zongZi : 0;
            self.zongZiToDaoBi = data.zongZiToDaoBi ? data.zongZiToDaoBi : false;

            self.checkInviteLength = data.checkInviteLength ? data.checkInviteLength : 0;

            self.shareScore = data.shareScore ? data.shareScore : 0;
            self.extendOldRank = data.extendOldRank ? data.extendOldRank : false;
            self.dayShowTop = data.dayShowTop ? data.dayShowTop : false;
            self.dayRefreshPKReward = data.dayRefreshPKReward ? data.dayRefreshPKReward : false;
            self.dayRefreshWorldReward = data.dayRefreshWorldReward ? data.dayRefreshWorldReward : false;
            self.dayFirstEnterPKTop20 = data.dayFirstEnterPKTop20 ? data.dayFirstEnterPKTop20 : false;

            self.subscribeTime = data.subscribeTime ? data.subscribeTime : 0.;
            self.daySubscribeReward = data.daySubscribeReward ? data.daySubscribeReward : false;

            self.refuseBuyPool = data.refuseBuyPool ? data.refuseBuyPool : {};
            self.refuseAdverPool = data.refuseAdverPool ? data.refuseAdverPool : {};

            self.keyCount = data.keyCount ? data.keyCount : 0;
            self.treasureTurn = data.treasureTurn ? data.treasureTurn : 0;

            self.showKeyCount = data.showKeyCount || data.showKeyCount === 0 ? data.showKeyCount : 2;
            self.hasGetKey = data.hasGetKey ? data.hasGetKey : false;

            self.evaulateCount = data.evaulateCount ? data.evaulateCount : 0;
            self.vipWithoutInterstitial = data.vipWithoutInterstitial ? data.vipWithoutInterstitial : 0;
            self.lastFreeDiamondTime = data.lastFreeDiamondTime ? data.lastFreeDiamondTime : 0;
        } else {
            if (GameData.instance.isShowLog()) {
                console.log('数据设置为空，使用脚本初始化的数据');
            }
        }
        if (GameData.instance.isShowLog()) {
            console.log(data);
            console.log(new Date(self.saveTime), new Date(this.getCurTime()));
        }

        this.loadComplete = true;
        this.showGold = this.gold;

        PlatformMgr.hawkeye_registerTime = self.bornTime;
        PlatformMgr.hawkeye_level = self.rankId + 1;

        PlatformMgr.setUserCloudStorage(this.rankStar);
    },

    addHawkeyeFunnelIDs: function addHawkeyeFunnelIDs(id) {
        if (this.hawkeyeFunnelIDs) {
            if (!Tools.arrContains(this.hawkeyeFunnelIDs, id)) {
                this.hawkeyeFunnelIDs.push(id);
            }
        }
    },

    hawkeyeFunnelcontains: function hawkeyeFunnelcontains(id) {
        if (this.hawkeyeFunnelIDs) {
            return Tools.arrContains(this.hawkeyeFunnelIDs, id);
        }
        return false;
    },

    /**
     * 测试redis的方法，游戏切勿调用
     */
    randomRankStar: function randomRankStar() {
        var _this = this;

        this.randomCount++;
        this.rankStar = Tools.getRandomInt(0, 103);
        this.saveUserData('随机星星数');
        this.updateUserData(function () {
            // 上传数据成功 准备下载数据
            PlatformMgr.k6_downloadData(function (data) {
                var userData = null;
                if (data) {
                    userData = JSON.parse(data);
                    if (userData.rankStar && userData.rankStar === _this.rankStar) {
                        console.log('download suc and data is right count: ' + _this.randomCount);
                        if (_this.randomCount > 100) {
                            _this.randomCount = 0;
                        } else {
                            _this.randomRankStar();
                        }
                    } else {
                        console.log('download suc but data is wrong count: ' + _this.randomCount);
                    }
                } else {
                    var loaclData = Tools.getItem('userData' + _this.getOsStr());
                    if (loaclData) {
                        userData = JSON.parse(loaclData);
                    }
                }
            });
        });
    },

    saveUserData: function saveUserData(str) {
        if (GameData.instance.isShowLog()) {
            console.log('saveUserData------', str);
        }
        this.needUpdateUserData = true;
    },

    updateUserData: function updateUserData(callback) {
        if (this.needUpdateUserData) {
            this.needUpdateUserData = false;
            if (GameData.instance.isShowLog()) {
                console.log('updateUserData------');
            }
            var userData = {
                name: this.name,
                gold: this.gold,
                ownKnifeSkins: this.ownKnifeSkins,
                ownHeroSkins: this.ownHeroSkins,
                completeTaskIds: this.completeTaskIds,
                showTaskInGameIds: this.showTaskInGameIds,
                needCheckTaskIds: this.needCheckTaskIds,
                completeRankRewardIds: this.completeRankRewardIds,
                adverCountDatas: this.adverCountDatas,
                knifeSkinId: this.knifeSkinId,
                heroSkinId: this.heroSkinId,
                bornTime: this.bornTime,
                saveTime: this.getCurTime(),
                getOfflineGoldTime: this.getOfflineGoldTime,
                lastChangeGoldMultipTime: this.lastChangeGoldMultipTime,
                offlineGoldCount: this.offlineGoldCount,
                allShareCount: this.allShareCount,
                luckyRewardCount: this.luckyRewardCount,
                playCount: this.playCount,
                winCount: this.winCount,
                dayPlayCount: this.dayPlayCount,
                dayGetPrizeCount: this.dayGetPrizeCount,
                dayWin: this.dayWin,
                dayLoseCount: this.dayLoseCount,
                dayProtectCount: this.dayProtectCount,
                dayGetGoldCount: this.dayGetGoldCount,
                dayKillCount: this.dayKillCount,
                dayTotalPickKnifeCount: this.dayTotalPickKnifeCount,
                dayMaxPickKnifeCount: this.dayMaxPickKnifeCount,
                dayKillKnifeCount: this.dayKillKnifeCount,
                dayWinCount: this.dayWinCount,
                dayRefreshTaskCount: this.dayRefreshTaskCount,
                dayRefreshShareScore: this.dayRefreshShareScore,
                dailyShowTask: this.dailyShowTask,
                dailyOldTask: this.dailyOldTask,
                dayMultAgainCDCount: this.dayMultAgainCDCount,
                dayMultAgainCloseCount: this.dayMultAgainCloseCount,

                dayTotalAdsRevenue: this.dayTotalAdsRevenue,

                bitverseWallet: this.bitverseWallet,

                killCount: this.killCount,
                // level: this.level,
                rankStar: this.rankStar,
                rankId: this.rankId,
                rankScore: this.rankScore,
                hideScore: this.hideScore,

                signCount: this.signCount,
                daySign: this.daySign,
                initSignCount: this.initSignCount,
                iconUrl: this.iconUrl,
                continuityLoseCount: this.continuityLoseCount,
                totalAdverCount: this.totalAdverCount,
                hasCheckNewSkin: this.hasCheckNewSkin,
                receiveRound: this.receiveRound,
                growLevel: this.growLevel,
                hasRepay: this.hasRepay,
                hawkeyeFunnelIDs: this.hawkeyeFunnelIDs,
                completeGuideDailyTask: this.completeGuideDailyTask,
                zongZi: this.zongZi,
                zongZiToDaoBi: this.zongZiToDaoBi,
                shareScore: this.shareScore,
                checkInviteLength: this.checkInviteLength,
                extendOldRank: this.extendOldRank,
                dayShowTop: this.dayShowTop,
                dayRefreshPKReward: this.dayRefreshPKReward,
                dayRefreshWorldReward: this.dayRefreshWorldReward,
                dayFirstEnterPKTop20: this.dayFirstEnterPKTop20,
                subscribeTime: this.subscribeTime,
                daySubscribeReward: this.daySubscribeReward,
                refuseBuyPool: this.refuseBuyPool,
                refuseAdverPool: this.refuseAdverPool,
                keyCount: this.keyCount,
                treasureTurn: this.treasureTurn,
                showKeyCount: this.showKeyCount,
                hasGetKey: this.hasGetKey,
                evaulateCount: this.evaulateCount,
                vipWithoutInterstitial: this.vipWithoutInterstitial,
                lastFreeDiamondTime: this.lastFreeDiamondTime
            };
            var str = JSON.stringify(userData);
            Tools.setItem('userData' + this.getOsStr(), str);

            PlatformMgr.k6_uploadData(str, callback);
        }
    },

    getUserData: function getUserData(callback) {
        var _this2 = this;

        var self = this;
        switch (PlatformMgr.platformType) {
            case PlatformType.WECHAT:
                {
                    PlatformMgr.k6_downloadData(function (data) {
                        var userData = null;
                        var localData = null;
                        var localDataStr = Tools.getItem('userData' + _this2.getOsStr());
                        if (localDataStr) localData = JSON.parse(localDataStr);

                        var serverData = null;
                        if (data) serverData = JSON.parse(data);

                        if (serverData && localData) {
                            //获取本地数据比较数据哪个更新，就用哪一个
                            if (serverData.saveTime >= localData.saveTime) {
                                if (GameData.instance.isShowLog()) {
                                    console.log('数据正常，使用服务端数据,服务器时间：', new Date(serverData.saveTime), '本地时间：', new Date(localData.saveTime));
                                }
                                userData = serverData;
                            } else {
                                if (GameData.instance.isShowLog()) {
                                    console.log('服务端数据过老，使用本地数据,服务器时间：', new Date(serverData.saveTime), '本地时间：', new Date(localData.saveTime));
                                }
                                userData = localData;
                            }
                        } else if (serverData) {
                            if (GameData.instance.isShowLog()) {
                                console.log('本地数据为空，使用服务端数据');
                            }
                            userData = serverData;
                        } else {
                            if (GameData.instance.isShowLog()) {
                                console.log('服务端数据为空，使用本地数据');
                            }
                            userData = localData;
                        }

                        self.setData(userData);
                        if (callback) callback();
                    }, function () {
                        //发行sdk的数据获取失败情况处理
                        var userData = null;
                        var loaclData = Tools.getItem('userData' + _this2.getOsStr());
                        if (loaclData) {
                            if (GameData.instance.isShowLog()) {
                                console.log('发行sdk获取数据失败，使用本地数据');
                            }
                            userData = JSON.parse(loaclData);
                        }
                        self.setData(userData);
                        if (callback) callback();
                    });

                    break;
                }
            default:
                {
                    var userData = null;
                    var loaclData = Tools.getItem('userData' + this.getOsStr());
                    if (loaclData) {
                        userData = JSON.parse(loaclData);
                    }
                    self.setData(userData);
                    if (callback) callback();
                    break;
                }
        }
    },

    getOsStr: function getOsStr() {
        return PlatformMgr.isIOS() ? 'ios' : '';
    },

    resetDataToDefault: function resetDataToDefault() {
        var defaultData = {

            name: 'player',
            gold: 200,
            knifeSkinId: 1,
            heroSkinId: 1,
            ownKnifeSkins: [1],
            ownHeroSkins: [1],
            growLevel: [0, 0, 0, 0, 0],
            //建号时间
            bornTime: 0,
            saveTime: 0,
            //游戏场次
            playCount: 0,
            winCount: 0,
            //每日任务参数
            dayKillCount: 0,
            dayTotalPickKnifeCount: 0,
            dayMaxPickKnifeCount: 0,
            dayKillKnifeCount: 0,
            dayPlayCount: 0,
            dayGetPrizeCount: 0,
            dayWinCount: 0,
            dayRefreshTaskCount: 0,
            // 当日连输局数
            dayLoseCount: 0,
            // 当日是否赢
            dayWin: false,
            //当日保级/保星次数
            dayProtectCount: 0,
            //击杀人数
            killCount: 0,
            allShareCount: 0,
            luckyRewardCount: 0,
            // level: 0,
            rankStar: 0,
            rankId: 0,
            rankScore: 0,
            hideScore: 0,

            signCount: 0,
            daySign: false,
            initSignCount: false,
            iconUrl: Tools.getRandomInt(1, 7),

            adverCountDatas: [],
            continuityLoseCount: 0,
            totalAdverCount: 0,
            hawkeyeFunnelIDs: []
        };
        this.setData(defaultData);
        this.saveUserData('清号');
        this.clearTempData();
    },

    isOwnKnifeSkin: function isOwnKnifeSkin(id) {
        return Tools.arrContains(this.ownKnifeSkins, id);
    },

    isOwnHeroSkin: function isOwnHeroSkin(id) {
        return Tools.arrContains(this.ownHeroSkins, id) || this.isSubscribe() && id === 8;
    },

    isOwnSuit: function isOwnSuit(id) {
        var data = ConfigData.instance.getSuitData(id);
        return this.isOwnHeroSkin(data.heroSkin) && this.isOwnKnifeSkin(data.knifeSkin);
    },

    addKnifeSkin: function addKnifeSkin(id) {
        this.ownKnifeSkins.push(id);
        this.saveUserData('得刀皮肤');
    },

    addHeroSkin: function addHeroSkin(id) {
        this.ownHeroSkins.push(id);
        this.saveUserData('得英雄皮肤');
    },

    addCompleteTask: function addCompleteTask(id) {
        this.completeTaskIds.push(id);
        this.needCheckTaskIds.push(id);
        this.saveUserData('任务完成');
    },

    addShowTask: function addShowTask(id) {
        this.showTaskInGameIds.push(id);
        this.saveUserData('任务游戏内展示');
    },

    addCompleteRankReward: function addCompleteRankReward(id) {
        this.completeRankRewardIds.push(id);
        this.saveUserData('段位任务完成');
    },

    //needSave是因为在商店关闭时才需要保存，不然频繁切换皮肤就会频繁触发数据上行
    updateKnifeSkin: function updateKnifeSkin(skin, needSave) {
        if (this.knifeSkinId !== skin.id) {
            this.knifeSkin = skin;
            this.knifeSkinId = skin.id;
            this.isDirtyKnifeSkin = true;
        }
        if (needSave && this.isDirtyKnifeSkin) {
            this.saveUserData('更换刀皮肤');
            this.isDirtyKnifeSkin = false;
        }
    },

    updateHeroSkin: function updateHeroSkin(skin, needSave) {
        if (this.heroSkinId !== skin.id) {
            this.heroSkin = skin;
            this.heroSkinId = skin.id;
            this.isDirtyHeroSkin = true;
        }

        if (needSave && this.isDirtyHeroSkin) {
            this.saveUserData('更换角色皮肤');
            this.isDirtyHeroSkin = false;
        }
    },

    setExtraKnife: function setExtraKnife(count) {
        this.extraKnifeCount = count;
        this.isExtraKnife = count > 0;
    },

    addExtraKnife: function addExtraKnife(count) {
        this.extraKnifeCount += count;
    },

    clearTempData: function clearTempData() {
        Tools.setItem('fromMyApp', '');
        Tools.setItem('trySkinData', '');
        Tools.setItem('luckyRewardData', '');
    },

    setTrySkinData: function setTrySkinData(data) {
        data.trySkinCount++;
        data.lastTryPlayCount = this.dayPlayCount;
        var str = JSON.stringify(data);
        Tools.setItem('trySkinData', str);
    },

    getTrySkinData: function getTrySkinData() {
        var data = {};
        var str = Tools.getItem('trySkinData');
        if (str) {
            data = JSON.parse(str);
        } else {
            data.trySkinCount = 0;
            data.lastTrySkinType = 0;
            data.lastTryPlayCount = 0;
        }
        return data;
    },

    setLuckyRewardData: function setLuckyRewardData(count) {
        Tools.setItem('luckyRewardData', count);
    },

    getLuckyRewardData: function getLuckyRewardData() {
        var str = Tools.getItem('luckyRewardData');
        return str ? Number(str) : 0;
    },

    updateGold: function updateGold(num, getGoldParam) {
        var isDelay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        this.gold += num;
        this.showGold += num;
        if (getGoldParam) {
            this.getGoldParam = getGoldParam;
        }
        if (isDelay) {
            this.delaySaveDataTime = 3;
        } else {
            this.saveUserData('更新钱');
        }
    },

    updateName: function updateName(str) {
        this.name = str;
        this.saveUserData('更新名字');
    },

    updateShareCount: function updateShareCount() {
        this.allShareCount++;
        this.saveUserData('更新分享');
    },

    updateLuckyRewardCount: function updateLuckyRewardCount() {
        this.luckyRewardCount++;
        this.saveUserData('更新幸运大奖次数');
    },

    isFristGame: function isFristGame() {
        return this.playCount === 0;
    },

    isSecGame: function isSecGame() {
        return this.playCount === 1;
    },

    canShowPanelSign: function canShowPanelSign() {
        return this.playCount >= 5;
    },

    canShowPanelAddTop: function canShowPanelAddTop() {
        if (PlatformMgr.isApp()) {
            return false;
        }
        //玩过一次游戏（第二次进主而）
        if (!this.hasPlayOnceGame) {
            return false;
        }
        //奖励已领取）
        if (this.hasGetAddTopReward()) {
            return false;
        }
        //今日已经弹出过一次
        if (this.dayShowTop) {
            return false;
        }
        //大于四局
        if (this.playCount >= 4) {
            if (this.isFirstDay()) {
                return true;
            } else {
                if (this.dayPlayCount >= 1) {
                    return true;
                }
            }
        }
        return false;
    },

    canShowBtnAddTop: function canShowBtnAddTop() {
        return this.playCount >= 4 && !this.hasGetAddTopReward();
    },

    canShowBtnHoliday: function canShowBtnHoliday() {
        return ConfigData.instance.isDuringHolidayRankBtnShowTime(this.getCurTime());
    },

    canShowPanelHolidayRank: function canShowPanelHolidayRank() {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>开始判定是否自动弹出暑期排行界面');

        if (!this.canShowBtnHoliday()) {
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>不在活动期间，不弹出');
            return false;
        }

        // if (!Tools.getItem('userinfoBtn')) {
        //     console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>未授权，不弹出')
        //     return false;
        // }

        if (this.playCount < 1) {
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>新手第一局，不弹出');
            return false;
        }

        if (this.checkHourSpan()) {
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>跨特定时间，弹出');
            return true;
        }

        if (this.perPlayCount === 1) {
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>每次登录游戏第一局出来，弹出');
            return true;
        }

        if (!this.myPKRankData) {
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>没有获取到我的小组排名数据，不弹出');
            return false;
        }

        if (this.myPKRankData.rank <= 20 && !this.dayFirstEnterPKTop20) {
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>每天第一次进前20，弹出');
            this.updateDayFirstEnterPKTop20();
            return true;
        }

        if (!this.myOldPKRankData) {
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>没有获取到我上次的小组排名数据，不弹出');
            return false;
        }

        if (this.myPKRankData.rank <= 20) {
            if (this.myPKRankData.rank < this.myOldPKRankData.rank) {
                console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>前20并且排名提升，弹出');
                return true;
            }
        } else {
            if (this.myOldPKRankData.rank - this.myPKRankData.rank >= 10) {
                console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>不在前20并且排名提升超过十位，弹出');
                return true;
            }
        }

        if (this.myOldPKRankData.rank === 1 && this.myPKRankData.rank > 1) {
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>之前是第一名并且掉落位置，弹出');
            return true;
        }
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>以上条件均不满足，不弹出');
        return false;
    },

    onGameOver: function onGameOver(player) {

        this.hasPlayOnceGame = true;

        var rank = player.rank;

        this.setExtraKnife(0);
        this.playCount++;
        // this.refreshUnlockGrow();
        this.perPlayCount++;
        this.dayPlayCount++;
        this.dayKillCount += player.killNum;
        this.dayTotalPickKnifeCount += player.pickKnifeCount;
        this.dayMaxPickKnifeCount = Math.max(this.dayMaxPickKnifeCount, player.maxPickKnifeCount);
        this.dayKillKnifeCount += player.killKnifeCount;
        this.dayWinCount = rank === 1 ? this.dayWinCount + 1 : 0;
        this.dayLoseCount = rank === 1 ? 0 : this.dayLoseCount + 1;
        this.continuityLoseCount = rank === 1 ? 0 : this.continuityLoseCount + 1;
        this.winCount = rank === 1 ? this.winCount + 1 : this.winCount;

        if (rank === 1 && !this.dayWin) {
            this.dayWin = true;
        }
        this.updateDayMultAgainCDCount();
        this.updateShowKeyCount();
        this.updateEvaulateCount();
        // if (this.isFirstDay()) {
        //     PlatformMgr.enlinkerGameNumber();
        // }

        var timestamp = Tools.getMilliTime();
        var time = Math.floor((timestamp - this._startGameTimestamp) / 1000);
        PlatformMgr.hawkeye_report_game(time);

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.dailyShowTask[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var task = _step.value;

                // task.lastProcess = task.process;
                switch (task.type) {
                    case DailyTaskType.KILL_COUNT:
                        task.process += player.killNum;
                        break;
                    case DailyTaskType.TOTAL_PICK_KNIFE_COUNT:
                        task.process += player.pickKnifeCount;
                        break;
                    case DailyTaskType.MAX_PICK_KNIFE_COUNT:
                        task.process = Math.max(task.process, player.maxPickKnifeCount);
                        break;
                    case DailyTaskType.KILL_KNIFE_COUNT:
                        task.process += player.killKnifeCount;
                        break;
                    case DailyTaskType.PLAY_COUNT:
                        task.process++;
                        break;
                    case DailyTaskType.WIN_COUNT:
                        if (rank === 1) {
                            task.process++;
                        }
                        break;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        this.setHolidayScore(player.killNum);
        // this.setHolidayScore(20);
        this.saveUserData('更新游戏结束');
    },

    onStartGame: function onStartGame() {
        this._startGameTimestamp = Tools.getMilliTime();
    },

    refreshUnlockGrow: function refreshUnlockGrow() {
        var growLimit = ConfigData.instance.clientData.growLimit;
        if (this.playCount === growLimit[0]) {
            this.showUnlockGrow = 1;
        } else if (this.playCount === growLimit[1]) {
            this.showUnlockGrow = 2;
        }
    },

    getCurTime: function getCurTime() {
        return Number(new Date().getTime()) - PlatformMgr.timeDefence + this.cheatOffset + this.timeOffset;
    },

    getCurWeekDay: function getCurWeekDay() {
        return new Date(this.getCurTime()).getDay();
    },

    //返回上次存储离线金币点距离现在的时间，单位秒
    getOfflineTime: function getOfflineTime() {
        var curTime = this.getCurTime();
        if (curTime - this.getOfflineGoldTime > 86400000) {
            curTime = this.getOfflineGoldTime + 86400000;
        };
        var offset = (this.lastChangeGoldMultipTime - this.getOfflineGoldTime) % this.offlineGoldInterval;
        var time = curTime - (this.lastChangeGoldMultipTime - offset);
        // console.log('getOfflineTime', new Date(curTime), 'phoneTime', new Date(), 'timeDeferent', PlatformMgr.timeDefence)
        return time > 0 ? time : false;
    },

    getFinalOfflineGold: function getFinalOfflineGold() {
        var newCount = Math.floor(this.getOfflineTime() / this.offlineGoldInterval);
        var data = this.getGrowLevelDataByType(GrowType.Gold);
        var rate = data.realOfflineParam / 100 + 1;
        var finalGold = Math.floor((this.offlineGoldCount + newCount * this.offlineGoldNormalCount * rate) * 10) / 10;
        // console.log('newCount', newCount, 'rate', rate, 'oldCount', this.offlineGoldCount, 'finalGold', finalGold);
        return finalGold;
    },

    getReceiveOfflineGoldTime: function getReceiveOfflineGoldTime() {
        var time = this.getCurTime() - this.getOfflineGoldTime;
        return time > 86400000 ? 86400000 : time;
    },

    getTaskProcess: function getTaskProcess(type) {
        var process = 0;
        switch (type) {
            case TaskType.LOGIN:
                process = this.signCount + 1;
                break;
            case TaskType.PLAYCOUNT:
                process = this.playCount;
                break;
            case TaskType.KILLCOUNT:
                process = this.killCount;
                break;
            case TaskType.RANK:
                process = this.rankData.id;
                break;
            case TaskType.ADVERCOUNT:
                process = this.totalAdverCount;
                break;
        }
        return process;
    },

    getDailyTaskProcess: function getDailyTaskProcess(type) {
        var process = 0;
        switch (type) {
            case DailyTaskType.KILL_COUNT:
                process = this.dayKillCount;
                break;
            case DailyTaskType.TOTAL_PICK_KNIFE_COUNT:
                process = this.dayTotalPickKnifeCount;
                break;
            case DailyTaskType.MAX_PICK_KNIFE_COUNT:
                process = this.dayMaxPickKnifeCount;
                break;
            case DailyTaskType.KILL_KNIFE_COUNT:
                process = this.dayKillKnifeCount;
                break;
            case DailyTaskType.PLAY_COUNT:
                process = this.dayPlayCount;
                break;
            case DailyTaskType.WIN_COUNT:
                process = this.dayWinCount;
                break;
        }
        return process;
    },

    saveUserCidData: function saveUserCidData() {
        var userData = {
            saveTime: this.getCurTime(),
            cids: PlatformMgr.oldVisitCids
        };
        var str = JSON.stringify(userData);
        Tools.setItem('userCidData', str);
    },

    loadUserCidData: function loadUserCidData() {
        var loaclData = Tools.getItem('userCidData');
        if (loaclData) {
            var userData = JSON.parse(loaclData);

            var count = userData.saveTime ? Tools.getRealDayTimeCount(userData.saveTime, this.getCurTime()) : 2;
            if (count >= 2) {
                PlatformMgr.oldVisitCids = [];
            } else {
                PlatformMgr.oldVisitCids = userData.cids ? userData.cids : [];
            }
        }
    },

    checkDaySpan: function checkDaySpan() {
        var curTime = this.getCurTime();
        if (GameData.instance.isShowLog()) {
            console.log('---------------------------检查是否跨天');
            console.log('---------------------------上次时间：', new Date(this.saveTime));
            console.log('---------------------------现在时间：', new Date(curTime));
        }
        if (Tools.isDaySpan(this.saveTime, curTime)) {
            this.updateSaveTime();
            this.onDaySpan();
            return true;
        }
        // return true;
    },

    //跨小时重新拉取世界排行榜
    checkHourSpan: function checkHourSpan() {
        var curTime = this.getCurTime();
        if (GameData.instance.isShowLog()) {
            console.log('---------------------------检查是否跨特定小时', JSON.stringify(ConfigData.instance.holidayDatas.refreshWorldTime));
            console.log('---------------------------上次时间：', new Date(this.saveTime));
            console.log('---------------------------现在时间：', new Date(curTime));
        }
        if (Tools.isHourSpan(this.saveTime, curTime, ConfigData.instance.holidayDatas.refreshWorldTime)) {
            return true;
        }
    },

    onDaySpan: function onDaySpan() {
        this.dayTotalAdsRevenue = 0;
        this.dayCanReportTotalAdsRevenue = true;

        this.dayKillCount = 0;
        this.dayTotalPickKnifeCount = 0;
        this.dayMaxPickKnifeCount = 0;
        this.dayKillKnifeCount = 0;
        this.dayPlayCount = 0;
        this.dayWinCount = 0;
        this.dayRefreshTaskCount = 0;
        this.dayGetPrizeCount = 0;
        if (!PlayerData.instance.isDuringDailyTaskGuide()) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.dailyShowTask[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var task = _step2.value;

                    task.process = 0;
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            this.dailyShowTask = [];
        }

        this.dailyOldTask = [];

        this.dayGetGoldCount = 0;
        this.dayProtectCount = 0;
        this.updateDayMultAgainCDCountFlag = true;
        // this.dayMultAgainCDCount = ConfigData.instance.clientData.dayMultAgainCDCount;
        this.dayMultAgainCloseCount = 0;

        this.dayLoseCount = 0;
        this.dayWin = false;
        if (this.daySign) {
            this.signCount++;
        }
        this.daySign = false;
        this.dayShowTop = false;
        this.dayRefreshPKReward = false;
        this.dayRefreshWorldReward = false;
        this.dayRefreshShareScore = false;
        this.dayFirstEnterPKTop20 = false;

        this.daySubscribeReward = false;
        this.loadComplete = true;
        Tools.setItem('trySkinData', '');
        this.saveUserData('跨天');
    },

    protectLevel: function protectLevel(level) {
        var ret = level;

        if (this.dayLoseCount >= 3) {
            // 连输
            ret = ret > ConfigData.instance.defaultLevel ? ConfigData.instance.defaultLevel : ret - 2;
            ret = ConfigData.instance.clampLevel(ret);
            return ret;
        }

        if (this.dayPlayCount === 0 || !this.dayWin) {
            // 今天第一把 或者 今天还没有赢过
            ret -= 2;
            ret = ConfigData.instance.clampLevel(ret);
            return ret;
        }

        return ret;
    },

    clearNeedCheckTaskIds: function clearNeedCheckTaskIds() {
        if (this.needCheckTaskIds && this.needCheckTaskIds.length > 0) {
            this.needCheckTaskIds = [];
            this.saveUserData('刷新可解锁的任务id');
        }
    },

    updateDayProtectCount: function updateDayProtectCount() {
        this.dayProtectCount++;
        this.saveUserData('更新保星保级次数');
    },

    updateSignCount: function updateSignCount() {
        this.daySign = true;
        this.saveUserData('更新签到');
    },

    updateDayShowTop: function updateDayShowTop() {
        this.dayShowTop = true;
        this.saveUserData('更新展示置顶');
    },

    updateDayRefreshPKReward: function updateDayRefreshPKReward() {
        this.dayRefreshPKReward = true;
        this.saveUserData('更新小组PK奖励领取');
    },

    updateDayRefreshWorldReward: function updateDayRefreshWorldReward() {
        this.dayRefreshWorldReward = true;
        this.saveUserData('更新世界PK奖励领取');
    },

    updateDayFirstEnterPKTop20: function updateDayFirstEnterPKTop20() {
        this.dayFirstEnterPKTop20 = true;
        this.saveUserData('更新小组PK每日首次进前20');
    },

    updateIconUrl: function updateIconUrl(iconUrl) {
        this.iconUrl = iconUrl;
        this.saveUserData('更新头像');
    },

    updateAdverCountData: function updateAdverCountData(id) {
        var lastCount = this.adverCountDatas[id] ? this.adverCountDatas[id] : 0;
        this.adverCountDatas[id] = lastCount + 1;
        this.saveUserData('更新累计看广告次数');
    },

    updateTotalAdverCount: function updateTotalAdverCount() {
        this.totalAdverCount++;
        this.changeAdverCount++;
        this.saveUserData('更新累计看广告次数');
    },

    isFirstDay: function isFirstDay() {
        return Tools.getRealDayTimeCount(this.bornTime, this.getCurTime()) === 1;
    },

    isSecondDay: function isSecondDay() {
        return Tools.getRealDayTimeCount(this.bornTime, this.getCurTime()) === 2;
    },

    bornDay: function bornDay() {
        return Tools.getRealDayTimeCount(this.bornTime, this.getCurTime());
    },

    updateContinuityLoseCount: function updateContinuityLoseCount() {
        this.continuityLoseCount = 0;
        this.saveUserData('更新连败次数');
    },

    updateNewKnifeSkinCheck: function updateNewKnifeSkinCheck() {
        var newCheck = false;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = ConfigData.instance.knifeSkinDatas[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var data = _step3.value;

                var isNew = data.newDate && Tools.isBeforeOtherTime(data.newDate, this.getCurTime());
                var id = data.id;
                if (isNew && !Tools.arrContains(this.hasCheckNewSkin, id)) {
                    this.hasCheckNewSkin.push(id);
                    newCheck = true;
                }
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        if (newCheck) {
            this.saveUserData('更新已经查看过的新武器皮肤');
        }
    },

    updateNewHeroSkinCheck: function updateNewHeroSkinCheck() {
        var newCheck = false;
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = ConfigData.instance.heroSkinDatas[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var data = _step4.value;

                var isNew = data.newDate && Tools.isBeforeOtherTime(data.newDate, this.getCurTime());
                var id = 10000 + data.id;
                if (isNew && !Tools.arrContains(this.hasCheckNewSkin, id)) {
                    this.hasCheckNewSkin.push(id);
                    newCheck = true;
                }
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }

        if (newCheck) {
            this.saveUserData('更新已经查看过的新角色皮肤');
        }
    },

    updateGrowLevel: function updateGrowLevel(type) {
        if (type === GrowType.Gold) {
            this.offlineGoldCount = this.getFinalOfflineGold();
            this.lastChangeGoldMultipTime = this.getCurTime();
        }
        this.growLevel[type] += 1;
    },

    checkDelayUpdateData: function checkDelayUpdateData(dt) {
        if (this.delaySaveDataTime > 0) {
            this.delaySaveDataTime -= dt;
            // console.log('延迟更新', this.delaySaveDataTime);
            if (this.delaySaveDataTime <= 0) {
                this.delaySaveDataTime = 0;
                this.needUpdateUserData = true;
            }
        }
    },

    getGrowLevel: function getGrowLevel(type) {
        return this.growLevel[type];
    },

    getGrowLevelDataByType: function getGrowLevelDataByType(type) {
        var level = this.growLevel[type];
        var data = ConfigData.instance.getGrowLevelData(type, level);
        return data;
    },

    updateGetOfflineGoldTime: function updateGetOfflineGoldTime() {
        var curTime = this.getCurTime();
        this.getOfflineGoldTime = curTime - (curTime - this.getOfflineGoldTime) % this.offlineGoldInterval;
        this.lastChangeGoldMultipTime = this.getOfflineGoldTime;
        this.offlineGoldCount = 0;
        this.saveUserData('更新领取离线收益时间');
    },

    // getLevelRealParamByType: function (type) {
    //     var data = this.getGrowLevelDataByType(type)
    //     return data ? data.realParam : false;
    // },
    updateRepay: function updateRepay() {
        this.hasRepay = true;
        this.saveUserData('更新领取赔偿');
    },
    updateZongZiToDaoBi: function updateZongZiToDaoBi() {
        this.zongZiToDaoBi = true;
        this.saveUserData('更新粽子转换钻石');
    },

    updateDayGetPrizeCount: function updateDayGetPrizeCount(way) {
        this.dayGetPrizeCount++;
        this.saveUserData('更新获取奖励次数通过 ' + way);
    },

    updateDailyShowTask: function updateDailyShowTask() {
        this.dailyShowTask = ConfigData.instance.getDailyShowTask(this);
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
            for (var _iterator5 = this.dailyShowTask[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var data = _step5.value;

                data.goldMultiRate = this.rankData.goldMultiRate;
            }
        } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                    _iterator5.return();
                }
            } finally {
                if (_didIteratorError5) {
                    throw _iteratorError5;
                }
            }
        }

        this.saveUserData('更新展示任务');
    },

    updateDailyOldTask: function updateDailyOldTask(id) {
        if (this.dailyOldTask.indexOf(id) === -1) {
            this.dailyOldTask.push(id);
            this.saveUserData('更新已经展示过的任务');
        }
    },

    updateCompleteGuideDailyTask: function updateCompleteGuideDailyTask(id) {
        this.completeGuideDailyTask.push(id);;
        if (this.completeGuideDailyTask.length === 3) {
            this.updateDailyShowTask();
        }
        this.saveUserData('更新新手任务完成');
    },

    updateZongZi: function updateZongZi(num) {
        this.zongZi += num;
        this.saveUserData('更新种子数量');
    },

    updateDayRefreshTaskCount: function updateDayRefreshTaskCount() {
        this.dayRefreshTaskCount++;
        this.saveUserData('更新每日刷新任务数量');
    },

    updateDayRefreshShareScore: function updateDayRefreshShareScore(score) {
        this.shareScore = score;
        this.dayRefreshShareScore = true;
        this.saveUserData('更新每日刷新分享积分标志位');
    },

    isDuringDailyTaskGuide: function isDuringDailyTaskGuide() {
        return this.completeGuideDailyTask.length !== 3;
    },

    canShowMultAgain: function canShowMultAgain() {

        var dayMultAgainMinPlayCount = ConfigData.instance.clientData.dayMultAgainMinPlayCount;
        if (this.playCount < ConfigData.instance.clientData.dayMultAgainMinPlayCount) {
            if (GameData.instance.isShowLog()) {
                console.log('战斗未满' + dayMultAgainMinPlayCount + '场，不弹二次翻倍');
            }
            return false;
        }

        if (this.dayMultAgainCDCount > 0) {
            if (GameData.instance.isShowLog()) {
                console.log('冷却中，不弹二次翻倍');
            }
            return false;
        }

        if (this.dayMultAgainCloseCount >= 2) {
            if (GameData.instance.isShowLog()) {
                console.log('累计两次手动关闭，不弹二次翻倍');
            }
            return false;
        }

        return true;
    },

    updateDayMultAgainCDCount: function updateDayMultAgainCDCount() {
        if (this.dayMultAgainCDCount > 0) {
            this.dayMultAgainCDCount--;
        }
        this.saveUserData('更新每日 二次翻倍 冷却数');
    },

    resetDayMultAgainCDCount: function resetDayMultAgainCDCount(count) {
        this.dayMultAgainCDCount = count + 1;
        this.saveUserData('重置每日 二次翻倍 冷却数');
    },

    updateDayMultAgainCloseCount: function updateDayMultAgainCloseCount() {
        this.dayMultAgainCloseCount++;
        this.saveUserData('更新每日 二次翻倍 关闭数');
    },

    updateShareScore: function updateShareScore() {
        this.shareScore--;
        this.saveUserData('更新每日分享分数 减一');
    },

    updateCheckInviteLength: function updateCheckInviteLength() {
        if (this.checkInviteLength < PlayerData.instance.inviteDatas.length) {
            this.checkInviteLength = PlayerData.instance.inviteDatas.length;
            this.saveUserData('查看新邀请朋友');
        }
    },

    hasGetInviteReward: function hasGetInviteReward() {
        return this.isOwnHeroSkin(11);
    },

    hasGetAddTopReward: function hasGetAddTopReward() {
        return this.isOwnKnifeSkin(32);
    },

    canGetAddTopReward: function canGetAddTopReward() {
        return Tools.getItem('fromMyApp');
    },

    isCurEquipHeroSkin: function isCurEquipHeroSkin(id) {
        return this.heroSkinId === id;
    },

    isCurEquipKnifeSkin: function isCurEquipKnifeSkin(id) {
        return this.knifeSkinId === id;
    },

    canShowPanelDailyTask: function canShowPanelDailyTask() {
        if (this.isDuringDailyTaskGuide()) {
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = this.dailyShowTask[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var data = _step6.value;

                    // var isComplete = PlayerData.instance.getDailyTaskProcess(data.type) >= data.param;
                    var isComplete = data.process >= data.param;
                    var isGet = Tools.arrContains(PlayerData.instance.dailyOldTask, data.id) || Tools.arrContains(PlayerData.instance.completeGuideDailyTask, data.id);
                    var hasShow = data.hasShow;

                    if (!isComplete) {
                        return false;
                    }
                    if (hasShow) {
                        return false;
                    }
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }

            return true;
        } else {
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = this.dailyShowTask[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var _data = _step7.value;

                    // var isComplete = PlayerData.instance.getDailyTaskProcess(data.type) >= data.param;
                    var isComplete = _data.process >= _data.param;
                    var isGet = Tools.arrContains(PlayerData.instance.dailyOldTask, _data.id) || Tools.arrContains(PlayerData.instance.completeGuideDailyTask, _data.id);
                    var hasShow = _data.hasShow;
                    if (isComplete && !isGet && !hasShow) {
                        return true;
                    }
                }
            } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
                        _iterator7.return();
                    }
                } finally {
                    if (_didIteratorError7) {
                        throw _iteratorError7;
                    }
                }
            }

            return false;
        }
    },

    needUpdatePKRank: function needUpdatePKRank() {
        // if (this.refreshWorldRankAtOnce) {
        //     this.refreshWorldRankAtOnce = false;
        //     if (GameData.instance.isShowLog()) {
        //         console.log('---------------------------强制刷新小组榜')
        //     }
        //     return true;
        // }

        if (GameData.instance.isShowLog()) {
            console.log('---------------------------小组PK榜刷新间隔：' + ConfigData.instance.holidayDatas.holidayPKRankInterval);
            console.log('---------------------------距离上次刷新小组PK榜的时间：' + this.updatePKRankTime);
        }
        if (this.updatePKRankTime > ConfigData.instance.holidayDatas.holidayPKRankInterval) {
            this.updatePKRankTime = 0;
            return true;
        } else {
            return false;
        }
    },

    getHolidayPKRank: function getHolidayPKRank(callback) {
        var _this3 = this;

        console.log('---------------------------------------------------------------------------------');
        var hasData = this.holidayPKRankData && this.holidayPKRankData.rankInfo && this.holidayPKRankData.rankInfo.length && this.myPKRankData;
        if (hasData && !this.needUpdatePKRank()) {
            if (GameData.instance.isShowLog()) {
                console.log('---------------------------使用本地小组PK榜');
            }
            callback(this.holidayPKRankData, this.myPKRankData);
        } else {
            if (GameData.instance.isShowLog()) {
                if (!hasData) {
                    console.log('---------------------------本地小组PK榜为空');
                } else {
                    console.log('---------------------------需要刷新小组PK榜');
                }
                console.log('---------------------------拉取小组PK榜');
            }
            PlatformMgr.getHolidayPKRank(function (data) {
                _this3.myPKRankData = _this3.handleHolidayRankData(data);
                _this3.holidayPKRankData = data;
                _this3.pkSurplusTime = data.surplusTime;
                if (GameData.instance.isShowLog()) {
                    console.log('---------------------------我的小组PK信息');
                    console.log(JSON.stringify(_this3.myPKRankData));
                }
                callback(data, _this3.myPKRankData);
            });
        }
    },

    needUpdateWorldRank: function needUpdateWorldRank() {
        // if (this.refreshWorldRankAtOnce) {
        //     this.refreshWorldRankAtOnce = false;
        //     return true;
        // }
        if (this.checkHourSpan()) {
            this.updateSaveTime();
            return true;
        }
    },

    getHolidayWorldRank: function getHolidayWorldRank(round, callback) {
        var _this4 = this;

        console.log('---------------------------------------------------------------------------------');
        var isHourSpanRefresh = this.needUpdateWorldRank(); //检查是否跨整点
        var hasData = this.holidayWorldRankData[round] && this.myWorldRankData;
        if (hasData && !isHourSpanRefresh) {
            if (GameData.instance.isShowLog()) {
                console.log('---------------------------使用本地世界PK榜：' + round + '轮');
            }
            callback(this.holidayWorldRankData[round], this.myWorldRankData, isHourSpanRefresh);
        } else {
            if (GameData.instance.isShowLog()) {
                if (!hasData) {
                    console.log('---------------------------本地世界PK榜：' + round + '轮为空');
                }
                if (isHourSpanRefresh) {
                    console.log('---------------------------跨小时需要刷新世界PK榜');
                }
                console.log('---------------------------拉取世界PK榜：' + round + '轮');
            }

            PlatformMgr.getHolidayWorldRank(round, function (data) {
                var mineData = _this4.handleHolidayRankData(data);
                if (round === 0) {
                    if (!mineData) {
                        if (_this4.myPKRankData) {
                            mineData = {};
                            for (var key in _this4.myPKRankData) {
                                mineData[key] = _this4.myPKRankData[key];
                            }
                            mineData.rank = -1;
                            mineData.isLocal = true;
                        }
                        _this4.myWorldRankData = mineData;
                    } else {
                        _this4.myWorldRankData = Tools.copyObj(mineData);
                    }
                    _this4.maxWorldRound = data.round;
                    _this4.worldSurplusTime = data.surplusTime;
                }
                _this4.holidayWorldRankData[round] = data;
                callback(data, _this4.myWorldRankData, isHourSpanRefresh);
            });
        }
    },

    handleHolidayRankData: function handleHolidayRankData(data) {
        var mine = null;
        var rankInfo = data.rankInfo;
        rankInfo.sort(function (a, b) {
            return b.score - a.score;
        });
        for (var i = 0, l = rankInfo.length; i < l; i++) {
            rankInfo[i].rank = i + 1;
            if (rankInfo[i].id == PlatformMgr.uid) {
                mine = rankInfo[i];
                mine.isLocal = true;
            }
        }
        return mine;
    },

    setHolidayScore: function setHolidayScore(num) {
        if (GameData.instance.isShowLog()) {
            console.log('---------------------------新增排行榜分数：' + num);
        }
        PlatformMgr.setHolidayScore(num);
        if (this.myPKRankData) {
            this.myPKRankData.score += num;
            this.myOldPKRankData = Tools.copyObj(this.myPKRankData);
        }
        if (this.myWorldRankData) {
            this.myWorldRankData.score += num;
            this.myOldWorldRankData = Tools.copyObj(this.myWorldRankData);
        }
        if (this.holidayPKRankData) this.handleHolidayRankData(this.holidayPKRankData);
    },

    updateReceiveRound: function updateReceiveRound(round, isPK) {
        var key = (isPK ? 'pk-' : 'world-') + round;
        this.receiveRound.push(key);
        this.saveUserData('更新轮次奖励领取');
    },

    hasReceivePKRound: function hasReceivePKRound(round) {
        return Tools.arrContains(this.receiveRound, 'pk-' + round);
    },

    hasReceiveWorldRound: function hasReceiveWorldRound(round) {
        return Tools.arrContains(this.receiveRound, 'world-' + round);
    },

    updateSaveTime: function updateSaveTime() {
        this.saveTime = this.getCurTime();
        this.saveUserData('跨小时');
    },

    clearHolidayData: function clearHolidayData() {
        if (GameData.instance.isShowLog()) {
            console.log('---------------------------清空排行数据，强制刷新');
        }

        this.holidayPKRankData = null;
        this.holidayWorldRankData = [];
        this.myPKRankData = null;
        this.myWorldRankData = null;
        this.myOldPKRankData = null;
        this.myOldWorldRankData = null;
    },

    updateWorldRewardDetail: function updateWorldRewardDetail() {
        var _this5 = this;

        PlatformMgr.getHolidayWorldRewardInfo(function (data) {
            _this5.playerWorldRewardDetail = data;
        });
    },

    updateSubscribeTime: function updateSubscribeTime() {
        //之后修改为通过接口获取订阅时间戳
        this.subscribeTime = this.getCurTime() + 86400000 * 3;
        this.saveUserData('更新订阅时间');
    },


    updateDaySubscribeReward: function updateDaySubscribeReward() {
        this.daySubscribeReward = true;
        this.saveUserData('更新每日订阅奖励发放');
    },

    /**
     * 是否订阅，调用此接口判断是否启用特殊功能
     */
    isSubscribe: function isSubscribe() {
        // return true;
        return this.subscribeTime > this.getCurTime();
    },

    getCountry: function getCountry() {
        this.country = PlatformMgr.getCountry();
        this.languageCode = PlatformMgr.getLanguageCode();
    },

    canShowPanelBuySkin: function canShowPanelBuySkin() {

        // return false;
        if (!this.hasPlayOnceGame) {
            // console.log('！！！！！！！！！！！！还没打过一局，不弹出购买皮肤面板')
            return false;
        } else {
            this.hasPlayOnceGame = false;
        }

        if (!this.showPanelBuySkinFlag) {
            // console.log('！！！！！！！！！！！！本次获得了其他皮肤，不弹出购买皮肤面板')
            return false;
        }

        if (this.playCount < 4) {
            // console.log('！！！！！！！！！！！！场次未满四局，不弹出购买皮肤面板,当前局数：' + this.playCount)
            return false;
        }
        //获取我当前的金币可购买的，尚未拥有的皮肤,有多个取最便宜的那个
        var knifeSkinDatas = ConfigData.instance.knifeSkinDatas;
        var heroSkinDatas = ConfigData.instance.heroSkinDatas;

        this.finalGetSkin = null;
        var knifeSkin, heroSkin;

        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
            for (var _iterator8 = knifeSkinDatas[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                var data = _step8.value;

                if (data.getWay === 0 && data.priceType === 0) {
                    if (data.price <= this.gold && !this.isOwnKnifeSkin(data.id) && !this.isRefuseBuyTwice(data.id + 1000)) {
                        knifeSkin = data;
                        break;
                    }
                }
            }
        } catch (err) {
            _didIteratorError8 = true;
            _iteratorError8 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion8 && _iterator8.return) {
                    _iterator8.return();
                }
            } finally {
                if (_didIteratorError8) {
                    throw _iteratorError8;
                }
            }
        }

        var _iteratorNormalCompletion9 = true;
        var _didIteratorError9 = false;
        var _iteratorError9 = undefined;

        try {
            for (var _iterator9 = heroSkinDatas[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                var _data2 = _step9.value;

                if (_data2.getWay === 0 && _data2.priceType === 0) {
                    if (_data2.price <= this.gold && !this.isOwnHeroSkin(_data2.id) && !this.isRefuseBuyTwice(_data2.id + 2000)) {
                        heroSkin = _data2;
                        break;
                    }
                }
            }

            // if(!(knifeSkin||heroSkin)){
            //     //如果发现没有可以
            // }
        } catch (err) {
            _didIteratorError9 = true;
            _iteratorError9 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion9 && _iterator9.return) {
                    _iterator9.return();
                }
            } finally {
                if (_didIteratorError9) {
                    throw _iteratorError9;
                }
            }
        }

        if (!knifeSkin) {
            this.finalGetSkin = heroSkin;
        } else if (!heroSkin) {
            this.finalGetSkin = knifeSkin;
        } else {
            this.finalGetSkin = knifeSkin.price <= heroSkin.price ? knifeSkin : heroSkin;
        }

        if (this.finalGetSkin) {
            // console.log('！！！！！！！！！！！！可弹出金币获取皮肤面板')
            this.finalGetSkin.isGetByAdver = false;
            this.continuityCanNotBuyCount = 0;
            return true;
        } else {
            this.updateContinuityCanNotBuyCount();
        }

        //此次没有可购买，判断连续是否超过三次
        if (this.playCount < 10) {
            // console.log('！！！！！！！！！！！！未满10局，不可弹出广告获取皮肤面板，当前局数：' + this.playCount)
            return false;
        }

        if (this.continuityCanNotBuyCount < 3) {
            // console.log('！！！！！！！！！！！！未连续三局没有达到购买条件，不可弹出广告获取皮肤面板,当前连续局数：' + this.continuityCanNotBuyCount)
            return false;
        } else {
            this.continuityCanNotBuyCount = 0;
        }

        var _iteratorNormalCompletion10 = true;
        var _didIteratorError10 = false;
        var _iteratorError10 = undefined;

        try {
            for (var _iterator10 = knifeSkinDatas[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                var _data3 = _step10.value;

                if (_data3.getWay === 0 && _data3.priceType === 0) {
                    if (_data3.price >= this.gold && !this.isOwnKnifeSkin(_data3.id) && !this.isRefuseAdverTwice(_data3.id + 1000)) {
                        knifeSkin = _data3;
                        break;
                    }
                }
            }
        } catch (err) {
            _didIteratorError10 = true;
            _iteratorError10 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion10 && _iterator10.return) {
                    _iterator10.return();
                }
            } finally {
                if (_didIteratorError10) {
                    throw _iteratorError10;
                }
            }
        }

        var _iteratorNormalCompletion11 = true;
        var _didIteratorError11 = false;
        var _iteratorError11 = undefined;

        try {
            for (var _iterator11 = heroSkinDatas[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                var _data4 = _step11.value;

                if (_data4.getWay === 0 && _data4.priceType === 0) {
                    if (_data4.price >= this.gold && !this.isOwnHeroSkin(_data4.id) && !this.isRefuseAdverTwice(_data4.id + 2000)) {
                        heroSkin = _data4;
                        break;
                    }
                }
            }
        } catch (err) {
            _didIteratorError11 = true;
            _iteratorError11 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion11 && _iterator11.return) {
                    _iterator11.return();
                }
            } finally {
                if (_didIteratorError11) {
                    throw _iteratorError11;
                }
            }
        }

        if (!knifeSkin) {
            this.finalGetSkin = heroSkin;
        } else if (!heroSkin) {
            this.finalGetSkin = knifeSkin;
        } else {
            this.finalGetSkin = knifeSkin.price <= heroSkin.price ? knifeSkin : heroSkin;
        }

        if (this.finalGetSkin) {
            // console.log('！！！！！！！！！！！！可弹出广告获取皮肤面板')
            this.finalGetSkin.isGetByAdver = true;
            return true;
        }

        // console.log('！！！！！！！！！！！！没有可获取的皮肤')
        return false;
    },

    isRefuseBuyTwice: function isRefuseBuyTwice(id) {
        return this.refuseBuyPool && this.refuseBuyPool[id] && this.refuseBuyPool[id] >= 2;
    },

    updateRefuseBuyPool: function updateRefuseBuyPool(id) {
        this.refuseBuyPool[id] = this.refuseBuyPool[id] ? this.refuseBuyPool[id] + 1 : 1;
        this.saveUserData('更新拒绝购买皮肤次数');
    },

    isRefuseAdverTwice: function isRefuseAdverTwice(id) {
        return this.refuseAdverPool && this.refuseAdverPool[id] && this.refuseAdverPool[id] >= 2;
    },

    updateRefuseAdverPool: function updateRefuseAdverPool(id) {
        this.refuseAdverPool[id] = this.refuseAdverPool[id] ? this.refuseAdverPool[id] + 1 : 1;
        this.saveUserData('更新拒绝购买皮肤次数');
    },

    updateContinuityCanNotBuyCount: function updateContinuityCanNotBuyCount() {
        this.continuityCanNotBuyCount++;
        this.saveUserData('更新没有达到购买皮肤条件的次数');
    },

    getOwnKnifeSkinCount: function getOwnKnifeSkinCount() {
        return this.ownKnifeSkins.length;
    },
    getOwnHeroSkinCount: function getOwnHeroSkinCount() {
        return this.ownHeroSkins.length;
    },


    canBuyItem: function canBuyItem(data) {
        if (!data) return false;
        if (data.getWay === 0) {
            if (data.priceType === 0) {
                return data.price <= this.gold;
            } else {
                return data.price <= this.zongZi;
            }
        }
    },

    updateKeyCount: function updateKeyCount() {
        this.keyCount++;
        if (this.keyCount > 3) {
            this.keyCount = 3;
        }
        this.keyDirty = true;
        this.hasGetKey = true;
        this.showKeyCount = 0;
        this.saveUserData('更新key数');
    },

    clearKeyCount: function clearKeyCount() {
        this.keyCount = 0;
        this.saveUserData('清空key数');
    },

    updateTreasureTurn: function updateTreasureTurn() {
        this.treasureTurn++;
        this.saveUserData('更新宝箱轮数');
    },

    updateShowKeyCount: function updateShowKeyCount() {
        this.showKeyCount++;
        this.saveUserData('更新展示钥匙数');
    },

    canShowPanelTreasureBox: function canShowPanelTreasureBox() {
        if (this.keyCount >= 3) {
            this.clearKeyCount();
            return true;
        }
    },

    canShowKeyInAI: function canShowKeyInAI() {
        if (this.playCount >= 0 && this.showKeyCount >= 2) {
            return true;
        }
    },

    canShowPanelEvaulate: function canShowPanelEvaulate() {
        if (this.evaulateCount !== -1) {
            return this.evaulateCount === 3 || this.evaulateCount === 6;
        }
    },

    endEvaulateCount: function endEvaulateCount() {
        this.evaulateCount = -1;
        this.saveUserData('结束评价');
    },

    updateEvaulateCount: function updateEvaulateCount() {
        if (this.evaulateCount !== -1) {
            this.evaulateCount++;
        }
        this.saveUserData('更新评价次数');
    },

    updateVipWithoutInterstitial: function updateVipWithoutInterstitial() {
        this.vipWithoutInterstitial++;
        this.saveUserData('更新vip用户屏蔽插屏');
    },

    getVipWithoutInterstitial: function getVipWithoutInterstitial() {
        return this.vipWithoutInterstitial;
    },

    getLastFreeDiamondTime: function getLastFreeDiamondTime() {
        return this.lastFreeDiamondTime;
    },

    updateLastFreeDiamondTime: function updateLastFreeDiamondTime() {
        this.lastFreeDiamondTime = this.getCurTime();
        this.saveUserData('更新免费钻石领取时间');
    },

    getCanGetFreeDiamond: function getCanGetFreeDiamond() {
        return this.getCurTime() - this.lastFreeDiamondTime >= 24 * 60 * 60 * 1000;
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=PlayerData.js.map
        