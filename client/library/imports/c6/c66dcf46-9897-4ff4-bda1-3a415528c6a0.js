"use strict";
cc._RF.push(module, 'c66dc9GmJdP9L2hOkFVKMag', 'PanelTryFrenzy');
// scripts/battle/ui/PanelTryFrenzy.js

'use strict';

var Tools = require('Tools');
var ConfigData = require('ConfigData');
var PlayerData = require('PlayerData');
var AdvertMgr = require('AdvertMgr');
var AdverType = require('Types').AdverType;
var ShareMgr = require('ShareMgr');
var ShareType = require('Types').ShareType;
var StageType = require('Types').StageType;

cc.Class({
    extends: cc.Component,

    properties: {
        adverIcon: cc.Node,
        shareIcon: cc.Node
    },

    init: function init(closeCallback) {
        var _this = this;

        this.closeCallback = closeCallback;
        // AdvertMgr.instance.showBanner();

        // var stage = ConfigData.instance.getCurStage(PlayerData.instance.playCount, ConfigData.instance.clientData.adverReviveLimit);
        var stage = ConfigData.instance.getCurStageByPrizeCount(PlayerData.instance);

        switch (stage) {
            case StageType.Free:
                this.adverIcon.active = false;
                this.shareIcon.active = false;
                break;
            case StageType.Share:
                this.adverIcon.active = false;
                this.shareIcon.active = true;
                break;
            case StageType.Adver:
                var func = function func(hasAdver) {
                    _this.adverIcon.active = hasAdver;
                    _this.shareIcon.active = !hasAdver;

                    if (hasAdver) {
                        AdvertMgr.instance.openAdver(AdverType.TryOutSkin);
                    }
                };

                AdvertMgr.instance.loadAdver(AdverType.TryOutSkin, func);
                break;
        }
    },

    closeBtnClick: function closeBtnClick() {
        if (this.isAdver) return;
        if (this.closeCallback) this.closeCallback(false);
        this.node.active = false;
        // AdvertMgr.instance.destoryBanner();
    },

    adverBtnClick: function adverBtnClick() {
        this.isAdver = true;
        var self = this;
        // 关闭广告时回调
        var closeFunc = function closeFunc(success) {
            if (success) {
                if (self.closeCallback) self.closeCallback(true);
                // AdvertMgr.instance.destoryBanner();
                self.node.active = false;
            }
            self.isAdver = false;
        };
        // 打开广告失败时回调,失败回调
        var errFunc = function errFunc() {
            self.showShare();
            self.isAdver = false;
        };

        if (this.shareIcon.active) {
            self.showShare();
            self.isAdver = false;
        } else {
            AdvertMgr.instance.showAdver(AdverType.TryOutSkin, closeFunc, errFunc);
        }
    },

    showShare: function showShare() {
        var self = this;
        ShareMgr.share(ShareType.TryOutSkin, function (success) {
            if (success) {
                if (self.closeCallback) self.closeCallback(true);
                // AdvertMgr.instance.destoryBanner();
                self.node.active = false;
            }
        });
    }
});

cc._RF.pop();