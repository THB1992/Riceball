(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/ui/PanelHeroShop_new.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dc9d4s0LLBM3oVZQlMj9IFk', 'PanelHeroShop_new', __filename);
// scripts/battle/ui/PanelHeroShop_new.js

'use strict';

var Tools = require('Tools');
var ConfigData = require('ConfigData');
var PlayerData = require('PlayerData');
var AdvertMgr = require('AdvertMgr');
var AdverType = require('Types').AdverType;
var ShareMgr = require('ShareMgr');
var ShareType = require('Types').ShareType;
var TaskType = require('Types').TaskType;
var ItemGetType = require('Types').ItemGetType;
var GameData = require('GameData');
var PlatformMgr = require('PlatformMgr');
cc.Class({
    extends: cc.Component,

    properties: {

        topNode: cc.Node,
        content: cc.Node,
        itemHeroSkin: cc.Prefab,

        pageView: cc.PageView,
        pagePrefab: cc.Prefab,

        buyNode: cc.Node,
        unLockNode: cc.Node,
        linkNode: cc.Node,
        nameLabel: cc.Label,
        introduceNode: cc.Node,
        introduceTextNode: cc.Node,
        introduceLabel: cc.Label,
        propertyNode: cc.Node,
        propertyLabel: cc.Label,
        propertyAnim: cc.Animation,

        taskStartLabel: cc.Label,
        taskProgressLabel: cc.Label,
        taskFinalLabel: cc.Label,

        taskInfoNode: cc.Node,
        watchAdverBtnNode: cc.Node,

        watchAdverLabel: cc.Label,
        buyLangLabel: cc.Label,
        unlockLangLabel: cc.Label,
        jumpNode: cc.Node,
        //解锁btn的图标
        shareIcon: cc.Node,
        adverIcon: cc.Node,

        //套装
        suitNode: cc.Node,
        suitNameLabel: cc.Label,
        suiProcessLabel: cc.Label,
        suitCloseIcon: cc.Node,
        suitActiveIcon: cc.Node,
        suitHeroNameLabel: cc.Label,
        suitKnifeNameLabel: cc.Label,
        suitSkillLabel: cc.Label,
        suitHeroFlag: cc.Node,
        suitKnifeFlag: cc.Node,
        suitHeroFalseFlag: cc.Node,
        suitKnifeFalseFlag: cc.Node,
        suitIconNode: cc.Node,
        // adverUnlockIcon: cc.Node,
        // shareUnlockIcon: cc.Node,
        _itemCells: [],
        _itemNodes: [],
        _itemPageCells: [],
        _pageClickHistory: [],

        itemTypePool: [],
        typeIconNode: cc.Node,

        shopBgNode: cc.Node,
        perCount: 3,

        goldIcon: cc.Node,
        diamondIcon: cc.Node,
        priceLabel: cc.Label,

        lastPageIndex: 0,

        keyNode: cc.Node,
        keyParentNode: cc.Node
    },

    onLoad: function onLoad() {
        this.checkUI();
        this._itemClickHistory = {};
    },


    init: function init(world) {
        this.world = world;
        this.localPlayer = world.localPlayer;
        this.initData();
        this.initUI();
        this.initKey();
        this.refresh();
        this.scrollPage();
        this.showName();
    },

    initData: function initData() {
        this.itemTypePool = [];
        var heroSkinDatas = ConfigData.instance.heroSkinDatas.slice();
        var curTime = PlayerData.instance.getCurTime();
        var ownHeroSkins = PlayerData.instance.ownHeroSkins;
        Tools.filterDataByTime(heroSkinDatas, ownHeroSkins, curTime, GameData.instance, ConfigData.instance.clientData.hideSpecialSkin, PlatformMgr.isIOS(), PlatformMgr.isApp());
        heroSkinDatas.sort(function (a, b) {
            // if (a.newDate && Tools.isBeforeOtherTime(a.newDate, curTime)) {
            //     return -1;
            // } else if (b.newDate && Tools.isBeforeOtherTime(b.newDate, curTime)) {
            //     return 1;
            // } else {
            return a.sort - b.sort;
            // }
        });

        for (var i = 0; i < heroSkinDatas.length; i++) {
            var data = heroSkinDatas[i];
            var type = 0;
            if (data.getWay === 0) {
                if (data.priceType === 0) {
                    type = ItemGetType.GOLD;
                } else {
                    type = ItemGetType.DIAMOND;
                }
            } else if (data.getWay === 1) {
                if (data.taskType === TaskType.RANK) {
                    type = ItemGetType.RANK;
                } else if (data.taskType === TaskType.TREASUREBOX) {
                    type = ItemGetType.BOX;
                } else {
                    type = ItemGetType.TASK;
                }
            } else if (data.getWay === 100) {
                if (!PlatformMgr.open_nft_moudle) {
                    continue;
                }
                type = ItemGetType.NFT;

                //塞入余额，玩家是否拥有
                var comleted = PlatformMgr.nft_balance_ids[data.goodsId] || 0;
                data.rest = 1000 - comleted;
            }
            this.push(type, data);
        }
    },
    initUI: function initUI() {
        this.page = -1;
        this.pageTypes = [];
        for (var i = 0; i < this.itemTypePool.length; i++) {
            var arr = this.itemTypePool[i];
            if (!arr) continue;
            var pageLength = Math.ceil(arr.length / this.perCount);
            for (var j = 0; j < pageLength; j++) {
                this.page++;
                this.pageTypes[this.page] = i;
                var pageNode = this.content.children[this.page];
                if (!pageNode) {
                    pageNode = cc.instantiate(this.pagePrefab);
                    pageNode.parent = this.content;
                }
                for (var k = 0; k < this.perCount; k++) {
                    var index = j * this.perCount + k;
                    var data = arr[index];
                    var itemNode = pageNode.children[k];
                    var itemComp;
                    if (!itemNode) {
                        itemNode = cc.instantiate(this.itemHeroSkin);
                        itemNode.parent = pageNode;
                        itemNode.position = cc.v2(k % 3 * 230 - 235, -100 - Math.floor(k / 3) * 240);
                        itemComp = itemNode.getComponent('ItemHeroSkin_new');
                        itemComp.init(data);
                        itemComp.page = this.page;
                        itemComp.index = k;
                        if (data) {
                            itemComp.setOnItemClick(this, itemComp);
                            this._itemCells.push(itemComp);
                            this.pushToPageItemPool(this.page, itemComp);
                        }
                    } else {
                        itemComp = itemNode.getComponent('ItemHeroSkin_new');
                    }

                    //找出当前装备
                    if (data && PlayerData.instance.heroSkinId === data.id) {
                        this.lastPageIndex = this.page;
                    }

                    //设置是否可买
                    // if (data && !PlayerData.instance.isOwnHeroSkin(data.id) && PlayerData.instance.canBuyItem(data)) {
                    //     itemComp.setCanBuy(true);
                    // }
                }
            }
        };
    },
    checkUI: function checkUI() {
        var isPad = GameData.instance.isPad();
        this.topNode.y = isPad ? -200 : 0;
        this.pageView.node.height = isPad ? 300 : 550;
        this.shopBgNode.height = isPad ? 500 : 750;
        this.suitNode.y = isPad ? 240 : 390;
        // this.nameLabel.node.y = isPad ? 180 : 230
        // this.propertyNode.y = isPad ? 150 : 195;
        // this.propertyAnim.node.parent.y = isPad ? 150 : 195;
        this.perCount = isPad ? 3 : 6;
    },
    initKey: function initKey() {
        var keyCount = PlayerData.instance.keyCount;
        for (var i = 0; i < 3; i++) {
            this.keyParentNode.children[i].active = i < keyCount;
        }
    },
    push: function push(type, data) {
        if (!this.itemTypePool[type]) {
            this.itemTypePool[type] = [];
        }
        this.itemTypePool[type].push(data);
    },


    //以页数区分的ItemComp数组
    pushToPageItemPool: function pushToPageItemPool(page, comp) {
        if (!this._itemPageCells[page]) {
            this._itemPageCells[page] = [];
        }
        this._itemPageCells[page].push(comp);
    },
    getItemByPage: function getItemByPage(page, index) {
        if (this._itemPageCells[page]) {
            return this._itemPageCells[page][index];
        }
    },
    selectItem: function selectItem(page) {
        if (this._itemPageCells[page]) {
            var length = this._itemPageCells[page].length;
            var index = -1;
            for (var i = length - 1; i >= 0; i--) {
                var item = this._itemPageCells[page][i];
                if (item.isGet) {
                    if (item.equipNode.active) {
                        this.onItemClick(null, this._itemPageCells[page][i], false, true);
                        return;
                    }
                } else {
                    index = i;
                }
            }

            //检查是否点过
            if (index !== -1) {
                if (this._pageClickHistory[page]) {
                    index = this._pageClickHistory[page];
                }
                this.onItemClick(null, this._itemPageCells[page][index], false, true);
            }
        }
    },
    onScrollPage: function onScrollPage(pageView) {
        var index = pageView.getCurrentPageIndex();
        var type = this.getPageType(index);
        this.setTitle(type);
        this.selectItem(index);
    },
    setTitle: function setTitle(type) {
        for (var i = 0; i < this.typeIconNode.children.length; i++) {
            this.typeIconNode.children[i].active = i === type;
        }
    },
    showName: function showName() {
        var _this = this;

        this.nameLabel.node.active = false;
        setTimeout(function () {
            _this.nameLabel.node.active = true;
        }, 500);
    },


    getPageType: function getPageType(index) {
        return this.pageTypes[index];
    },

    scrollPage: function scrollPage() {
        var _this2 = this;

        this.pageView.onLoad();
        var index = this.lastPageIndex - 1;
        index = index >= 0 ? index : 1;
        this.pageView.setCurrentPageIndex(index);
        setTimeout(function () {
            _this2.pageView.setCurrentPageIndex(_this2.lastPageIndex);
            _this2.onScrollPage(_this2.pageView);
        }, 200);
    },

    refresh: function refresh() {
        var count = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this._itemCells[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var itemComp = _step.value;

                if (!itemComp) continue;
                var data = itemComp.data;
                var isGet = PlayerData.instance.isOwnHeroSkin(data.id);

                //NFT测试，显示是否拥有
                if (data.getWay == 100 && !isGet) {
                    var own = PlatformMgr.nft_user_datas[data.goodsId] || 0;
                    if (own > 0) {
                        console.log("购买后。同步到本地皮肤数据");
                        PlayerData.instance.addHeroSkin(data.id);
                        isGet = true;
                    }
                }

                var canUnlock = Tools.arrContains(PlayerData.instance.completeTaskIds, data.taskId);
                var needCheck = Tools.arrContains(PlayerData.instance.needCheckTaskIds, data.taskId);
                var isNew = data.newDate && Tools.isBeforeOtherTime(data.newDate, PlayerData.instance.getCurTime());
                var canBuy = PlayerData.instance.canBuyItem(data) && !this._itemClickHistory[data.id];

                var processStr = '';
                if (data.getWay === 1) {
                    if (data.taskType !== TaskType.RANK && data.taskType !== TaskType.DUANWU && data.taskType !== TaskType.TREASUREBOX) {
                        var process = PlayerData.instance.getTaskProcess(data.taskType);
                        processStr = process + '/' + data.taskParam;
                    }
                }

                itemComp.refresh(isGet, canUnlock, needCheck, isNew, processStr, canBuy);
                if (isGet) count++;
                if (PlayerData.instance.heroSkin.id === data.id) {
                    this.onItemClick(null, itemComp, true);
                    // itemComp.setCheck(false);
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

    buyBtnClick: function buyBtnClick() {
        if (this.lastCheckItem) {
            var item = this.lastCheckItem;
            switch (item.data.priceType) {
                case 0:
                    {
                        if (PlayerData.instance.gold >= item.data.price) {
                            PlayerData.instance.addHeroSkin(item.data.id);
                            PlayerData.instance.updateGold(-item.data.price);
                            this.refresh();
                            this.onItemClick(null, item);
                        } else {
                            this.world.uiMgr.showTips(7);
                        }
                        break;
                    }
                case 1:
                    {
                        AdvertMgr.instance.fireBaseEvent("click_store_product_btn", "product_type", "skinhero");
                        if (PlayerData.instance.zongZi >= item.data.price) {
                            PlayerData.instance.addHeroSkin(item.data.id);
                            PlayerData.instance.updateZongZi(-item.data.price);
                            this.refresh();
                            this.onItemClick(null, item);
                        } else {
                            this.world.uiMgr.showTips('Insufficient Diamond');
                        }
                        break;
                    }
            }
        }
    },

    jumpBtnClick: function jumpBtnClick() {
        if (this.lastCheckItem) {
            // this.close();
            this.world.uiMgr.closePanelShop();
            var item = this.lastCheckItem;
            switch (item.data.jumpParam) {
                case 'PanelInvite':
                    {
                        this.world.uiMgr.showPanelInvite();
                        break;
                    }
                case 'PanelDailyTask':
                    {
                        this.world.uiMgr.showPanelDailyTask();
                        break;
                    }
                case 'PanelAddTop':
                    {
                        this.world.uiMgr.showPanelAddTop();
                        break;
                    }
                case 'PanelSign':
                    {
                        this.world.uiMgr.showPanelSign();
                        break;
                    }
                case 'PanelHolidayRank':
                    {
                        this.world.uiMgr.showPanelHolidayRank(true);
                        break;
                    }
            }
        }
    },

    unLockBtnClick: function unLockBtnClick() {
        var self = this;
        // 关闭广告时回调
        var closeFunc = function closeFunc(success) {
            if (self.lastCheckItem && success) {
                var item = self.lastCheckItem;
                PlayerData.instance.addHeroSkin(item.data.id);
                self.refresh();
                self.onItemClick(null, item);
                if (item.data.taskType === TaskType.LOGIN) {
                    PlayerData.instance.updateSignCount();
                }
                self.world.uiMgr.refreshRedDot();
            }
        };

        if (this.shareIcon.active) {
            this.showShare(closeFunc);
        } else {
            this.showAdver(closeFunc);
        }
    },

    linkBtnClick: function linkBtnClick() {
        //NFT测试
        var data = this.lastCheckItem.data;
        PlatformMgr.requestNFTGet(data);
    },

    showShare: function showShare(closeFunc) {
        ShareMgr.share(ShareType.UnlockSkin, closeFunc);
    },

    showAdver: function showAdver(closeFunc) {
        var _this3 = this;

        var self = this;
        var errFunc = function errFunc() {
            _this3.showShare(closeFunc);
        };
        AdvertMgr.instance.fireBaseEvent("click_adv_btn", "position_id", ConfigData.instance.getAdvertUnitId(AdverType.UnlockHeroSkin));
        AdvertMgr.instance.showAdver(AdverType.UnlockHeroSkin, closeFunc, errFunc);
    },

    onItemClick: function onItemClick(event, customEventData) {
        var isInit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var isAuto = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        var itemComp = customEventData;
        var data = itemComp.data;

        if (this.lastCheckItem) this.lastCheckItem.setCheck(false);
        itemComp.setCheck(true);
        itemComp.setCanBuy(false);
        this.lastCheckItem = itemComp;

        if (!isAuto && !itemComp.isGet) {
            this._pageClickHistory[itemComp.page] = itemComp.index;
        }

        this.buyNode.active = false;
        this.linkNode.active = false;
        this.unLockNode.active = false;
        this.watchAdverBtnNode.active = false;
        this.jumpNode.active = false;

        this.world.onEquipHeroSkin(data, itemComp.isGet, false);
        if (itemComp.isGet) {
            if (this.lastEquipItem) this.lastEquipItem.setEquip(false);
            this.lastEquipItem = itemComp;
            itemComp.setEquip(true);
        } else {
            if (data.getWay === 0) {
                this.buyNode.active = true;
                if (data.price) this.priceLabel.string = Tools.getGoldStr(data.price);
                this.goldIcon.active = data.priceType === 0;
                this.diamondIcon.active = data.priceType === 1;
            } else if (data.getWay === 1) {
                if (Tools.arrContains(PlayerData.instance.completeTaskIds, data.taskId)) {
                    this.unLockNode.active = true;
                    this.shareIcon.active = data.unlockWay === 1;
                    this.adverIcon.active = data.unlockWay === 2;

                    // if (data.unlockWay === 1) {
                    //     if (GameData.instance.isInReview) {
                    //         this.shareIcon.active = false;
                    //         this.adverIcon.active = true;
                    //     } 
                    // }
                } else if (data.taskType === TaskType.ADVERCOUNT) {
                    this.watchAdverBtnNode.active = true;
                }
            } else if (data.getWay === 100) {
                //NFT测试
                this.buyNode.active = false;
                this.linkNode.active = true;
            }
        }

        this.nameLabel.string = data.name;
        this.introduceNode.active = !(itemComp.isGet || this.buyNode.active || this.unLockNode.active || this.watchAdverBtnNode.active);
        this.introduceLabel.string = data.introduce;
        this.propertyNode.active = data.propertyTips ? true : false;
        this.propertyLabel.string = data.propertyTips ? data.propertyTips : '';
        if (this.propertyNode.active) {
            this.propertyAnim.play();
        }
        this.keyNode.active = data.taskType === TaskType.TREASUREBOX;
        this.introduceTextNode.active = !this.keyNode.active;

        this.taskInfoNode.active = data.getWay === 1;
        if (this.taskInfoNode.active) {
            var process = PlayerData.instance.getTaskProcess(data.taskType);
            var str = process < data.taskParam ? process : data.taskParam;
            this.taskStartLabel.string = '(';
            this.taskProgressLabel.string = str ? str : 0;
            this.taskFinalLabel.string = '/' + data.taskParam + ')';

            if (data.taskType === TaskType.RANK || data.taskType === TaskType.DUANWU || data.taskType === TaskType.TREASUREBOX) {
                this.taskStartLabel.string = '';
                this.taskProgressLabel.string = '';
                this.taskFinalLabel.string = '';
            }
            this.watchAdverLabel.string = Tools.getStringByFormat(ConfigData.instance.getUITipStr(20), str, data.taskParam);
        }
        this.buyLangLabel.string = 'Buy';
        this.unlockLangLabel.string = 'Unlock:';

        this.suitNode.active = data.suit;
        if (data.suit) {
            var suitData = ConfigData.instance.getSuitData(data.suit);
            var heroData = data;
            var knifeData = ConfigData.instance.getKnifeSkinById(suitData.knifeSkin);
            var isOwnHeroSkin = PlayerData.instance.isOwnHeroSkin(suitData.heroSkin);
            var isOwnKnifeSkin = PlayerData.instance.isOwnKnifeSkin(suitData.knifeSkin);
            var equipHero = PlayerData.instance.isCurEquipHeroSkin(heroData.id);
            var equipKnife = PlayerData.instance.isCurEquipKnifeSkin(knifeData.id);

            this.suitNameLabel.string = suitData.name;
            var process = 0;
            if (isOwnHeroSkin) process++;
            if (isOwnKnifeSkin) process++;
            this.suiProcessLabel.string = '(' + process + '/2)';
            this.suitHeroNameLabel.string = heroData.name;
            this.suitKnifeNameLabel.string = knifeData.name;
            this.suitSkillLabel.string = suitData.skillTips;
            for (var i = 0; i < this.suitIconNode.children.length; i++) {
                if (this.suitIconNode.children[i]) {
                    this.suitIconNode.children[i].active = i + 1 == data.suit;
                }
            }

            this.suitHeroFlag.active = equipHero;
            this.suitKnifeFlag.active = equipKnife;
            this.suitHeroFalseFlag.active = !equipHero;
            this.suitKnifeFalseFlag.active = !equipKnife;

            this.suitActiveIcon.active = isOwnHeroSkin && isOwnKnifeSkin && equipHero && equipKnife;
            this.suitCloseIcon.active = !(isOwnHeroSkin && isOwnKnifeSkin && equipHero && equipKnife);

            if (this.suitActiveIcon.active && !isInit) {
                this.world.uiMgr.showActiveSuitEffect();
            }
        }
    },

    //累计看广告按钮
    onWathAdverBtnClick: function onWathAdverBtnClick() {
        var self = this;
        // 关闭广告时回调
        var closeFunc = function closeFunc(success) {
            if (self.lastCheckItem && success) {
                var item = self.lastCheckItem;
                self.world.taskMgr.refreshTaskInHome();
                self.refresh();
                self.onItemClick(null, item);
                // self.world.uiMgr.showTips('累计观看广告次数+1')
            }
        };
        // 打开广告失败时回调,失败回调
        var errFunc = function errFunc() {
            self.world.uiMgr.showTips(4);
        };

        AdvertMgr.instance.showAdver(AdverType.WatchAdver, closeFunc, errFunc);
    },

    onBtnClose: function onBtnClose() {
        this.world.uiMgr.closePanelShop(false);
    },


    close: function close() {
        if (this.lastEquipItem) this.lastEquipItem.setEquip(false);
        if (this.lastCheckItem) this.lastCheckItem.setCheck(false);
        if (this.closeCallcack) this.closeCallcack();
        this.world.onEquipHeroSkin(PlayerData.instance.heroSkin, true);
        PlayerData.instance.clearNeedCheckTaskIds();
        this._pageClickHistory = [];
        this._itemClickHistory = {};
    },

    setCloseCallback: function setCloseCallback(callback) {
        this.closeCallcack = callback;
    },

    update: function update(dt) {
        if (this.propertyAnim.node.width !== this.propertyNode.width + 20) {
            this.propertyAnim.node.width = this.propertyNode.width + 20;
        }
    }
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
        //# sourceMappingURL=PanelHeroShop_new.js.map
        