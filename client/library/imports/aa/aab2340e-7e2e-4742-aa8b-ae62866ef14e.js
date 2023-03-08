"use strict";
cc._RF.push(module, 'aab23QOfi5HQqqLrmKGbvFO', 'PanelGetSkin');
// scripts/battle/ui/PanelGetSkin.js

'use strict';

//看视频得皮肤界面
var ConfigData = require('ConfigData');
var AdvertMgr = require('AdvertMgr');
var AdverType = require('Types').AdverType;
var PlayerData = require('PlayerData');
var TaskType = require('Types').TaskType;

cc.Class({
    extends: cc.Component,

    properties: {
        propertyLabel: cc.Label,
        tipsLabel: cc.Label,
        processLabel: cc.Label
    },

    init: function init(data, callback, errCallback) {
        this.data = data;
        this.callback = callback;
        this.errCallback = errCallback;
        // this.propertyLabel.string = data.propertyTips ? data.propertyTips : '';
        this.refresh();
        this.tipsLabel.string = 'Watch ads 30 times';
        // AdvertMgr.instance.showBanner();
        AdvertMgr.instance.openAdver(AdverType.WatchAdver);
    },

    refresh: function refresh() {
        var process = PlayerData.instance.getTaskProcess(TaskType.ADVERCOUNT);
        if (process > this.data.taskParam) process = this.data.taskParam;
        this.processLabel.string = process + '/' + this.data.taskParam;
    },

    onCloseBtnClick: function onCloseBtnClick() {
        this.node.active = false;
        // AdvertMgr.instance.destoryBanner();
    },

    //累计看广告按钮
    onWathAdverBtnClick: function onWathAdverBtnClick() {
        var self = this;
        // 关闭广告时回调
        var closeFunc = function closeFunc(success) {
            if (success) {
                self.refresh();
                if (self.callback) self.callback(true);
            }
        };
        // 打开广告失败时回调,失败回调
        var errFunc = function errFunc() {
            if (self.errCallback) self.errCallback();
        };
        AdvertMgr.instance.fireBaseEvent("click_adv_btn", "position_id", ConfigData.instance.getAdvertUnitId(AdverType.AddKnife));
        AdvertMgr.instance.showAdver(AdverType.WatchAdver, closeFunc, errFunc);
    }
});

cc._RF.pop();