(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/ui/PanelTreasureBox.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2d713+l3IBOsoeDBdaSMHFF', 'PanelTreasureBox', __filename);
// scripts/battle/ui/PanelTreasureBox.js

'use strict';

var UIUtil = require('UIUtil');
var ConfigData = require('ConfigData');
var PlayerData = require('PlayerData');
var GameData = require('GameData');
var ShareType = require('Types').ShareType;
var AdvertMgr = require('AdvertMgr');
var AdverType = require('Types').AdverType;
var Tools = require('Tools');
var BagItem = require('BagItem');
var ItemType = require('Types').ItemType;
var StageType = require('Types').StageType;

cc.Class({
    extends: cc.Component,

    properties: {

        bgNode: cc.Node,
        getKey: cc.Node,

        keyNode: cc.Node,
        keyPanel: cc.Node,
        keyParent: cc.Node,

        boxNode: cc.Node,
        boxPrefab: cc.Prefab,
        boxParent: cc.Node,
        otherKeyParent: cc.Node,
        bestRewardAnimation: cc.Animation,
        bestRewardSprite: cc.Sprite,
        bestRewardDiamond: cc.Node,

        adverBtn: cc.Node,
        closeBtn: cc.Node,
        adverBtnAnim: cc.Animation
    },

    init: function init(world) {
        this.world = world;
        this.keyCount = 3;
        this.turn = this.refreshTurn();

        var data = ConfigData.instance.getTreasureBigDataByTurn(this.turn);
        this.bestReward = data.reward;
        this.getTimes = data.times;
        PlayerData.instance.clearKeyCount();

        this.hasGetBest = false;
        this.unlockBoxCount = 0;
        this.keyPanel.active = false;
        this.boxNode.active = true;
        this.closeBtn.active = false;
        this.getKey.active = true;
        this.getKey.rotation = 0;
        this.getKey.scale = 1;
        this.getKey.position = cc.v2(0, 0);

        var keyPool = this.keyParent.children;
        for (var i = 0; i < keyPool.length; i++) {
            keyPool[i].active = i + 1 < this.keyCount;
        }

        this.initKey();
        this.initBox();
        var item = BagItem.createItemWithString(this.bestReward);
        this.bestRewardDiamond.active = item.type === ItemType.ZONG_ZI;
        this.bestRewardSprite.node.active = !this.bestRewardDiamond.active;
        if (this.bestRewardSprite.node.active) {
            UIUtil.loadResSprite(this.bestRewardSprite, item.itemData.url);
        }
        this.playRewardAnim();
        // this.bestReward.node.runAction(cc.sequence(cc.sca))

        this.bgNode.height = GameData.instance.screenHeight;
        this.boxNode.scale = GameData.instance.isPad() ? 0.8 : 1;
    },
    playRewardAnim: function playRewardAnim() {
        this.bestRewardAnimation.play();
    },
    refreshTurn: function refreshTurn() {
        //如果已拥有某些皮肤则跳过
        var turn = PlayerData.instance.treasureTurn;
        var datas = ConfigData.instance.treasureBigData;
        for (var i = turn; i < datas.length; i++) {
            var item = BagItem.createItemWithString(datas[i].reward);
            var needBreak = false;
            switch (item.type) {
                case ItemType.HERO_SKIN:
                    if (PlayerData.instance.isOwnHeroSkin(item.id)) {
                        PlayerData.instance.updateTreasureTurn();
                    }
                    break;
                case ItemType.KNIFE_SKIN:
                    if (PlayerData.instance.isOwnKnifeSkin(item.id)) {
                        PlayerData.instance.updateTreasureTurn();
                    }
                    break;
                default:
                    needBreak = true;
                    break;
            }
            if (needBreak) break;
        }
        return PlayerData.instance.treasureTurn;
    },
    initKey: function initKey(anim) {
        var _this = this;

        for (var i = 0; i < this.otherKeyParent.children.length; i++) {
            if (anim) {
                this.stopUse = true;
                if (i < this.keyCount) {
                    (function () {
                        var node = _this.otherKeyParent.children[i];

                        // node.opacity = 0;
                        node.scale = 1.8;
                        setTimeout(function () {
                            node.active = true;
                            node.runAction(cc.scaleTo(0.3, 1).easing(cc.easeBackInOut(3.0)));
                            // node.runAction(cc.fadeIn(1.0));
                        }, i * 200);
                    })();
                }
                setTimeout(function () {
                    _this.stopUse = false;
                }, 900);
            } else {
                this.otherKeyParent.children[i].active = i < this.keyCount;
            }
        }
        this.adverBtn.active = false;
        this.keyNode.active = true;
        this.closeBtn.active = false;
    },
    initBox: function initBox() {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var box = this.boxParent.children[i * 3 + j];
                if (!box) {
                    var box = cc.instantiate(this.boxPrefab);
                    box.parent = this.boxParent;
                    box.position = cc.v2(i * 220, j * -220);
                }
                var boxComp = box.getComponent('ItemTreasureBox');
                boxComp.init();
                boxComp.setOnItemClick(this, boxComp);
            }
        }
    },
    onItemClick: function onItemClick(event, comp) {
        if (this.stopUse) return;
        if (this.keyCount > 0) {
            if (!comp.hasGet) {
                this.useKey(comp);
            }
        } else {
            this.adverBtnAnim.play('ani-btn-dance');
        }
    },
    useKey: function useKey(comp) {
        var _this2 = this;

        // this.isUse = true;
        var index = this.keyCount - 1;
        var key = this.otherKeyParent.children[index];
        this.keyCount--;
        comp.hasGet = true;
        var initPos = cc.v2(key.x, key.y);
        key.runAction(cc.sequence(cc.moveTo(0.5, comp.node.position), cc.callFunc(function () {
            key.active = false;
            key.position = initPos;
            var reward = _this2.getReward();
            var item = BagItem.createItemWithString(reward);
            comp.getReward(item);
            setTimeout(function () {
                _this2.world.getReward(item);
            }, 800);
            if (index === 0) {
                if (_this2.unlockBoxCount === 9) {
                    setTimeout(function () {
                        _this2.close();
                    }, 2000);
                } else {
                    setTimeout(function () {
                        _this2.showAdverBtn();
                    }, 1000);
                }
            }
            // this.isUse = false;
        })));
    },


    showAdverBtn: function showAdverBtn() {
        var _this3 = this;

        this.keyNode.active = false;
        this.adverBtn.active = true;
        setTimeout(function () {
            _this3.closeBtn.active = true;
        }, 1000);

        this.adverBtnAnim.play('ani-btn-active');

        var func = function func(hasAdver) {
            if (hasAdver) {
                AdvertMgr.instance.openAdver(AdverType.TreasurBox);
            }
        };
        AdvertMgr.instance.loadAdver(AdverType.TreasurBox, func);
    },
    //
    getReward: function getReward() {
        this.unlockBoxCount++;
        if (this.hasGetBest) return this.getSmallReward();
        if (this.getTimes) {
            if (this.isInTimes()) {
                var percent = this.unlockBoxCount - (this.getTimes - 1) * 3 === 3 ? 1 : 0;
                if (Math.random() < percent) {
                    return this.getBigReward();
                } else {
                    return this.getSmallReward();
                }
            } else {
                return this.getSmallReward();
            }
        } else {
            var percent = this.unlockBoxCount / 9;
            if (Math.random() < percent) {
                return this.getBigReward();
            } else {
                return this.getSmallReward();
            }
        }
    },
    getSmallReward: function getSmallReward() {
        var data = Tools.getRandomItemByWeight(ConfigData.instance.treasureSmallData);
        var rate = data.type === ItemType.ZONG_ZI ? 1 : 1 + PlayerData.instance.rankData.goldMultiRate;
        return data.type + ',0,' + Math.ceil(Tools.getRandomInt(data.range[0], data.range[1]) * rate);
    },
    getBigReward: function getBigReward() {
        this.hasGetBest = true;
        PlayerData.instance.updateTreasureTurn();
        return this.bestReward;
    },
    isInTimes: function isInTimes() {
        return this.unlockBoxCount > (this.getTimes - 1) * 3 && this.unlockBoxCount <= this.getTimes * 3;
    },
    onAdverBtnClick: function onAdverBtnClick() {
        var _this4 = this;

        // 关闭广告时回调
        var closeFunc = function closeFunc(success) {
            if (success) {
                _this4.keyCount = 3;
                _this4.initKey(true);
            }
        };
        //点击获取特殊武器按钮
        AdvertMgr.instance.fireBaseEvent("click_adv_btn", "position_id", ConfigData.instance.getAdvertUnitId(AdverType.TreasurBox));

        AdvertMgr.instance.showAdver(AdverType.TreasurBox, closeFunc);
    },


    playKeyAnim: function playKeyAnim() {
        var _this5 = this;

        var pos = cc.v2(this.keyCount * 100 - 200, 110);
        this.getKey.runAction(cc.sequence(cc.scaleTo(0.5, 2), cc.callFunc(function () {
            _this5.keyPanel.active = true;
        }), cc.spawn(cc.moveTo(0.5, pos), cc.scaleTo(0.5, 0.5), cc.rotateTo(0.5, -30)), cc.callFunc(function () {
            _this5.keyParent.children[_this5.keyCount - 1].active = true;
            _this5.getKey.active = false;
        })));
    },

    okBtnClick: function okBtnClick() {
        if (this.keyCount === 3) {
            this.boxNode.active = true;
            PlayerData.instance.clearKeyCount();
        } else {
            this.close();
        }
    },
    close: function close() {
        this.node.active = false;
        this.world.uiMgr.openPanelKeyCount(true);
    },
    update: function update(dt) {}
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
        //# sourceMappingURL=PanelTreasureBox.js.map
        