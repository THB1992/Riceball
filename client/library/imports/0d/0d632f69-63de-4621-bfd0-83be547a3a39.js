"use strict";
cc._RF.push(module, '0d6329pY95GIb/Qg75Uejo5', 'Item');
// scripts/sdk/Item.js

"use strict";

var Quee = require("Quee");
var WeiShuSdk = require("WeiShuSdk");
var PlatformMgr = require('PlatformMgr');
cc.Class({
    extends: cc.Component,

    properties: {
        btn: cc.Button,
        itemID: 0
    },

    updateItem: function updateItem(itemId) {
        this.itemID = itemId;
        var url = WeiShuSdk.baseUrl + "Slot2End/boards/" + Quee.itemVals[this.itemID].imgUrl;
        var self = this;
        cc.loader.load(url, function (err, texture) {
            var sprite = new cc.SpriteFrame(texture);
            self.btn.node.getComponent(cc.Sprite).spriteFrame = sprite;
        });
    },
    onLoad: function onLoad() {
        this.btn.node.on("click", this.onClick, this);
    },
    onClick: function onClick() {
        var _this = this;

        var cfg = Quee.itemVals[this.itemID];
        if (!cfg) return;
        if (cfg.mod === 0) PlatformMgr.navgateTo(cfg, null, function () {
            Quee.updateList(_this.itemID);
        });else PlatformMgr.onPreView(cfg, function () {
            Quee.updateList(_this.itemID);
        });
    }
});

cc._RF.pop();