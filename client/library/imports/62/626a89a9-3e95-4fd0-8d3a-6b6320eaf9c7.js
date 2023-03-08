"use strict";
cc._RF.push(module, '626a8mpPpVP0I06a2Mg6vnH', 'PanelRevive');
// scripts/battle/ui/PanelRevive.js

'use strict';

var Tools = require('Tools');
var ConfigData = require('ConfigData');
var PlayerData = require('PlayerData');
var ShareMgr = require('ShareMgr');
var ShareType = require('Types').ShareType;
var AdvertMgr = require('AdvertMgr');
var AdverType = require('Types').AdverType;
var GameData = require('GameData');
var StageType = require('Types').StageType;
var PlatformMgr = require('PlatformMgr');

cc.Class({
    extends: cc.Component,

    properties: {
        timeLabel: cc.Label,
        reviveBtn: cc.Node,
        bornAndFrenzyIcon: cc.Node,
        bornIcon: cc.Node,
        adverIcon: cc.Node,
        shareIcon: cc.Node,

        baozouEffect: cc.Node,

        textNode: cc.Node,
        baozouAnim: cc.Animation
    },

    init: function init(callback, reviveCount, GSGame) {
        var _this = this;

        this.GSGame = GSGame;
        this.callback = callback;
        this.startUpdate = true;
        this.time = 5;
        this.textNode.x = 0;
        // var stage = ConfigData.instance.getCurStage(PlayerData.instance.playCount, ConfigData.instance.clientData.adverReviveLimit);
        var stage = ConfigData.instance.getCurStageByPrizeCount(PlayerData.instance);
        this.GSGame.openPanelKeyCount(true);

        if (!PlatformMgr.isApp() && PlayerData.instance.lastRevieAdFail && ConfigData.instance.clientData.adverReviveFailToShare) {
            if (GameData.instance.isShowLog()) {
                console.log('上次复活视频观看失败，本次强制分享');
            }

            stage = StageType.Share;
            PlayerData.instance.lastRevieAdFail = false;
        }

        switch (stage) {
            case StageType.Free:
                this.adverIcon.active = false;
                this.shareIcon.active = false;
                this.textNode.x = -20;
                break;
            case StageType.Share:
                this.adverIcon.active = false;
                this.shareIcon.active = true;
                break;
            case StageType.Adver:
                PlayerData.instance.lastRevieAdFail = true;
                var func = function func(hasAdver) {
                    _this.adverIcon.active = hasAdver;
                    _this.shareIcon.active = !hasAdver;

                    if (hasAdver) {
                        AdvertMgr.instance.openAdver(AdverType.Revive);
                    }
                };

                if (!PlatformMgr.isApp() && this.GSGame.panelTop.getComponent('PanelTop')._time < 20) {
                    func(false);
                } else {
                    AdvertMgr.instance.loadAdver(AdverType.Revive, func);
                }
                break;
        }

        // var canFrenzy = PlayerData.instance.rankData.id >= ConfigData.instance.clientData.frenzyLimit;
        var canFrenzy = true;
        this.bornAndFrenzyIcon.active = canFrenzy;
        this.bornIcon.active = !canFrenzy;
        this.baozouEffect.active = canFrenzy;
        var animState = this.baozouAnim.play();
        animState.speed = 0.2;
        // AdvertMgr.instance.showBanner();
    },

    //暴走复活
    onReviveFrenzyBtnClick: function onReviveFrenzyBtnClick() {
        var _this2 = this;

        this.startUpdate = false;
        var self = this;
        var closeFunc = function closeFunc(success) {
            if (success && self.callback) {
                PlayerData.instance.lastRevieAdFail = false;
                if (self.callback) self.callback(true, _this2.bornAndFrenzyIcon.active);
                // AdvertMgr.instance.destoryBanner();
                self.close();
            } else {
                self.startUpdate = true;
            }
        };

        if (this.shareIcon.active) {
            this.showShare(closeFunc);
        } else if (this.adverIcon.active) {
            this.showAdver(closeFunc);
        } else {
            closeFunc(true);
        }
    },

    showAdver: function showAdver(closeFunc) {
        var self = this;
        var errFunc = function errFunc() {
            self.showShare(closeFunc);
        };
        AdvertMgr.instance.showAdver(AdverType.Revive, closeFunc, errFunc);
        AdvertMgr.instance.fireBaseEvent("click_adv_btn", "position_id", ConfigData.instance.getAdvertUnitId(AdverType.Revive));
    },

    showShare: function showShare(closeFunc) {
        var self = this;
        var tipsFunc = function tipsFunc(isSuccess) {
            var tips = ConfigData.instance.clientData.shareFailTips;
            var str = isSuccess ? ConfigData.instance.getUITipStr(1) : Tools.getRandomItem(tips);
            self.GSGame.showTips(str);
        };
        ShareMgr.share(ShareType.Revive, closeFunc, tipsFunc);
    },

    update: function update(dt) {
        if (this.startUpdate) {
            this.time -= dt;
            var str = Math.floor(this.time);
            if (this.timeLabel.string !== str) {
                this.timeLabel.string = str;
            }

            if (this.time < 0) {
                this.time = 5;
                this.startUpdate = false;
                this.callback(false);
                // AdvertMgr.instance.destoryBanner();
                this.close();
            }
        }
    },
    close: function close() {
        this.node.active = false;
        this.GSGame.openPanelKeyCount(false);
    }
});

cc._RF.pop();