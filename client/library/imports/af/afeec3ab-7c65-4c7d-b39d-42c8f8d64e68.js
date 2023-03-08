"use strict";
cc._RF.push(module, 'afeecOrfGVMfbOdQsj41k5o', 'PanelTrySuit');
// scripts/battle/ui/PanelTrySuit.js

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
        suitNameLabel: cc.Label,
        suitHeroNameLabel: cc.Label,
        suitKnifeNameLabel: cc.Label,
        suitSkillLabel: cc.Label,

        adverIcon: cc.Node,
        shareIcon: cc.Node,
        suitIntroduce: cc.Node,

        //language
        noThanksLabel: cc.Label
    },

    init: function init(suitData, callback, closeCallback) {
        var _this = this;

        var heroData = ConfigData.instance.getHeroSkinById(suitData.heroSkin);
        var knifeData = ConfigData.instance.getKnifeSkinById(suitData.knifeSkin);
        if (callback) callback(heroData, knifeData);
        this.closeCallback = closeCallback;
        var isOwnHeroSkin = PlayerData.instance.isOwnHeroSkin(heroData.id);
        var isOwnKnifeSkin = PlayerData.instance.isOwnKnifeSkin(knifeData.id);

        this.suitNameLabel.string = suitData.name;
        this.suitHeroNameLabel.string = heroData.name;
        // this.suitHeroNameLabel.node.color = isOwnHeroSkin ? cc.Color.GREEN : cc.Color.RED;
        this.suitKnifeNameLabel.string = knifeData.name;
        // this.suitKnifeNameLabel.node.color = isOwnKnifeSkin ? cc.Color.GREEN : cc.Color.RED;
        this.suitSkillLabel.string = suitData.skillTips;

        var introduces = this.suitIntroduce.children;
        for (var i = 0; i < introduces.length; i++) {
            introduces[i].active = i + 1 === suitData.id;
        }

        var stage = ConfigData.instance.getCurStageByPrizeCount(PlayerData.instance);
        switch (stage) {
            case StageType.Free:
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
        this.noThanksLabel.string = "No,thanks";
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