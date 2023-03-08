"use strict";
cc._RF.push(module, '894ff0YZVhLh6VOghnnqGFT', 'PanelBuySkin');
// scripts/battle/ui/PanelBuySkin.js

'use strict';

var GameData = require('GameData');
var ConfigData = require('ConfigData');
var PlayerData = require('PlayerData');
var PlatformMgr = require('PlatformMgr');
var ShareType = require('Types').ShareType;
var AdvertMgr = require('AdvertMgr');
var AdverType = require('Types').AdverType;
var Tools = require('Tools');
var UIUtil = require('UIUtil');
var ItemType = require('Types').ItemType;
var StageType = require('Types').StageType;

cc.Class({
    extends: cc.Component,

    properties: {

        rootAnim: cc.Animation,

        iconSprite: cc.Sprite,

        buyKnifeTitleNode: cc.Node,
        buyHeroTitleNode: cc.Node,
        adverKnifeTitleNode: cc.Node,
        adverHeroTitleNode: cc.Node,

        nameLabel: cc.Label,
        goldLabel: cc.Label,
        unlockCountLabel: cc.Label,

        buyBtn: cc.Node,
        adverBtn: cc.Node,
        parctialPool: [cc.ParticleSystem],
        valueLabel: cc.Label
    },

    init: function init(callback, world) {
        this.rootAnim.play();
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.parctialPool[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var p = _step.value;

                p.resetSystem();
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

        this.world = world;
        this.callback = callback;
        this.skinData = PlayerData.instance.finalGetSkin;
        if (this.skinData) {

            this.nameLabel.string = this.skinData.name;
            this.goldLabel.string = this.skinData.price;
            this.isKnifeSkin = ConfigData.instance.heroSkinDatas.indexOf(this.skinData) === -1;

            UIUtil.loadResSprite(this.iconSprite, this.skinData.url);
            this.iconSprite.node.rotation = this.isKnifeSkin ? 90 : 0;

            var curTime = PlayerData.instance.getCurTime();
            var knifeSkinDatas = ConfigData.instance.knifeSkinDatas.slice();
            var ownKnifeSkins = PlayerData.instance.ownKnifeSkins;
            Tools.filterDataByTime(knifeSkinDatas, ownKnifeSkins, curTime, GameData.instance, ConfigData.instance.clientData.hideSpecialSkin, PlatformMgr.isIOS(), PlatformMgr.isApp());

            var heroSkinDatas = ConfigData.instance.heroSkinDatas.slice();
            var ownHeroSkins = PlayerData.instance.ownHeroSkins;
            Tools.filterDataByTime(heroSkinDatas, ownHeroSkins, curTime, GameData.instance, ConfigData.instance.clientData.hideSpecialSkin, PlatformMgr.isIOS(), PlatformMgr.isApp());

            this.valueLabel.string = 'Value';
            this.unlockCountLabel.string = this.isKnifeSkin ? ConfigData.instance.getLanguageStr('Unlocked weapon') + ':' + ownKnifeSkins.length + '/' + knifeSkinDatas.length : ConfigData.instance.getLanguageStr('Unlocked hero') + ':' + ownHeroSkins.length + '/' + heroSkinDatas.length;

            this.buyKnifeTitleNode.active = !this.skinData.isGetByAdver && this.isKnifeSkin;
            this.buyHeroTitleNode.active = !this.skinData.isGetByAdver && !this.isKnifeSkin;
            this.adverKnifeTitleNode.active = this.skinData.isGetByAdver && this.isKnifeSkin;
            this.adverHeroTitleNode.active = this.skinData.isGetByAdver && !this.isKnifeSkin;

            this.buyBtn.active = !this.skinData.isGetByAdver;
            this.adverBtn.active = this.skinData.isGetByAdver;

            if (this.skinData.isGetByAdver) AdvertMgr.instance.openAdver(AdverType.BuySkin);
        } else {
            this.onClose();
        }
        // skinData.isGetByAdver;

    },
    onBuyBtnClick: function onBuyBtnClick() {
        if (PlayerData.instance.gold >= this.skinData.price) {
            PlayerData.instance.updateGold(-this.skinData.price);
            if (this.isKnifeSkin) {
                PlayerData.instance.addKnifeSkin(this.skinData.id);
                this.world.onEquipKnifeSkin(this.skinData, true);
            } else {
                PlayerData.instance.addHeroSkin(this.skinData.id);
                this.world.onEquipHeroSkin(this.skinData, true);
            }
            this.world.uiMgr.showReward(this.skinData);
        } else {
            this.world.uiMgr.showTips(7);
        }
        this.onClose();
    },


    adverBtnClick: function adverBtnClick() {
        var _this = this;

        // 关闭广告时回调
        var closeFunc = function closeFunc(success) {
            if (success) {
                if (_this.isKnifeSkin) {
                    PlayerData.instance.addKnifeSkin(_this.skinData.id);
                    _this.world.onEquipKnifeSkin(_this.skinData, true);
                } else {
                    PlayerData.instance.addHeroSkin(_this.skinData.id);
                    _this.world.onEquipHeroSkin(_this.skinData, true);
                }
                _this.world.uiMgr.showReward(_this.skinData);
                _this.onClose();
            }
        };
        var errFunc = function errFunc() {
            _this.world.uiMgr.showTips(4);
        };

        AdvertMgr.instance.showAdver(AdverType.BuySkin, closeFunc, errFunc);
    },

    onClose: function onClose() {
        this.node.active = false;
        if (this.callback) this.callback();
    },
    onBtnClose: function onBtnClose() {
        this.node.active = false;

        var id = this.isKnifeSkin ? this.skinData.id + 1000 : this.skinData.id + 2000;
        if (this.skinData.isGetByAdver) {
            PlayerData.instance.updateRefuseAdverPool(id);
        } else {
            PlayerData.instance.updateRefuseBuyPool(id);
        }
        if (this.callback) this.callback();
    }
});

cc._RF.pop();