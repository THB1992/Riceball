"use strict";
cc._RF.push(module, '8bb85p/mTlA2oZ2+BwZcMH6', 'ItemTreasureBox');
// scripts/battle/ui/ItemTreasureBox.js

'use strict';

var ListItemBase = require('ListItemBase');
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
    extends: ListItemBase,

    properties: {
        rewardParent: cc.Node,
        boxNode: cc.Node,
        numLabel: cc.Label,

        heroSprite: cc.Sprite,
        knifeSprite: cc.Sprite,
        diamondMore: cc.Node,
        diamondLess: cc.Node,

        openAnim: cc.Animation,
        openBestAnim: cc.Node,
        getBg: cc.Node
    },

    init: function init() {
        this.numLabel.string = '';
        this.hasGet = false;
        this.getBg.active = false;
        this.rewardParent.active = false;
        this.boxNode.active = true;
        this.numLabel.node.active = false;
        this.openBestAnim.active = false;
        // this.openBestAnim.node.parent.active = false;
    },
    getReward: function getReward(item) {
        var _this = this;

        this.hasGet = true;
        for (var i = 0; i < this.rewardParent.children.length; i++) {
            this.rewardParent.children[i].active = i === item.type;
        }
        this.diamondMore.active = item.num === 35;
        this.diamondLess.active = !this.diamondMore.active;

        this.boxNode.active = false;
        this.getBg.active = true;

        setTimeout(function () {
            _this.rewardParent.active = true;
            _this.numLabel.node.active = true;
        }, 300);

        switch (item.type) {
            case ItemType.MONEY:
            case ItemType.ZONG_ZI:
                this.numLabel.string = item.num;
                if (this.diamondMore.active) {
                    this.playBestAnim();
                } else {
                    this.openAnim.play();
                }
                break;
            case ItemType.HERO_SKIN:
                this.playBestAnim();
                this.numLabel.string = '';
                UIUtil.loadResSprite(this.heroSprite, item.itemData.url);
                break;
            case ItemType.KNIFE_SKIN:
                this.playBestAnim();
                this.numLabel.string = '';
                UIUtil.loadResSprite(this.knifeSprite, item.itemData.url);
                break;
        }
    },


    playBestAnim: function playBestAnim() {
        var _this2 = this;

        // this.openBestAnim.node.parent.active = true;
        // this.openBestAnim.once('finished', () => {
        //     this.openBestAnim.node.parent.active = false;
        // })
        this.openAnim.play();
        this.openBestAnim.active = true;
        setTimeout(function () {
            _this2.openBestAnim.active = false;
        }, 1000);
    }
    // update (dt) {},
});

cc._RF.pop();