"use strict";
cc._RF.push(module, 'd9a69kLwe9BfL5XbjKMX24N', 'Slot');
// scripts/sdk/Slot.js

'use strict';

// var WeiShuSdk = require("WeiShuSdk");
var PlatformMgr = require('PlatformMgr');
var PlatformType = require('Types').PlatformType;
var GameData = require('GameData');

cc.Class({
    extends: cc.Component,

    properties: {
        bg: cc.Sprite,
        img: cc.Sprite,
        lbl: cc.Label
    },

    onLoad: function onLoad() {
        if (PlatformMgr.platformType === PlatformType.WECHAT) {
            var rdmTitle = ['时下流行', '热门游戏', '好友在玩'];
            this.lbl.node.getComponent(cc.Label).string = rdmTitle[Math.random() * 3 | 0]; //随机采用一个标题
            this.processCfg();
        }
        this.node.active = false;
    },
    start: function start() {},
    update: function update() {
        if (this.node.active !== !GameData.instance.isInReview) {
            this.node.active = !GameData.instance.isInReview;
        }
    },
    processCfg: function processCfg() {
        //下载配置文件
        var self = this;
        var url = PlatformMgr.baseUrl + "Try2play/knife666_play.json";
        this.listCfg = [];
        cc.loader.load(url, function (err, res) {
            if (err) {
                cc.error(err);
                self.node.active = false;
                return;
            }

            self.node.active = !GameData.instance.isInReview;
            var swTimes = 5;
            if (res && res.playPat && res.playPat[3]) {
                self.listCfg = res.playPat[3].data;
                res.main && res.main[1].swTimes && (swTimes = res.main[1].swTimes);
                self.regBoards();
                self.schedule(self.regBoards, swTimes);
            }
        });
    },
    regBoards: function regBoards() {
        //更新广告位显示
        var len = this.listCfg.length;
        this.curIdx = Math.random() * len | 0;
        var cfg = this.listCfg[this.curIdx];

        var self = this;
        var url = PlatformMgr.baseUrl + "Try2play/" + cfg.imgUrl;
        cc.loader.load(url, function (err, texture) {
            var sprite = new cc.SpriteFrame(texture);
            self.img.node.getComponent(cc.Sprite).spriteFrame = sprite;
        });
    },
    onNav: function onNav() {
        //跳转到小游戏
        if (!this.listCfg) return;
        var cfg = this.listCfg[this.curIdx];
        if (wx.navigateToMiniProgram) {
            wx.navigateToMiniProgram({
                appId: cfg.appid,
                path: cfg.path,
                success: function success(res) {
                    console.log("nav successed");
                    PlatformMgr.adStatis(cfg);
                }
            });
        }
    }
});

cc._RF.pop();