(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/data/singleton/ConfigData.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e459aJJYt9EAYUiNN5fzLd7', 'ConfigData', __filename);
// scripts/data/singleton/ConfigData.js

'use strict';

var Tools = require('Tools');
var GameData = require('GameData');
var ItemType = require('Types').ItemType;
var PlatformMgr = require('PlatformMgr');
var LanguageMgr = require('LanguageMgr');
var ConfigData = cc.Class({
    statics: {
        instance: null,

        init: function init() {
            if (ConfigData.instance) {
                ConfigData.instance = null;
            }

            if (ConfigData.instance === null) {
                ConfigData.instance = new ConfigData();
                ConfigData.instance.init();
            }
        },

        cleanUp: function cleanUp() {
            if (ConfigData.instance) {
                Tools.cleanUp(ConfigData.instance);
            }
            ConfigData.instance = null;
        }

    },

    properties: {
        loadedConfigCount: 0,
        loadingConfigCount: 0,
        knifeMoveData: [],
        knifeSkinDatas: [],
        heroSkinDatas: [],
        shopDatas: [],
        tasks: [],
        levelCfgs: [],
        defaultLevel: 6,
        clientData: null,
        /** 分享基础数据 */
        shareBaseDatas: []
    },

    init: function init() {
        var _this = this;

        this.loadingConfigCount = 0;
        this.loadedConfigCount = 0;

        this.loadCfgData('config/client', function (err, result) {
            _this.clientData = result[0];
            for (var i = 0; i < _this.clientData.growLevelUpWays.length; i++) {
                var data = _this.clientData.growLevelUpWays[i];
                _this.clientData.growLevelUpWays[i] = Tools.splitToNumList(data, '-');
            }
        });

        this.loadCfgData('config/guide', function (err, result) {
            _this.guideData = result[0];
        });

        this.loadCfgData('config/ui-tips', function (err, result) {
            _this.uiTipDatas = result;
        });

        this.loadCfgData('config/rank', function (err, result) {
            _this.rankDatas = result;
        });

        this.loadCfgData('config/knife-skin', function (err, result) {
            _this.knifeSkinDatas = result;

            _this.knifeSkinDatas.sort(function (a, b) {
                return a.sort - b.sort;
            });

            _this.initKnifeSkinTasks();
        });

        this.loadCfgData('config/hero-skin', function (err, result) {
            _this.heroSkinDatas = result;

            _this.heroSkinDatas.sort(function (a, b) {
                return a.sort - b.sort;
            });

            _this.initHeroSkinTasks();
        });

        // this.loadCfgData('config/task', (err, result) => {
        //     this.taskDatas = result;
        // });

        this.loadCfgData('config/knife-move', function (err, result) {
            if (result && result[0]) {
                _this.knifeMoveData = result[0];
            }
        });

        this.loadCfgData('config/ai-nick', function (err, result) {
            _this.aiNickDatas = result;
        });

        this.loadCfgData('config/ai-rank', function (err, result) {
            _this.airankDatas = result;
        });

        this.loadCfgData('config/star-rank', function (err, result) {
            _this.starRankDatas = result;
            _this.bigRankDatas = [];
            for (var i = 0, index = -1; i < result.length; i++) {
                var data = result[i];

                if (data.isRankFirst) {
                    index++;
                    var newBigData = {};
                    for (var key in data) {
                        newBigData[key] = data[key];
                    }
                    _this.bigRankDatas[index] = newBigData;
                } else {
                    if (data.unlockBox || data.unlockBox === 0) {
                        _this.bigRankDatas[index].unlockBox = data.unlockBox;
                        _this.bigRankDatas[index].unlockBoxTips = data.unlockBoxTips;
                    }
                }
            }

            // console.log(this.bigRankDatas);
        });

        // this.loadCfgData('config/share-base', (err, result) => {
        //     this.shareBaseDatas = result;
        // });

        this.shareBaseDatas = [];
        this.loadCfgData('config/share-base', function (err, result) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = result[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    if (!_this.shareBaseDatas[item.shareType]) {
                        _this.shareBaseDatas[item.shareType] = [];
                    }

                    _this.shareBaseDatas[item.shareType].push(item);
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
        });

        this.loadCfgData('config/level-cfg', function (err, result) {
            _this.levelCfgs = result;

            _this.defaultLevel = _this.getLevelByHideScore(0);
        });

        this.loadCfgData('config/teaword', function (err, result) {
            _this.teaword = result;
        });

        this.loadCfgData('config/advert', function (err, result) {
            _this.adUnitIdDatas = result;
        });

        this.loadCfgData('config/rank-convert', function (err, result) {
            _this.rankConvertDatas = result;
        });

        this.loadCfgData('config/activity-sign', function (err, result) {
            _this.signDatas = result;
        });
        this.loadCfgData('config/activity-lateSign', function (err, result) {
            _this.lateSignDatas = result;
        });
        this.loadCfgData('config/activity-duanWu', function (err, result) {
            _this.activityDuanWuDatas = result;
        });

        this.loadCfgData('config/buff', function (err, result) {
            _this.buffDatas = result;
        });

        this.loadCfgData('config/box', function (err, result) {
            _this.boxDatas = result;
        });

        this.loadCfgData('config/grow', function (err, result) {
            _this.growDatas = result;

            var _loop = function _loop(data) {
                if (data.file) {
                    _this.loadCfgData('config/' + data.file, function (err, result) {
                        data.levelDatas = result;
                        if (data.id === 4) {
                            console.log(_this.growDatas);
                        }
                    });
                }
            };

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = _this.growDatas[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var data = _step2.value;

                    _loop(data);
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
        });

        this.loadCfgData('config/ai-player-grow', function (err, result) {
            _this.aiPlayerGrowDatas = result;
        });

        this.loadCfgData('config/ai-star-grow', function (err, result) {
            _this.aiStarGrowDatas = result;
        });

        this.loadCfgData('config/repay', function (err, result) {
            _this.repayDatas = result;
        });

        this.loadCfgData('config/map', function (err, result) {
            _this.mapDatas = result;
        });

        this.loadCfgData('config/wall', function (err, result) {
            _this.wallData = result[0];
        });

        this.loadCfgData('config/daily-task', function (err, result) {
            _this.dailyTaskData = result;
        });

        this.loadCfgData('config/suit', function (err, result) {
            _this.suitDatas = result;
        });

        this.loadCfgData('config/holiday-const', function (err, result) {
            _this.holidayDatas = result[0];
        });

        this.loadCfgData('config/holiday-pk', function (err, result) {
            _this.holidayPKRewardDatas = [];
            if (err) {
                console.error('holiday-world.json load fail');
            } else if (result) {
                var index = 0;
                _this.holidayPKRewardDatas[index] = result[0];
                for (var i = 1; i < result.length; i++) {
                    var data = result[i];
                    if (data.reward === _this.holidayPKRewardDatas[index].reward) {
                        _this.holidayPKRewardDatas[index].endRank = data.rank;
                    } else {
                        index++;
                        _this.holidayPKRewardDatas[index] = result[i];
                    };
                }
            }
            // console.log(JSON.stringify(this.holidayPKRewardDatas))
        });

        this.loadCfgData('config/holiday-world', function (err, result) {
            _this.holidayWorldRewardDatas = [];
            if (err) {
                console.error('holiday-world.json load fail');
            } else if (result) {
                var index = 0;
                _this.holidayWorldRewardDatas[index] = result[0];
                for (var i = 1; i < result.length; i++) {
                    var data = result[i];
                    if (data.reward === _this.holidayWorldRewardDatas[index].reward) {
                        _this.holidayWorldRewardDatas[index].endRank = data.rank;
                    } else {
                        index++;
                        _this.holidayWorldRewardDatas[index] = result[i];
                    };
                }
            }

            // console.log('---------------------------')
            // console.log(JSON.stringify(this.holidayPKRewardDatas))
        });

        this.loadCfgData('config/holiday-world', function (err, result) {
            _this.holidayWorldRewardDatas = result;
        });

        this.loadCfgData('config/country', function (err, result) {
            _this.countryDatas = result;
        });

        this.loadCfgData('config/treasure-small', function (err, result) {
            _this.treasureSmallData = result;
        });

        this.loadCfgData('config/treasure-big', function (err, result) {
            _this.treasureBigData = result;
        });

        this.loadCfgData('config/language', function (err, result) {
            _this.languageDatas = {};
            // console.log(result);
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = result[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var data = _step3.value;

                    _this.languageDatas[data['en-us']] = data;
                }
                // console.log(this.languageDatas);
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
        });

        this.loadCfgData('config/shop', function (err, result) {
            _this.shopDatas = result;
        });
    },

    loadCfgData: function loadCfgData(path, callback1, callback2) {
        var _this2 = this;

        this.loadingConfigCount++;
        cc.loader.loadRes(path, function (err, result) {
            if (result.json) {
                result = result.json;
            } else if (result.text) {
                result = JSON.parse(result.text);
            } else if (result instanceof cc.JsonAsset) {
                result = null;
            }
            if (callback1) {
                callback1(err, result);
            }
            if (callback2) {
                callback2(err, result);
            }
            // TIP:此处会造成短间隔内重复读取同一个配置表时，第二次result.json的值为null，需要注意避免类似操作
            cc.loader.release(path);
            _this2.loadedConfigCount++;
        });
    },

    getKnifeSkinById: function getKnifeSkinById(id) {
        return Tools.getItemById(this.knifeSkinDatas, id);
    },

    getHeroSkinById: function getHeroSkinById(id) {
        return Tools.getItemById(this.heroSkinDatas, id);
    },

    getSuitData: function getSuitData(id) {
        return Tools.getItemById(this.suitDatas, id);
    },

    getRandomHeroSkin: function getRandomHeroSkin(max, localPlayerSkinId) {
        var arr = [];
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = this.heroSkinDatas[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var data = _step4.value;

                if (data.id !== localPlayerSkinId) {
                    arr.push(data);
                }
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

        var index = Math.floor(Math.random() * Math.min(max - 1, arr.length));
        return arr[index];
    },

    getRandomKnifeSkin: function getRandomKnifeSkin(max) {
        var index = Math.floor(Math.random() * Math.min(max, this.knifeSkinDatas.length));
        return this.knifeSkinDatas[index];
    },

    getRandomAIName: function getRandomAIName() {
        var index = Math.floor(Math.random() * this.aiNickDatas.length);
        return this.aiNickDatas[index].aiNick;
    },

    getAINickById: function getAINickById(id) {
        if (this.aiNickDatas[id]) {
            return this.aiNickDatas[id].aiNick;
        } else {
            return '无名大侠';
        }
    },

    getRandomAIRank: function getRandomAIRank(i) {
        var data = this.airankDatas[i];
        var min = data.range[0];
        var max = data.range[1];
        var index = Math.floor(Math.random() * (max - min)) + min;
        return this.starRankDatas[index] ? this.starRankDatas[index] : this.starRankDatas[0];
    },

    // getShareBaseData: function (type) {
    //     return this.shareBaseDatas[type];
    // },

    getRandomShareBaseData: function getRandomShareBaseData(shareType) {
        if (this.shareBaseDatas && this.shareBaseDatas[shareType]) {
            return Tools.getRandomItem(this.shareBaseDatas[shareType]);
        }

        return null;
    },

    getLevelCfg: function getLevelCfg(level) {
        return this.levelCfgs[level > 0 ? level < this.levelCfgs.length ? level : this.levelCfgs.length - 1 : 0];
    },

    clampHideScore: function clampHideScore(hideScore) {
        hideScore = Tools.clamp(this.levelCfgs[0].score, this.levelCfgs[this.levelCfgs.length - 1].score, hideScore);
        return hideScore;
    },

    clampLevel: function clampLevel(level) {
        level = Tools.clamp(0, this.levelCfgs.length - 1, level);
        return level;
    },

    getLevelByHideScore: function getLevelByHideScore(hideScore) {
        for (var i = 0; i < this.levelCfgs.length; i++) {
            var data = this.levelCfgs[i];
            var nextData = this.levelCfgs[i + 1];
            if (!nextData) return data.id;
            if (hideScore >= data.score && hideScore < nextData.score) {
                return data.id;
            } else if (hideScore < data.score) {
                return data.id;
            }
        }
    },

    initKnifeSkinTasks: function initKnifeSkinTasks() {
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
            for (var _iterator5 = this.knifeSkinDatas[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var data = _step5.value;

                if (data.getWay === 1) {
                    var task = {};
                    task.id = data.taskId;
                    task.param = data.taskParam;
                    task.rewardId = data.id;
                    task.rewardType = ItemType.KNIFE_SKIN;
                    task.type = data.taskType;
                    task.introduce = data.taskShort;
                    this.tasks.push(task);
                }
            }
        } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                    _iterator5.return();
                }
            } finally {
                if (_didIteratorError5) {
                    throw _iteratorError5;
                }
            }
        }
    },

    initHeroSkinTasks: function initHeroSkinTasks() {
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
            for (var _iterator6 = this.heroSkinDatas[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                var data = _step6.value;

                if (data.getWay === 1) {
                    var task = {};
                    task.id = data.taskId;
                    task.param = data.taskParam;
                    task.rewardId = data.id;
                    task.rewardType = ItemType.HERO_SKIN;
                    task.type = data.taskType;
                    task.introduce = data.introduce;
                    this.tasks.push(task);
                }
            }
        } catch (err) {
            _didIteratorError6 = true;
            _iteratorError6 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion6 && _iterator6.return) {
                    _iterator6.return();
                }
            } finally {
                if (_didIteratorError6) {
                    throw _iteratorError6;
                }
            }
        }
    },

    getTasks: function getTasks() {
        return this.tasks;
    },

    getAdvertUnitId: function getAdvertUnitId(id) {
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
            for (var _iterator7 = this.adUnitIdDatas[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                var data = _step7.value;

                if (data.id === id) {
                    return data.adUnitId;
                }
            }
        } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion7 && _iterator7.return) {
                    _iterator7.return();
                }
            } finally {
                if (_didIteratorError7) {
                    throw _iteratorError7;
                }
            }
        }

        return null;
    },

    getUITipStr: function getUITipStr(id) {
        // return this.uiTipDatas[id].tip;

        var tips = this.uiTipDatas[id];
        return tips[LanguageMgr.curLang] ? tips[LanguageMgr.curLang] : tips['tip'];
    },

    getUITipStrByFormat: function getUITipStrByFormat(id, param) {
        return Tools.getStringByFormat(this.getUITipStr(id), param);
    },

    getReviveWayByCount: function getReviveWayByCount(count) {
        return Tools.getItemOrFinalItem(this.clientData.reviveWays, count);
    },

    getMultipGoldWayByCount: function getMultipGoldWayByCount(count) {
        return Tools.getItemOrFinalItem(this.clientData.multipGoldWays, count);
    },

    getProtectWayByCount: function getProtectWayByCount(count) {
        return this.clientData.protectStarWays[count];
    },

    getRankDataByScore: function getRankDataByScore(score) {
        for (var i = 0; i < this.rankDatas.length; i++) {
            var data = this.rankDatas[i];
            var nextData = this.rankDatas[i + 1];
            if (!nextData) return data;
            if (score >= data.score && score < nextData.score) {
                return data;
            }
        }
    },

    getRankDataByStar: function getRankDataByStar(star) {
        for (var i = 0; i < this.starRankDatas.length; i++) {
            var data = this.starRankDatas[i];
            var nextData = this.starRankDatas[i + 1];
            if (!nextData) return data;
            if (star >= data.star && star < nextData.star) {
                return data;
            }
        }
    },

    getRankDataById: function getRankDataById(id) {
        return this.starRankDatas[id];
    },
    // update (dt) {},
    getItemData: function getItemData(type, id) {
        var data = null;
        switch (type) {
            case ItemType.HERO_SKIN:
                {
                    data = this.getHeroSkinById(id);
                    break;
                }
            case ItemType.KNIFE_SKIN:
                {
                    data = this.getKnifeSkinById(id);
                    break;
                }
            case ItemType.MONEY:
                {
                    data = {
                        name: "金币",
                        url: "texture/currency/gold"
                    };
                    break;
                }
            case ItemType.ZONG_ZI:
                {
                    data = {
                        name: "钻石",
                        url: "texture/currency/diamond"
                    };
                    break;
                }
            default:
                {

                    break;
                }
        }

        if (!data) {
            // cc.error("cant find ItemData: type:" + type + "  id:" + id);
        }

        return data;
    },

    getRandomTryKnifeSkinData: function getRandomTryKnifeSkinData(ownKnifeSkins, tryKnifeSkinMinQuality) {
        var maxQuality = 0;
        //找出我的最大品质
        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
            for (var _iterator8 = ownKnifeSkins[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                var id = _step8.value;

                var data = this.getKnifeSkinById(id);
                if (data.quality > maxQuality) {
                    maxQuality = data.quality;
                }
            }

            //判读我的最大品质是否低于配置的最低使用品质
        } catch (err) {
            _didIteratorError8 = true;
            _iteratorError8 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion8 && _iterator8.return) {
                    _iterator8.return();
                }
            } finally {
                if (_didIteratorError8) {
                    throw _iteratorError8;
                }
            }
        }

        if (maxQuality < tryKnifeSkinMinQuality) {
            maxQuality = tryKnifeSkinMinQuality;
        }

        //找出大于我的最大品质的皮肤
        var arr = [];
        var _iteratorNormalCompletion9 = true;
        var _didIteratorError9 = false;
        var _iteratorError9 = undefined;

        try {
            for (var _iterator9 = this.knifeSkinDatas[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                var _data = _step9.value;

                if (_data.quality > maxQuality) {
                    if (!Tools.arrContains(ownKnifeSkins, _data.id)) {
                        arr.push(_data);
                    }
                }
            }

            //如果没有大于我的最大品质的皮肤，就找等于我最大品质的皮肤
        } catch (err) {
            _didIteratorError9 = true;
            _iteratorError9 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion9 && _iterator9.return) {
                    _iterator9.return();
                }
            } finally {
                if (_didIteratorError9) {
                    throw _iteratorError9;
                }
            }
        }

        if (arr.length === 0) {
            var _iteratorNormalCompletion10 = true;
            var _didIteratorError10 = false;
            var _iteratorError10 = undefined;

            try {
                for (var _iterator10 = this.knifeSkinDatas[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                    var _data2 = _step10.value;

                    if (_data2.quality === maxQuality) {
                        if (!Tools.arrContains(ownKnifeSkins, _data2.id)) {
                            arr.push(_data2);
                        }
                    }
                }
            } catch (err) {
                _didIteratorError10 = true;
                _iteratorError10 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion10 && _iterator10.return) {
                        _iterator10.return();
                    }
                } finally {
                    if (_didIteratorError10) {
                        throw _iteratorError10;
                    }
                }
            }
        }

        var data = Tools.getRandomItem(arr);
        return data;
    },

    getRandomTryHeroSkinData: function getRandomTryHeroSkinData(ownHeroSkins, tryHeroSkinMinQuality) {
        var maxQuality = 0;
        //找出我的最大品质
        var _iteratorNormalCompletion11 = true;
        var _didIteratorError11 = false;
        var _iteratorError11 = undefined;

        try {
            for (var _iterator11 = ownHeroSkins[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                var id = _step11.value;

                var data = this.getHeroSkinById(id);
                if (data.quality > maxQuality) {
                    maxQuality = data.quality;
                }
            }

            //判读我的最大品质是否低于配置的最低使用品质
        } catch (err) {
            _didIteratorError11 = true;
            _iteratorError11 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion11 && _iterator11.return) {
                    _iterator11.return();
                }
            } finally {
                if (_didIteratorError11) {
                    throw _iteratorError11;
                }
            }
        }

        if (maxQuality < tryHeroSkinMinQuality) {
            maxQuality = tryHeroSkinMinQuality;
        }

        //找出大于我的最大品质的皮肤
        var arr = [];
        var _iteratorNormalCompletion12 = true;
        var _didIteratorError12 = false;
        var _iteratorError12 = undefined;

        try {
            for (var _iterator12 = this.heroSkinDatas[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                var _data3 = _step12.value;

                if (_data3.quality > maxQuality) {
                    if (!Tools.arrContains(ownHeroSkins, _data3.id)) {
                        arr.push(_data3);
                    }
                }
            }

            //如果没有大于我的最大品质的皮肤，就找等于我最大品质的皮肤
        } catch (err) {
            _didIteratorError12 = true;
            _iteratorError12 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion12 && _iterator12.return) {
                    _iterator12.return();
                }
            } finally {
                if (_didIteratorError12) {
                    throw _iteratorError12;
                }
            }
        }

        if (arr.length === 0) {
            var _iteratorNormalCompletion13 = true;
            var _didIteratorError13 = false;
            var _iteratorError13 = undefined;

            try {
                for (var _iterator13 = this.heroSkinDatas[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                    var _data4 = _step13.value;

                    if (_data4.quality === maxQuality) {
                        if (!Tools.arrContains(ownHeroSkins, _data4.id)) {
                            arr.push(_data4);
                        }
                    }
                }
            } catch (err) {
                _didIteratorError13 = true;
                _iteratorError13 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion13 && _iterator13.return) {
                        _iterator13.return();
                    }
                } finally {
                    if (_didIteratorError13) {
                        throw _iteratorError13;
                    }
                }
            }
        }

        var data = Tools.getRandomItem(arr);
        return data;
    },

    convertScoreIdToStarId: function convertScoreIdToStarId(score) {
        var oldRankData = this.getRankDataByScore(score);
        var _iteratorNormalCompletion14 = true;
        var _didIteratorError14 = false;
        var _iteratorError14 = undefined;

        try {
            for (var _iterator14 = this.rankConvertDatas[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                var data = _step14.value;

                if (data.rankScoreId === oldRankData.id) {
                    return data.rankStarId;
                }
            }
        } catch (err) {
            _didIteratorError14 = true;
            _iteratorError14 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion14 && _iterator14.return) {
                    _iterator14.return();
                }
            } finally {
                if (_didIteratorError14) {
                    throw _iteratorError14;
                }
            }
        }
    },

    getBuffDataById: function getBuffDataById(id) {
        return Tools.getItemById(this.buffDatas, id);
    },

    getBoxDataById: function getBoxDataById(id) {
        return Tools.getItemById(this.boxDatas, id);
    },

    getRandomAIIcon: function getRandomAIIcon() {
        var index = Tools.getRandomInt(1, 389);
        return index;
    },

    getGrowLevelData: function getGrowLevelData(type, level) {
        var data = this.growDatas[type];
        if (data && data.levelDatas) {
            return Tools.getItemOrFinalItem(data.levelDatas, level);
        }
    },

    getAiStarDataByPlayerStar: function getAiStarDataByPlayerStar(star) {
        return Tools.getItemOrFinalItem(this.aiPlayerGrowDatas, star);
    },

    getAiGrowDataBystar: function getAiGrowDataBystar(star) {
        return Tools.getItemOrFinalItem(this.aiStarGrowDatas, star);
    },

    isGrowLevelUpByAdver: function isGrowLevelUpByAdver(type, id) {
        if (this.clientData.growLevelUpWays[type]) {
            return Tools.arrContains(this.clientData.growLevelUpWays[type], id);
        } else {
            return false;
        }
    },

    getRepayDataByRank: function getRepayDataByRank(rank) {
        return Tools.getItemOrFinalItem(this.repayDatas, rank);
    },

    getBigRankDatas: function getBigRankDatas() {
        //该数据只读
        return this.bigRankDatas;
    },

    getBigRankDatasIndex: function getBigRankDatasIndex(id) {
        for (var i = 0; i < this.bigRankDatas.length; i++) {
            if (this.bigRankDatas[i].id === id) {
                return i;
            }
        }
    },

    getDailyShowTask: function getDailyShowTask(playerData) {
        var completeGuideTask = playerData.completeGuideDailyTask;
        var rankStar = playerData.rankStar;

        var filterDatas = [];
        if (completeGuideTask.length === 3) {
            for (var i = 0; i < 3; i++) {
                var data = this.getOneDailyTask(playerData, i);
                if (data) filterDatas.push(data);
            }
        } else {
            //新手任务
            var _iteratorNormalCompletion15 = true;
            var _didIteratorError15 = false;
            var _iteratorError15 = undefined;

            try {
                for (var _iterator15 = this.dailyTaskData[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                    var _data5 = _step15.value;

                    if (_data5.degree === -1) {
                        _data5.process = 0;
                        filterDatas.push(_data5);
                    }
                }
            } catch (err) {
                _didIteratorError15 = true;
                _iteratorError15 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion15 && _iterator15.return) {
                        _iterator15.return();
                    }
                } finally {
                    if (_didIteratorError15) {
                        throw _iteratorError15;
                    }
                }
            }
        }

        // console.log('--------------------段位：', rankStar, ' 筛选出的任务：')
        // console.log(JSON.stringify(filterDatas));
        return filterDatas;
    },

    getOneDailyTask: function getOneDailyTask(playerData, pattern) {
        var curTasks = playerData.dailyShowTask;
        var oldTasks = playerData.dailyOldTask;
        var rankStar = playerData.rankStar;
        var refreshCount = playerData.dayRefreshTaskCount;
        var tempArr = [];
        var _iteratorNormalCompletion16 = true;
        var _didIteratorError16 = false;
        var _iteratorError16 = undefined;

        try {
            for (var _iterator16 = this.dailyTaskData[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                var data = _step16.value;

                if (data.stage == refreshCount && data.pattern === pattern && data.degree !== -1 && data.degree <= rankStar && oldTasks.indexOf(data.id) === -1) {
                    var canUse = true;
                    var _iteratorNormalCompletion17 = true;
                    var _didIteratorError17 = false;
                    var _iteratorError17 = undefined;

                    try {
                        for (var _iterator17 = curTasks[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
                            var task = _step17.value;

                            if (task.id === data.id) {
                                canUse = false;
                                break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError17 = true;
                        _iteratorError17 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion17 && _iterator17.return) {
                                _iterator17.return();
                            }
                        } finally {
                            if (_didIteratorError17) {
                                throw _iteratorError17;
                            }
                        }
                    }

                    if (canUse) tempArr.push(data);
                }
            }
            // console.log('本次随机任务池:')
            // console.log(JSON.stringify(tempArr));
        } catch (err) {
            _didIteratorError16 = true;
            _iteratorError16 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion16 && _iterator16.return) {
                    _iterator16.return();
                }
            } finally {
                if (_didIteratorError16) {
                    throw _iteratorError16;
                }
            }
        }

        var index = Tools.getRandomInt(0, tempArr.length);
        if (tempArr[index]) tempArr[index].process = 0;
        return tempArr[index];
    },

    getCurGrowStage: function getCurGrowStage(playCount, limits) {
        return 0;
        var stage = 0;
        var _iteratorNormalCompletion18 = true;
        var _didIteratorError18 = false;
        var _iteratorError18 = undefined;

        try {
            for (var _iterator18 = limits[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
                var limit = _step18.value;

                l;
                if (playCount < limit) {
                    break;
                } else {
                    stage++;
                }
            }
        } catch (err) {
            _didIteratorError18 = true;
            _iteratorError18 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion18 && _iterator18.return) {
                    _iterator18.return();
                }
            } finally {
                if (_didIteratorError18) {
                    throw _iteratorError18;
                }
            }
        }

        return stage;
    },

    //三个阶段，0：free，1：share，2：adver

    getCurStage: function getCurStage(playCount, limits) {
        var wayStr = ['免费', '分享', '广告'];
        var stage = 0;
        var way = 0;
        var _iteratorNormalCompletion19 = true;
        var _didIteratorError19 = false;
        var _iteratorError19 = undefined;

        try {
            for (var _iterator19 = limits[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
                var limit = _step19.value;

                if (playCount < limit) {
                    break;
                } else {
                    stage++;
                }
            }
        } catch (err) {
            _didIteratorError19 = true;
            _iteratorError19 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion19 && _iterator19.return) {
                    _iterator19.return();
                }
            } finally {
                if (_didIteratorError19) {
                    throw _iteratorError19;
                }
            }
        }

        if (stage === 0) {
            way = 0;
        } else {
            var int = Tools.getRandomInt(0, 100);
            if (int < this.clientData.stagePrecents[stage]) {
                // && (!GameData.instance.isInReview)) {
                way = 1;
            } else {
                way = 2;
            }
        }
        if (GameData.instance.isShowLog()) {
            console.log('阶段数组:', limits, '已玩场次：', playCount, '所属阶段:', stage);
            console.log('分享概率:', this.clientData.stagePrecents[stage], '本次随机概率:', int, '最后获得方式:', wayStr[way]);
        }
        if (PlatformMgr.isApp()) {
            if (way === 1) way = 2;
        }
        return way;
    },

    //0免费1分享2广告
    getCurStageByPrizeCount: function getCurStageByPrizeCount(playerData) {
        //app版本特殊处理
        if (PlatformMgr.isApp()) {
            return 2;
        }
        var limits = this.clientData.dayShowWayLimit;
        var dayGetPrizeCount = playerData.dayGetPrizeCount;
        var shareScore = playerData.shareScore;

        if (shareScore > 0) {
            if (GameData.instance.isShowLog()) {
                console.log('分享积分为:' + shareScore + '，此处显示分享');
            }
            // playerData.updateShareScore();
            return 1;
        }

        //输入的是已经获取奖励的次数，但判断时是判断下次获取奖励应该展示的方式，所以应该加一
        dayGetPrizeCount += 1;
        if (GameData.instance.isShowLog()) {
            console.log('当天第', dayGetPrizeCount, '次出现视频分享点');
            console.log('视频分享配置数组，单数分享，双数广告，超过数组则按最后两位的配置进行循环');
            console.log(limits);
        }
        var index = 0;
        var count = 0;
        var isOverFlow = true;
        var _iteratorNormalCompletion20 = true;
        var _didIteratorError20 = false;
        var _iteratorError20 = undefined;

        try {
            for (var _iterator20 = limits[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
                var limit = _step20.value;

                count += limit;
                if (dayGetPrizeCount > count) {
                    index++;
                } else {
                    isOverFlow = false;
                    break;
                }
            }
        } catch (err) {
            _didIteratorError20 = true;
            _iteratorError20 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion20 && _iterator20.return) {
                    _iterator20.return();
                }
            } finally {
                if (_didIteratorError20) {
                    throw _iteratorError20;
                }
            }
        }

        if (isOverFlow) {
            var length = limits.length;
            var sum = limits[length - 1] + limits[length - 2];
            var overCount = dayGetPrizeCount - count;
            var remainCount = overCount % sum;
            if (remainCount > limits[length - 2] || remainCount === 0) {
                index -= 1;
            } else {
                index -= 2;
            }
        }
        //因为数组从0开始，但是表里的位置从1开始
        index++;
        if (GameData.instance.isShowLog()) {
            console.log('本次展示在数组中的位置 ', index);
            console.log('本次展示最终获取方式 ', index % 2 ? '分享' : '广告');
        }
        //单数index为分享，双数为广告
        return index % 2 ? 1 : 2;
    },

    isDuringDuanWuFestival: function isDuringDuanWuFestival(curTimeStamp) {
        return Tools.isBetweenTwoTime(this.clientData.duanWuStartDate, this.clientData.duanWuEndDate, curTimeStamp);
    },

    isAfterDuanWuFestival: function isAfterDuanWuFestival(curTimeStamp) {
        return Tools.isAfterOtherTime(this.clientData.duanWuEndDate, curTimeStamp);
    },

    isDuringHolidayRankTime: function isDuringHolidayRankTime(curTimeStamp) {
        return Tools.isBetweenTwoTime(this.holidayDatas.startDate, this.holidayDatas.endDate, curTimeStamp);
    },

    isDuringHolidayRankBtnShowTime: function isDuringHolidayRankBtnShowTime(curTimeStamp) {
        //延迟展示三天
        // var timeStamp = Tools.getTimestampMS(this.holidayDatas.endShowDate) + 259200000;
        return Tools.isBetweenTwoTime(this.holidayDatas.startDate, this.holidayDatas.endShowDate, curTimeStamp);
    },

    getHolidayRankDayCount: function getHolidayRankDayCount() {
        return Tools.getRealDayTimeCount(this.holidayDatas.startDate, this.holidayDatas.endDate);
    },

    getRandomTrySuitData: function getRandomTrySuitData(playerData) {
        var temp = [];
        for (var i = 0; i < this.suitDatas.length; i++) {
            if (!playerData.isOwnSuit(i + 1)) {
                temp.push(this.suitDatas[i]);
            }
        }
        // return this.suitDatas[2]
        return Tools.getRandomItem(temp);
    },

    getPKRewardByRank: function getPKRewardByRank(rank) {
        var _iteratorNormalCompletion21 = true;
        var _didIteratorError21 = false;
        var _iteratorError21 = undefined;

        try {
            for (var _iterator21 = this.holidayPKRewardDatas[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
                var data = _step21.value;

                if (data.endRank) {
                    if (rank >= data.rank && rank <= data.endRank) {
                        return data;
                    }
                } else {
                    if (rank === data.rank) {
                        return data;
                    }
                }
            }
        } catch (err) {
            _didIteratorError21 = true;
            _iteratorError21 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion21 && _iterator21.return) {
                    _iterator21.return();
                }
            } finally {
                if (_didIteratorError21) {
                    throw _iteratorError21;
                }
            }
        }
    },

    getWorldRewardByRank: function getWorldRewardByRank(rank) {
        var _iteratorNormalCompletion22 = true;
        var _didIteratorError22 = false;
        var _iteratorError22 = undefined;

        try {
            for (var _iterator22 = this.holidayWorldRewardDatas[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
                var data = _step22.value;

                if (data.endRank) {
                    if (rank >= data.rank && rank <= data.endRank) {
                        return data;
                    }
                } else {
                    if (rank === data.rank) {
                        return data;
                    }
                }
            }
        } catch (err) {
            _didIteratorError22 = true;
            _iteratorError22 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion22 && _iterator22.return) {
                    _iterator22.return();
                }
            } finally {
                if (_didIteratorError22) {
                    throw _iteratorError22;
                }
            }
        }
    },

    getRandomCountry: function getRandomCountry() {
        return Tools.getRandomItem(this.countryDatas).country;
    },

    getLanguageStr: function getLanguageStr(str) {
        var data = this.languageDatas[str];
        return data[LanguageMgr.curLang] ? data[LanguageMgr.curLang] : str;
    },

    getTreasureBigDataByTurn: function getTreasureBigDataByTurn(turn) {
        return Tools.getItemOrFinalItem(this.treasureBigData, turn);
    },


    getShopDatas: function getShopDatas() {
        return this.shopDatas;
    },

    getShopDataPriceByIndex: function getShopDataPriceByIndex(idx) {
        var price = 0;
        var _iteratorNormalCompletion23 = true;
        var _didIteratorError23 = false;
        var _iteratorError23 = undefined;

        try {
            for (var _iterator23 = this.shopDatas[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
                var data = _step23.value;

                if (data.payIndex === idx) {
                    price = data.price;
                    break;
                }
            }
        } catch (err) {
            _didIteratorError23 = true;
            _iteratorError23 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion23 && _iterator23.return) {
                    _iterator23.return();
                }
            } finally {
                if (_didIteratorError23) {
                    throw _iteratorError23;
                }
            }
        }

        return price;
    }

    // getTreasureSmallDataByWeight() {
    //     return Tools.getRandomItemByWeight(this.treasureBigData)
    // },

});

Object.defineProperty(cc.Label.prototype, 'string', {
    set: function set(value) {
        var oldValue = this._string;
        // if (!this.node) return;
        // langFlag 用来判断该label是否打开了语言切换功能
        if (!this.langFlag && ConfigData.instance && ConfigData.instance.languageDatas && ConfigData.instance.languageDatas[value.toString()]) {
            var data = ConfigData.instance.languageDatas[value + ''];
            this._string = data[LanguageMgr.curLang] ? data[LanguageMgr.curLang] : value + '';
        } else {
            this._string = '' + value;
        }

        if (this.string !== oldValue) {
            this._lazyUpdateRenderData();
        }
        this._checkStringEmpty();
    }
});

if (!CC_EDITOR) {
    cc.Sprite.prototype.__superOnEnable = cc.RenderComponent.prototype.onEnable;
    cc.Sprite.prototype.onEnable = function () {

        var self = this;
        if (self.__superOnEnable) self.__superOnEnable();
        if (!self._spriteFrame || !self._spriteFrame.textureLoaded()) {
            // Do not render when sprite frame is not ready
            self.disableRender();
            if (self._spriteFrame) {
                self._spriteFrame.once('load', self._onTextureLoaded, self);
                self._spriteFrame.ensureLoadTexture();
            }
        }
        self._activateMaterial();

        var url = "texture/language/" + LanguageMgr.curLang + "/" + (self._spriteFrame ? self._spriteFrame.name : '');
        if (self.myUrl !== url && cc.loader._getResUuid(url, cc.SpriteFrame)) {
            self.myUrl = url;
            cc.loader.loadRes(url, cc.SpriteFrame, function (error, resource) {
                if (error) {
                    // return;
                } else if (resource) {
                    self.spriteFrame = resource;
                }
                // if (!self.node._renderComponent) return;
                // if (self.__superOnEnable) self.__superOnEnable()
                // if (!self._spriteFrame || !self._spriteFrame.textureLoaded()) {
                // Do not render when sprite frame is not ready
                // self.disableRender();
                // if (self._spriteFrame) {
                //     self._spriteFrame.once('load', self._onTextureLoaded, self);
                //     self._spriteFrame.ensureLoadTexture();
                // }
                // }
                // self._activateMaterial();
            });
        }
    };
}

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
        //# sourceMappingURL=ConfigData.js.map
        