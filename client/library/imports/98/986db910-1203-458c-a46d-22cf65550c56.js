"use strict";
cc._RF.push(module, '986dbkQEgNFjKRtIs9lVQxW', 'PanelGrowUp');
// scripts/battle/ui/PanelGrowUp.js

'use strict';

var PlayerData = require('PlayerData');
var GrowType = require('Types').GrowType;
var ConfigData = require('ConfigData');
var Tools = require('Tools');
var ShareMgr = require('ShareMgr');
var ShareType = require('Types').ShareType;
var AdvertMgr = require('AdvertMgr');
var AdverType = require('Types').AdverType;

cc.Class({
    extends: cc.Component,

    properties: {

        growNode: cc.Node,
        bgNode: cc.Node,
        checkNode: cc.Node,
        closeNode: cc.Node,
        iconNode: cc.Node,
        arrowNode: cc.Node,
        priceNode: cc.Node,
        adverNode: cc.Node,

        lockCheckNode: cc.Node,
        lockCloseNode: cc.Node,
        lockNode: cc.Node,

        unlockBtnAnimNode: cc.Node,
        unlockInfoAnim: cc.Animation,

        rootNode: cc.Node,
        tipsLabel: cc.Label,
        nameLabel: cc.Label,
        levelLabel: cc.Label,
        paramLabel: cc.Label,
        priceLabel: cc.Label,

        getGoldNode: cc.Node,
        getGoldLabel: cc.Label,
        getGoldAdverIcon: cc.Node,
        getGoldShareIcon: cc.Node,

        levelUpByGoldNode: cc.Node,
        levelUpByAdverNode: cc.Node,

        downNodeAni: cc.Animation,

        lockTips: cc.Node,
        lockTipsLabel: cc.Label,
        unlockInfoNode: cc.Node,
        lockArr: [],

        unlockTipsNode: cc.Node,
        unlockTipsIconNode: cc.Node,
        unlockTipsLabelNode: cc.Node
    },

    init: function init(world) {
        var _this = this;

        //解锁相关
        var stage = ConfigData.instance.getCurGrowStage(PlayerData.instance.playCount, ConfigData.instance.clientData.growLimit);

        switch (stage) {
            case 0:
                this.lockArr = [0, 1, 2, 3];
                break;
            case 1:
                this.lockArr = [0, 1];
                break;
            case 2:
                this.lockArr = [];
                break;
        }
        switch (PlayerData.instance.showUnlockGrow) {
            case 1:
                this.lockArr = [0, 1, 2, 3];
                this.showCallFunc = function (callback) {
                    _this.showAnim([2, 3], [0, 1], callback);
                };
                break;
            case 2:
                this.lockArr = [0, 1];
                this.showCallFunc = function (callback) {
                    _this.showAnim([0, 1], [], callback);
                };
                break;
        }
        PlayerData.instance.showUnlockGrow = 0;

        //ui
        this.world = world;
        this.checkNodes = this.checkNode.children;
        this.closeNodes = this.closeNode.children;
        this.iconNodes = this.iconNode.children;

        this.lockCheckNodes = this.lockCheckNode.children;
        this.lockCloseNodes = this.lockCloseNode.children;
        this.lockNodes = this.lockNode.children;

        this.arrowNodes = this.arrowNode.children;
        this.animNodes = this.unlockBtnAnimNode.children;

        this.growDatas = ConfigData.instance.growDatas;
        for (var i = 0; i < this.arrowNodes.length; i++) {
            var node = this.arrowNodes[i];
            var data = this.growDatas[i];
            var levelData = PlayerData.instance.getGrowLevelDataByType(i);
            if (PlayerData.instance.gold >= levelData.price && !Tools.arrContains(this.lockArr, i) && levelData.id !== data.maxLevel) {
                node.active = true;
            } else {
                node.active = false;
            }
        }

        this.onBtnClick(null, 2, false);

        // var height = (GameData.instance.screenHeight - 1280) / 2;
        // var offset = height > 40 ? height - 40 : 0;
        // this.growNode.y = -offset;
        // this.bgNode.height = 226 + (offset < 30 ? offset : offset - 30);
        this.getGoldAdverIcon.active = ConfigData.instance.clientData.stopAdverToShare;
        this.getGoldShareIcon.active = !this.getGoldAdverIcon.active;
    },

    showAnim: function showAnim(arr, finalArr, callback) {
        var _this2 = this;

        var i = 0;

        var _loop = function _loop(index) {
            if (index === 2) {
                _this2.checkNodes[index].active = false;
                _this2.lockCheckNodes[index].active = true;

                _this2.unlockInfoNode.active = false;
                _this2.lockTips.active = true;
            } else {
                _this2.closeNodes[index].active = false;
                _this2.lockCloseNodes[index].active = true;
            }

            setTimeout(function () {
                _this2.animNodes[index].active = true;
                var anim = _this2.animNodes[index].children[0].getComponent(cc.Animation);
                anim.once('finished', function () {
                    _this2.animNodes[index].active = false;
                    var levelData = PlayerData.instance.getGrowLevelDataByType(index);

                    if (PlayerData.instance.gold >= levelData.price) {
                        _this2.arrowNodes[index].active = true;
                    }

                    if (index === 1 || index === 3) {
                        _this2.lockArr = finalArr;
                        _this2.onBtnClick(null, 2, false);
                        if (callback) callback();
                    } else if (index === 2) {
                        _this2.unlockInfoAnim.node.active = true;
                        _this2.unlockInfoAnim.play();
                        _this2.unlockInfoAnim.once('finished', function () {
                            _this2.unlockInfoAnim.node.active = false;
                        });
                    }
                });
                anim.play();
            }, 1200);

            //tips
            _this2.unlockTipsIconNode.children[i].children[index].active = true;
            _this2.unlockTipsLabelNode.children[i].getComponent(cc.Label).string = _this2.growDatas[index].name;

            i++;
        };

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var index = _step.value;

                _loop(index);
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

        this.unlockTipsNode.active = true;
    },

    onBtnClick: function onBtnClick(event, data) {
        var isAni = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        var type = Number(data);
        for (var i = 0; i < this.checkNodes.length; i++) {
            if (i === type) {
                //选中
                if (!this.checkNodes[i].active && !Tools.arrContains(this.lockArr, i)) this.checkNodes[i].active = true;
                if (this.closeNodes[i].active) this.closeNodes[i].active = false;
                if (!this.lockCheckNodes[i].active) this.lockCheckNodes[i].active = true;
                if (this.lockCloseNodes[i].active) this.lockCloseNodes[i].active = false;
                if (this.lockNodes[i].y !== 0) this.lockNodes[i].y = 0;

                if (this.iconNodes[i].scale !== 1) this.iconNodes[i].scale = 1;
                if (this.iconNodes[i].y !== 0) this.iconNodes[i].y = 0;
                if (this.iconNodes[i].opacity !== 255) this.iconNodes[i].opacity = 255;
            } else {
                if (this.checkNodes[i].active) this.checkNodes[i].active = false;
                if (!this.closeNodes[i].active && !Tools.arrContains(this.lockArr, i)) this.closeNodes[i].active = true;
                if (this.lockCheckNodes[i].active) this.lockCheckNodes[i].active = false;
                if (!this.lockCloseNodes[i].active) this.lockCloseNodes[i].active = true;
                if (this.lockNodes[i].y !== -22) this.lockNodes[i].y = -22;

                if (this.iconNodes[i].scale !== 0.7) this.iconNodes[i].scale = 0.7;
                if (this.iconNodes[i].y !== -16) this.iconNodes[i].y = -16;
                if (this.iconNodes[i].opacity !== 155) this.iconNodes[i].opacity = 155;
            }
        }

        this.refreshShowData(type, isAni);
    },

    refreshShowData: function refreshShowData(type) {
        var isAni = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        this.curType = type;
        var data = this.growDatas[type];
        var levelData = PlayerData.instance.getGrowLevelDataByType(type);
        this.nameLabel.string = data.name;
        this.levelLabel.string = 'Lv' + levelData.id;
        this.paramLabel.string = levelData.showTips;
        this.priceLabel.string = Tools.getGoldStr(levelData.price);
        var color = levelData.price > PlayerData.instance.gold ? cc.Color.RED : new cc.Color().fromHEX("#702800");
        Tools.setNodeColor(this.priceLabel.node, color);
        this.tipsLabel.string = data.tips;
        this.rootNode.x = type === 3 ? 55 : 0;
        this.curData = levelData;
        this.priceNode.active = levelData.id === data.maxLevel ? false : true;
        this.adverNode.active = this.priceNode.active;

        // var isLevelUpByAdver = ConfigData.instance.isGrowLevelUpByAdver(type, levelData.id);
        // this.levelUpByAdverNode.active = isLevelUpByAdver;
        // this.levelUpByGoldNode.active = !isLevelUpByAdver;

        this.lockTips.active = Tools.arrContains(this.lockArr, type);
        this.unlockInfoNode.active = !this.lockTips.active;
        this.lockTipsLabel.string = data.lockTips + '(' + PlayerData.instance.playCount + '/' + data.param + ')';

        for (var i = 0; i < this.arrowNodes.length; i++) {
            var node = this.arrowNodes[i];
            //点击关闭
            if (i === type) {
                if (node.active) node.active = false;
            }
            //金币不够的关闭
            var levelData = PlayerData.instance.getGrowLevelDataByType(i);
            if (PlayerData.instance.gold < levelData.price) {
                if (node.active) node.active = false;
            }
        }

        if (isAni) {
            this.downNodeAni.play();
        }
    },

    growBtnClick: function growBtnClick() {
        if (!this.curData) return;

        if (this.levelUpByAdverNode.active) {
            //广告升级
            this.onLevelUpByAdverBtnClick();
        } else {
            //金币升级
            if (PlayerData.instance.gold >= this.curData.price) {
                this.onGrowUp(this.curType);
                PlayerData.instance.updateGold(-this.curData.price, null, true);
                this.refreshShowData(this.curType);

                this.world.uiMgr.showTips(5);
            } else {
                var canShowGold = PlayerData.instance.dayGetGoldCount < 3;
                if (canShowGold) {
                    this.getGoldNode.active = true;
                    var rankData = PlayerData.instance.rankData;
                    var growGoldLevelData = PlayerData.instance.getGrowLevelDataByType(GrowType.Gold);
                    var growGoldParam = growGoldLevelData.realGoldParam / 100;
                    var rate = rankData.goldMultiRate + growGoldParam + 1;
                    this.getGoldcount = Math.ceil(Tools.getItemOrFinalItem(rankData.getGold, 0) * rate * 5); //
                    this.getGoldLabel.string = Tools.getGoldStr(this.getGoldcount);
                } else {
                    this.world.uiMgr.showTips(6);
                }
            }
        }
    },

    onLevelUpByAdverBtnClick: function onLevelUpByAdverBtnClick() {
        var self = this;
        // 关闭广告时回调
        var closeFunc = function closeFunc(success) {
            if (success) {
                self.onGrowUp(self.curType);
                self.refreshShowData(self.curType);
                PlayerData.instance.saveUserData('看广告升级属性');
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
    },

    closeGoldNode: function closeGoldNode() {
        this.getGoldNode.active = false;
    },

    onGetGoldBtnClick: function onGetGoldBtnClick() {
        var self = this;
        // 关闭广告时回调
        var closeFunc = function closeFunc(success) {
            if (success) {
                PlayerData.instance.dayGetGoldCount++;
                PlayerData.instance.updateGold(self.getGoldcount);
                PlayerData.instance.showGold -= self.getGoldcount;
                var param = {
                    count: self.getGoldcount,
                    isMore: true,
                    isLucky: false
                };
                self.world.uiMgr.showGetMoneyEffect(param);
                self.closeGoldNode();
                self.refreshShowData(self.curType, false);
            }
        };

        // 打开广告失败时回调,失败回调
        var errFunc = function errFunc() {
            ShareMgr.share(ShareType.NotEnoughMoney, closeFunc);
            // self.world.uiMgr.showTips('暂未获取到广告信息')
        };
        AdvertMgr.instance.showAdver(AdverType.NotEnoughMoney, closeFunc, errFunc);
    },

    onGrowUp: function onGrowUp(type) {
        PlayerData.instance.updateGrowLevel(type);
        var levelData = PlayerData.instance.getGrowLevelDataByType(type);
        if (!levelData) return;
        switch (type) {
            case GrowType.Attack:
                this.world.localPlayer.changeAttackPower(levelData.realParam);
                break;
            case GrowType.Defence:
                this.world.localPlayer.changeDefencePower(levelData.realParam);
                break;
            case GrowType.Speed:
                this.world.localPlayer.changeGrowSpeedAddition(levelData.realParam);
                break;
            case GrowType.Gold:
                this.world.uiMgr.refreshOfflineGoldData();
                break;
        }
    }
});

cc._RF.pop();