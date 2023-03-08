"use strict";
cc._RF.push(module, '020038f+WhB6IG5qw9o8jkO', 'UIMgr');
// scripts/battle/ui/UIMgr.js

'use strict';

/**
 * @fileoverview UIMgr
 * @author meifan@gameley.cn (梅凡)
 */

var Tools = require('Tools');
var PlayerData = require('PlayerData');
var GSHome = require('GSHome');
var UIMgr = cc.Class({
    extends: cc.Component,

    properties: {
        GSGameNode: cc.Node,
        GSHomeNode: cc.Node,
        adverBlock: cc.Node,
        _GSGame: null
    },

    init: function init(world) {

        this.adverBlock.active = false;

        this._GSGame = this.GSGameNode.getComponent('GSGame');
        this._GSHome = this.GSHomeNode.getComponent('GSHome');

        this._GSGame.init(world);
        this._GSHome.init(world);

        this.GSGameNode.active = false;
        this.GSHomeNode.active = true;

        if (GSHome.gameClubButton) {
            GSHome.gameClubButton.show();
        }

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this._GSHome.userinfoBtns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var btn = _step.value;

                if (btn) btn.show();
            }
            // if (Tools.getItem('fromMyApp')) {
            //     this._GSHome.hideMyAppNode()
            // }
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
    },

    cleanUp: function cleanUp() {
        this._GSGame.cleanUp();
    },

    addPlayerRankItem: function addPlayerRankItem(entityPlayer) {
        this._GSGame.addPlayerRankItem(entityPlayer);
    },

    openGameOverPanel: function openGameOverPanel(rank) {
        this._GSGame.openGameOverPanel(rank);
    },

    closeGameOverPanel: function closeGameOverPanel() {
        this._GSGame.closeGameOverPanel();
    },

    addHeroPosArr: function addHeroPosArr(localPlayer, otherPlayer, camera) {
        this._GSGame.addHeroPosArr(localPlayer, otherPlayer, camera);
    },

    startGame: function startGame() {
        this.GSGameNode.active = true;
        this.GSHomeNode.active = false;
        this.activeGoldNode(false);
        this.activeDiamondNode(false);
    },

    hideUserInfoBtn: function hideUserInfoBtn() {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = this._GSHome.userinfoBtns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var btn = _step2.value;

                if (btn) btn.hide();
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
    },

    addSpecialNotice: function addSpecialNotice(type) {
        this._GSGame.addSpecialNotice(type);
    },
    showImportantNotice: function showImportantNotice(type) {
        this._GSGame.showImportantNotice(type);
    },

    startCountDown: function startCountDown(time) {
        this._GSGame.startCountDown(time);
    },

    showKillMsg: function showKillMsg(hero, otherHero) {
        this._GSGame.showKillMsg(hero, otherHero);
    },

    showKillNotice: function showKillNotice(killNum) {
        this._GSGame.showKillNotice(killNum);
    },

    showReviveNotice: function showReviveNotice(hero) {
        this._GSGame.showReviveNotice(hero);
    },

    showTips: function showTips(tips) {
        this._GSHome.showTips(tips);
    },

    showReward: function showReward(data, callback, errCallback) {
        this._GSHome.showReward(data, callback, errCallback);
    },

    showPanelLevelUp: function showPanelLevelUp(callback) {
        this._GSHome.showPanelLevelUp(callback);
    },

    openRevivePanel: function openRevivePanel(callback, reviveCount) {
        this._GSGame.openRevivePanel(callback, reviveCount);
    },

    refreshRedDot: function refreshRedDot() {
        this._GSHome.refreshRedDot();
    },

    showGetMoneyEffect: function showGetMoneyEffect(getGoldParam, offset, activeGoldNode) {
        this._GSHome.showGetMoneyEffect(getGoldParam, offset, activeGoldNode);
    },

    showPanelTryOut: function showPanelTryOut(data, callback, closeCallback) {
        this._GSHome.showPanelTryOut(data, callback, closeCallback);
    },

    showPanelTryFrenzy: function showPanelTryFrenzy(callback) {
        this._GSHome.showPanelTryFrenzy(callback);
    },

    showPanelTrySuit: function showPanelTrySuit(data, callback, closeCallback) {
        this._GSHome.showPanelTrySuit(data, callback, closeCallback);
    },

    showTaskNotice: function showTaskNotice(data, callback) {
        this._GSGame.showTaskNotice(data, callback);
    },

    showCountDownNode: function showCountDownNode() {
        this._GSGame.showCountDownNode();
    },

    showPanelSign: function showPanelSign(callback) {
        this._GSHome.showPanelSign(callback);
    },

    showPanelMatch: function showPanelMatch(players, callback) {
        this._GSHome.showPanelMatch(players, callback);
    },

    closePanelMatch: function closePanelMatch() {
        this._GSHome.closePanelMatch();
    },

    refreshProperty: function refreshProperty(data, isHeroSkin) {
        this._GSHome.refreshProperty(data, isHeroSkin);
    },
    // setFrenzyComp : function (player) {
    //     this._GSGame.setFrenzyComp(player);
    // },
    startLoadPrefab: function startLoadPrefab() {
        this._GSHome.startLoadPrefab();
        this._GSGame.startLoadPrefab();
    },

    showWatchAdverCount: function showWatchAdverCount() {
        this._GSHome.showWatchAdverCount();
    },

    showGuideStart: function showGuideStart(state) {
        this._GSGame.showGuideStart(state);
    },
    showGuideEnd: function showGuideEnd(state) {
        this._GSGame.showGuideEnd(state);
    },

    showGuideSpecial: function showGuideSpecial(state) {
        this._GSGame.showGuideSpecial(state);
    },

    refreshGuideProcess: function refreshGuideProcess(str) {
        this._GSGame.refreshGuideProcess(str);
    },

    showPanelVictory: function showPanelVictory() {
        this._GSGame.showPanelVictory();
    },

    showOfflineMultip: function showOfflineMultip(callback) {
        this._GSHome.showOfflineMultip(callback);
    },

    refreshOfflineGoldData: function refreshOfflineGoldData() {
        this._GSHome.refreshOfflineGoldData();
    },

    showPanelRepay: function showPanelRepay(callback) {
        this._GSHome.showPanelRepay(callback);
    },

    showUnlockGrow: function showUnlockGrow(callback) {
        this._GSHome.showUnlockGrow(callback);
    },

    showPanelAddTop: function showPanelAddTop(callback) {
        this._GSHome.showPanelAddTop(callback);
    },

    showPanelInvite: function showPanelInvite(callback) {
        this._GSHome.showPanelInvite(callback);
    },

    showPanelDailyTask: function showPanelDailyTask(callback) {
        this._GSHome.showPanelDailyTask(callback);
    },

    activeGoldNode: function activeGoldNode(active) {
        this._GSHome.activeGoldNode(active);
    },

    activeDiamondNode: function activeDiamondNode(active) {
        this._GSHome.activeDiamondNode(active);
    },

    closePanelShop: function closePanelShop(isKnife) {
        this._GSHome.onPanelShopClose(isKnife);
        AdvertMgr.instance.showBanner();
    },

    openAdverBlock: function openAdverBlock() {
        var _this = this;

        this.adverBlock.active = true;
        setTimeout(function () {
            _this.closeAdverBlock();
        }, 100);
    },

    closeAdverBlock: function closeAdverBlock() {
        this.adverBlock.active = false;
        console.log('uimgr:closeAdverBlock');
    },

    showActiveSuitEffect: function showActiveSuitEffect() {
        this._GSHome.showActiveSuitEffect();
    },

    showPanelRewardDetail: function showPanelRewardDetail() {
        this._GSHome.showPanelRewardDetail();
    },

    showPanelPKReward: function showPanelPKReward(data, callback) {
        this._GSHome.showPanelPKReward(data, callback);
    },

    showPanelWorldReward: function showPanelWorldReward(data, callback) {
        this._GSHome.showPanelWorldReward(data, callback);
    },

    showPanelHolidayRank: function showPanelHolidayRank(isPK, callback) {
        this._GSHome.showPanelHolidayRank(isPK, callback);
    },

    hidePanelHolidayUserinfoBtns: function hidePanelHolidayUserinfoBtns() {
        this._GSHome.hidePanelHolidayUserinfoBtns();
    },

    showPanelSubscribeReward: function showPanelSubscribeReward(callback) {
        this._GSHome.showPanelSubscribeReward(callback);
    },

    showPanelSubscribe: function showPanelSubscribe(callback) {
        this._GSHome.showPanelSubscribe(callback);
    },

    showPanelBuySkin: function showPanelBuySkin(callback) {
        this._GSHome.showPanelBuySkin(callback);
    },

    onPanelShopClose: function onPanelShopClose(isKnife) {
        this._GSHome.onPanelShopClose(isKnife);
    },
    showPanelTreasureBox: function showPanelTreasureBox() {
        this._GSGame.showPanelTreasureBox();
    },

    showPanelKeyCount: function showPanelKeyCount(node) {
        this._GSGame.showPanelKeyCount(node);
    },

    showPanelEvaulate: function showPanelEvaulate(callback) {
        this._GSHome.showPanelEvaulate(callback);
    },

    openPanelKeyCount: function openPanelKeyCount(active) {
        this._GSGame.openPanelKeyCount(active);
    }
});

cc._RF.pop();