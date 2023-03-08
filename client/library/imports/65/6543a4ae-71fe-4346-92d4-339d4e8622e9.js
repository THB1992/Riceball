"use strict";
cc._RF.push(module, '6543aSucf5DRpLUM51OhiLp', 'PanelLevelUp');
// scripts/battle/ui/PanelLevelUp.js

'use strict';

var UIUtil = require('UIUtil');
var ConfigData = require('ConfigData');
var PlayerData = require('PlayerData');
var PlatformMgr = require('PlatformMgr');
var AdvertMgr = require('AdvertMgr');
var Tools = require('Tools');
var ShareMgr = require('ShareMgr');
var ShareType = require('Types').ShareType;
var CustomFunnelEvent = require('Types').CustomFunnelEvent;

cc.Class({
    extends: cc.Component,

    properties: {

        levelUpAnim: cc.Animation,
        goldLabel: cc.Label,
        rankLabel: cc.Label,
        confirmBtn: cc.Node,
        panelNode: cc.Node,

        oldRankIcon: cc.Sprite,
        midRankIcon: cc.Sprite,
        newRankIcon: cc.Sprite,
        time: 0,

        unlockBuffNode: cc.Node,
        unlockBuffLabel: cc.Label,
        unlockBuffIcon: cc.Node,

        unlockMapNode: cc.Node,
        unlockMapLabel: cc.Label,
        unlockMapIcon: cc.Node,

        unlockSpecialNode: cc.Node,
        unlockSpecialLabel: cc.Label,
        unlockSpecialIcon: cc.Node,

        unlockBoxNode: cc.Node,
        unlockBoxLabel: cc.Label,
        unlockBoxIcon: cc.Node,

        rankUpSpine: sp.Skeleton,
        rankUpIconAnim: cc.Animation,
        rankUpEffectAnim: cc.Animation,

        //language
        greatLabel: cc.Label
    },

    init: function init(callback) {
        this.callback = callback;
        var oldRank = PlayerData.instance.oldRankData;
        var newRank = PlayerData.instance.rankData;
        if (!oldRank || !newRank) {
            this.onConfirmBtnClick();
            return;
        }

        this.oldRank = oldRank;
        this.newRank = newRank;
        this.showLevelUp();
        AdvertMgr.instance.showBanner();

        this.greatLabel.string = 'Great!';
    },

    showLevelUp: function showLevelUp() {
        var _this = this;

        this.nextRankData = ConfigData.instance.getRankDataById(this.newRank.id);
        this.oldGoldRate = this.oldRank.goldMultiRate * 100 + 100;
        this.newGoldRate = this.nextRankData.goldMultiRate * 100 + 100;
        this.addGoldRate = this.newGoldRate - this.oldGoldRate;
        UIUtil.loadResSprite(this.oldRankIcon, this.oldRank.url);
        // AddEntitySystem.instance.loadRankSprite(this.oldRankIcon, this.oldRank.iconIndex);
        UIUtil.loadResSprite(this.newRankIcon, this.nextRankData.url);
        // AddEntitySystem.instance.loadRankSprite(this.newRankIcon, this.nextRankData.iconIndex);
        this.rankLabel.string = this.oldRank.name;
        // this.goldLabel.string = '' + + '%';
        this.goldLabel.string = Tools.getStringByFormat(ConfigData.instance.getUITipStr(13), Math.ceil(this.oldGoldRate));
        // this.levelUpAnim.on('stop', () => {
        //     this.updateGoldRate = true;
        // }, this)
        this.confirmBtn.active = false;

        this.unlockBuffNode.active = false;
        this.unlockMapNode.active = false;
        this.unlockSpecialNode.active = false;
        this.unlockBoxNode.active = false;

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.unlockBuffIcon.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var iconSpr = _step.value;

                iconSpr.active = false;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = this.unlockMapIcon.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var iconSpr = _step2.value;

                iconSpr.active = false;
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = this.unlockSpecialIcon.children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var iconSpr = _step3.value;

                iconSpr.active = false;
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = this.unlockBoxIcon.children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var iconSpr = _step4.value;

                iconSpr.active = false;
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }

        this.panelNode.getComponent(cc.Animation).play('ani-levelUpNode');

        if (this.newRank.id - this.oldRank.id === 1) {
            this.rankUpSpine.setAnimation(1, 'rankup-begin');
            this.rankUpIconAnim.play();

            if (this.newRank.isRankFirst) {
                this.rankUpEffectAnim.play('effect-rankup-plus');
            } else {
                this.rankUpEffectAnim.play('effect-rankup');
            }

            setTimeout(function () {
                _this.levelUpAnim.play('ani-levelUp');
            }, 1000);

            setTimeout(function () {
                _this.rankUpSpine.setAnimation(1, 'rankup-keep', true);
                _this.rankUpEffectAnim.play('effect-rankup-keep');
            }, 2500);

            setTimeout(function () {
                if (_this.rankLabel) _this.rankLabel.string = _this.nextRankData.name;
            }, 1700);

            setTimeout(function () {
                _this.updateGoldRate = true;
            }, 2166);

            setTimeout(function () {
                var func = function func() {
                    if (_this.newRank.unlockBuff || _this.newRank.unlockBuff === 0) {
                        _this.unlockBuffLabel.string = _this.newRank.unlockTips;
                        var unlockBuffIcons = _this.unlockBuffIcon.children;
                        unlockBuffIcons[_this.newRank.unlockBuff].active = true;
                        _this.unlockBuffNode.active = true;
                    }
                };

                var func2 = function func2() {
                    if (_this.newRank.unlockMap || _this.newRank.unlockMap === 0) {
                        _this.unlockMapNode.active = true;
                        _this.unlockMapLabel.string = _this.newRank.unlockMapTips;
                        var unlockMapIcons = _this.unlockMapIcon.children;
                        unlockMapIcons[_this.newRank.unlockMap].active = true;
                        setTimeout(function () {
                            func();
                        }, 200);
                    } else {
                        func();
                    }
                };

                var func3 = function func3() {
                    if (_this.newRank.unlockSpecial || _this.newRank.unlockSpecial === 0) {
                        _this.unlockSpecialNode.active = true;
                        _this.unlockSpecialLabel.string = _this.newRank.unlockSpecialTips;
                        var unlockSpecialIcons = _this.unlockSpecialIcon.children;
                        unlockSpecialIcons[_this.newRank.unlockSpecial].active = true;
                        setTimeout(function () {
                            func2();
                        }, 200);
                    } else {
                        func2();
                    }
                };

                if (_this.newRank.unlockBox || _this.newRank.unlockBox === 0) {
                    _this.unlockBoxNode.active = true;
                    _this.unlockBoxLabel.string = _this.newRank.unlockBoxTips;
                    var unlockBoxIcons = _this.unlockBoxIcon.children;
                    unlockBoxIcons[_this.newRank.unlockBox].active = true;
                    setTimeout(function () {
                        func3();
                    }, 200);
                } else {
                    func3();
                }
            }, 2166);
        } else {

            var midRankData = ConfigData.instance.getRankDataById(this.oldRank.id + 1);
            UIUtil.loadResSprite(this.midRankIcon, midRankData.url);
            // AddEntitySystem.instance.loadRankSprite(this.midRankIcon, midRankData.iconIndex);
            setTimeout(function () {
                _this.levelUpAnim.play('ani-levelUp-2');
            }, 1000);
            setTimeout(function () {
                if (_this.rankLabel) _this.rankLabel.string = midRankData.name;
            }, 1700);

            setTimeout(function () {
                if (_this.rankLabel) _this.rankLabel.string = _this.nextRankData.name;
            }, 2400);
            setTimeout(function () {
                _this.updateGoldRate = true;
            }, 3000);
        }
        // this.panelNode.scale = 0;
        // this.panelNode.runAction(cc.scaleTo(0.3, 1));
    },

    update: function update(dt) {
        var _this2 = this;

        if (this.updateGoldRate) {
            // this.time += dt;
            // if (this.time > 0.03) {
            //     this.time = 0;
            // if (this.oldGoldRate < this.newGoldRate) {
            //     this.oldGoldRate += this.addGoldRate / 10;
            // this.goldLabel.string = 'Rank bonus coin:' + Math.ceil(this.newGoldRate) + '%';
            this.goldLabel.string = Tools.getStringByFormat(ConfigData.instance.getUITipStr(13), Math.ceil(this.newGoldRate));
            // } else {
            this.updateGoldRate = false;
            this.confirmBtn.y = -68;
            if (this.newRank.unlockBuff || this.newRank.unlockBuff === 0) {
                this.confirmBtn.y -= 60;
            }
            if (this.newRank.unlockMap || this.newRank.unlockMap === 0) {
                this.confirmBtn.y -= 60;
            }
            if (this.newRank.unlockSpecial || this.newRank.unlockSpecial === 0) {
                this.confirmBtn.y -= 60;
            }
            if (this.newRank.unlockBox || this.newRank.unlockBox === 0) {
                this.confirmBtn.y -= 60;
            }
            // var action = cc.scaleTo(0.1, 1);
            setTimeout(function () {
                _this2.oldRank = _this2.nextRankData;
                _this2.confirmBtn.active = true;
            }, 300);
            // this.goldLabel.node.parent.runAction(action);
            // }
        }
    },

    onConfirmBtnClick: function onConfirmBtnClick() {
        if (this.callback) this.callback();
        this.node.active = false;
        if (PlayerData.instance.isSecGame()) {
            PlatformMgr.notifyFunnelEvent(CustomFunnelEvent.RankUpEnd);
        }
        // AdvertMgr.instance.destoryBanner();
    },

    onShareBtnClick: function onShareBtnClick() {
        ShareMgr.share(ShareType.LevelUp);
    }
});

cc._RF.pop();