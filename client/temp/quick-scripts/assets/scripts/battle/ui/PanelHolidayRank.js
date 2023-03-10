(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/ui/PanelHolidayRank.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7347elEmNRBTKem8nhldyPg', 'PanelHolidayRank', __filename);
// scripts/battle/ui/PanelHolidayRank.js

'use strict';

/**
 * @fileoverview PanelHolidayRank
 * @author <zhangzhuang@gameley.cn> (张庄)
 */
var Tools = require('Tools');
var ConfigData = require('ConfigData');
var PlayerData = require('PlayerData');
var AdvertMgr = require('AdvertMgr');
var AdverType = require('Types').AdverType;
var ShareMgr = require('ShareMgr');
var ShareType = require('Types').ShareType;
var TaskType = require('Types').TaskType;
var GameData = require('GameData');
var PlatformMgr = require('PlatformMgr');

var CHECK_COLOR = new cc.Color().fromHEX('#bb3a07');

//假期排行
var PanelHolidayRank = cc.Class({
    extends: cc.Component,

    properties: {
        pkNode: cc.Node,
        pkScrollView: cc.Node,
        pkRankPrefab: cc.Prefab,
        pkRewardNode: cc.Node,
        pkRewardScrollView: cc.Node,
        pkRewardPrefab: cc.Prefab,
        pkCountDownLabel: cc.Label,
        pkBtn: cc.Node,
        pkCheckNode: cc.Node,
        pkNotCheckNode: cc.Node,
        pkTitleNode: cc.Node,
        pkRoundLabel: cc.Label,

        pkMyRankParent: cc.Node,

        worldNode: cc.Node,
        worldScrollView: cc.Node,
        worldRankPrefab: cc.Prefab,
        worldRewardNode: cc.Node,
        worldRewardScrollView: cc.Node,
        worldRewardPrefab: cc.Prefab,
        worldCountDownLabel: cc.Label,
        worldBtn: cc.Node,
        worldCheckNode: cc.Node,
        worldNotCheckNode: cc.Node,
        worldTitleNode: cc.Node,
        worldRoundLabel: cc.Label,

        // worldMyRankBar: cc.Node,
        worldMyRankParent: cc.Node,

        leftPageBtn: cc.Node,
        rightPageBtn: cc.Node,

        worldRewardBg: cc.Node,
        worldRewardDetailBtn: cc.Node,
        worldEmptyNode: cc.Node,
        worldEffect: cc.Animation,
        worldRefreshTips: cc.Label,

        pkRollAnim: cc.Animation,
        pkRollNode: cc.Node,
        daySpan: false
    },
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},

    //isPK代表是展示pk榜还是世界榜

    init: function init(world) {
        var isPK = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var callback = arguments[2];

        this.world = world;
        this.isPK = isPK;
        this.callback = callback;
        //小组排行奖励
        this._pkRewardScrollView = Tools.getOrAddComponent(this.pkRewardScrollView, 'MyScrollView');
        this._pkRewardScrollView.init(ConfigData.instance.holidayPKRewardDatas, {
            itemPrefab: this.pkRewardPrefab,
            className: 'ItemPKReward',
            startX: 0,
            gapX: 15,
            gapY: 5,
            perLine: 1
        });
        // this._pkRewardScrollView.scrollToRank(0)
        //世界排行奖励
        this._worldRewardScrollView = Tools.getOrAddComponent(this.worldRewardScrollView, 'MyScrollView');
        this._worldRewardScrollView.init(ConfigData.instance.holidayWorldRewardDatas, {
            itemPrefab: this.worldRewardPrefab,
            className: 'ItemWorldReward',
            startX: 0,
            gapX: 15,
            gapY: 10,
            perLine: 1
        });
        // this._worldRewardScrollView.scrollToRank(0)
        this.startUpdate = false;
        // console.log('时间：', new Date(PlayerData.instance.getCurTime()));

        this.refreshPKRank();
        if (ConfigData.instance.isDuringHolidayRankTime(PlayerData.instance.getCurTime())) {
            // if (false) {
            if (isPK) {
                this.onPKNodeBtnClick();
            } else {
                this.onWorldNodeBtnClick();
            }
            this.pkBtn.active = true;
            this.worldBtn.x = 170;
            this.worldRefreshTips.node.active = true;
            this.worldCountDownLabel.node.active = true;
        } else {
            this.onWorldNodeBtnClick();
            this.pkBtn.active = false;
            this.worldBtn.x = 0;
            this.worldRefreshTips.node.active = false;
            this.worldCountDownLabel.node.active = false;
        }
    },


    // closePKBtn() {

    // },

    refreshPKRank: function refreshPKRank() {
        var _this = this;

        PlayerData.instance.getHolidayPKRank(function (data, mineData) {
            _this.pkRoundLabel.string = '(第' + data.round + '轮)';
            _this.worldRoundLabel.string = '(第' + data.round + '轮)';
            // this.pkSurplusTime = data.surplusTime;
            var rankInfo = data.rankInfo;
            //排序

            //我的小组排行
            if (mineData) {
                var pkMyRankNode = cc.instantiate(_this.pkRankPrefab);
                pkMyRankNode.parent = _this.pkMyRankParent;
                _this.pkMyRankComp = pkMyRankNode.getComponent('ItemPKRank');
                _this.pkMyRankComp.init(mineData);
            } else {
                if (GameData.instance.isShowLog()) {
                    console.error('我的小组排行为空');
                }
            }

            //小组排行
            _this._pkScrollView = Tools.getOrAddComponent(_this.pkScrollView, 'MyScrollView');
            _this.itemPKPool = _this._pkScrollView.init(rankInfo, {
                itemPrefab: _this.pkRankPrefab,
                className: 'ItemPKRank',
                startX: 0,
                gapX: 15,
                gapY: 10,
                perLine: 1
            }, function (index, node) {
                setTimeout(function () {
                    node.stopAllActions();
                    node.x = 1000;
                    node.runAction(cc.moveBy(0.5, cc.v2(-1000, 0)).easing(cc.easeBackOut(1.0)));
                }, index * 100);
            });
            _this.refreshPKRollAnim();
            _this.refreshWorldRank(0);
        });
    },
    refreshWorldRank: function refreshWorldRank(round) {
        var _this2 = this;

        PlayerData.instance.getHolidayWorldRank(round, function (data, mineData, isHourSpanRefresh) {
            var rankInfo = data.rankInfo;
            _this2.worldRound = data.round;
            _this2.worldRoundLabel.string = '(第' + data.round + '轮)';
            // this.worldSurplusTime = data.surplusTime;
            // 我的世界排行
            if (mineData) {
                var worldMyRankNode = cc.instantiate(_this2.pkRankPrefab);
                worldMyRankNode.parent = _this2.worldMyRankParent;
                _this2.worldMyRankComp = worldMyRankNode.getComponent('ItemPKRank');
                _this2.worldMyRankComp.init(mineData);
            } else {
                if (GameData.instance.isShowLog()) {
                    console.error('我的世界排行为空');
                }
            }
            //世界排行
            _this2._worldScrollView = Tools.getOrAddComponent(_this2.worldScrollView, 'MyScrollView');
            _this2.itemWorldPool = _this2._worldScrollView.init(rankInfo, {
                itemPrefab: _this2.pkRankPrefab,
                className: 'ItemPKRank',
                startX: 0,
                gapX: 15,
                gapY: 10,
                perLine: 1
            }, function (index, node) {
                setTimeout(function () {
                    node.stopAllActions();
                    node.x = 1000;
                    node.runAction(cc.moveBy(0.5, cc.v2(-1000, 0)).easing(cc.easeBackOut(1.0)));
                }, index * 100);
            });

            if (_this2.worldRound === PlayerData.instance.maxWorldRound && mineData) {
                _this2._worldScrollView.scrollToRank(mineData.rank, 0.5);
            }

            _this2.leftPageBtn.active = data.round !== 1;
            _this2.rightPageBtn.active = data.round !== PlayerData.instance.maxWorldRound;
            _this2.worldMyRankParent.active = data.round === PlayerData.instance.maxWorldRound;
            _this2.worldEmptyNode.active = !(rankInfo && rankInfo.length);

            if (isHourSpanRefresh) {
                if (mineData.rank === -1) {
                    //如果是自动弹出的则关闭
                    // if (!this.isPK) this.close();
                    // this.playWorldEffect();
                } else {
                    _this2.playWorldEffect();
                }
            }

            _this2.startUpdate = true;
        });
    },


    playWorldEffect: function playWorldEffect() {
        this.worldEffect.play();
    },

    onPKNodeBtnClick: function onPKNodeBtnClick() {
        this.pkNode.active = true;
        this.worldNode.active = false;
        this.pkCheckNode.active = true;
        this.pkNotCheckNode.active = false;
        this.worldCheckNode.active = false;
        this.worldNotCheckNode.active = true;
        this.pkTitleNode.color = CHECK_COLOR;
        this.worldTitleNode.color = cc.Color.WHITE;
        this.pkRoundLabel.node.color = CHECK_COLOR;
        this.worldRoundLabel.node.color = cc.Color.WHITE;
        // for (let i = 0, l = this.itemPKPool.length; i < l; i++) {
        //     var node = this.itemPKPool[i];
        //     if (node) {
        //         node.x = 1000;
        //         setTimeout(() => {
        //             node.stopAllActions();
        //             node.runAction(cc.moveBy(0.5, cc.v2(-1000, 0)).easing(cc.easeBackOut(1.0)));
        //         }, i * 50)
        //     }
        // }
    },
    onWorldNodeBtnClick: function onWorldNodeBtnClick() {
        this.pkNode.active = false;
        this.worldNode.active = true;
        this.pkCheckNode.active = false;
        this.pkNotCheckNode.active = true;
        this.worldCheckNode.active = true;
        this.worldNotCheckNode.active = false;
        this.pkTitleNode.color = cc.Color.WHITE;
        this.worldTitleNode.color = CHECK_COLOR;
        this.pkRoundLabel.node.color = cc.Color.WHITE;
        this.worldRoundLabel.node.color = CHECK_COLOR;
        // if (this.worldRound === PlayerData.instance.maxWorldRound) {
        //     this._worldScrollView.scrollToRank(PlayerData.instance.myWorldRankData.rank, 0.5, true);
        // }

        // for (let i = 0, l = this.itemWorldPool.length; i < l; i++) {
        //     var node = this.itemWorldPool[i];
        //     if (node) {
        //         node.x = 1000;
        //         setTimeout(() => {
        //             node.stopAllActions();
        //             node.runAction(cc.moveBy(0.5, cc.v2(-1000, 0)).easing(cc.easeBackOut(1.0)));
        //         }, i * 50)
        //     }
        // }
    },
    onPKRewardBtnClick: function onPKRewardBtnClick() {
        this.pkRewardNode.active = true;
    },
    onPKRewardCloseBtnClick: function onPKRewardCloseBtnClick() {
        this.pkRewardNode.active = false;
    },
    onWorldRewardBtnClick: function onWorldRewardBtnClick() {
        this.worldRewardNode.active = true;
        var data = PlayerData.instance.playerWorldRewardDetail;
        if (!data) return;

        if (data.rewardInfo && data.rewardInfo.length) {
            this.worldRewardBg.height = 500;
            this.worldRewardDetailBtn.active = true;
        } else {
            this.worldRewardBg.height = 380;
            this.worldRewardDetailBtn.active = false;
        }
    },
    onWorldRewardCloseBtnClick: function onWorldRewardCloseBtnClick() {
        this.worldRewardNode.active = false;
    },
    showPanelRewardDetail: function showPanelRewardDetail() {
        this.world.uiMgr.showPanelRewardDetail();
    },
    close: function close() {
        this.node.active = false;
        this.world.uiMgr.hidePanelHolidayUserinfoBtns();
        if (this.callback) {
            this.callback();
        }
    },
    turnPageLeft: function turnPageLeft() {
        if (this.worldRound > 1) {
            this.worldRound--;
            this.refreshWorldRank(this.worldRound);
        }
    },
    turnPageRight: function turnPageRight() {
        if (this.worldRound < PlayerData.instance.maxWorldRound) {
            this.worldRound++;
            this.refreshWorldRank(this.worldRound);
        }
    },

    onbtn1: function onbtn1() {
        PlatformMgr.setHolidayScore(4);
    },
    onbtn2: function onbtn2() {
        PlatformMgr.getHolidayPKReward();
    },
    onbtn3: function onbtn3() {
        PlatformMgr.getHolidayWorldReward();
    },
    onbtn4: function onbtn4() {
        PlatformMgr.getHolidayWorldRewardInfo();
    },

    update: function update(dt) {
        var _this3 = this;

        if (!this.startUpdate) return;

        if (PlayerData.instance.pkSurplusTime) {
            var time = PlayerData.instance.pkSurplusTime - PlayerData.instance.timeOffset;
            if (time > 0) {
                var time = Tools.getCountDownTime(time);
                this.pkCountDownLabel.string = '今日本组PK结束时间剩余：' + time.hour + ':' + time.minute + ':' + time.second;
                this.worldCountDownLabel.string = '今日世界PK结束时间剩余：' + time.hour + ':' + time.minute + ':' + time.second;
            }
        }

        var date = new Date(PlayerData.instance.getCurTime());
        var h = date.getHours();
        var m = date.getMinutes();
        if (GameData.instance.isShowLog()) {
            if (h !== this.curHour) {
                this.curHour = h;
                console.log('---------------------------当前小时：' + h);
            }
        }
        if (h >= 21) {
            var str = '将于24点结算最终名次';
            if (str !== this.worldRefreshTips.string) this.worldRefreshTips.string = '将于24点结算最终名次';
        } else {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = ConfigData.instance.holidayDatas.refreshWorldTime[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var hour = _step.value;

                    if (h < hour) {
                        h = hour;
                        if (GameData.instance.isShowLog()) {
                            if (h !== this.nextHour) {
                                this.nextHour = h;
                                console.log('---------------------------下次更新小时：' + h);
                            }
                        }
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

            if (h !== this.h) {
                console.log('---------------------------update上次更新小时：' + this.h);
                this.h = h;
                var str = '将于' + h + ':00更新排行';;
                this.worldRefreshTips.string = str;
                // this.worldRefreshTips.node.active = true;
                if (this.curHour === 0 && m < 2) {
                    this.worldRefreshTips.node.active = false;
                    this.daySpan = true;
                } else {
                    PlayerData.instance.clearHolidayData();
                    this.init(this.world);
                }
            }

            if (this.daySpan) {
                if (m < 2) {
                    this.worldCountDownLabel.string = '正在结算中，两分钟后将公布上轮成绩';
                } else {
                    PlayerData.instance.updateWorldRewardDetail();
                    PlatformMgr.getHolidayPKReward(function (pdata) {
                        _this3.world.uiMgr.showPanelPKReward(pdata, function () {
                            PlatformMgr.getHolidayWorldReward(function (wdata) {
                                _this3.world.uiMgr.showPanelWorldReward(wdata);
                            });
                        });
                    });
                    PlayerData.instance.clearHolidayData();
                    this.init(this.world);

                    this.daySpan = false;
                    this.worldRefreshTips.node.active = true;
                }
            }
        }
    },


    refreshPKRollAnim: function refreshPKRollAnim() {
        var _this4 = this;

        var curData = PlayerData.instance.myPKRankData;
        var oldData = PlayerData.instance.myOldPKRankData;
        var comp = this.pkRollNode.getComponent('ItemPKRank');

        if (curData && oldData && curData.rank < oldData.rank) {
            comp.init(oldData);
            this._pkScrollView.scrollToRank(oldData.rank, 0.1);
            this.pkRollAnim.play('ani-holiday-rank-1');
            this.pkRollAnim.node.position = cc.v2(0, 0);
            setTimeout(function () {
                _this4._pkScrollView.scrollToRank(curData.rank, 0.5);
                if (curData.rank <= 3) {
                    _this4.pkRollAnim.node.runAction(cc.moveTo(0.5, cc.v2(0, 70 * (4 - curData.rank))));
                }
            }, 500);
            setTimeout(function () {
                _this4.pkRollAnim.play('ani-holiday-rank-2');
                PlayerData.instance.myOldPKRankData = null;
            }, 1000);
        } else {
            if (curData) this._pkScrollView.scrollToRank(curData.rank, 0.5);
        }
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
        //# sourceMappingURL=PanelHolidayRank.js.map
        