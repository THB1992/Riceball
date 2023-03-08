"use strict";
cc._RF.push(module, '50712JOO4VDObeijk0O6pZp', 'PanelDailyTask');
// scripts/battle/ui/PanelDailyTask.js

'use strict';

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
    extends: cc.Component,

    properties: {

        itemPool: [],
        itemDailyTaskPrefab: cc.Prefab,
        itemParentNode: cc.Node,

        zongZiNumNode: cc.Node,
        zongZiNumLabel: cc.Label,
        zongziRewardNode: cc.Node,

        titleNodes: [cc.Node],

        iconNodes: [cc.Node],
        exchangeNodes: [cc.Node],
        hasGetNodes: [cc.Node],
        priceLabels: [cc.Label],

        refreshParentNode: cc.Node,
        refreshTipsNode: cc.Node,

        panelMult: cc.Node,
        nommalLabel: cc.Label,
        multLabel: cc.Label,

        panelRefresh: cc.Node,
        taskName: cc.Label,
        remainLabel: cc.Label,
        reaminTipsLabel: cc.Label,

        goldAdverIcon: cc.Node,
        goldShareIcon: cc.Node,

        normalCoinIcon: [cc.Node],
        multipCoinIcon: [cc.Node],

        refreshAdverIcon: cc.Node,
        refreshShareIcon: cc.Node,

        activityTimeLabel: cc.Label,

        bgNode: cc.Node,
        helpTips: cc.Node,

        trggleNode: cc.Node,
        trggleRootNode: cc.Node,
        trggleNodeWidget: cc.Widget
    },

    init: function init(world, callback) {
        var _this = this;

        this.world = world;
        this.callback = callback;
        setTimeout(function () {
            if (_this.trggleNodeWidget) _this.trggleNodeWidget.onEnable();
        }, 200);

        this.activityDatas = ConfigData.instance.activityDuanWuDatas;

        // if (!PlayerData.instance.zongZiToDaoBi) {
        //     var count = PlayerData.instance.zongZi;
        //     if (count > 0) {
        //         this.world.uiMgr.showTips('convert zongZi x' + count + ' => Diamond x' + count)
        //     }
        //     PlayerData.instance.updateZongZiToDaoBi();
        // }

        //钻石转化
        // if (ConfigData.instance.isAfterDuanWuFestival(PlayerData.instance.getCurTime())) {
        //     var count = PlayerData.instance.zongZi;
        //     if (count > 0) {
        //         var convertCount = count * ConfigData.instance.clientData.zongZiToGold;
        //         this.world.uiMgr.showTips('convert zongZi x' + count + '=> Gold x' + convertCount)
        //         PlayerData.instance.updateGold(convertCount);
        //         PlayerData.instance.updateZongZi(-count);
        //         PlayerData.instance.showGold -= convertCount;
        //         var param = {
        //             count: convertCount,
        //             isMore: true,
        //             isLucky: true,
        //         }
        //         this.world.uiMgr.showGetMoneyEffect(param);
        //     }
        // }

        this.activityTimeLabel.string = ConfigData.instance.getUITipStr(11);

        if (!Tools.getItem('showHelpTips')) {
            this.helpTips.active = true;
            Tools.setItem('showHelpTips', 1);
        } else {
            this.helpTips.active = false;
        }

        //勾选
        this.trggleNode.active = true;
        this.trggleRootNode.opacity = 200;
        this.isTrggle = true;

        AdvertMgr.instance.loadAdver(AdverType.MultipDailyTask, function (hasAdver) {
            if (hasAdver) {
                AdvertMgr.instance.openAdver(AdverType.MultipDailyTask);
            }
        });

        this.refresh();
    },

    refresh: function refresh() {
        var _this2 = this;

        // let tasks = PlayerData.instance.dailyShowTask;
        // if(tasks.length)
        var tasks = PlayerData.instance.dailyShowTask;

        var maxRewardNum = 0;
        this.maxRewardIndex = 0;

        var isFestival = ConfigData.instance.isDuringDuanWuFestival(PlayerData.instance.getCurTime());
        var isGuide = PlayerData.instance.isDuringDailyTaskGuide();
        this.hasAdver = true;
        var stage = ConfigData.instance.getCurStageByPrizeCount(PlayerData.instance);
        var func = function func(hasAdver) {
            _this2.hasAdver = hasAdver;
        };

        switch (stage) {
            case StageType.Free:
            case StageType.Share:
                func(false);
                break;
            case StageType.Adver:
                AdvertMgr.instance.loadAdver(AdverType.RefreshDailyTask, func);
                break;
        }
        for (var i = 0; i < 3; i++) {
            var data = tasks[i];
            if (!data) {
                console.error('每日任务为空');
                console.log(JSON.stringify(tasks));
                continue;
            }

            var reward = isFestival && data.specialReward ? data.specialReward : data.reward;
            var item = BagItem.createItemWithString(reward);
            if (item.type === 0) {
                item.num = Math.ceil(item.num * (1 + data.goldMultiRate));
            }

            if (item.num > maxRewardNum) {
                maxRewardNum = item.num;
                this.maxRewardIndex = i;
            }

            var isComplete = data.process >= data.param;
            var isGet = Tools.arrContains(PlayerData.instance.dailyOldTask, data.id) || Tools.arrContains(PlayerData.instance.completeGuideDailyTask, data.id);
            if (this.itemPool[i]) {
                this.itemPool[i].refresh(data, item, isGet, this.isTrggle, this.hasAdver);
            } else {
                var node = cc.instantiate(this.itemDailyTaskPrefab);
                node.parent = this.itemParentNode;
                node.y = -i * 120;
                var comp = node.getComponent('ItemDailyTask');

                comp.refresh(data, item, isGet, this.isTrggle, this.hasAdver);
                comp.setOnItemClick(this, i);
                comp.setJumpCallback(function () {
                    _this2.node.active = false;
                    _this2.world.onStartBtnClick(null, null);
                });
                this.itemPool[i] = comp;
            }

            if (this.callback && isComplete && !isGet && !data.hasShow) {
                this.itemPool[i].needShowAnim = true;
                data.hasShow = true;
                PlayerData.instance.saveUserData('存储每日任务自动弹出信息');
            }
        }
        //生成三条任务，按钮有更换，前往和领取

        //三个可以兑换的奖励，根据获取的货币点击兑换
        this.zongZiNumLabel.string = PlayerData.instance.zongZi;

        this.titleNodes[0].active = isGuide;
        this.titleNodes[1].active = !this.titleNodes[0].active && isFestival;
        this.titleNodes[2].active = !this.titleNodes[0].active && !this.titleNodes[1].active;

        this.zongZiNumNode.active = isFestival && !isGuide;
        this.zongziRewardNode.active = isFestival && !isGuide;
        if (this.zongziRewardNode.active) {
            setTimeout(function () {
                if (_this2.trggleNodeWidget) _this2.trggleNodeWidget.onEnable();
            }, 200);
        }

        //剩余刷新次数
        var maxCount = ConfigData.instance.clientData.maxRefreshTaskCount;
        var curCount = PlayerData.instance.dayRefreshTaskCount;
        var remainCount = maxCount - curCount;
        this.remainLabel.string = Tools.getStringByFormat(ConfigData.instance.getUITipStr(19), remainCount, maxCount);
        this.reaminTipsLabel.string = "Refresh Missions For Free";
        // this.refreshParentNode.active = !isGuide && (remainCount > 0);
        var canRefresh = true;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.itemPool[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _comp = _step.value;

                if (!_comp.isGet) {
                    canRefresh = false;
                    break;
                }
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

        this.refreshTipsNode.active = !isGuide && remainCount > 0 && canRefresh;
        // this.refreshTipsNode.active = true
        this.bgNode.height = this.refreshTipsNode.active ? 470 : 420;
        this.zongziRewardNode.y = this.refreshTipsNode.active ? -250 : -200;
        if (this.refreshTipsNode.active) {
            var stage = ConfigData.instance.getCurStageByPrizeCount(PlayerData.instance);
            var func = function func(hasAdver) {
                _this2.refreshAdverIcon.active = hasAdver;
                _this2.refreshShareIcon.active = !hasAdver;
                if (hasAdver && _this2.refreshTipsNode.active) {
                    AdvertMgr.instance.openAdver(AdverType.RefreshDailyTask);
                }
            };

            switch (stage) {
                case StageType.Free:
                case StageType.Share:
                    func(false);
                    break;
                case StageType.Adver:
                    AdvertMgr.instance.loadAdver(AdverType.RefreshDailyTask, func);
                    break;
            }
        }

        this.finalPrice = [];
        //兑换按钮
        for (var _i = 0; _i < this.activityDatas.length; _i++) {

            var data = this.activityDatas[_i];
            data.isLate = data.changeDate && Tools.isAfterOtherTime(data.changeDate, PlayerData.instance.getCurTime());
            this.iconNodes[_i].children[0].active = !data.isLate;
            this.iconNodes[_i].children[1].active = data.isLate;

            var priceArr = data.isLate ? data.latePrice : data.price;

            this.exchangeNodes[_i].active = false;
            var reward = data.isLate ? data.lateReward : data.reward;
            var items = BagItem.createItemsWithString(reward);

            this.finalPrice[_i] = 0;
            for (var j = 0; j < items.length; j++) {
                var _item = items[j];
                var price = priceArr[j] ? priceArr[j] : 0;
                switch (_item.type) {
                    case ItemType.HERO_SKIN:
                        if (PlayerData.instance.isOwnHeroSkin(_item.id)) {
                            price = 0;
                        } else {
                            this.exchangeNodes[_i].active = true;
                        }
                        break;
                    case ItemType.KNIFE_SKIN:
                        if (PlayerData.instance.isOwnKnifeSkin(_item.id)) {
                            price = 0;
                        } else {
                            this.exchangeNodes[_i].active = true;
                        }
                        break;
                }
                this.finalPrice[_i] += price;
            }
            this.priceLabels[_i].string = this.finalPrice[_i];
            this.hasGetNodes[_i].active = !this.exchangeNodes[_i].active;
        }
    },

    //是否翻倍领奖励的勾选
    onTrggleClick: function onTrggleClick() {
        this.trggleNode.active = !this.trggleNode.active;
        this.isTrggle = this.trggleNode.active;
        this.trggleRootNode.opacity = this.isTrggle ? 200 : 255;
        this.refresh();
    },

    //领取按钮点击
    onItemClick: function onItemClick(event, customEventData) {
        var _this3 = this;

        if (this.isClick) return;
        this.isClick = true;
        var index = Number(customEventData);
        var itemComp = this.itemPool[index];
        var data = itemComp.data;
        var item = itemComp.item;
        var isGet = itemComp.isGet;

        if (isGet) {
            console.log('已领取过该奖励');
            this.isClick = false;
            return;
        }

        var callback = null;
        switch (item.type) {
            case ItemType.MONEY:
                callback = function callback() {
                    var mult = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

                    var count = item.num * mult;
                    PlayerData.instance.updateGold(count);
                    PlayerData.instance.showGold -= count;
                    var param = {
                        count: count,
                        isMore: mult === 3,
                        isLucky: false
                    };
                    _this3.world.uiMgr.showGetMoneyEffect(param);
                };
                break;
            case ItemType.HERO_SKIN:
                if (!PlayerData.instance.isOwnHeroSkin(item.id)) {
                    PlayerData.instance.addHeroSkin(item.id);
                    //装备上
                    this.world.onEquipHeroSkin(item.itemData, true);
                }
                //展示出来
                this.world.uiMgr.showReward(item.itemData);
                break;
            case ItemType.KNIFE_SKIN:
                if (!PlayerData.instance.isOwnKnifeSkin(item.id)) {
                    PlayerData.instance.addKnifeSkin(item.id);
                    this.world.onEquipKnifeSkin(item.itemData, true);
                }
                //展示出来
                this.world.uiMgr.showReward(item.itemData);
                break;
            case ItemType.ZONG_ZI:
                callback = function callback() {
                    var mult = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

                    var count = item.num * mult;
                    PlayerData.instance.updateZongZi(count);
                    _this3.world.uiMgr.showTips(Tools.getStringByFormat(ConfigData.instance.getUITipStr(15), count));
                };
                break;
        }

        this.multCallback = function (mult) {
            if (callback) callback(mult);
            PlayerData.instance.dailyShowTask[index].finalReceiveMult = mult;
            PlayerData.instance.updateDailyOldTask(data.id);
            if (data.degree === -1) {
                PlayerData.instance.updateCompleteGuideDailyTask(data.id);
                if (!PlayerData.instance.isDuringDailyTaskGuide()) {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = _this3.itemPool[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var comp = _step2.value;

                            comp.playRefreshAnim();
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
                }
            }
            _this3.world.uiMgr.refreshRedDot();
            _this3.refresh();
            _this3.isClick = false;
        };

        if (item.type === ItemType.ZONG_ZI || callback && index === this.maxRewardIndex && data.degree !== -1) {
            this.nommalLabel.string = 'x' + item.num;
            this.multLabel.string = 'x' + item.num * 3;
            this.normalCoinIcon[0].active = item.type === ItemType.MONEY;
            this.multipCoinIcon[0].active = item.type === ItemType.MONEY;

            this.normalCoinIcon[1].active = item.type === ItemType.ZONG_ZI;
            this.multipCoinIcon[1].active = item.type === ItemType.ZONG_ZI;

            // this.panelMult.active = true;

            var stage = ConfigData.instance.getCurStageByPrizeCount(PlayerData.instance);

            var func = function func(hasAdver) {
                _this3.goldAdverIcon.active = hasAdver;
                _this3.goldShareIcon.active = !hasAdver;

                // for (let comp of this.itemPool) {
                //     comp.setIcon(hasAdver);
                // }
                // if (hasAdver) {
                //     AdvertMgr.instance.openAdver(AdverType.MultipDailyTask);
                // }
            };

            switch (stage) {
                case StageType.Free:
                case StageType.Share:
                    func(false);
                    break;
                case StageType.Adver:
                    AdvertMgr.instance.loadAdver(AdverType.MultipDailyTask, func);
                    break;
            }

            if (this.isTrggle) {
                this.onMultGoldBtnClick();
            } else {
                this.onNormalGoldBtnClick();
            }
        } else {
            this.multCallback();
        }
        // this.multPanel.init(callback);
    },

    onPanelMultClose: function onPanelMultClose() {
        this.isClick = false;
        this.panelMult.active = false;
    },

    onNormalGoldBtnClick: function onNormalGoldBtnClick() {
        if (this.multCallback) {
            this.multCallback(1);
            this.isClick = false;
        }
    },

    onMultGoldBtnClick: function onMultGoldBtnClick() {
        var _this4 = this;

        if (this.multCallback) {
            // 关闭广告时回调
            var closeFunc = function closeFunc(success) {
                if (success) {
                    _this4.multCallback(3);
                }
                _this4.isClick = false;
            };

            if (this.goldShareIcon.active) {
                this.showShare(ShareType.MultipDailyTask, closeFunc);
            } else if (this.goldAdverIcon.active) {
                this.showAdver(AdverType.MultipDailyTask, ShareType.MultipDailyTask, closeFunc);
            } else {
                closeFunc(true);
            }
        }
    },

    showAdver: function showAdver(type, shareType, closeFunc) {
        var _this5 = this;

        var errFunc = function errFunc() {
            _this5.showShare(shareType, closeFunc);
        };

        AdvertMgr.instance.fireBaseEvent("click_adv_btn", position_id, ConfigData.instance.getAdvertUnitId(type));
        AdvertMgr.instance.showAdver(type, closeFunc, errFunc);
    },

    showShare: function showShare(type, closeFunc) {
        ShareMgr.share(type, closeFunc);
    },

    // onRefreshAllTaskClick: function (event, customEventData) {
    //     if (this.isClickRefresh) return
    //     this.isClickRefresh = true;

    //     this.refreshCloseFunc = () => {
    //         for (let i = 0; i < 3; i++) {
    //             var data = PlayerData.instance.dailyShowTask[i]
    //             data.process = 0;
    //             var comp = this.itemPool[i];
    //             comp.playRefreshAnim();
    //             var id = data.id;

    //             PlayerData.instance.updateDailyOldTask(id);
    //             var task = ConfigData.instance.getOneDailyTask(PlayerData.instance.dailyShowTask, PlayerData.instance.dailyOldTask, PlayerData.instance.rankStar);
    //             if (task) {
    //                 task.goldMultiRate = PlayerData.instance.rankData.goldMultiRate;
    //                 PlayerData.instance.dailyShowTask[i] = task;
    //             } else {
    //                 console.error('任务刷光啦')
    //             }
    //         }
    //         PlayerData.instance.updateDayRefreshTaskCount()
    //         this.refresh();
    //         this.world.uiMgr.refreshRedDot();
    //         this.isClickRefresh = false;
    //     }

    //     this.taskName.string = '是否免费更换所有任务';
    //     this.panelRefresh.active = true;

    //     // this.showEffect
    // },


    //暂时不用
    // onRefreshTaskClick: function (event, customEventData) {
    //     if (this.isClickRefresh) return
    //     this.isClickRefresh = true;
    //     var index = Number(customEventData);
    //     var data = PlayerData.instance.dailyShowTask[index]
    //     var comp = this.itemPool[index];
    //     this.refreshCloseFunc = () => {
    //         comp.playRefreshAnim();
    //         var id = data.id;
    //         data.process = 0;
    //         PlayerData.instance.updateDayRefreshTaskCount()
    //         PlayerData.instance.updateDailyOldTask(id);
    //         var task = ConfigData.instance.getOneDailyTask(PlayerData.instance.dailyShowTask, PlayerData.instance.dailyOldTask, PlayerData.instance.rankStar);

    //         if (task) {
    //             task.goldMultiRate = PlayerData.instance.rankData.goldMultiRate;
    //             PlayerData.instance.dailyShowTask[index] = task;
    //             PlayerData.instance.saveUserData();
    //         } else {
    //             console.error('任务刷光啦')
    //         }
    //         this.refresh();
    //         this.world.uiMgr.refreshRedDot();
    //         this.isClickRefresh = false;
    //     }


    //     this.taskName.string = '是否免费更换任务：' + data.name;

    //     this.panelRefresh.active = true;
    //     var stage = ConfigData.instance.getCurStageByPrizeCount(PlayerData.instance);
    //     var func = (hasAdver) => {
    //         this.refreshAdverIcon.active = hasAdver;
    //         this.refreshShareIcon.active = !hasAdver;
    //         if (hasAdver) {
    //             AdvertMgr.instance.openAdver(AdverType.RefreshDailyTask);
    //         }
    //     }

    //     switch (stage) {
    //         case StageType.Free:
    //         case StageType.Share:
    //             func(false);
    //             break;
    //         case StageType.Adver:
    //             AdvertMgr.instance.loadAdver(AdverType.RefreshDailyTask, func);
    //             break;
    //     }
    //     // this.showEffect
    // },

    onPanelRefreshClose: function onPanelRefreshClose() {
        this.panelRefresh.active = false;
        // this.isClickRefresh = false;
    },

    onRefreshBtnClick: function onRefreshBtnClick() {
        var _this6 = this;

        // if (this.isClickRefresh) return
        // this.isClickRefresh = true;

        this.refreshCloseFunc = function () {
            for (var i = 0; i < 3; i++) {
                var data = PlayerData.instance.dailyShowTask[i];
                data.process = 0;
                var comp = _this6.itemPool[i];
                comp.playRefreshAnim();
                var id = data.id;

                PlayerData.instance.updateDailyOldTask(id);
                var task = ConfigData.instance.getOneDailyTask(PlayerData.instance, i);
                if (task) {
                    task.goldMultiRate = PlayerData.instance.rankData.goldMultiRate;
                    PlayerData.instance.dailyShowTask[i] = task;
                } else {
                    console.error('Null task');
                }
            }
            PlayerData.instance.updateDayRefreshTaskCount();
            _this6.refresh();
            _this6.world.uiMgr.refreshRedDot();
            // this.isClickRefresh = false;
        };

        // 关闭广告时回调
        var closeFunc = function closeFunc(success) {
            if (success) {
                _this6.onPanelRefreshClose();
                _this6.refreshCloseFunc();
            }
        };

        if (this.refreshShareIcon.active) {
            this.showShare(ShareType.RefreshDailyTask, closeFunc);
        } else if (this.refreshAdverIcon.active) {
            this.showAdver(AdverType.RefreshDailyTask, ShareType.RefreshDailyTask, closeFunc);
        } else {
            closeFunc(true);
        }
    },

    onExchangeBtnClick: function onExchangeBtnClick(event, customEventData) {
        var _this7 = this;

        var index = Number(customEventData);
        var data = this.activityDatas[index];
        if (PlayerData.instance.zongZi < this.finalPrice[index]) {
            this.world.uiMgr.showTips('Insufficient Diamond');
            return;
        }

        var reward = data.isLate ? data.lateReward : data.reward;
        var items = BagItem.createItemsWithString(reward);
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = items[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var item = _step3.value;

                switch (item.type) {
                    case ItemType.MONEY:
                        var count = item.num;
                        PlayerData.instance.updateGold(count);
                        PlayerData.instance.showGold -= count;
                        var param = {
                            count: count,
                            isMore: false,
                            isLucky: false
                        };
                        this.world.uiMgr.showGetMoneyEffect(param);
                        this.world.uiMgr.showTips(Tools.getStringByFormat(ConfigData.instance.getUITipStr(16), count));
                        break;
                    case ItemType.HERO_SKIN:
                        if (PlayerData.instance.isOwnHeroSkin(item.id)) {
                            // this.world.uiMgr.showTips('已经拥有，无需兑换');
                            // return;
                            item.hasGet = true;
                            this.world.onEquipHeroSkin(item.itemData, true);
                        } else {
                            PlayerData.instance.addHeroSkin(item.id);
                            //装备上
                            this.world.onEquipHeroSkin(item.itemData, true);
                        }
                        break;
                    case ItemType.KNIFE_SKIN:
                        if (PlayerData.instance.isOwnKnifeSkin(item.id)) {
                            // this.world.uiMgr.showTips('已经拥有，无需兑换');
                            // return;、
                            item.hasGet = true;
                            this.world.onEquipKnifeSkin(item.itemData, true);
                        } else {
                            PlayerData.instance.addKnifeSkin(item.id);
                            this.world.onEquipKnifeSkin(item.itemData, true);
                        }
                        break;
                }
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

        if (items.length === 2) {
            if (items[0].hasGet) {
                this.world.uiMgr.showReward(items[1].itemData);
            } else if (items[1].hasGet) {
                this.world.uiMgr.showReward(items[0].itemData);
            } else {
                this.world.uiMgr.showReward(items[0].itemData, function () {
                    _this7.world.uiMgr.showReward(items[1].itemData);
                });
            }
        } else if (items[0].type === ItemType.KNIFE_SKIN || items[0].type === ItemType.HERO_SKIN) {
            this.world.uiMgr.showReward(items[0].itemData);
        }

        PlayerData.instance.updateZongZi(-this.finalPrice[index]);
        this.refresh();
    },

    onClose: function onClose() {
        this.node.active = false;
        if (this.callback) this.callback();
        AdvertMgr.instance.showBanner();
        console.log("showBanner onPanelDaliyTask close ");
    }
});

cc._RF.pop();