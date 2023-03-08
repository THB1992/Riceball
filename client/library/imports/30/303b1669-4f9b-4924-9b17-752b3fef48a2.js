"use strict";
cc._RF.push(module, '303b1ZpT5tJJJsXdSs/70ii', 'ItemPKReward');
// scripts/battle/ui/ItemPKReward.js

'use strict';

var ListItemBase = require('ListItemBase');
var UIUtil = require('UIUtil');
var BagItem = require('BagItem');
var ItemType = require('Types').ItemType;
cc.Class({
    extends: ListItemBase,

    properties: {
        rankLabel: cc.Label,
        goldLabel: cc.Label,
        diamondLabel: cc.Label
    },

    init: function init(data) {
        var str;
        if (data.endRank) {
            str = '第' + data.rank + '-' + data.endRank + '名';
        } else {
            str = '第' + data.rank + '名';
        }
        this.rankLabel.string = str;

        var items = BagItem.createItemsWithString(data.reward);
        for (var i = 0; i < items.length; i++) {
            switch (items[i].type) {
                case ItemType.MONEY:
                    this.goldLabel.string = 'x' + items[i].num;
                    break;
                case ItemType.ZONG_ZI:
                    this.diamondLabel.string = 'x' + items[i].num;
                    break;
            }
        }
    }
}

// update (dt) {},
);

cc._RF.pop();