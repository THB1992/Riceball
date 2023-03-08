"use strict";
cc._RF.push(module, 'a8ca6NUn6xOeqDmjdV1BccV', 'PanelTaskNotice');
// scripts/battle/ui/PanelTaskNotice.js

'use strict';

var ItemType = require('Types').ItemType;
var UIUtil = require('UIUtil');
var ConfigData = require('ConfigData');
var AddEntitySystem = require('AddEntitySystem');
cc.Class({
    extends: cc.Component,

    properties: {
        taskLabel: cc.Label,
        taskIcon: cc.Sprite
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init: function init(data, callback) {
        var rewardData = {};
        if (data.rewardType === ItemType.HERO_SKIN) {
            rewardData = ConfigData.instance.getHeroSkinById(data.rewardId);
            this.taskIcon.node.scale = 0.5;
            UIUtil.loadResSprite(this.taskIcon, rewardData.url);
            // AddEntitySystem.instance.loadHeroSkinSprite(this.taskIcon, rewardData.skinIndex);
        } else {
            rewardData = ConfigData.instance.getKnifeSkinById(data.rewardId);
            this.taskIcon.node.scale = 1;
            UIUtil.loadResSprite(this.taskIcon, rewardData.url);
        }

        this.taskLabel.string = rewardData.name;
        this.callback = callback;
    }
}

// update (dt) {},
);

cc._RF.pop();