"use strict";
cc._RF.push(module, '6c2d2OTFCxFC5sduV7NufWz', 'PanelSign');
// scripts/battle/ui/PanelSign.js

'use strict';

var UIUtil = require('UIUtil');
var ConfigData = require('ConfigData');
var PlayerData = require('PlayerData');
var ShareMgr = require('ShareMgr');
var ShareType = require('Types').ShareType;
var AdvertMgr = require('AdvertMgr');
var AdverType = require('Types').AdverType;
var Tools = require('Tools');
var BagItem = require('BagItem');
var ItemType = require('Types').ItemType;
var StageType = require('Types').StageType;

cc.Class({
    extends: cc.Component,

    properties: {
        goldNode: cc.Node,
        skinNode: cc.Node,
        closeNode: cc.Node,

        itemSignPrefab: cc.Prefab,
        itemParent: cc.Node,

        //皮肤领取按钮
        shareIcon: cc.Node,
        adverIcon: cc.Node,
        //金币领取按钮
        goldShareIcon: cc.Node,
        goldAdverIcon: cc.Node,

        itemPool: [],

        //language
        refuseSkinLabel: cc.Label,
        refuseGoldLabel: cc.Label
    },

    init: function init(world, callback) {
        var _this = this;

        this.world = world;
        this.callback = callback;

        var signCount = PlayerData.instance.signCount;
        var daySign = PlayerData.instance.daySign;
        var signDatas = ConfigData.instance.signDatas;

        if (signCount >= 7) {
            signDatas = ConfigData.instance.lateSignDatas;
        };

        for (var i = 0; i < 7; i++) {
            var data = signDatas[i];
            var itemNode = this.itemPool[i];
            if (!itemNode) {
                itemNode = cc.instantiate(this.itemSignPrefab);
                this.itemPool[i] = itemNode;
            }

            itemNode.parent = this.itemParent;
            itemNode.x = i % 3 * 235;
            itemNode.y = Math.floor(i / 3) * -240;
            if (i === 6) {
                itemNode.position = cc.v2(235, -480);
            }

            var isGet = signCount % 7 > i || signCount % 7 === i && daySign;
            var item = BagItem.createItemWithString(data.reward);
            switch (item.type) {
                case ItemType.HERO_SKIN:
                    isGet = PlayerData.instance.isOwnHeroSkin(item.id);
                    break;
                case ItemType.KNIFE_SKIN:
                    isGet = PlayerData.instance.isOwnKnifeSkin(item.id);
                    break;
            }

            var itemComp = itemNode.getComponent('ItemSign');
            var isCheck = false;
            if (signCount % 7 === i) {
                if (isGet) {
                    this.checkItem = null;
                    PlayerData.instance.daySign = true;
                } else {
                    this.checkItem = itemComp;
                    isCheck = true;
                }
            }

            itemComp.init(data, item, i);
            itemComp.refresh(isGet, isCheck);
        }

        AdvertMgr.instance.fireBaseEvent("page_show_login_reward");

        if (this.checkItem) {
            var isGold = this.checkItem.item.type === ItemType.MONEY;
            this.goldNode.active = isGold;
            this.skinNode.active = !isGold;
            // this.closeNode.active = true;
            // this.receiveNode.active = false;
            this.stage = ConfigData.instance.getCurStageByPrizeCount(PlayerData.instance);

            var func = function func(hasAdver) {
                _this.adverIcon.active = hasAdver;
                _this.shareIcon.active = !hasAdver;
                _this.goldAdverIcon.active = hasAdver;
                _this.goldShareIcon.active = !hasAdver;

                if (hasAdver) {
                    AdvertMgr.instance.openAdver(AdverType.Sign);
                }
            };

            switch (this.stage) {
                case StageType.Free:
                    break;
                case StageType.Share:
                    func(false);
                    break;
                case StageType.Adver:
                    AdvertMgr.instance.loadAdver(AdverType.Sign, func);
                    break;
            }
        } else {
            // this.closeNode.active = true;
            this.goldNode.active = false;
            this.skinNode.active = false;
        }
        // this.skinNode.active =true;
        // AdvertMgr.instance.showBanner();

        // this.stage = ConfigData.instance.getCurStage(PlayerData.instance.playCount, ConfigData.instance.clientData.multipGoldLimit);

        this.refuseSkinLabel.string = "No,thanks";
        this.refuseGoldLabel.string = 'Get';
    },

    onGetSkinBtnClick: function onGetSkinBtnClick() {
        var self = this;
        // 关闭广告时回调
        var itemComp = self.checkItem;
        var skinId = itemComp.item.id;
        var closeFunc = function closeFunc(success) {
            if (success) {
                switch (itemComp.item.type) {
                    case ItemType.HERO_SKIN:
                        PlayerData.instance.addHeroSkin(skinId);
                        //装备上
                        var data = ConfigData.instance.getHeroSkinById(skinId);
                        self.world.onEquipHeroSkin(data, true);
                        //展示出来
                        self.world.uiMgr.showReward(data);
                        break;
                    case ItemType.KNIFE_SKIN:
                        PlayerData.instance.addKnifeSkin(skinId);
                        //装备上
                        var data = ConfigData.instance.getKnifeSkinById(skinId);
                        self.world.onEquipKnifeSkin(data, true);
                        //展示出来
                        self.world.uiMgr.showReward(data);
                        break;
                }
                self.onReceive();
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
        var _this2 = this;

        var errFunc = function errFunc() {
            _this2.showShare(closeFunc);
        };

        AdvertMgr.instance.fireBaseEvent("click_adv_btn", "position_id", ConfigData.instance.getAdvertUnitId(AdverType.Sign));

        AdvertMgr.instance.showAdver(AdverType.Sign, closeFunc, errFunc);
    },

    showShare: function showShare(closeFunc) {
        ShareMgr.share(ShareType.Sign, closeFunc);
    },

    onReduceSkinBtnClick: function onReduceSkinBtnClick() {
        this.close();
        if (this.callback) this.callback();
    },

    close: function close() {
        this.node.active = false;
        this.world.uiMgr.activeGoldNode(true);
        this.world.uiMgr.activeDiamondNode(true);
    },


    onMultipGoldBtnClick: function onMultipGoldBtnClick() {
        var self = this;
        var item = self.checkItem.item;
        // 关闭广告时回调
        var closeFunc = function closeFunc(success) {
            if (success) {
                var count = item.num * 3;
                PlayerData.instance.updateGold(count);
                PlayerData.instance.showGold -= count;
                var param = {
                    count: count,
                    isMore: true,
                    isLucky: false
                };
                self.world.uiMgr.showGetMoneyEffect(param);
                self.onReceive();
            }
        };

        if (this.goldShareIcon.active) {
            this.showShare(closeFunc);
        } else if (this.goldAdverIcon.active) {
            this.showAdver(closeFunc);
        } else {
            closeFunc(true);
        }
    },

    onNormalGoldBtnClick: function onNormalGoldBtnClick() {
        var item = this.checkItem.item;
        var count = item.num;
        PlayerData.instance.updateGold(count);
        PlayerData.instance.showGold -= count;
        var param = {
            count: count,
            isMore: false,
            isLucky: false
        };
        this.world.uiMgr.showGetMoneyEffect(param);

        this.onReceive();
    },

    onReceive: function onReceive() {
        PlayerData.instance.updateSignCount();
        this.checkItem.refresh(true, false);
        this.world.uiMgr.refreshRedDot();
        this.close();
        if (this.callback) this.callback();
    }
});

cc._RF.pop();