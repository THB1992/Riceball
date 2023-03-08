"use strict";
cc._RF.push(module, 'a8bb4a42ApKkb2MOf/iY53q', 'ItemRankMini');
// scripts/battle/ui/ItemRankMini.js

'use strict';

var UIUtil = require('UIUtil');
cc.Class({
    extends: cc.Component,

    properties: {
        iconSprite: cc.Sprite,
        starCountLabel: cc.Label
    },

    init: function init(data) {
        UIUtil.loadResSprite(this.iconSprite, data.url);
        this.starCountLabel.string = data.star;
    }
}

// update (dt) {},
);

cc._RF.pop();