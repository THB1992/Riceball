/**
 * @fileoverview PanelHolidayRank
 * @author <zhangzhuang@gameley.cn> (张庄)
 */
const Tools = require('Tools');
const ConfigData = require('ConfigData');
const PlayerData = require('PlayerData');
const AdvertMgr = require('AdvertMgr');
const AdverType = require('Types').AdverType;
const ShareMgr = require('ShareMgr');
const ShareType = require('Types').ShareType;
const TaskType = require('Types').TaskType;
const GameData = require('GameData');
const PlatformMgr = require('PlatformMgr');

const CHECK_COLOR = new cc.Color().fromHEX('#bb3a07');

//假期排行
const PanelHolidayRank = cc.Class({
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
        daySpan: false,
    },
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},

    //isPK代表是展示pk榜还是世界榜

    init(world, isPK = true, callback) {
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
            perLine: 1,
        })
        // this._pkRewardScrollView.scrollToRank(0)
        //世界排行奖励
        this._worldRewardScrollView = Tools.getOrAddComponent(this.worldRewardScrollView, 'MyScrollView');
        this._worldRewardScrollView.init(ConfigData.instance.holidayWorldRewardDatas, {
            itemPrefab: this.worldRewardPrefab,
            className: 'ItemWorldReward',
            startX: 0,
            gapX: 15,
            gapY: 10,
            perLine: 1,
        })
        // this._worldRewardScrollView.scrollToRank(0)
        this.startUpdate = false;
        // console.log('时间：', new Date(PlayerData.instance.getCurTime()));

        this.refreshPKRank()
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

    refreshPKRank() {
        PlayerData.instance.getHolidayPKRank((data, mineData) => {
            this.pkRoundLabel.string = '(第' + data.round + '轮)';
            this.worldRoundLabel.string = '(第' + data.round + '轮)';
            // this.pkSurplusTime = data.surplusTime;
            var rankInfo = data.rankInfo;
            //排序

            //我的小组排行
            if (mineData) {
                var pkMyRankNode = cc.instantiate(this.pkRankPrefab);
                pkMyRankNode.parent = this.pkMyRankParent;
                this.pkMyRankComp = pkMyRankNode.getComponent('ItemPKRank');
                this.pkMyRankComp.init(mineData);
            } else {
                if (GameData.instance.isShowLog()) {
                    console.error('我的小组排行为空');
                }
            }


            //小组排行
            this._pkScrollView = Tools.getOrAddComponent(this.pkScrollView, 'MyScrollView');
            this.itemPKPool = this._pkScrollView.init(rankInfo, {
                itemPrefab: this.pkRankPrefab,
                className: 'ItemPKRank',
                startX: 0,
                gapX: 15,
                gapY: 10,
                perLine: 1,
            }, (index, node) => {
                setTimeout(() => {
                    node.stopAllActions();
                    node.x = 1000;
                    node.runAction(cc.moveBy(0.5, cc.v2(-1000, 0)).easing(cc.easeBackOut(1.0)));
                }, index * 100)
            })
            this.refreshPKRollAnim();
            this.refreshWorldRank(0);
        })
    },


    refreshWorldRank(round) {
        PlayerData.instance.getHolidayWorldRank(round, (data, mineData, isHourSpanRefresh) => {
            var rankInfo = data.rankInfo;
            this.worldRound = data.round;
            this.worldRoundLabel.string = '(第' + data.round + '轮)';
            // this.worldSurplusTime = data.surplusTime;
            // 我的世界排行
            if (mineData) {
                var worldMyRankNode = cc.instantiate(this.pkRankPrefab);
                worldMyRankNode.parent = this.worldMyRankParent;
                this.worldMyRankComp = worldMyRankNode.getComponent('ItemPKRank');
                this.worldMyRankComp.init(mineData);
            } else {
                if (GameData.instance.isShowLog()) {
                    console.error('我的世界排行为空');
                }
            }
            //世界排行
            this._worldScrollView = Tools.getOrAddComponent(this.worldScrollView, 'MyScrollView');
            this.itemWorldPool = this._worldScrollView.init(rankInfo, {
                itemPrefab: this.pkRankPrefab,
                className: 'ItemPKRank',
                startX: 0,
                gapX: 15,
                gapY: 10,
                perLine: 1,
            }, (index, node) => {
                setTimeout(() => {
                    node.stopAllActions();
                    node.x = 1000;
                    node.runAction(cc.moveBy(0.5, cc.v2(-1000, 0)).easing(cc.easeBackOut(1.0)));
                }, index * 100)
            })

            if (this.worldRound === PlayerData.instance.maxWorldRound && mineData) {
                this._worldScrollView.scrollToRank(mineData.rank, 0.5);
            }

            this.leftPageBtn.active = data.round !== 1;
            this.rightPageBtn.active = data.round !== PlayerData.instance.maxWorldRound;
            this.worldMyRankParent.active = data.round === PlayerData.instance.maxWorldRound;
            this.worldEmptyNode.active = !(rankInfo && rankInfo.length);




            if (isHourSpanRefresh) {
                if (mineData.rank === -1) {
                    //如果是自动弹出的则关闭
                    // if (!this.isPK) this.close();
                    // this.playWorldEffect();
                } else {
                    this.playWorldEffect();
                }
            }


            this.startUpdate = true;
        })
    },

    playWorldEffect: function () {
        this.worldEffect.play();
    },

    onPKNodeBtnClick() {
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

    onWorldNodeBtnClick() {
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

    onPKRewardBtnClick() {
        this.pkRewardNode.active = true;
    },

    onPKRewardCloseBtnClick() {
        this.pkRewardNode.active = false;
    },

    onWorldRewardBtnClick() {
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

    onWorldRewardCloseBtnClick() {
        this.worldRewardNode.active = false;
    },

    showPanelRewardDetail() {
        this.world.uiMgr.showPanelRewardDetail();
    },

    close() {
        this.node.active = false;
        this.world.uiMgr.hidePanelHolidayUserinfoBtns();
        if (this.callback) {
            this.callback();
        }
    },

    turnPageLeft() {
        if (this.worldRound > 1) {
            this.worldRound--;
            this.refreshWorldRank(this.worldRound);
        }
    },

    turnPageRight() {
        if (this.worldRound < PlayerData.instance.maxWorldRound) {
            this.worldRound++;
            this.refreshWorldRank(this.worldRound);
        }
    },
    onbtn1: function () {
        PlatformMgr.setHolidayScore(4)
    },
    onbtn2: function () {
        PlatformMgr.getHolidayPKReward();
    },
    onbtn3: function () {
        PlatformMgr.getHolidayWorldReward();
    },
    onbtn4: function () {
        PlatformMgr.getHolidayWorldRewardInfo();
    },

    update(dt) {

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
            for (let hour of ConfigData.instance.holidayDatas.refreshWorldTime) {
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
            if (h !== this.h) {
                console.log('---------------------------update上次更新小时：' + this.h);
                this.h = h;
                var str = '将于' + h + ':00更新排行';;
                this.worldRefreshTips.string = str;
                // this.worldRefreshTips.node.active = true;
                if (this.curHour === 0 && m < 2 ) {
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
                    PlayerData.instance.updateWorldRewardDetail()
                    PlatformMgr.getHolidayPKReward((pdata) => {
                        this.world.uiMgr.showPanelPKReward(pdata, () => {
                            PlatformMgr.getHolidayWorldReward((wdata) => {
                                this.world.uiMgr.showPanelWorldReward(wdata);
                            });
                        })
                    })
                    PlayerData.instance.clearHolidayData();
                    this.init(this.world);

                    this.daySpan = false;
                    this.worldRefreshTips.node.active = true;
                }
            }
        }
    },




    refreshPKRollAnim: function () {
        var curData = PlayerData.instance.myPKRankData;
        var oldData = PlayerData.instance.myOldPKRankData;
        var comp = this.pkRollNode.getComponent('ItemPKRank');

        if (curData && oldData && curData.rank < oldData.rank) {
            comp.init(oldData);
            this._pkScrollView.scrollToRank(oldData.rank, 0.1);
            this.pkRollAnim.play('ani-holiday-rank-1');
            this.pkRollAnim.node.position = cc.v2(0, 0);
            setTimeout(() => {
                this._pkScrollView.scrollToRank(curData.rank, 0.5);
                if (curData.rank <= 3) {
                    this.pkRollAnim.node.runAction(cc.moveTo(0.5, cc.v2(0, 70 * (4 - curData.rank))));
                }
            }, 500);
            setTimeout(() => {
                this.pkRollAnim.play('ani-holiday-rank-2');
                PlayerData.instance.myOldPKRankData = null;
            }, 1000);
        } else {
            if (curData) this._pkScrollView.scrollToRank(curData.rank, 0.5);
        }
    },


    // update (dt) {},
});