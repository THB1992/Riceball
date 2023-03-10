(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/ui/PanelTryOut.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ed730E8o0tG14wQiW95pHMD', 'PanelTryOut', __filename);
// scripts/battle/ui/PanelTryOut.js

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
        // knifeCountLabel: cc.Label,
        tryHeroSkinIcon: cc.Node,
        tryKnifeSkinIcon: cc.Node,

        nameLabel: cc.Label,
        goldNode: cc.Node,
        diamondNode: cc.Node,
        priceLabel: cc.RichText,
        priceDiamondLabel: cc.RichText,

        knifeCountNode: cc.Node,
        propertyNode: cc.Node,
        knifePropertyIcon: cc.Node,
        heroPropertyIcon: cc.Node,
        propertyLabel: cc.RichText,

        adverIcon: cc.Node,
        shareIcon: cc.Node,
        //language
        noThanksLabel: cc.Label
    },

    init: function init(data, callback, closeCallback) {
        var _this = this;

        if (callback) callback();
        var isHeroSkin = Tools.arrContains(ConfigData.instance.heroSkinDatas, data);
        this.tryHeroSkinIcon.active = isHeroSkin;
        this.tryKnifeSkinIcon.active = !isHeroSkin;
        // if (isHeroSkin) {
        //     this.knifeCount.string = PlayerData.instance.knifeSkin.initKnifeCount + PlayerData.instance.extraKnifeCount;
        // } else {
        //     this.knifeCount.string = data.initKnifeCount + PlayerData.instance.extraKnifeCount;
        // }

        // this.knifeCount.string = 6;
        this.closeCallback = closeCallback;
        this.nameLabel.string = data.name;
        if (data.price) {
            if (data.priceType === 0) {
                this.priceLabel.string = '<i>' + data.price + '</i> ';
            } else {
                this.priceDiamondLabel.string = '<i>' + data.price + '</i> ';
            }
        }
        this.goldNode.active = data.priceType === 0;
        this.diamondNode.active = data.priceType === 1;

        var str = data.price + '';
        this.priceLabel.fontSize = 42 - (str.length - 5) * 6;
        if (this.priceLabel.fontSize < 20) this.priceLabel.fontSize = 20;
        this.propertyNode.active = data.propertyTips ? true : false;
        this.knifePropertyIcon.active = isHeroSkin ? false : true;
        this.heroPropertyIcon.active = isHeroSkin ? true : false;
        this.propertyLabel.string = data.propertyTips ? '<i>' + data.propertyTips + '</i> ' : '';

        this.knifeCountNode.x = this.propertyNode.active ? 0 : 78;

        // AdvertMgr.instance.showBanner();

        // var stage = ConfigData.instance.getCurStage(PlayerData.instance.playCount, ConfigData.instance.clientData.adverReviveLimit);
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
        //# sourceMappingURL=PanelTryOut.js.map
        