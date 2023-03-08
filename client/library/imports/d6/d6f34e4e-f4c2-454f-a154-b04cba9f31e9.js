"use strict";
cc._RF.push(module, 'd6f345O9MJFT6FUsEy6nzHp', 'ItemMatch');
// scripts/battle/ui/ItemMatch.js

'use strict';

var UIUtil = require('UIUtil');
cc.Class({
    extends: cc.Component,

    properties: {
        iconSprite: cc.Sprite
    },

    init: function init(player) {
        UIUtil.loadResPortrait(this.iconSprite, player);
        this.iconSprite.node.active = false;
    },

    showIcon: function showIcon() {
        this.iconSprite.node.active = true;
    }

    // update (dt) {},
});

cc._RF.pop();