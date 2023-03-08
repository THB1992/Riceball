"use strict";
cc._RF.push(module, '43a23/nKVtHUJo9Qyr0M4qi', 'PanelFirstGuide');
// scripts/battle/ui/PanelFirstGuide.js

'use strict';

var ConfigData = require('ConfigData');

var PanelFristGuides = cc.Class({
    extends: cc.Component,

    properties: {
        itemGuidePrefab: cc.Prefab,
        guideContent: cc.Node,
        startNode: cc.Node,
        endNode: cc.Node,
        startLabel: cc.Label,
        endLabel: cc.Label,
        startAnim: cc.Animation,
        endAnim: cc.Animation,
        specialNode: cc.Node,
        specialLabel: cc.Label,
        processLabel: cc.Label
    },

    start: function start() {
        this.itemPool = [];
        this.guideData = ConfigData.instance.guideData;
        for (var i = 0; i < 4; i++) {
            var itemNode = cc.instantiate(this.itemGuidePrefab);
            itemNode.active = false;
            itemNode.parent = this.guideContent;
            itemNode.x = -300;
            itemNode.y = i * -55;

            var itemComp = itemNode.getComponent('ItemGuide');
            itemComp.tipsLabel.string = this.guideData.startTips[i];
            this.itemPool[i] = itemComp;
        }
        this.specialTime = 0;
        this.canShowSpecial = false;
    },

    refreshGuideProcess: function refreshGuideProcess(str) {
        this.processLabel.string = str;
    },

    showGuideStart: function showGuideStart(state) {
        var _this = this;

        if (state > 3) {
            this.node.active = false;
            return;
        }

        this.endNode.active = false;
        this.startAnim.node.active = true;
        this.startAnim.play();
        setTimeout(function () {
            _this.startNode.active = true;
        }, 300);
        setTimeout(function () {
            if (_this.startNode.active) {
                _this.startNode.active = false;
                _this.canShowSpecial = true;
                if (state === 0) {
                    _this.processLabel.node.active = true;
                }
            }
        }, 2000);
        var item = this.itemPool[state];
        this.startLabel.string = "新任务：" + item.tipsLabel.string;
        this.startNode.width = this.startLabel.string.length * 40 + 100;

        item.node.active = true;

        var action = cc.moveBy(0.3, cc.v2(300, 0)).easing(cc.easeBackInOut());
        item.node.runAction(action);

        item.showEffect.node.active = true;
    },

    showGuideSpecial: function showGuideSpecial(state) {
        if (this.canShowSpecial) {
            this.specialNode.active = true;
            this.specialLabel.string = this.guideData.specialTips[state];
            this.specialNode.width = this.specialLabel.string.length * 40 + 200;
            this.specialTime = 2;
        }
    },

    showGuideEnd: function showGuideEnd(state) {
        var _this2 = this;

        if (state === 0) {
            this.processLabel.node.active = false;
        }
        this.startNode.active = false;
        this.canShowSpecial = false;
        this.specialNode.active = false;
        this.specialTime = 0;
        this.endLabel.string = this.guideData.endTips[state];
        this.endNode.width = this.endLabel.string.length * 40 + 200;
        this.endAnim.node.active = true;
        this.endAnim.play();
        setTimeout(function () {
            _this2.endNode.active = true;
        }, 200);

        var item = this.itemPool[state];
        item.checkEffect.node.active = true;
        setTimeout(function () {
            item.checkNode.active = true;
        }, 100);
    },

    update: function update(dt) {
        if (this.canShowSpecial && this.specialTime > 0) {
            this.specialTime -= dt;
            if (this.specialTime <= 0) {
                this.specialNode.active = false;
            }
        }
    }
});

cc._RF.pop();