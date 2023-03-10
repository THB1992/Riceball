(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/entity/EntityWorld.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6eb3bnR4tBC2r2csWji7rUV', 'EntityWorld', __filename);
// scripts/battle/entity/EntityWorld.js

'use strict';

/**
 * @fileoverview 世界实体
 * @author meifan@gameley.cn (梅凡)
 */

var Tools = require('Tools');
var GameData = require('GameData');
var ConfigData = require('ConfigData');
var PlayerData = require('PlayerData');
var CollisionEventManager = require('CollisionEventManager');
var KnifeState = require('Types').KnifeState;
var NoticeType = require('Types').NoticeType;
var SoundID = require('Types').SoundID;
var AudioEngine = require('AudioEngine');
var PlatformMgr = require('PlatformMgr');
var TaskType = require('Types').TaskType;
var ItemType = require('Types').ItemType;
var AdvertMgr = require('AdvertMgr');
var AddEntitySystem = require('AddEntitySystem');
var StageType = require('Types').StageType;
var CustomFunnelEvent = require('Types').CustomFunnelEvent;

cc.Class({
    extends: cc.Component,

    properties: {
        followCameraCtrl: cc.Node,
        mapWidth: 0,
        mapHeight: 0,
        localPlayer: null,
        players: [],
        knifes: [],
        walls: [],
        addEntityNode: cc.Node,
        UIMgrNode: cc.Node,
        audioNode: cc.Node,
        poolMgr: cc.Node,
        tempNode: cc.Node,
        addBuffTime: 0,
        addBuffTimeLimit: 0,
        addBoxTime: 0,
        addBoxTimeLimit: 0,

        guideWall: cc.Node,

        isDoHeartbeat: true,
        _heartbeatSendTimestamp: 0,
        heartbeatInterval: 30000,

        m_alreadyStart: false
    },

    onLoad: function onLoad() {
        var _this = this;

        AdvertMgr.instance.destoryBanner();

        this.isLoading = true;
        this.showGuideFlag = true;
        PlayerData.instance.checkDaySpan();
        PlayerData.instance.initConfigData();
        this.isGuide = PlayerData.instance.isGuide;
        this.m_alreadyStart = false;

        PlatformMgr.hawkeye_getConfig(function (settings) {
            // if (GameData.instance.isShowLog()) {
            // console.log('settings:' + JSON.stringify(settings));
            // }
            // TODO 分享使用下发的图片和文字
            var shareSettings = settings ? settings : {};

            GameData.instance.isInReview = PlatformMgr.isIosApp() ? Number.parseInt(shareSettings.reviewVersion) === GameData.instance.clientVersionCode : Number.parseInt(shareSettings.reviewVersionAndroid) === GameData.instance.clientVersionCode;

            if (shareSettings.revive_Ways !== undefined) {
                ConfigData.instance.clientData.reviveWays = Tools.jsonToArray(shareSettings.revive_Ways);
            }
            if (shareSettings.multipGold_Ways !== undefined) {
                ConfigData.instance.clientData.multipGoldWays = Tools.jsonToArray(shareSettings.multipGold_Ways);
            }
            if (shareSettings.protectStar_Ways !== undefined) {
                ConfigData.instance.clientData.protectStarWays = Tools.jsonToArray(shareSettings.protectStar_Ways);
            }
            if (shareSettings.growLevelUp_Ways !== undefined) {
                var arr = Tools.jsonToArray(shareSettings.growLevelUp_Ways);
                for (var i = 0; i < arr.length; i++) {
                    var data = arr[i];
                    ConfigData.instance.clientData.growLevelUpWays[i] = Tools.splitToNumList(data, '-');
                }
                // ConfigData.instance.clientData.growLevelUpWays = shareSettings.growLevelUp_Ways;
            }

            if (shareSettings.adverTrySkinLimit !== undefined) {
                ConfigData.instance.clientData.adverTrySkinLimit = Tools.jsonToArray(shareSettings.adverTrySkinLimit);
            }
            if (shareSettings.adverReviveLimit !== undefined) {
                ConfigData.instance.clientData.adverReviveLimit = Tools.jsonToArray(shareSettings.adverReviveLimit);
            }

            if (shareSettings.stopAdverToShare !== undefined) {
                ConfigData.instance.clientData.stopAdverToShare = Number.parseInt(shareSettings.stopAdverToShare);
            }

            if (shareSettings.multipGoldLimit !== undefined) {
                ConfigData.instance.clientData.multipGoldLimit = Tools.jsonToArray(shareSettings.multipGoldLimit);
            }
            if (shareSettings.frenzyLimit !== undefined) {
                ConfigData.instance.clientData.frenzyLimit = Number.parseInt(shareSettings.frenzyLimit);
            }
            if (shareSettings.stagePrecents !== undefined) {
                ConfigData.instance.clientData.stagePrecents = Tools.jsonToArray(shareSettings.stagePrecents);
            }

            if (shareSettings.dayShowWayLimit !== undefined) {
                ConfigData.instance.clientData.dayShowWayLimit = Tools.jsonToArray(shareSettings.dayShowWayLimit);
            }
            if (shareSettings.share_random !== undefined) {
                shareSettings.share_random = Tools.jsonToArray(shareSettings.share_random);
            }
            if (shareSettings.share_data !== undefined) {
                shareSettings.share_data = Tools.jsonToArray(shareSettings.share_data);
            }

            if (shareSettings.dayMultAgainCDCount !== undefined) {
                ConfigData.instance.clientData.dayMultAgainCDCount = Number.parseInt(shareSettings.dayMultAgainCDCount);
                if (PlayerData.instance.updateDayMultAgainCDCountFlag) {
                    PlayerData.instance.updateDayMultAgainCDCountFlag = false;
                    PlayerData.instance.resetDayMultAgainCDCount(ConfigData.instance.clientData.dayMultAgainCDCount);
                }
            }
            if (shareSettings.dayMultAgainMinPlayCount !== undefined) {
                ConfigData.instance.clientData.dayMultAgainMinPlayCount = Number.parseInt(shareSettings.dayMultAgainMinPlayCount);
            }

            if (shareSettings.adverReviveFailToShare !== undefined) {
                ConfigData.instance.clientData.adverReviveFailToShare = Number.parseInt(shareSettings.adverReviveFailToShare);
            }

            if (shareSettings.hideTrySkin !== undefined) {
                ConfigData.instance.clientData.hideTrySkin = Number.parseInt(shareSettings.hideTrySkin);
            }

            if (shareSettings.hideAddTop !== undefined) {
                ConfigData.instance.clientData.hideAddTop = Number.parseInt(shareSettings.hideAddTop);
            }

            var tempHideSpecialSkin = true;
            if (shareSettings.hideSpecialSkin !== undefined) {
                tempHideSpecialSkin = Number.parseInt(shareSettings.hideSpecialSkin);
            }

            if (shareSettings.judgeArea !== undefined) {
                ConfigData.instance.clientData.judgeArea = Number.parseInt(shareSettings.judgeArea);
            }
            if (shareSettings.judgeAreaTimeInterval !== undefined) {
                ConfigData.instance.clientData.judgeAreaTimeInterval = shareSettings.judgeAreaTimeInterval;
            }
            var timeRange = Tools.splitToNumList(ConfigData.instance.clientData.judgeAreaTimeInterval);
            var curDay = PlayerData.instance.getCurWeekDay();
            if (GameData.instance.isShowLog()) {
                console.log('————————地域判断时间段配置：', JSON.stringify(timeRange));
                console.log('————————当前周几：', curDay);
            }

            if (ConfigData.instance.clientData.judgeArea && GameData.instance.isEnvironmentPublish() && Tools.arrContains(timeRange, curDay) && !tempHideSpecialSkin) {
                PlatformMgr.getAreaInfo(function (data) {
                    if (data.city) {
                        switch (data.city) {
                            case '北京市':
                            case '上海市':
                            case '广州市':
                            case '深圳市':
                                tempHideSpecialSkin = true;
                                break;
                        }
                    } else if (data.province) {
                        switch (data.province) {
                            case '北京市':
                            case '上海市':
                            case '广东省':
                                tempHideSpecialSkin = true;
                                break;
                        }
                    }
                    ConfigData.instance.clientData.hideSpecialSkin = tempHideSpecialSkin;
                });
            } else {
                ConfigData.instance.clientData.hideSpecialSkin = tempHideSpecialSkin;
            }

            //分享积分相关
            if (shareSettings.shareScoreConfig !== undefined) {
                var arr = Tools.splitToNumList(shareSettings.shareScoreConfig);
                if (GameData.instance.isShowLog()) {
                    console.log('————————分享积分配置：', JSON.stringify(arr));
                }
                ConfigData.instance.clientData.defaultShareScore = arr[0];
                ConfigData.instance.clientData.secondDayMinShareScore = arr[1];
                ConfigData.instance.clientData.maxShareScore = arr[2];
            }

            if (!PlayerData.instance.dayRefreshShareScore) {
                PlatformMgr.getShareScore(function (shareScore) {
                    var defaultShareScore = ConfigData.instance.clientData.defaultShareScore;
                    var secondDayMinShareScore = ConfigData.instance.clientData.secondDayMinShareScore;
                    var maxShareScore = ConfigData.instance.clientData.maxShareScore;

                    if (PlayerData.instance.isFirstDay()) {
                        shareScore = defaultShareScore;
                        if (GameData.instance.isShowLog()) {
                            console.log('————————新玩家，初始分享积分：', shareScore);
                        }
                    } else {
                        if (shareScore < secondDayMinShareScore && PlayerData.instance.isSecondDay()) {
                            shareScore = secondDayMinShareScore;
                            if (GameData.instance.isShowLog()) {
                                console.log('————————新玩家第二天，启用保底分享积分：', shareScore);
                            }
                        } else {
                            shareScore = Math.min(shareScore, maxShareScore);
                            if (GameData.instance.isShowLog()) {
                                console.log('————————使用上一天分享积分：', shareScore);
                            }
                        }
                    }
                    PlayerData.instance.updateDayRefreshShareScore(shareScore);
                });
            }
        });

        this.mapWidth = GameData.instance.mapWidth;
        this.mapHeight = GameData.instance.mapHeight;
        this.initMapParam();

        this.gameTime = GameData.instance.gameTime;

        this.width = GameData.instance.screenWidth;
        this.height = GameData.instance.screenHeight;
        this.worldRect = new cc.rect(-this.width / 2, -this.height / 2, this.width, this.height);

        var _poolMgr = this.poolMgr.getComponent('PoolMgr');
        _poolMgr.cleanUp();
        _poolMgr.init();

        this.addEntitySys = Tools.getOrAddComponent(this.addEntityNode, 'AddEntitySystem');
        this.addEntitySys.cleanUp();
        this.addEntitySys.init(this.mapWidth, this.mapHeight, _poolMgr, this.mapType);

        AddEntitySystem.init(this.addEntitySys);

        this.cleanUp();

        this.uiMgr = Tools.getOrAddComponent(this.UIMgrNode, 'UIMgr');
        this.uiMgr.init(this);
        this.uiMgr.cleanUp();
        AdvertMgr.instance.setUiMgr(this.uiMgr);
        PlatformMgr.getInviteInfo(function (datas) {
            PlayerData.instance.inviteDatas = datas;
            _this.uiMgr.refreshRedDot();
        });

        this.taskMgr = Tools.getOrAddComponent(this.node, 'TaskMgr');
        this.taskMgr.init(this);

        var audio = Tools.getOrAddComponent(this.audioNode, 'AudioEngine');
        audio.init();

        var map = this.addEntitySys.addMap(this.mapType, this.mapWidth, this.mapHeight);

        this.localPlayer = this.addEntitySys.AddLocalPlayer();
        this.players[0] = this.localPlayer;
        this.uiMgr.addPlayerRankItem(this.localPlayer);
        this.localPlayer.setKillCallback(function () {
            PlayerData.instance.killCount++;
            _this.taskMgr.refreshTaskInGame();
        });
        this.localPlayer.setChangeKnifeCountCallback(function (num) {
            _this.addLocalPlayerKnifes(num);
        });
        this.curEquipHeroSkin = null;
        this.curEquipKnifeSkin = null;

        this.cameraZoomCtrl = this.followCameraCtrl.getComponent('CameraZoomCtrl');
        this.cameraZoomCtrl.cleanUp();
        var followCameraCtrlCmp = this.followCameraCtrl.getComponent('FollowCameraCtrl');
        followCameraCtrlCmp.cleanUp();

        CollisionEventManager.getInstance().init();
        this.heroCollisionHandleSystem = Tools.getOrAddComponent(this.node, 'HeroCollisionHandleSystem');
        this.knifeCollisionHandleSystem = Tools.getOrAddComponent(this.node, 'KnifeCollisionHandleSystem');
        this.pickKnifeCollisionHandleSystem = Tools.getOrAddComponent(this.node, 'PickKnifeCollisionHandleSystem');
        this.pickBuffCollisionHandleSystem = Tools.getOrAddComponent(this.node, 'PickBuffCollisionHandleSystem');
        this.attackBoxCollisionHandleSystem = Tools.getOrAddComponent(this.node, 'AttackBoxCollisionHandleSystem');

        this.killMsgListener = Tools.getOrAddComponent(this.node, 'KillMsgListener');
        this.killMsgListener.cleanUp();

        var cameraZoomSys = Tools.getOrAddComponent(this.node, 'CameraZoomSystem');
        cameraZoomSys.init(this.localPlayer, this.cameraZoomCtrl);

        this.playerRankSystem = Tools.getOrAddComponent(this.node, 'PlayerRankSystem');
        this.playerRankSystem.cleanUp();
        this.gameRuleSystem = Tools.getOrAddComponent(this.node, 'GameRuleSystem');
        this.gameRuleSystem.cleanUp();
        this.heroReviveSystem = Tools.getOrAddComponent(this.node, 'HeroReviveSystem');
        this.heroReviveSystem.cleanUp();

        this.playerDistanceSystem = Tools.getOrAddComponent(this.node, 'PlayerDistanceSystem');
        this.playerDistanceSystem.cleanUp();
        this.wallRuleSystem = Tools.getOrAddComponent(this.node, 'WallRuleSystem');

        this.node.on('throwKnife', this.throwKnife, this);
        this.node.on('dodgeKnife', this.dodgeKnife, this);
        this.node.on('destroyDefenceKnife', this.destroyDefenceKnife, this);
        this.node.on('onBoxDestroy', this.onBoxDestroy, this);
        this.node.on('onNeZhaAttack', this.onNeZhaAttack, this);

        this.checkEnemyTime = 0;
        this.checkKnifeTime = 0;
        this.checkBlockTime = 0;
        this.checkDefenceTime = 0;
        this.addKnifeTime = 0;

        GameData.instance.logUseTime('entityWorld.onload');
        if (PlayerData.instance.isFristGame()) {
            PlatformMgr.notifyFunnelEvent(CustomFunnelEvent.World_Init);
        }

        if (this.isGuide) {
            this.guideLoad();
        } else {
            this.normalLoad();
        }
        this.startLoadPrefab();
        if (PlayerData.instance.isFristGame()) {
            this.onStartBtnClick(null, null);
        } else {
            this.refreshPanel();
        }

        // this.uiMgr.showPanelWorldReward({
        //     rank: 3,
        //     round: 1,
        //     joinTime: '5asss试试s0是03',
        // });
    },


    cleanUp: function cleanUp() {
        this.players = [];
        this.knifes = [];
        this.removeKnifes = [];
        this.walls = [];
    },

    guideLoad: function guideLoad() {
        // this.mapWidth = 720;
        // this.mapHeight = 1280;
        // 创建ai玩家
        var remotePlayers = this.addEntitySys.AddRemotePlayer(3, 1, 1, 1);
        var index = 1;
        var player = null;
        var knife = null;
        var knifeMax = 100;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = remotePlayers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                player = _step.value;

                this.players[index] = player;
                // this.uiMgr.addPlayerRankItem(player);
                // this.uiMgr.addHeroPosArr(this.localPlayer, player, this.cameraZoomCtrl.camera);
                player.node.active = false;
                player.followPlayer.node.active = false;

                index++;
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

        index = 0;
        // 创建本地玩家的刀
        var count = PlayerData.instance.knifeSkin.initKnifeCount;
        this.localPlayerKnifes = this.addEntitySys.AddKnife(count, true);
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = this.localPlayerKnifes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                knife = _step2.value;

                this.knifes[index] = knife;
                var knifeInit = Tools.getOrAddComponent(knife.node, 'KnifeInit');
                knifeInit.init(this.localPlayer);
                index++;
                knifeMax--;
            }

            // 给ai加上默认刀
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

        var aiPlayerKnifes = null;
        var count = 2;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = remotePlayers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                player = _step3.value;

                aiPlayerKnifes = this.addEntitySys.AddKnife(count, true);
                count = 20;
                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = aiPlayerKnifes[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        knife = _step5.value;

                        this.knifes[index] = knife;
                        var knifeInit = Tools.getOrAddComponent(knife.node, 'KnifeInit');
                        knifeInit.init(player);
                        index++;
                        knifeMax--;
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
            }

            //创建场景里的刀
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

        this.closeKnifes = [];
        this.landKnifes = this.addEntitySys.AddKnife(10, true);
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = this.landKnifes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                knife = _step4.value;

                this.knifes[index] = knife;
                knife.node.active = false;
                index++;
                knifeMax--;
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

        this.guideSystem = Tools.getOrAddComponent(this.node, 'GuideSystem');
        this.guideSystem.init(this);
        this.isLoading = false;
    },

    normalLoad: function normalLoad() {
        var _this2 = this;

        GameData.instance.logUseTime('start world load');
        var rankData = PlayerData.instance.rankData;

        if (GameData.instance.isShowLog()) {
            console.log('level:' + rankData.name + ' playerCount: ' + rankData.playerCount);
        }

        // 创建ai玩家
        var remotePlayers = this.addEntitySys.AddRemotePlayer(rankData.playerCount - 1, rankData.aiSkinMax, rankData.aiHeroSkinRandomCount, rankData.aiHeroSkinMax);
        var index = 1;
        var player = null;
        var knife = null;
        var knifeMax = 60;
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
            for (var _iterator6 = remotePlayers[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                player = _step6.value;

                this.players[index] = player;
                this.uiMgr.addPlayerRankItem(player);
                this.uiMgr.addHeroPosArr(this.localPlayer, player, this.cameraZoomCtrl.camera);
                player.setDeadCallback(function (pos) {
                    _this2.addDeadKnifes(pos);
                });
                index++;
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

        index = 0;
        // 创建本地玩家的刀
        var count = PlayerData.instance.knifeSkin.initKnifeCount + PlayerData.instance.extraKnifeCount;
        this.localPlayerKnifes = this.addEntitySys.AddKnife(count);
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
            for (var _iterator7 = this.localPlayerKnifes[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                knife = _step7.value;

                this.knifes[index] = knife;
                var knifeInit = Tools.getOrAddComponent(knife.node, 'KnifeInit');
                knifeInit.init(this.localPlayer);
                index++;
                knifeMax--;
            }

            // 给ai加上默认刀
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

        var aiPlayerKnifes = null;
        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
            for (var _iterator8 = remotePlayers[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                player = _step8.value;

                var count = player.skin.initKnifeCount;
                aiPlayerKnifes = this.addEntitySys.AddKnife(count);
                var _iteratorNormalCompletion10 = true;
                var _didIteratorError10 = false;
                var _iteratorError10 = undefined;

                try {
                    for (var _iterator10 = aiPlayerKnifes[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                        knife = _step10.value;

                        this.knifes[index] = knife;
                        var knifeInit = Tools.getOrAddComponent(knife.node, 'KnifeInit');
                        knifeInit.init(player);
                        index++;
                        knifeMax--;
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
            }

            //创建场景里的刀
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

        this.closeKnifes = [];
        this.landKnifes = this.addEntitySys.AddKnife(knifeMax);
        var _iteratorNormalCompletion9 = true;
        var _didIteratorError9 = false;
        var _iteratorError9 = undefined;

        try {
            for (var _iterator9 = this.landKnifes[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                knife = _step9.value;

                this.knifes[index] = knife;
                knife.node.active = false;
                index++;
                knifeMax--;
            }

            // //创建场景里的buff
            // this.buffs = this.addEntitySys.AddBuff(20);
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

        this.walls = this.addEntitySys.AddWall(this.mapType);

        this.blocks = this.addEntitySys.AddBlock(rankData.blockNum);

        //初始化buff创建条件
        this.initAddBuffParam();
        this.initAddBoxParam();

        GameData.instance.logUseTime('end world load');
        if (PlayerData.instance.isFristGame()) {
            PlatformMgr.notifyFunnelEvent(CustomFunnelEvent.World_Finish);
        }
        PlatformMgr.reportAnalytics();
        this.isLoading = false;
        if (this.touchStartGame) this.onStartBtnClick(null, null);
    },

    refreshPanel: function refreshPanel() {
        var _this3 = this;

        var self = this;
        var oldRankData = PlayerData.instance.oldRankData;
        var rankData = PlayerData.instance.rankData;
        var daySign = PlayerData.instance.daySign;

        var showPanelSignFlag = PlayerData.instance.showPanelSignFlag;
        var levelUp = oldRankData && rankData && oldRankData.id < rankData.id;

        var offlineFlag = PlayerData.instance.offlineFlag;
        var offlineGoldTime = PlayerData.instance.getReceiveOfflineGoldTime();
        var offlineGoldMultipLimit = ConfigData.instance.clientData.offlineGoldMultipLimit * 1000;
        var goldStage = ConfigData.instance.getCurStage(PlayerData.instance.playCount, ConfigData.instance.clientData.multipGoldLimit);

        var hideAddTop = ConfigData.instance.clientData.hideAddTop;

        // ConfigData.instance.getReceiveWay
        var hasRepay = PlayerData.instance.hasRepay;
        var repayData = null;
        if (!hasRepay) {
            repayData = ConfigData.instance.getRepayDataByRank(PlayerData.instance.rankData.id);

            if (!repayData.reward) {
                PlayerData.instance.updateRepay();
            }
        }

        var doLevelUp = function doLevelUp(callback) {
            self.uiMgr.showPanelLevelUp(callback);
            PlayerData.instance.oldRankData = null;
        };

        var doBuySkin = function doBuySkin(callback) {
            self.uiMgr.showPanelBuySkin(callback);
        };

        var doSign = function doSign(callback) {
            self.uiMgr.showPanelSign(callback);
        };
        var doTask = function doTask(callback) {
            self.taskMgr.refreshTaskInHome(callback);
        };
        var doOffline = function doOffline(callback) {
            self.uiMgr.showOfflineMultip(callback);
        };

        var doRepay = function doRepay(callback) {
            self.uiMgr.showPanelRepay(callback);
        };

        var doUnlockGrow = function doUnlockGrow(callback) {
            self.uiMgr.showUnlockGrow(callback);
        };

        var doAddTop = function doAddTop(callback) {
            self.uiMgr.showPanelAddTop(callback);
            PlayerData.instance.updateDayShowTop();
        };

        var doDailyTask = function doDailyTask(callback) {
            self.uiMgr.showPanelDailyTask(callback);
        };

        var doSubscribe = function doSubscribe(callback) {
            self.uiMgr.showPanelSubscribe(callback);
        };

        var doSubscribeReward = function doSubscribeReward(callback) {
            self.uiMgr.showPanelSubscribeReward(callback);
        };

        var doEvaulate = function doEvaulate(callback) {
            self.uiMgr.showPanelEvaulate(callback);
        };

        var doDance = function doDance() {
            self.uiMgr.showWatchAdverCount();
        };

        var func12 = function func12() {
            if (PlayerData.instance.canShowPanelEvaulate()) {
                doEvaulate(doDance);
            } else {
                doDance();
            }
        };

        var func11 = function func11() {
            if (PlayerData.instance.canShowPanelBuySkin()) {
                doBuySkin(func12);
            } else {
                func12();
            }
        };

        var func10 = function func10() {
            if (false) {
                //if (PlayerData.instance.isSubscribe() && !PlayerData.instance.daySubscribeReward) {
                doSubscribeReward(func11);
            } else {
                func11();
            }
        };

        var func9 = function func9() {
            if (false) {
                //if (!PlayerData.instance.isSubscribe() && !PlayerData.instance.showSubscribeFlag) {
                doSubscribe(func10);
                PlayerData.instance.showSubscribeFlag = true;
            } else {
                func10();
            }
        };

        var func8 = function func8() {
            if (false) {
                //if (PlayerData.instance.canShowPanelHolidayRank()) {
                _this3.uiMgr.showPanelHolidayRank(true, func9);
            } else {
                func9();
            }
        };

        var func7 = function func7() {
            if (!daySign && !showPanelSignFlag && goldStage !== StageType.Share && PlayerData.instance.canShowPanelSign()) {
                doSign(func8);
                PlayerData.instance.showPanelSignFlag = true;
            } else {
                func8();
            }
        };

        var func6 = function func6() {
            if (!GameData.instance.isInReview && !ConfigData.instance.clientData.hideSpecialSkin && PlayerData.instance.canShowPanelDailyTask()) {
                doDailyTask(func7);
            } else {
                func7();
            }
        };

        var func5 = function func5() {
            if (!hideAddTop && PlayerData.instance.canShowPanelAddTop() && !GameData.instance.isInReview && !PlatformMgr.isIOS()) {
                doAddTop(func6);
            } else {
                func6();
            }
        };

        var func4 = function func4() {
            doUnlockGrow(func5);
        };

        var func3 = function func3() {
            if (!hasRepay && repayData && repayData.reward) {
                doRepay(func4);
            } else {
                func4();
            }
        };

        var func2 = function func2() {
            // if (offlineGoldTime >= offlineGoldMultipLimit && !offlineFlag && goldStage !== StageType.Share) {
            if (false) {
                PlayerData.instance.offlineFlag = true;
                doOffline(func3);
            } else {
                func3();
            }
        };

        var func1 = function func1() {
            doTask(func2);
        };

        var func0 = function func0() {
            // if (!PlayerData.instance.dayRefreshWorldReward && Tools.isAfterCheckTime(PlayerData.instance.getCurTime())) {
            if (false) {
                PlatformMgr.getHolidayWorldReward(function (data) {
                    if (data) {
                        _this3.uiMgr.showPanelWorldReward(data, func1);
                    } else {
                        func1();
                    }
                });
            } else {
                func1();
            }
        };

        var func = function func() {
            // if (!PlayerData.instance.dayRefreshPKReward && Tools.isAfterCheckTime(PlayerData.instance.getCurTime())) {
            if (false) {
                PlayerData.instance.updateWorldRewardDetail();
                PlatformMgr.getHolidayPKReward(function (data) {
                    if (data) {
                        _this3.uiMgr.showPanelPKReward(data, func0);
                    } else {
                        func0();
                    }
                });
            } else {
                func0();
            }
        };

        if (levelUp) {
            doLevelUp(func);
        } else {
            func();
        }
    },

    startLoadPrefab: function startLoadPrefab() {
        // GameData.instance.logUseTime('start prefab load');
        this.uiMgr.startLoadPrefab();
    },

    onStartBtnClick: function onStartBtnClick(event, data) {
        var _this4 = this;

        if (data && data == "1") {
            //通过按钮点击的，记录为点击开始事件
            //游戏开始（包括用户点击play按钮和点击角色游戏开始）
            AdvertMgr.instance.fireBaseEvent("game_start");
        }
        var self = this;
        if (this.isLoading) {
            this.touchStartGame = true;
            return;
        }

        if (this.m_alreadyStart) {
            return;
        }
        this.m_alreadyStart = true;

        this.uiMgr.hideUserInfoBtn();

        if (PlayerData.instance.isSecGame()) {
            PlatformMgr.notifyFunnelEvent(CustomFunnelEvent.GameTwo);
        }

        AdvertMgr.instance.destoryBanner();

        var playCount = PlayerData.instance.playCount;
        if (playCount !== 0 && playCount <= ConfigData.instance.clientData.bornFrenzyLimit) {
            self.localPlayer.canAddBornFrenzy = true;
        }

        if (this.isGuide) {
            this.onStart();
        }
        //首局不弹出
        if (PlayerData.instance.dayPlayCount === 0) {
            this.onLoadMatch();
            return;
        }

        //新手阶段不弹出
        var stage = ConfigData.instance.getCurStage(PlayerData.instance.playCount, ConfigData.instance.clientData.adverReviveLimit);
        if (stage === StageType.Free) {
            this.onLoadMatch();
            return;
        }

        //试用暴走
        // var canTryFrenzy = false;
        // if (PlayerData.instance.continuityLoseCount >= 2 && (PlayerData.instance.rankData.id >= ConfigData.instance.clientData.frenzyLimit)) {
        //     PlayerData.instance.updateContinuityLoseCount();
        //     canTryFrenzy = true;
        // }

        // if (canTryFrenzy) {
        //     this.uiMgr.showPanelTryFrenzy((success) => {
        //         if (success) {
        //             self.localPlayer.canFrenzyBorn = true;
        //         }
        //         self.onLoadMatch();
        //     })
        //     //可以试用暴走则不弹出试用皮肤
        //     return;
        // }


        //试用套装
        var clientData = ConfigData.instance.clientData;
        var trySkinData = PlayerData.instance.getTrySkinData();
        //后台配置的开关
        if (!clientData.hideTrySkin && !GameData.instance.isInReview) {
            //大于试用皮肤的最低游戏局数
            if (PlayerData.instance.playCount >= clientData.trySkinMinPlayCount) {
                var curCount = PlayerData.instance.dayPlayCount;
                //大于上次试用皮肤的指定间隔局数
                var interval = Tools.getItemOrFinalItem(clientData.trySkinTimeInterval, trySkinData.trySkinCount);
                var canTry = curCount - trySkinData.lastTryPlayCount >= interval;

                //或者连败两次
                var canTry2 = false;
                if (PlayerData.instance.continuityLoseCount >= 2) {
                    canTry2 = true;
                }

                if (canTry || canTry2) {
                    var data = ConfigData.instance.getRandomTrySuitData(PlayerData.instance);
                    //有符合条件的可试用皮肤
                    PlayerData.instance.updateContinuityLoseCount();
                    PlayerData.instance.setTrySkinData(trySkinData);
                    if (data) {
                        var playerParent = self.localPlayer.node.parent;
                        var followPlayerParent = self.localPlayer.followPlayer.node.parent;
                        var hData, kData;
                        this.uiMgr.showPanelTrySuit(data, function (heroData, knifeData) {
                            _this4.uiMgr.activeGoldNode(false);
                            _this4.uiMgr.activeDiamondNode(false);
                            hData = heroData;
                            kData = knifeData;
                            PlayerData.instance.addExtraKnife(6);

                            self.onEquipHeroSkin(heroData, false);
                            self.onEquipKnifeSkin(knifeData, false);
                            self.changeLocalKnifesCount(knifeData.initKnifeCount);

                            var rate = 0;
                            if (self.localPlayerKnifes.length > 20) {
                                rate = 1;
                            } else if (self.localPlayerKnifes.length > 9) {
                                rate = (self.localPlayerKnifes.length - 9) / 13;
                            }

                            self.localPlayer.followPlayer.node.group = 'ui';
                            self.localPlayer.followPlayer.node.parent = _this4.tempNode;
                            self.localPlayer.followPlayer.followPlayerScale.changeScaleMultip(1 - rate * 0.45);

                            self.localPlayer.node.group = 'ui';
                            self.localPlayer.node.parent = _this4.tempNode;
                            self.localPlayer.heroScale.changeScaleMultip(1 - rate * 0.45);

                            self.localPlayer.node.y += 130;
                        }, function (success) {
                            _this4.uiMgr.activeGoldNode(true);
                            _this4.uiMgr.activeDiamondNode(true);
                            if (!success) {
                                PlayerData.instance.addExtraKnife(-6);
                                self.onEquipHeroSkin(PlayerData.instance.heroSkin, true);
                                self.onEquipKnifeSkin(PlayerData.instance.knifeSkin, true);
                                self.changeLocalKnifesCount(PlayerData.instance.knifeSkin.initKnifeCount);
                            } else {
                                self.onEquipHeroSkin(hData, false);
                                self.onEquipKnifeSkin(kData, false);
                                self.changeLocalKnifesCount(kData.initKnifeCount);
                                self.uiMgr.showActiveSuitEffect();
                            }

                            self.localPlayer.node.group = 'default';
                            self.localPlayer.node.parent = playerParent;
                            self.localPlayer.heroScale.changeScaleMultip(1);

                            self.localPlayer.node.y = 0;
                            self.localPlayer.followPlayer.node.group = 'heroWall';
                            self.localPlayer.followPlayer.node.parent = followPlayerParent;
                            self.localPlayer.followPlayer.followPlayerScale.changeScaleMultip(1);
                            self.onLoadMatch();
                        });
                        return true;
                    }
                }
            }
        }

        //试用皮肤
        //后台配置的开关
        if (!clientData.hideTrySkin && !GameData.instance.isInReview) {
            //大于试用皮肤的最低游戏局数
            if (PlayerData.instance.playCount >= clientData.trySkinMinPlayCount) {
                var curCount = PlayerData.instance.dayPlayCount;
                //大于上次试用皮肤的指定间隔局数
                var interval = Tools.getItemOrFinalItem(clientData.trySkinTimeInterval, trySkinData.trySkinCount);
                var canTry = curCount - trySkinData.lastTryPlayCount >= interval;
                if (canTry) {
                    //有符合条件的可试用皮肤
                    var data = {};
                    var isHeroSkin = false;
                    if (trySkinData.lastTrySkinType === ItemType.HERO_SKIN) {
                        data = ConfigData.instance.getRandomTryKnifeSkinData(PlayerData.instance.ownKnifeSkins, clientData.tryKnifeSkinMinQuality);
                        trySkinData.lastTrySkinType = ItemType.KNIFE_SKIN;
                        isHeroSkin = false;
                    } else {
                        data = ConfigData.instance.getRandomTryHeroSkinData(PlayerData.instance.ownHeroSkins, clientData.tryHeroSkinMinQuality);
                        trySkinData.lastTrySkinType = ItemType.HERO_SKIN;
                        isHeroSkin = true;
                    }
                    PlayerData.instance.setTrySkinData(trySkinData);
                    if (data) {

                        var playerParent = self.localPlayer.node.parent;
                        var followPlayerParent = self.localPlayer.followPlayer.node.parent;
                        this.uiMgr.showPanelTryOut(data, function () {
                            _this4.uiMgr.activeGoldNode(false);
                            _this4.uiMgr.activeDiamondNode(false);
                            PlayerData.instance.addExtraKnife(6);
                            if (isHeroSkin) {
                                self.onEquipHeroSkin(data, false);
                                self.changeLocalKnifesCount(PlayerData.instance.knifeSkin.initKnifeCount);
                            } else {
                                self.onEquipKnifeSkin(data, false);
                            }
                            var rate = 0;
                            if (self.localPlayerKnifes.length > 20) {
                                rate = 1;
                            } else if (self.localPlayerKnifes.length > 9) {
                                rate = (self.localPlayerKnifes.length - 9) / 13;
                            }

                            self.localPlayer.followPlayer.node.group = 'ui';
                            self.localPlayer.followPlayer.node.parent = _this4.tempNode;
                            self.localPlayer.followPlayer.followPlayerScale.changeScaleMultip(1 - rate * 0.45);
                            if (isHeroSkin) {
                                self.localPlayer.node.group = 'ui';
                                self.localPlayer.node.parent = _this4.tempNode;
                                self.localPlayer.heroScale.changeScaleMultip(1 - rate * 0.45);
                            }
                            self.localPlayer.node.y += 130;
                        }, function (success) {
                            _this4.uiMgr.activeGoldNode(true);
                            _this4.uiMgr.activeDiamondNode(true);
                            if (!success) {
                                PlayerData.instance.addExtraKnife(-6);
                                if (isHeroSkin) {
                                    self.onEquipHeroSkin(PlayerData.instance.heroSkin, true);
                                    self.changeLocalKnifesCount(PlayerData.instance.knifeSkin.initKnifeCount);
                                } else {
                                    self.onEquipKnifeSkin(PlayerData.instance.knifeSkin, true);
                                }
                            } else {
                                if (isHeroSkin) {
                                    self.onEquipHeroSkin(data, false);
                                    self.changeLocalKnifesCount(PlayerData.instance.knifeSkin.initKnifeCount);
                                } else {
                                    self.onEquipKnifeSkin(data, false);
                                }
                                var str = Tools.getStringByFormat(ConfigData.instance.getUITipStr(9), data.name);
                                self.uiMgr.showTips(str);
                            }

                            if (isHeroSkin) {
                                self.localPlayer.node.group = 'default';
                                self.localPlayer.node.parent = playerParent;
                                self.localPlayer.heroScale.changeScaleMultip(1);
                            }
                            self.localPlayer.node.y = 0;
                            self.localPlayer.followPlayer.node.group = 'heroWall';
                            self.localPlayer.followPlayer.node.parent = followPlayerParent;
                            self.localPlayer.followPlayer.followPlayerScale.changeScaleMultip(1);
                            self.onLoadMatch();
                        });
                        return true;
                    }
                }
            }
        }

        this.onLoadMatch();
    },

    //匹配界面
    onLoadMatch: function onLoadMatch() {
        if (PlayerData.instance.isFristGame()) {
            PlatformMgr.notifyFunnelEvent(CustomFunnelEvent.UI_Match);
        }
        var self = this;
        this.uiMgr.showPanelMatch(this.players, function () {
            self.onStart();
        });
    },

    //开始游戏
    onStart: function onStart() {
        var _this5 = this;

        var followCameraCtrlCmp = this.followCameraCtrl.getComponent('FollowCameraCtrl');
        followCameraCtrlCmp.init(this.localPlayer.node, new cc.Rect(-this.mapWidth / 2, -this.mapHeight / 2, this.mapWidth, this.mapHeight));
        this.localPlayer.myCamera = followCameraCtrlCmp;
        CollisionEventManager.getInstance().clear();
        this.uiMgr.closePanelMatch();
        this.uiMgr.startGame();
        this.uiMgr.startCountDown(GameData.instance.gameTime);
        // 初始化玩家移动
        var _iteratorNormalCompletion11 = true;
        var _didIteratorError11 = false;
        var _iteratorError11 = undefined;

        try {
            for (var _iterator11 = this.players[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                var player = _step11.value;

                player.startGame(this.isGuide);
                player.setLocalHero(this.localPlayer);
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

        var _iteratorNormalCompletion12 = true;
        var _didIteratorError12 = false;
        var _iteratorError12 = undefined;

        try {
            for (var _iterator12 = this.landKnifes[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                var knife = _step12.value;

                knife.node.active = true;
            }
        } catch (err) {
            _didIteratorError12 = true;
            _iteratorError12 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion12 && _iterator12.return) {
                    _iterator12.return();
                }
            } finally {
                if (_didIteratorError12) {
                    throw _iteratorError12;
                }
            }
        }

        this.killMsgListener.init(this.players, this.uiMgr);
        var self = this;
        var callF = function callF() {
            if (self.localPlayer._defenceTips) {
                self.localPlayer._defenceTips.active = false;
            }

            self.playerRankSystem.updateGameLogic();
            // 本局战斗结束  目前处理是弹出再来一局按钮
            var func = function func() {
                //在展示购买皮肤面板前如果获得了其他皮肤，则本轮不展示
                PlayerData.instance.showPanelBuySkinFlag = true;

                if (PlayerData.instance.isFristGame()) {
                    PlatformMgr.notifyFunnelEvent(CustomFunnelEvent.GameOverPanel);
                }
                self.startGame = false;
                self.localPlayer.stopControl();
                self.uiMgr.openGameOverPanel();
                PlayerData.instance.onGameOver(self.localPlayer);
            };
            if (self.localPlayer.rank === 1 && !self.localPlayer.beKilled()) {
                setTimeout(function () {
                    self.uiMgr.showPanelVictory();
                    if (PlayerData.instance.isFristGame()) {
                        PlatformMgr.notifyFunnelEvent(CustomFunnelEvent.First_Game_Finish);
                    }
                }, 500);
                setTimeout(function () {
                    func();
                }, 2000);
            } else {
                func();
            }
        };

        this.guideGameOverCallF = function () {
            var index = 1;
            var _iteratorNormalCompletion13 = true;
            var _didIteratorError13 = false;
            var _iteratorError13 = undefined;

            try {
                for (var _iterator13 = _this5.players[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                    var _player = _step13.value;

                    _player.rank = index;
                    index++;
                }
            } catch (err) {
                _didIteratorError13 = true;
                _iteratorError13 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion13 && _iterator13.return) {
                        _iterator13.return();
                    }
                } finally {
                    if (_didIteratorError13) {
                        throw _iteratorError13;
                    }
                }
            }

            callF();
        };

        var reviveCallF = function reviveCallF() {
            // if (GameData.instance.isInReview) {
            //     self.localPlayer.waitToDie = false;
            //     self.localPlayer.die(null, true);
            // } else {
            self.uiMgr.openRevivePanel(function (isRevive, isFrenzy) {
                if (isRevive) {
                    var index = self.knifes.length;
                    var count = PlayerData.instance.knifeSkin.initKnifeCount;
                    var localPlayerKnifes = self.addEntitySys.AddKnife(count);
                    var _iteratorNormalCompletion14 = true;
                    var _didIteratorError14 = false;
                    var _iteratorError14 = undefined;

                    try {
                        for (var _iterator14 = localPlayerKnifes[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                            var knife = _step14.value;

                            _this5.knifes[index] = knife;
                            var knifeInit = Tools.getOrAddComponent(knife.node, 'KnifeInit');
                            knifeInit.init(self.localPlayer);
                            index++;
                        }
                        // self.localPlayer.node.position = cc.v2(0, 0);
                    } catch (err) {
                        _didIteratorError14 = true;
                        _iteratorError14 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion14 && _iterator14.return) {
                                _iterator14.return();
                            }
                        } finally {
                            if (_didIteratorError14) {
                                throw _iteratorError14;
                            }
                        }
                    }

                    self.localPlayer.revive(isFrenzy);
                    self.gameRuleSystem.onContinue();
                    self.uiMgr.showReviveNotice(self.localPlayer);
                } else {
                    self.localPlayer.waitToDie = false;
                    self.localPlayer.die(null, true);
                }
            }, self.localPlayer.reviveCount);
            // }
        };

        // var heroReviveCallF = () => {
        //     var index = self.knifes.length;
        //     var count = player.skin.initKnifeCount;
        //     var localPlayerKnifes = self.addEntitySys.AddKnife(count);
        //     for (var knife of localPlayerKnifes) {
        //         this.knifes[index] = knife;
        //         var knifeInit = Tools.getOrAddComponent(knife.node, 'KnifeInit');
        //         knifeInit.init(player);
        //         index++;
        //     }
        //     // self.localPlayer.node.position = cc.v2(0, 0);
        //     player.revive();
        // };

        var heroReviveCallF = function heroReviveCallF(player, isRevive) {
            if (isRevive) {
                var index = self.knifes.length;
                var count = player.skin.initKnifeCount;
                var localPlayerKnifes = self.addEntitySys.AddKnife(count);
                var _iteratorNormalCompletion15 = true;
                var _didIteratorError15 = false;
                var _iteratorError15 = undefined;

                try {
                    for (var _iterator15 = localPlayerKnifes[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                        var knife = _step15.value;

                        _this5.knifes[index] = knife;
                        var knifeInit = Tools.getOrAddComponent(knife.node, 'KnifeInit');
                        knifeInit.init(player);
                        index++;
                    }
                } catch (err) {
                    _didIteratorError15 = true;
                    _iteratorError15 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion15 && _iterator15.return) {
                            _iterator15.return();
                        }
                    } finally {
                        if (_didIteratorError15) {
                            throw _iteratorError15;
                        }
                    }
                }

                player.revive();
                self.uiMgr.showReviveNotice(player);
            } else {
                player.waitToDie = false;
                player.die(null, true);
            }
        };

        var heroShowRebornCallF = function heroShowRebornCallF(player) {
            self.rebornEffect(player);
        };

        if (!this.isGuide) {
            this.playerRankSystem.init(this.players, this.localPlayer);
            this.gameRuleSystem.init(callF, this.localPlayer, this.players, GameData.instance.gameTime, reviveCallF);
            this.heroReviveSystem.init(this.players, heroReviveCallF, heroShowRebornCallF);
            this.playerDistanceSystem.init(this.players, this.localPlayer, this.blocks, this.knifes);
            this.wallRuleSystem.init(this);
        }

        PlayerData.instance.onStartGame();

        AudioEngine.instance.playSound(SoundID.Start);
        this.startGame = true;
        if (PlayerData.instance.isFristGame()) {
            PlatformMgr.notifyFunnelEvent(CustomFunnelEvent.First_Game_Start);
        }
    },

    update: function update(dt) {
        this._removeEntity(dt);
        this._updateGameLogic(dt);
        this._updateHideNameLogic(dt);
        if (!this.isGuide) {
            this._updateNoticeLogic(dt);
            this._updateAddKnifeLogic(dt);
            this._updateShowTaskLogic(dt);
            this._updateAddBuffLogic(dt);
            this._updateAddBoxLogic(dt);
            // this._updatePowerArrowLogic(dt);
            this._updateGuideNoticeLogic(dt);
        }
        this._checkUpdateUserData(dt);
        this._reportHeart(dt);
    },

    _removeEntity: function _removeEntity(dt) {

        if (this.removeKnifes && this.removeKnifes.length > 0) {
            var _iteratorNormalCompletion16 = true;
            var _didIteratorError16 = false;
            var _iteratorError16 = undefined;

            try {
                for (var _iterator16 = this.removeKnifes[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                    var knife = _step16.value;

                    var j = this.knifes.indexOf(knife);
                    if (j !== -1) {
                        this.knifes.splice(j, 1);
                    }
                }
            } catch (err) {
                _didIteratorError16 = true;
                _iteratorError16 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion16 && _iterator16.return) {
                        _iterator16.return();
                    }
                } finally {
                    if (_didIteratorError16) {
                        throw _iteratorError16;
                    }
                }
            }

            this.removeKnifes = [];
        }
    },

    _updateGameLogic: function _updateGameLogic(dt) {
        if (this.startGame) {
            if (!this.isGuide) {
                this.gameRuleSystem.updateGameLogic(dt);
                this.heroReviveSystem.updateGameLogic(dt);
                this.wallRuleSystem.updateGameLogic(dt);
                this.playerDistanceSystem.updateGameLogic(dt);
                this.playerRankSystem.updateGameLogic(dt);
            } else {
                this.guideSystem.updateGameLogic(dt);
            }
            this.pickKnifeCollisionHandleSystem.updateGameLogic(dt);
            this.pickBuffCollisionHandleSystem.updateGameLogic(dt);
            this.heroCollisionHandleSystem.updateGameLogic(dt);
            this.knifeCollisionHandleSystem.updateGameLogic(dt);
            this.attackBoxCollisionHandleSystem.updateGameLogic(dt);
        }

        var _iteratorNormalCompletion17 = true;
        var _didIteratorError17 = false;
        var _iteratorError17 = undefined;

        try {
            for (var _iterator17 = this.players[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
                var player = _step17.value;

                player.updateGameLogic(dt, this);
                player.myGuideComp.updateGameLogic(dt);
            }
        } catch (err) {
            _didIteratorError17 = true;
            _iteratorError17 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion17 && _iterator17.return) {
                    _iterator17.return();
                }
            } finally {
                if (_didIteratorError17) {
                    throw _iteratorError17;
                }
            }
        }

        var _iteratorNormalCompletion18 = true;
        var _didIteratorError18 = false;
        var _iteratorError18 = undefined;

        try {
            for (var _iterator18 = this.knifes[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
                var knife = _step18.value;

                knife.updateGameLogic(dt);
                if (knife.shouldRemove) {
                    this.removeKnifes.push(knife);
                }
            }
        } catch (err) {
            _didIteratorError18 = true;
            _iteratorError18 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion18 && _iterator18.return) {
                    _iterator18.return();
                }
            } finally {
                if (_didIteratorError18) {
                    throw _iteratorError18;
                }
            }
        }

        if (this.startGame) {}

        this.addEntitySys.AddTempKnife();
    },

    _updateNoticeLogic: function _updateNoticeLogic(dt) {
        if (this.startGame) {
            this.gameTime -= dt;
            if (this.gameTime <= 31 && !this.flag_30) {
                this.uiMgr.showImportantNotice(NoticeType.Time_30);
                this.flag_30 = true;
            }

            if (this.gameTime <= 11 && !this.flag_10) {
                this.uiMgr.showImportantNotice(NoticeType.Time_10);
                this.flag_10 = true;
            }

            if (this.gameTime <= 4 && !this.flag_3) {
                this.uiMgr.showCountDownNode();
                this.flag_3 = true;
            }

            if (this.startGame) {
                this.checkEnemyTime += dt;
                this.checkKnifeTime += dt;
                this.checkBlockTime += dt;
                this.checkDefenceTime += dt;

                if (this.checkEnemyTime > 20) {
                    var _iteratorNormalCompletion19 = true;
                    var _didIteratorError19 = false;
                    var _iteratorError19 = undefined;

                    try {
                        for (var _iterator19 = this.players[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
                            var player = _step19.value;

                            if (player === this.localPlayer) continue;
                            if (player.isDead) continue;
                            if (player.isInView) {
                                this.checkEnemyTime = 0;
                                this.uiMgr.addSpecialNotice(NoticeType.Enemy);
                            }
                        }
                    } catch (err) {
                        _didIteratorError19 = true;
                        _iteratorError19 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion19 && _iterator19.return) {
                                _iterator19.return();
                            }
                        } finally {
                            if (_didIteratorError19) {
                                throw _iteratorError19;
                            }
                        }
                    }
                }

                if (this.checkKnifeTime > 20) {
                    var _iteratorNormalCompletion20 = true;
                    var _didIteratorError20 = false;
                    var _iteratorError20 = undefined;

                    try {
                        for (var _iterator20 = this.knifes[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
                            var knife = _step20.value;

                            var isInMyView = Tools.isInMyView(this.localPlayer, knife, this.worldRect, this.width, this.height, this.cameraZoomCtrl.camera);
                            // knife.onKnifeViewChange(isInMyView);
                            if (isInMyView && knife.knifeStateComp.state === KnifeState.Normal) {
                                this.checkKnifeTime = 0;
                                this.uiMgr.addSpecialNotice(NoticeType.Knife);
                            }
                        }
                    } catch (err) {
                        _didIteratorError20 = true;
                        _iteratorError20 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion20 && _iterator20.return) {
                                _iterator20.return();
                            }
                        } finally {
                            if (_didIteratorError20) {
                                throw _iteratorError20;
                            }
                        }
                    }
                }

                if (this.checkBlockTime > 20) {
                    var _iteratorNormalCompletion21 = true;
                    var _didIteratorError21 = false;
                    var _iteratorError21 = undefined;

                    try {
                        for (var _iterator21 = this.blocks[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
                            var block = _step21.value;

                            if (Tools.isInMyView(this.localPlayer, block, this.worldRect, this.width, this.height, this.cameraZoomCtrl.camera)) {
                                this.checkBlockTime = 0;
                                this.uiMgr.addSpecialNotice(NoticeType.Block);
                            }
                        }
                    } catch (err) {
                        _didIteratorError21 = true;
                        _iteratorError21 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion21 && _iterator21.return) {
                                _iterator21.return();
                            }
                        } finally {
                            if (_didIteratorError21) {
                                throw _iteratorError21;
                            }
                        }
                    }
                }

                if (this.checkDefenceTime > 20) {
                    if (this.localPlayer.isDefence) {
                        this.checkDefenceTime = 0;
                        this.uiMgr.addSpecialNotice(NoticeType.Defence);
                    }
                }
            }
        }
    },

    _updateAddKnifeLogic: function _updateAddKnifeLogic(dt) {
        if (this.startGame) {
            this.addKnifeTime += dt;
            if (this.addKnifeTime >= PlayerData.instance.rankData.addKnifeInterval) {
                this.addKnifeTime = 0;
                var landKnifes = this.addEntitySys.AddKnife(1);
                var index = this.knifes.length;
                var _iteratorNormalCompletion22 = true;
                var _didIteratorError22 = false;
                var _iteratorError22 = undefined;

                try {
                    for (var _iterator22 = landKnifes[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
                        var knife = _step22.value;

                        this.knifes[index] = knife;
                        index++;
                    }
                } catch (err) {
                    _didIteratorError22 = true;
                    _iteratorError22 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion22 && _iterator22.return) {
                            _iterator22.return();
                        }
                    } finally {
                        if (_didIteratorError22) {
                            throw _iteratorError22;
                        }
                    }
                }
            }
        }
    },

    _updateHideNameLogic: function _updateHideNameLogic(dt) {
        var _iteratorNormalCompletion23 = true;
        var _didIteratorError23 = false;
        var _iteratorError23 = undefined;

        try {
            for (var _iterator23 = this.players[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
                var player = _step23.value;

                if (player === this.localPlayer) continue;
                if (player.isDead) continue;
                if (Tools.isInMyView(this.localPlayer, player, this.worldRect, this.width, this.height, this.cameraZoomCtrl.camera, true)) {
                    player.setInView(true);
                } else {
                    player.setInView(false);
                }
            }
        } catch (err) {
            _didIteratorError23 = true;
            _iteratorError23 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion23 && _iterator23.return) {
                    _iterator23.return();
                }
            } finally {
                if (_didIteratorError23) {
                    throw _iteratorError23;
                }
            }
        }
    },

    _updateShowTaskLogic: function _updateShowTaskLogic(dt) {
        var _this6 = this;

        //通知UI展示任务
        if (this.isShowTask) return;
        if (!this.taskMgr.showList[0]) return;
        this.isShowTask = true;
        var self = this;
        this.uiMgr.showTaskNotice(this.taskMgr.showList[0], function () {
            _this6.taskMgr.showList.splice(0, 1);
            self.isShowTask = false;
        });
    },

    _updateAddBuffLogic: function _updateAddBuffLogic(dt) {
        if (this.startGame && this.canAddBuff) {
            this.addBuffTime += dt;
            if (this.addBuffTime > this.addBuffTimeLimit) {
                var buffs = this.addEntitySys.AddBuff(1, this.addBuffId);
                buffs[0].node.position = this.getRandomPosNearLocalPlayer(buffs[0].node, this.localPlayer.node, this.cameraZoomCtrl.camera);
                buffs[0].node.scale = 0;
                var action = cc.scaleTo(0.2, 1).easing(cc.easeBackOut(3.0));
                buffs[0].node.runAction(action);
                this.initAddBuffParam();
            }
        }
    },

    _updateAddBoxLogic: function _updateAddBoxLogic(dt) {
        if (this.startGame && this.canAddBox) {
            this.addBoxTime += dt;
            if (this.addBoxTime > this.addBoxTimeLimit) {
                var boxes = this.addEntitySys.AddBox(1, this.addBoxId);
                boxes[0].node.position = this.getRandomPosNearLocalPlayer(boxes[0].node, this.localPlayer.node, this.cameraZoomCtrl.camera);
                boxes[0].node.scale = 0;
                var action = cc.scaleTo(0.2, 1).easing(cc.easeBackOut(3.0));
                boxes[0].node.runAction(action);
                this.initAddBoxParam();
            }
        }
    },

    _updatePowerArrowLogic: function _updatePowerArrowLogic(dt) {
        var _iteratorNormalCompletion24 = true;
        var _didIteratorError24 = false;
        var _iteratorError24 = undefined;

        try {
            for (var _iterator24 = this.players[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
                var player = _step24.value;

                if (player === this.localPlayer) continue;
                if (player.isInView && !player.isDead) {
                    player.refreshPowerArrow(this.localPlayer);
                } else {
                    player.closePowerArrow();
                }
            }
        } catch (err) {
            _didIteratorError24 = true;
            _iteratorError24 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion24 && _iterator24.return) {
                    _iterator24.return();
                }
            } finally {
                if (_didIteratorError24) {
                    throw _iteratorError24;
                }
            }
        }
    },

    _updateGuideNoticeLogic: function _updateGuideNoticeLogic(dt) {
        if (!this.startGame) return;

        var knfieCount = this.localPlayer.followPlayer.knivesCmp.knives.length;
        if (knfieCount <= 10) {
            this.localPlayer.showTips(0);
        } else {
            if (this.localPlayer.isDefence) {
                this.localPlayer.showTips(2);
                this.showGuideFlag = false;
            } else if (this.showGuideFlag) {
                this.localPlayer.showTips(1);
            } else {
                this.localPlayer.closeTips();
            }
        }
    },

    initMapParam: function initMapParam() {
        this.mapType = 0;
        this.mapId = 0;
        if (PlayerData.instance.playCount === 0) {
            return;
        }

        if (PlayerData.instance.newMap) {
            this.mapType = PlayerData.instance.newMap;
            PlayerData.instance.newMap = 0;
            return;
        }

        var canUseMapDatas = [];
        var mapDatas = ConfigData.instance.mapDatas;
        var mapPool = PlayerData.instance.rankData.mapPool;

        if (!mapPool) return;

        var _iteratorNormalCompletion25 = true;
        var _didIteratorError25 = false;
        var _iteratorError25 = undefined;

        try {
            for (var _iterator25 = mapPool[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
                var id = _step25.value;

                canUseMapDatas.push(mapDatas[id]);
            }
        } catch (err) {
            _didIteratorError25 = true;
            _iteratorError25 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion25 && _iterator25.return) {
                    _iterator25.return();
                }
            } finally {
                if (_didIteratorError25) {
                    throw _iteratorError25;
                }
            }
        }

        var data = Tools.getRandomItemByWeight(canUseMapDatas);
        if (data) {
            this.mapType = data.id;
            this.mapWidth = data.width;
            this.mapHeight = data.height;
        }

        if (GameData.instance.isShowLog()) {
            // console.log(canUseMapDatas);
            // console.log('随机地图：', this.mapType);
        }
    },

    initAddBuffParam: function initAddBuffParam() {
        var canUseBuffDatas = [];
        var buffDatas = ConfigData.instance.buffDatas;
        var buffPool = PlayerData.instance.rankData.buffPool;

        if (buffPool) {
            this.canAddBuff = true;
        } else {
            this.canAddBuff = false;
            return;
        }

        var _iteratorNormalCompletion26 = true;
        var _didIteratorError26 = false;
        var _iteratorError26 = undefined;

        try {
            for (var _iterator26 = buffPool[Symbol.iterator](), _step26; !(_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done); _iteratorNormalCompletion26 = true) {
                var buffId = _step26.value;

                canUseBuffDatas.push(buffDatas[buffId]);
            }
        } catch (err) {
            _didIteratorError26 = true;
            _iteratorError26 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion26 && _iterator26.return) {
                    _iterator26.return();
                }
            } finally {
                if (_didIteratorError26) {
                    throw _iteratorError26;
                }
            }
        }

        var data = Tools.getRandomItemByWeight(canUseBuffDatas);
        if (data) {
            this.addBuffId = data.id;
            this.addBuffTime = 0;
            this.addBuffTimeLimit = Tools.getRandomInt(data.refreshTime[0], data.refreshTime[1]);
        }

        if (GameData.instance.isShowLog()) {
            console.log(canUseBuffDatas);
            console.log('随机buff：', data.name, '刷新时间:', this.addBuffTimeLimit);
        }
    },

    initAddBoxParam: function initAddBoxParam() {
        var totalWeight = 0;
        var boxWeights = [];
        var canUseBoxDatas = [];
        var boxDatas = ConfigData.instance.boxDatas;
        var boxPool = PlayerData.instance.rankData.boxPool;
        this.canAddBox = true;
        if (boxPool) {
            this.canAddBox = true;
        } else {
            this.canAddBox = false;
            return;
        }

        var _iteratorNormalCompletion27 = true;
        var _didIteratorError27 = false;
        var _iteratorError27 = undefined;

        try {
            for (var _iterator27 = boxPool[Symbol.iterator](), _step27; !(_iteratorNormalCompletion27 = (_step27 = _iterator27.next()).done); _iteratorNormalCompletion27 = true) {
                var boxId = _step27.value;

                canUseBoxDatas.push(boxDatas[boxId]);
            }
        } catch (err) {
            _didIteratorError27 = true;
            _iteratorError27 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion27 && _iterator27.return) {
                    _iterator27.return();
                }
            } finally {
                if (_didIteratorError27) {
                    throw _iteratorError27;
                }
            }
        }

        var data = Tools.getRandomItemByWeight(canUseBoxDatas);
        if (data) {
            this.addBoxId = data.id;
            this.addBoxTime = 0;
            this.addBoxTimeLimit = Tools.getRandomInt(data.refreshTime[0], data.refreshTime[1]);
        }

        if (GameData.instance.isShowLog()) {
            console.log(canUseBoxDatas);
            console.log('随机box：', data.name, '刷新时间:', this.addBoxTimeLimit);
        }
    },

    restartGame: function restartGame() {
        CollisionEventManager.getInstance().clear();
        AudioEngine.instance.stopAllSound();
        var manager = cc.director.getCollisionManager();
        manager._contacts = [];
        manager._colliders = [];
        // cc.director.loadScene("Battle");
        this.uiMgr.closeGameOverPanel();
        this.uiMgr.openPanelKeyCount(false);
        if (PlayerData.instance.isSecGame()) {
            PlatformMgr.notifyFunnelEvent(CustomFunnelEvent.BackToHome);
        }
        this.onLoad();
    },

    gameOver: function gameOver() {},

    posInMyView: function posInMyView(pos) {
        var relativePos = this.localPlayer.node.convertToNodeSpaceAR(pos);
        var width = this.width * this.cameraZoomCtrl.camera.zoomRatio;
        var height = this.height * this.cameraZoomCtrl.camera.zoomRatio;
        if (relativePos.x <= width / 2 && relativePos.x >= -width / 2) {
            if (relativePos.y <= height / 2 && relativePos.y >= -width / 2) {
                return true;
            }
        }
        return false;
    },

    //丢刀特效
    throwKnife: function throwKnife(detail) {
        var centerPos, rotation;
        if (detail.length !== 2) {
            centerPos = detail.parent.convertToWorldSpaceAR(detail.position);
            rotation = 0;
        } else {
            var params = Tools.getCenterParam(detail);
            centerPos = params[0];
            rotation = params[1];
        }

        // if (this.posInMyView(centerPos)) {
        this.addEntitySys.addCollisionEffect(centerPos, rotation);
        // }
    },

    //闪避特效
    dodgeKnife: function dodgeKnife(detail) {
        var params = Tools.getCenterParam(detail);
        var centerPos = params[0];
        if (this.posInMyView(centerPos)) {
            var effect = this.addEntitySys.addDodgeEffect(centerPos);
            effect.scale = this.localPlayer.node.scale;
        }
    },

    //破防特效
    destroyDefenceKnife: function destroyDefenceKnife(detail) {
        var centerPos;
        if (detail.length !== 2) {
            centerPos = detail.parent.convertToWorldSpaceAR(detail.position);
        } else {
            var params = Tools.getCenterParam(detail);
            centerPos = params[0];
        }
        // if (this.posInMyView(centerPos)) {
        var effect = this.addEntitySys.addDestroyDefenceEffect(centerPos);
        effect.scale = this.localPlayer.node.scale;
        // }else{
        //     console.log('不在视野内')
        // }
    },

    //哪吒攻击特效
    onNeZhaAttack: function onNeZhaAttack(detail) {
        var centerPos = detail.parent.convertToWorldSpaceAR(detail.position);
        var effect = this.addEntitySys.addNeZhaEffect(centerPos);
        // effect.scale = this.localPlayer.node.scale;
    },

    reduceMapSize: function reduceMapSize(v) {
        this.mapWidth -= v;
        this.mapHeight -= v;

        this.addEntitySys.setMapSize(this.mapWidth, this.mapHeight);
        var _iteratorNormalCompletion28 = true;
        var _didIteratorError28 = false;
        var _iteratorError28 = undefined;

        try {
            for (var _iterator28 = this.players[Symbol.iterator](), _step28; !(_iteratorNormalCompletion28 = (_step28 = _iterator28.next()).done); _iteratorNormalCompletion28 = true) {
                var player = _step28.value;

                player.refreshWalls(this.mapWidth, this.mapHeight);
                player.node.emit('setMapSize', [this.mapWidth, this.mapHeight]);
            }
        } catch (err) {
            _didIteratorError28 = true;
            _iteratorError28 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion28 && _iterator28.return) {
                    _iterator28.return();
                }
            } finally {
                if (_didIteratorError28) {
                    throw _iteratorError28;
                }
            }
        }

        var _iteratorNormalCompletion29 = true;
        var _didIteratorError29 = false;
        var _iteratorError29 = undefined;

        try {
            for (var _iterator29 = this.knifes[Symbol.iterator](), _step29; !(_iteratorNormalCompletion29 = (_step29 = _iterator29.next()).done); _iteratorNormalCompletion29 = true) {
                var knife = _step29.value;

                knife.refreshWalls(this.mapWidth, this.mapHeight);
            }
        } catch (err) {
            _didIteratorError29 = true;
            _iteratorError29 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion29 && _iterator29.return) {
                    _iterator29.return();
                }
            } finally {
                if (_didIteratorError29) {
                    throw _iteratorError29;
                }
            }
        }
    },

    onEquipKnifeSkin: function onEquipKnifeSkin(data, isOwn) {
        var needSave = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var needChangeKnife = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

        //未获得则只预览，在退出商店时恢复默认
        if (isOwn) PlayerData.instance.updateKnifeSkin(data, needSave);
        var self = this;
        if (needChangeKnife) self.changeLocalKnifesCount(data.initKnifeCount);
        self.localPlayer.changeKnifeSkin(data);
        self.localPlayer.followPlayer.getComponent('PlayerKnivesComponent').emitAllKnivesChangeSkin();
        //刷新属性条
        self.uiMgr.refreshProperty(data, false);
    },

    onEquipHeroSkin: function onEquipHeroSkin(data, isOwn) {
        var needSave = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        //未获得则只预览，在退出商店时恢复默认
        if (isOwn) PlayerData.instance.updateHeroSkin(data, needSave);
        var self = this;
        self.localPlayer.heroSkin = data;
        self.localPlayer.changeSkin();
        self.localPlayer.changeEffectColor();
        self.refreshAIHeroSkin();
        //刷新属性条
        self.uiMgr.refreshProperty(data, true);
    },

    addLocalPlayerKnifes: function addLocalPlayerKnifes(num) {
        var addKnifes = this.addEntitySys.AddKnife(num);
        var index = this.knifes.length;
        var _iteratorNormalCompletion30 = true;
        var _didIteratorError30 = false;
        var _iteratorError30 = undefined;

        try {
            for (var _iterator30 = addKnifes[Symbol.iterator](), _step30; !(_iteratorNormalCompletion30 = (_step30 = _iterator30.next()).done); _iteratorNormalCompletion30 = true) {
                var knife = _step30.value;

                this.knifes[index] = knife;
                var knifeInit = Tools.getOrAddComponent(knife.node, 'KnifeInit');
                knifeInit.init(this.localPlayer);
                index++;
            }
        } catch (err) {
            _didIteratorError30 = true;
            _iteratorError30 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion30 && _iterator30.return) {
                    _iterator30.return();
                }
            } finally {
                if (_didIteratorError30) {
                    throw _iteratorError30;
                }
            }
        }
    },

    changeLocalKnifesCount: function changeLocalKnifesCount(num) {
        num += PlayerData.instance.extraKnifeCount;
        this._changeLocalKnifesCountReal(-this.localPlayerKnifes.length);
        this._changeLocalKnifesCountReal(num);
    },

    _changeLocalKnifesCountReal: function _changeLocalKnifesCountReal(count) {
        if (count > 0) {
            var addKnifes = this.addEntitySys.AddKnife(count);
            var index = this.knifes.length;
            var _iteratorNormalCompletion31 = true;
            var _didIteratorError31 = false;
            var _iteratorError31 = undefined;

            try {
                for (var _iterator31 = addKnifes[Symbol.iterator](), _step31; !(_iteratorNormalCompletion31 = (_step31 = _iterator31.next()).done); _iteratorNormalCompletion31 = true) {
                    var knife = _step31.value;

                    this.knifes[index] = knife;
                    this.localPlayerKnifes.push(knife);
                    var knifeInit = Tools.getOrAddComponent(knife.node, 'KnifeInit');
                    knifeInit.init(this.localPlayer);
                    // knife.node.position = this.localPlayer.node.position;
                    index++;
                }
            } catch (err) {
                _didIteratorError31 = true;
                _iteratorError31 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion31 && _iterator31.return) {
                        _iterator31.return();
                    }
                } finally {
                    if (_didIteratorError31) {
                        throw _iteratorError31;
                    }
                }
            }
        } else if (count < 0) {
            var index = this.localPlayerKnifes.length;
            for (var i = index - 1; i >= index + count; i--) {
                var knife = this.localPlayerKnifes[i];
                this.localPlayerKnifes.splice(i, 1);
                var j = this.knifes.indexOf(knife);
                if (j !== -1) {
                    this.knifes.splice(j, 1);
                }
                knife.node.getComponent('KnifeOwnerComponent').owner.emit('reduceKnife', knife.node);
                // knife.recycleSelf();
                knife.node.destroy();
            }
        }
    },

    refreshAIHeroSkin: function refreshAIHeroSkin() {
        var _iteratorNormalCompletion32 = true;
        var _didIteratorError32 = false;
        var _iteratorError32 = undefined;

        try {
            for (var _iterator32 = this.players[Symbol.iterator](), _step32; !(_iteratorNormalCompletion32 = (_step32 = _iterator32.next()).done); _iteratorNormalCompletion32 = true) {
                var player = _step32.value;

                if (player === this.localPlayer) continue;
                if (player.heroSkin && this.localPlayer.heroSkin) {
                    if (player.heroSkin.id === this.localPlayer.heroSkin.id) {
                        player.heroSkin = null;
                        player.changeSkin();
                        player.changeEffectColor();
                    }
                }
            }
        } catch (err) {
            _didIteratorError32 = true;
            _iteratorError32 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion32 && _iterator32.return) {
                    _iterator32.return();
                }
            } finally {
                if (_didIteratorError32) {
                    throw _iteratorError32;
                }
            }
        }
    },

    getRandomPosNearLocalPlayer: function getRandomPosNearLocalPlayer(itemNode, playerNode, camera) {
        var minWidth = this.localPlayer.logicPlayer.radius * this.localPlayer.node.scale / 2;
        var minHeight = this.localPlayer.logicPlayer.radius * this.localPlayer.node.scale / 2;
        var maxWidth = this.width / camera.zoomRatio / 2;
        var maxHeight = this.height / camera.zoomRatio / 2;
        // console.log(minWidth, maxWidth, minHeight, maxHeight)
        var randomPos = cc.v2(Tools.getPositiveOrNegative() * Tools.getRandomInt(minWidth, maxWidth), Tools.getPositiveOrNegative() * Tools.getRandomInt(minHeight, maxHeight));
        var nearPos = playerNode.position.add(randomPos);
        var pos = playerNode.parent.convertToWorldSpaceAR(nearPos);
        var finalPos = itemNode.parent.convertToNodeSpaceAR(pos);
        return finalPos;
    },

    _checkUpdateUserData: function _checkUpdateUserData(dt) {
        PlayerData.instance.checkDelayUpdateData(dt);
        PlayerData.instance.updateUserData();
        PlayerData.instance.updatePKRankTime += dt;
        PlayerData.instance.pkSurplusTime -= dt * 1000;
    },

    addDeadKnifes: function addDeadKnifes(pos) {
        var count = 6;
        // var addKnifes = this.addEntitySys.AddKnife(count);
        // var index = this.knifes.length;
        // var dir = pos.sub(this.localPlayer.node.position).normalize().mul(200);
        var i = 0;
        var self = this;

        var _loop = function _loop() {
            // for (let knife of addKnifes) {
            // this.knifes[index] = knife;
            // knife.node.position = pos.add(cc.v2(Tools.getRandomInt(-200, 200), Tools.getRandomInt(-200, 200)));
            // knife.node.position = pos.add(dir);
            // dir = dir.rotate(60 * Math.PI / 180);
            // knife.activeNode.active = false;
            var ePos = pos.add(cc.v2(Tools.getRandomInt(-200, 200), Tools.getRandomInt(-200, 200))); //knife.node.parent.convertToWorldSpaceAR(knife.node.position);


            // const showKnife = function () {
            //     knife.activeNode.active = true;
            // }

            var createEffect = function createEffect() {
                self.addEntitySys.addShowKnifeEffect(ePos);
                // setTimeout(showKnife, 300);
            };

            setTimeout(createEffect, i * 50);
            // i++;
            // index++;
        };

        for (i = 0; i < count; i++) {
            _loop();
        }
    },

    rebornEffect: function rebornEffect(player) {
        // var centerPos = pos;
        var centerPos = player.node.parent.convertToWorldSpaceAR(player.node.position);
        // if (this.posInMyView(centerPos)) {
        var effect = this.addEntitySys.addRebornEffect(centerPos);
        // effect.scale = this.localPlayer.node.scale;
        // }
    },

    _reportHeart: function _reportHeart(dt) {
        var _this7 = this;

        if (this.isDoHeartbeat) {
            var timestamp = Tools.getMilliTime();
            if (timestamp - this._heartbeatSendTimestamp >= this.heartbeatInterval) {
                this._heartbeatSendTimestamp = timestamp;
                // this.sendHeartbeatRequest();
                PlatformMgr.hawkeye_report_heartbeat();
                PlatformMgr.getInviteInfo(function (datas) {
                    PlayerData.instance.inviteDatas = datas;
                    _this7.uiMgr.refreshRedDot();
                });
            }
        }
    },

    onBoxDestroy: function onBoxDestroy(info) {
        var node = info.node;
        var data = info.data;
        // this.addDeadKnifes(node.position);
        //0 刀 1 金币 2 buff
        switch (data.id) {
            case 0:
                this.addBoxKnife(info);
                break;
            case 1:
                if (info.isLocal) {
                    this.addBoxGold(info);
                }
                break;
            case 2:
                this.addBoxBuff(info);
                break;
        }
    },

    addBoxKnife: function addBoxKnife(info) {
        var _this8 = this;

        var node = info.node;
        var data = info.data;
        var pos = node.position;
        var count = Tools.getRandomInt(data.param[0], data.param[1] + 1);

        var addKnifes = this.addEntitySys.AddKnife(count);
        var index = this.knifes.length;

        var i = 0;
        var self = this;

        var _loop2 = function _loop2(knife) {
            _this8.knifes[index] = knife;

            // knife.node.position = pos.add(cc.v2(Tools.getRandomInt(-100, 100), Tools.getRandomInt(-100, 100)));

            var epos = pos.add(cc.v2(Math.cos(i / count * 2 * Math.PI) * 100, Math.sin(i / count * 2 * Math.PI) * 100));
            knife.node.position = epos;
            knife.activeNode.opacity = 0;
            knife.knifeColliderNodeCtrl.attackCollider.notColliderFlag = true;
            var showKnife = function showKnife() {
                if (knife) {
                    knife.activeNode.opacity = 255;
                    setTimeout(function () {
                        knife.knifeColliderNodeCtrl.attackCollider.notColliderFlag = false;
                    }, 400);
                }
            };

            var createEffect = function createEffect() {
                self.addEntitySys.addShowKnifeEffect(epos);
                setTimeout(showKnife, 300);
            };

            setTimeout(createEffect, i * 50);
            i++;
            index++;
        };

        var _iteratorNormalCompletion33 = true;
        var _didIteratorError33 = false;
        var _iteratorError33 = undefined;

        try {
            for (var _iterator33 = addKnifes[Symbol.iterator](), _step33; !(_iteratorNormalCompletion33 = (_step33 = _iterator33.next()).done); _iteratorNormalCompletion33 = true) {
                var knife = _step33.value;

                _loop2(knife);
            }
        } catch (err) {
            _didIteratorError33 = true;
            _iteratorError33 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion33 && _iterator33.return) {
                    _iterator33.return();
                }
            } finally {
                if (_didIteratorError33) {
                    throw _iteratorError33;
                }
            }
        }
    },

    addBoxGold: function addBoxGold(info) {
        var pos = info.node.position;
        var data = info.data;
        var count = Tools.getRandomInt(data.param[0], data.param[1] + 1);
        PlayerData.instance.updateGold(count);
        PlayerData.instance.showGold -= count;

        var offset = pos.sub(this.localPlayer.node.position).mul(this.cameraZoomCtrl.camera.zoomRatio);
        this.uiMgr.showGetMoneyEffect({
            count: 200,
            isMore: true,
            isLucky: false
        }, cc.v2(0, -200), true);
    },

    addBoxBuff: function addBoxBuff(info) {
        var canUseBuffDatas = [];
        // var buffDatas = ConfigData.instance.buffDatas;
        var buffPool = PlayerData.instance.rankData.buffPool;

        if (!buffPool) {
            return;
        }

        var _iteratorNormalCompletion34 = true;
        var _didIteratorError34 = false;
        var _iteratorError34 = undefined;

        try {
            for (var _iterator34 = buffPool[Symbol.iterator](), _step34; !(_iteratorNormalCompletion34 = (_step34 = _iterator34.next()).done); _iteratorNormalCompletion34 = true) {
                var buffId = _step34.value;

                canUseBuffDatas.push({
                    id: buffId,
                    weight: info.data.param[buffId]
                });
            }
        } catch (err) {
            _didIteratorError34 = true;
            _iteratorError34 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion34 && _iterator34.return) {
                    _iterator34.return();
                }
            } finally {
                if (_didIteratorError34) {
                    throw _iteratorError34;
                }
            }
        }

        var data = Tools.getRandomItemByWeight(canUseBuffDatas);
        if (data) {
            var buffs = this.addEntitySys.AddBuff(1, data.id);
            buffs[0].landNode.active = false;
            buffs[0].node.position = info.node.position.add(cc.v2(0, 50));
            buffs[0].node.scale = 0;

            setTimeout(function () {
                buffs[0].landNode.active = true;
            }, 300);

            var action = cc.scaleTo(0.2, 1).easing(cc.easeBackOut(3.0));
            buffs[0].node.runAction(action);
        }
    },

    getReward: function getReward(item) {
        switch (item.type) {
            case ItemType.MONEY:
                var count = item.num;
                PlayerData.instance.updateGold(count);
                PlayerData.instance.showGold -= count;
                var param = {
                    count: count,
                    isMore: true,
                    isLucky: false
                };
                this.uiMgr.showGetMoneyEffect(param, cc.v2(0, -200), true);
                break;
            case ItemType.HERO_SKIN:
                if (!PlayerData.instance.isOwnHeroSkin(item.id)) {
                    PlayerData.instance.addHeroSkin(item.id);
                    //装备上
                    this.onEquipHeroSkin(item.itemData, true);
                }
                //展示出来
                this.uiMgr.showReward(item.itemData);
                PlayerData.instance.showPanelBuySkinFlag = false;
                break;
            case ItemType.KNIFE_SKIN:
                if (!PlayerData.instance.isOwnKnifeSkin(item.id)) {
                    PlayerData.instance.addKnifeSkin(item.id);
                    this.onEquipKnifeSkin(item.itemData, true, true, false);
                }
                //展示出来
                this.uiMgr.showReward(item.itemData);
                PlayerData.instance.showPanelBuySkinFlag = false;
                break;
            case ItemType.ZONG_ZI:
                var count = item.num;
                PlayerData.instance.updateZongZi(count);
                this.uiMgr.showTips(Tools.getStringByFormat(ConfigData.instance.getUITipStr(15), count));
                break;
        }
    },
    showPanelTreasureBox: function showPanelTreasureBox() {
        // PlayerData.instance.updateKeyCount();
        // PlayerData.instance.updateKeyCount();
        // PlayerData.instance.updateKeyCount();
        if (PlayerData.instance.canShowPanelTreasureBox()) {
            this.uiMgr.showPanelTreasureBox();
        }
    },
    updateKeyCount: function updateKeyCount(node) {
        PlayerData.instance.updateKeyCount();
        this.uiMgr.showPanelKeyCount(node);
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
        //# sourceMappingURL=EntityWorld.js.map
        