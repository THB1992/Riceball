"use strict";
cc._RF.push(module, 'a9d956eoi5ApIOzzesB/RGO', 'PanelNotification');
// scripts/battle/ui/PanelNotification.js

'use strict';

var ConfigData = require('ConfigData');
var PlayerData = require('PlayerData');
var Tools = require('Tools');

cc.Class({
    extends: cc.Component,

    properties: {
        countDownLabel: cc.Label
    },
    onLoad: function onLoad() {
        this.endTime = Tools.getTimeStampByTimeStr(ConfigData.instance.holidayDatas.startDate);
    },
    update: function update(dt) {
        this.countDownLabel.string = Tools.getRemainTimeStr(PlayerData.instance.getCurTime(), this.endTime);

        if (!Tools.isBeforeOtherTime(ConfigData.instance.holidayDatas.startDate, PlayerData.instance.getCurTime())) {
            this.close();
        }
    },
    close: function close() {
        this.node.active = false;
    }
});

cc._RF.pop();