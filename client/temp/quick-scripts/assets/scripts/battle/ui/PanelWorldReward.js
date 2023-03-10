(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/ui/PanelWorldReward.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ed5b5z/H7tK84dqkHpJShii', 'PanelWorldReward', __filename);
// scripts/battle/ui/PanelWorldReward.js

'use strict';

var ConfigData = require('ConfigData');
var BagItem = require('BagItem');
var ItemType = require('Types').ItemType;
var PlayerData = require('PlayerData');
var GameData = require('GameData');
var JDCARD = [50, 100, 200, 500];
cc.Class({

    extends: cc.Component,

    properties: {
        rankLabel: cc.Label,
        tipsText: cc.RichText,
        diamondLabel: cc.Label,
        goldLabel: cc.Label,

        receiveBtn: cc.Node,
        detailBtn: cc.Node,

        realNode: cc.Node,
        unRealNode: cc.Node,
        heroNode: cc.Node,
        cardNode: cc.Node,
        cardLabel: cc.Label,
        heroLabel: cc.Label
    },

    //第几轮和第几名
    init: function init(rankData, callback, world) {
        this.callback = callback;
        this.world = world;
        this.rankData = rankData;
        var rank = rankData.rank;
        var round = rankData.round;
        var joinTime = rankData.joinTime;
        var data = ConfigData.instance.getWorldRewardByRank(rank);
        if (GameData.instance.isShowLog()) {
            console.log('--------------------------刷新世界排名奖励：', joinTime, '轮次:', round, '名次:', rank);
        }

        if (rank === -1 || PlayerData.instance.hasReceiveWorldRound(joinTime) || !data) {
            this.close(false);
        } else {
            this.rankLabel.string = '世界第' + rank + '名';
            this.tipsText.string = '恭喜你取得世界PK（第' + round + '轮）</color=##EEE50E>第' + rank + '名';

            this.realNode.active = false;
            this.unRealNode.active = false;
            this.heroNode.active = false;
            this.receiveBtn.active = true;
            this.detailBtn.active = false;

            this.items = BagItem.createItemsWithString(data.reward);
            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
                switch (item.type) {
                    case ItemType.MONEY:
                        this.unRealNode.active = true;
                        this.goldNum = item.num;
                        this.goldLabel.string = 'x' + this.goldNum;
                        break;
                    case ItemType.ZONG_ZI:
                        this.unRealNode.active = true;
                        this.diamondNum = item.num;
                        this.diamondLabel.string = '钻石x' + this.diamondNum;
                        break;
                    case ItemType.CARD:
                        this.realNode.active = true;
                        this.detailBtn.active = true;
                        this.receiveBtn.active = false;

                        var cards = this.cardNode.children;
                        for (var j = 0; j < cards.length; j++) {
                            cards[j].active = item.num === JDCARD[j];
                        }
                        this.cardLabel.string = data.tips;
                        break;
                    case ItemType.HERO_SKIN:
                        this.heroNode.active = true;
                        this.heroLabel.string = data.tips;
                        break;
                }
            }
        }
    },
    showPanelRewardDetail: function showPanelRewardDetail() {
        this.world.uiMgr.showPanelRewardDetail();
    },
    close: function close() {
        var receive = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        if (receive) {
            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
                switch (item.type) {
                    case ItemType.MONEY:
                        PlayerData.instance.updateGold(item.num);
                        PlayerData.instance.showGold -= item.num;
                        var param = {
                            count: item.num,
                            isMore: true,
                            isLucky: false
                        };
                        this.world.uiMgr.showGetMoneyEffect(param);
                        break;
                    case ItemType.ZONG_ZI:
                        PlayerData.instance.updateZongZi(item.num);
                        this.world.uiMgr.showTips(Tools.getStringByFormat(ConfigData.instance.getUITipStr(15), item.num));
                        break;
                    case ItemType.HERO_SKIN:
                        if (!PlayerData.instance.isOwnHeroSkin(item.id)) {
                            PlayerData.instance.addHeroSkin(item.id);
                        } else {
                            this.isConvert = true;
                        }
                        this.world.onEquipHeroSkin(item.itemData, true);
                        break;
                    case ItemType.KNIFE_SKIN:
                        if (!PlayerData.instance.isOwnKnifeSkin(item.id)) {
                            PlayerData.instance.addKnifeSkin(item.id);
                        } else {
                            this.isConvert = true;
                        }
                        this.world.onEquipKnifeSkin(item.itemData, true);
                        break;
                }
            }
            if (this.isConvert) {
                this.world.uiMgr.showTips('已拥有哪吒套装，自动转化为150钻石');
                PlayerData.instance.updateZongZi(150);
            }
            PlayerData.instance.updateReceiveRound(this.rankData.joinTime, false);
        }

        PlayerData.instance.updateDayRefreshWorldReward();
        this.node.active = false;
        if (this.callback) this.callback();
    }
}
// update (dt) {},
);

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
        //# sourceMappingURL=PanelWorldReward.js.map
        