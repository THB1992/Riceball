"use strict";
cc._RF.push(module, '8990aS/+RVPVbLJvBHb8W4O', 'TaskMgr');
// scripts/common/TaskMgr.js

'use strict';

var Tools = require('Tools');
var ConfigData = require('ConfigData');
var PlayerData = require('PlayerData');
var TaskType = require('Types').TaskType;
var ItemType = require('Types').ItemType;
var AdvertMgr = require('AdvertMgr');

cc.Class({
    extends: cc.Component,

    properties: {
        showList: []
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init: function init(world) {
        this.world = world;
        this.tasks = ConfigData.instance.getTasks();
    },

    checkTaskInHome: function checkTaskInHome() {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.tasks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var task = _step.value;

                var process = 0;
                switch (task.type) {
                    case TaskType.LOGIN:
                        process = PlayerData.instance.signCount + 1;
                        break;
                    case TaskType.PLAYCOUNT:
                        process = PlayerData.instance.playCount;
                        break;
                    case TaskType.KILLCOUNT:
                        process = PlayerData.instance.killCount;
                        break;
                    case TaskType.RANK:
                        var rankData = PlayerData.instance.rankData;
                        process = rankData.id;
                        break;
                    case TaskType.ADVERCOUNT:
                        process = PlayerData.instance.totalAdverCount;
                        break;
                }
                PlayerData.instance.taskProcess[task.id] = process;
                if (process >= task.param) {
                    if (!Tools.arrContains(PlayerData.instance.completeTaskIds, task.id)) {
                        PlayerData.instance.addCompleteTask(task.id);
                        this.world.uiMgr.refreshRedDot();
                        if (task.type !== TaskType.LOGIN) {
                            return task;
                        };
                    }
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
    },


    refreshTaskInHome: function refreshTaskInHome(callback) {
        var self = this;
        var selfWorld = this.world;

        var task = this.checkTaskInHome();
        if (task) {
            PlayerData.instance.showPanelBuySkinFlag = false;
            switch (task.rewardType) {
                case ItemType.HERO_SKIN:
                    var data = ConfigData.instance.getHeroSkinById(task.rewardId);
                    if (!Tools.arrContains(PlayerData.instance.ownHeroSkins, data.id)) {
                        //展示奖励（分段位获得和其他任务获得）
                        if (data.unlockWay !== 0) {
                            if (AdvertMgr.instance.canGetAdver) {
                                selfWorld.uiMgr.showReward(data, function (success) {
                                    if (success) {
                                        //解锁皮肤
                                        PlayerData.instance.addHeroSkin(task.rewardId);
                                        selfWorld.onEquipHeroSkin(data, true);
                                        selfWorld.uiMgr.refreshRedDot();
                                        var name = ConfigData.instance.getLanguageStr(data.name);
                                        selfWorld.uiMgr.showTips(Tools.getStringByFormat(ConfigData.instance.getUITipStr(18), name));
                                    }
                                    self.refreshTaskInHome(callback);
                                }, function () {
                                    selfWorld.uiMgr.showTips(4);
                                });
                            } else {
                                //没有广告就直接刷下一个任务了
                                self.refreshTaskInHome(callback);
                            }
                        } else {
                            //解锁皮肤
                            PlayerData.instance.addHeroSkin(task.rewardId);
                            selfWorld.onEquipHeroSkin(data, true);
                            selfWorld.uiMgr.refreshRedDot();

                            selfWorld.uiMgr.showReward(data, function () {
                                self.refreshTaskInHome(callback);
                            });
                        }
                    }
                    break;
                case ItemType.KNIFE_SKIN:
                    var data = ConfigData.instance.getKnifeSkinById(task.rewardId);
                    if (!Tools.arrContains(PlayerData.instance.ownKnifeSkins, data.id)) {
                        //展示奖励（分段位获得和其他任务获得）
                        if (data.unlockWay !== 0) {
                            if (AdvertMgr.instance.canGetAdver) {
                                selfWorld.uiMgr.showReward(data, function (success) {
                                    if (success) {
                                        //解锁皮肤
                                        PlayerData.instance.addKnifeSkin(task.rewardId);
                                        selfWorld.onEquipKnifeSkin(data, true);
                                        selfWorld.uiMgr.refreshRedDot();
                                        var name = ConfigData.instance.getLanguageStr(data.name);
                                        selfWorld.uiMgr.showTips(Tools.getStringByFormat(ConfigData.instance.getUITipStr(18), name));
                                    }
                                    self.refreshTaskInHome(callback);
                                }, function () {
                                    selfWorld.uiMgr.showTips(4);
                                });
                            } else {
                                //没有广告就直接刷下一个任务了
                                self.refreshTaskInHome(callback);
                            }
                        } else {
                            PlayerData.instance.addKnifeSkin(task.rewardId);
                            selfWorld.onEquipKnifeSkin(data, true);
                            selfWorld.uiMgr.refreshRedDot();

                            selfWorld.uiMgr.showReward(data, function () {
                                self.refreshTaskInHome(callback);
                            });
                        }
                    }
                    break;
            }
        } else {
            if (callback) callback();
        }
    },

    checkTaskInGame: function checkTaskInGame() {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = this.tasks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var task = _step2.value;

                var process = 0;
                switch (task.type) {
                    case TaskType.LOGIN:
                        process = PlayerData.instance.signCount + 1;
                        break;
                    case TaskType.PLAYCOUNT:
                        process = PlayerData.instance.playCount;
                        break;
                    case TaskType.KILLCOUNT:
                        process = PlayerData.instance.killCount;
                        break;
                    case TaskType.RANK:
                        var rankData = PlayerData.instance.rankData;
                        process = rankData.id;
                        break;
                    case TaskType.ADVERCOUNT:
                        process = PlayerData.instance.totalAdverCount;
                        break;
                }
                PlayerData.instance.taskProcess[task.id] = process;
                if (process >= task.param) {
                    if (!Tools.arrContains(PlayerData.instance.showTaskInGameIds, task.id) && !Tools.arrContains(PlayerData.instance.completeTaskIds, task.id)) {
                        PlayerData.instance.addShowTask(task.id);
                        this.showList.push(task);
                    }
                }
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
    },


    refreshTaskInGame: function refreshTaskInGame() {
        this.checkTaskInGame();
    }
});

cc._RF.pop();