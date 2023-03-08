"use strict";
cc._RF.push(module, '8cf135jHlpOfqarsq5YEDk4', 'ItemShopItem');
// scripts/battle/ui/ItemShopItem.js

'use strict';

var PayMgr = require('PayMgr');
var AdvertMgr = require('AdvertMgr');
var PlayerData = require('PlayerData');
var AdverType = require('Types').AdverType;
var Tools = require('Tools');
var ConfigData = require('ConfigData');

cc.Class({
    extends: cc.Component,

    properties: {
        icon: cc.Sprite,
        desc: cc.Label,
        price: cc.Node,
        free: cc.Node,
        tv: cc.Node,
        buyBtn: cc.Node,
        remainTime: cc.Label,

        _world: cc.Node,
        _lastFreeDiamondTime: 0,
        _curTime: ''
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init: function init(data, world) {
        this._data = data;
        this._world = world;
        this.desc.getComponent(cc.Label).string = this._data.desc ? this._data.desc : '';
        if (!this._data.isAdItem) {
            this.price.getComponent(cc.Label).string = this._data.price ? this._data.price : '';
        } else {
            this.tv.active = true;
            this.free.active = true;
            this.price.active = false;

            this.buyBtn.active = PlayerData.instance.getCanGetFreeDiamond();
            this._lastFreeDiamondTime = PlayerData.instance.getLastFreeDiamondTime();
        }
    },
    resetPrice: function resetPrice(priceString) {
        if (this._data.isAdItem) return;
        this.price.getComponent(cc.Label).string = priceString;
    },
    resetIcon: function resetIcon(spFrame) {
        this.icon.spriteFrame = spFrame;
    },


    onBuyBtnClick: function onBuyBtnClick() {
        var _this = this;

        if (PayMgr.instance.getIsPaying()) {
            return;
        }

        var closeFunc = function closeFunc(isSuccess) {
            PayMgr.instance.setIsPaying(false);
            if (isSuccess) {
                AdvertMgr.instance.fireBaseEvent("purchase_product_success", "product_id", _this._data.isAdItem ? "ads for diamond" : "diamonds");
                if (_this._data.isAdItem) {
                    PlayerData.instance.updateLastFreeDiamondTime();
                    _this.setFreeBuyBtnActive(false);
                }
                PlayerData.instance.updateZongZi(_this._data.diamond);
                _this._world.uiMgr.showTips(Tools.getStringByFormat(ConfigData.instance.getUITipStr(15), _this._data.diamond));
            }
        };

        var errorFunc = function errorFunc() {
            PayMgr.instance.setIsPaying(false);
            _this._world.uiMgr.showTips(Tools.getStringByFormat(ConfigData.instance.getUITipStr(23)));
        };

        setTimeout(function () {
            PayMgr.instance.setIsPaying(false);
        }, 1800);
        if (this._data.isAdItem) {
            AdvertMgr.instance.fireBaseEvent("purchase_product", "product_id", "ads for diamond");

            AdvertMgr.instance.showAdver(AdverType.ShopFreeDiamond, closeFunc);
        } else {
            AdvertMgr.instance.fireBaseEvent("purchase_product", "product_id", "diamonds");

            PayMgr.instance.setIsPaying(true);
            PayMgr.instance.payByIndex(this._data.payIndex, closeFunc, errorFunc);
        }
    },

    setFreeBuyBtnActive: function setFreeBuyBtnActive(isActive) {
        this._lastFreeDiamondTime = PlayerData.instance.getLastFreeDiamondTime();
        this.buyBtn.active = isActive;
    },

    update: function update(dt) {
        if (this._data.isAdItem && !this.buyBtn.active) {
            if (PlayerData.instance.getCanGetFreeDiamond()) {
                this.setFreeBuyBtnActive(true);
                return;
            }
            var timeString = Tools.getRemainTimeStr(PlayerData.instance.getCurTime(), this._lastFreeDiamondTime + 24 * 60 * 60 * 1000);
            if (timeString != this._curTime) {
                this._curTime = timeString;
                this.remainTime.string = this._curTime;
            }
        }
    }
});

cc._RF.pop();