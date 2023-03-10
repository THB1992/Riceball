(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/ui/PanelRepay.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '74a11T+3EZIFpyUDkhYUHUq', 'PanelRepay', __filename);
// scripts/battle/ui/PanelRepay.js

'use strict';

var PlayerData = require('PlayerData');
var ConfigData = require('ConfigData');
var Tools = require('Tools');
var ShareMgr = require('ShareMgr');
var ShareType = require('Types').ShareType;
var AdvertMgr = require('AdvertMgr');
var AdverType = require('Types').AdverType;

cc.Class({
    extends: cc.Component,

    properties: {
        goldLabel: cc.Label
    },

    init: function init(callback, world) {
        this.callback = callback;
        this.world = world;
        var repayData = ConfigData.instance.getRepayDataByRank(PlayerData.instance.rankData.id);
        this.goldCount = repayData && repayData.reward ? repayData.reward : 0;
        this.goldLabel.string = this.goldCount;
    },
    onClose: function onClose() {
        this.node.active = false;
        if (this.callback) this.callback();
    },
    onReceiveBtnClick: function onReceiveBtnClick() {
        var self = this;
        PlayerData.instance.updateRepay();
        PlayerData.instance.updateGold(self.goldCount);
        PlayerData.instance.showGold -= self.goldCount;
        var param = {
            count: self.goldCount,
            isMore: true,
            isLucky: false
        };
        self.world.uiMgr.showGetMoneyEffect(param);
        self.onClose();

        return;
        var self = this;
        // 关闭广告时回调
        var closeFunc = function closeFunc(success) {
            if (success) {
                PlayerData.instance.updateGold(self.goldCount);
                PlayerData.instance.showGold -= self.goldCount;
                var param = {
                    count: self.goldCount,
                    isMore: true,
                    isLucky: false
                };
                self.world.uiMgr.showGetMoneyEffect(param);
                self.onClose();
            }
        };
        // 打开广告失败时回调,失败回调
        var errFunc = function errFunc() {
            self.showShare(closeFunc);
        };
        AdvertMgr.instance.showAdver(AdverType.GrowNode, closeFunc, errFunc);
    },


    showShare: function showShare(closeFunc) {
        ShareMgr.share(ShareType.GrowNode, closeFunc);
    }
    // update (dt) {},
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=PanelRepay.js.map
        