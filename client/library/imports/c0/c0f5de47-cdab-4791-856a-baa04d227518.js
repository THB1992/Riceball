"use strict";
cc._RF.push(module, 'c0f5d5HzatHkYVquqBNInUY', 'PanelShop');
// scripts/battle/ui/PanelShop.js

'use strict';

/**
 * @fileoverview PanelShop
 */
var PayMgr = require('PayMgr');
var ConfigData = require('ConfigData');
var PlatformMgr = require('PlatformMgr');

//假期排行
var PanelShop = cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: cc.Node,
        content: cc.Node,
        waitNode: cc.Node,
        iconSpriteFrames: [cc.SpriteFrame],

        _itemNodes: [],
        _isInit: false,
        _world: cc.Node,
        _priceString: '',
        callback: null
    },
    // LIFE-CYCLE CALLBACKS:
    onLoad: function onLoad() {
        var _this = this;

        var queryCallbackFunc = function queryCallbackFunc(priceString) {
            console.log('onLoad priceString=======' + priceString);
            _this._priceString = priceString;
            _this.setWaitNodeActive(false);
        };

        setTimeout(function () {
            _this.setWaitNodeActive(false);
        }, 1000);

        this.setWaitNodeActive(true);
        PayMgr.instance.requestProductPrices(queryCallbackFunc);
    },
    init: function init(world, callback) {
        this._world = world;

        if (!this._isInit) {
            this.initItems();
            this._isInit = true;
        }

        this.callback = callback;
    },


    setWaitNodeActive: function setWaitNodeActive(isActive) {
        this.waitNode.active = isActive;
    },

    initItems: function initItems() {
        var shopDatas = ConfigData.instance.getShopDatas();
        for (var i = 0; i < shopDatas.length; i++) {
            var data = shopDatas[i];
            var itemNode = cc.instantiate(this.itemPrefab);
            itemNode.parent = this.content;
            itemNode.active = true;
            var itemNodeSc = itemNode.getComponent('ItemShopItem');
            itemNodeSc.init(data, this._world);
            if (data.iconIndex && this.iconSpriteFrames[data.iconIndex]) {
                itemNodeSc.resetIcon(this.iconSpriteFrames[data.iconIndex]);
            }
            this._itemNodes.push(itemNode);
        }

        this.resetPrices(this._priceString);
    },


    resetPrices: function resetPrices(priceString) {
        console.log("priceString==> ", priceString);
        if (!priceString) return;
        if (priceString === "") return;
        var splitStr = PlatformMgr.isIosApp() ? '?' : '#';
        var prices = priceString.split(splitStr);

        var pricesnew = [];
        for (var index = 0; index < prices.length; index++) {
            var price = prices[index];
            if (prices[index].includes("2.99")) {
                continue;
            }
            pricesnew.push(price);
        }

        for (var i = 0; i < this._itemNodes.length; i++) {
            var itemNode = this._itemNodes[i];
            var itemNodeSc = itemNode.getComponent('ItemShopItem');
            if (i >= pricesnew.length) break;
            console.log("价格", pricesnew[i]);
            itemNodeSc.resetPrice(pricesnew[i]);
        }
    },

    close: function close() {
        this.node.active = false;
        if (this.callback) {
            this.callback();
            this.callback = null;
        }
    },
    update: function update(dt) {
        if (PlatformMgr.isIosApp() && !this.waitNode.active && PayMgr.instance.getIsPaying()) {
            this.setWaitNodeActive(true);
        }

        if (PlatformMgr.isIosApp() && this.waitNode.active && !PayMgr.instance.getIsPaying()) {
            this.setWaitNodeActive(false);
        }
    }
}

// update (dt) {},
);

cc._RF.pop();