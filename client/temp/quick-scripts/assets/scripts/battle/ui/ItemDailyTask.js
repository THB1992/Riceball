(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/ui/ItemDailyTask.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e600c7y279LL4e2lgWl+RBL', 'ItemDailyTask', __filename);
// scripts/battle/ui/ItemDailyTask.js

'use strict';

var ListItemBase = require('ListItemBase');
var PlayerData = require('PlayerData');
var ItemType = require('Types').ItemType;
var UIUtil = require('UIUtil');
var CONPLETE_COLOR = new cc.Color().fromHEX('#b55b12');
var NOT_CONPLETE_COLOR = new cc.Color().fromHEX('#2c325b');
cc.Class({
    extends: ListItemBase,

    properties: {
        nameLabel: cc.Label,
        introduceLabel: cc.Label,

        tipsNode: cc.Node,
        taskStartLabel: cc.Label,
        taskProgressLabel: cc.Label,
        taskFinalLabel: cc.Label,

        newNode: cc.Node,
        rewardIcon: cc.Sprite,
        rewardLabel: cc.Label,

        isCompleteNode: cc.Node,
        jumpBtn: cc.Node,
        getBtn: cc.Node,
        hasGetNode: cc.Node,

        zongZiIcon: cc.Node,
        coinIcon: cc.Node,
        skinIcon: cc.Sprite,

        refreshAnim: cc.Animation,

        isProcessNode: cc.Node,
        processBar: cc.Node,

        adverIcon: cc.Node,
        shareIcon: cc.Node
    },

    refresh: function refresh(data, item, isGet, isTrggle, hasAdver) {

        this.data = data;
        this.item = item;
        this.isGet = isGet;
        this.isTrggle = isTrggle;
        this.hasAdver = hasAdver;

        this.nameLabel.string = data.name;
        this.introduceLabel.string = data.tips;

        // var process = PlayerData.instance.getDailyTaskProcess(data.type);
        var process = data.lastProcess;
        var str = process < data.param ? process : data.param;
        // this.taskStartLabel.string = '(';
        this.taskProgressLabel.string = '(' + (str ? str : 0) + '/' + data.param + ')';
        // this.taskFinalLabel.string = '/' + data.param + ')';

        var isComplete = process >= data.param;
        this.jumpBtn.active = !isComplete;
        this.isCompleteNode.active = isComplete;
        this.isProcessNode.active = !isComplete;

        // data.lastProcess = data.lastProcess < data.param ? data.lastProcess : data.param;
        // data.process = data.process < data.param ? data.lastProcess : data.param;
        var width = data.lastProcess / data.param * this.isProcessNode.width;
        this.processBar.width = width > this.isProcessNode.width ? this.isProcessNode.width : width;
        if (data.lastProcess !== data.process) {
            this.finalWidth = data.process / data.param * this.isProcessNode.width;
            this.finalWidth = this.finalWidth > this.isProcessNode.width ? this.isProcessNode.width : this.finalWidth;
            this.needUpdate = true;
            data.lastProcess = data.process;
            PlayerData.instance.saveUserData('刷新每日任务上次进度');
        }

        var labelOutlines = this.tipsNode.getComponentsInChildren(cc.LabelOutline);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = labelOutlines[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var line = _step.value;

                line.color = isComplete ? CONPLETE_COLOR : NOT_CONPLETE_COLOR;
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

        this.hasGetNode.active = isComplete && isGet;
        this.getBtn.active = isComplete && !isGet;
        var newbie = data.degree === -1; //新手任务
        var num = isTrggle && !newbie ? item.num * 3 : item.num;
        if (isGet) {
            var mult = data.finalReceiveMult ? data.finalReceiveMult : 1;
            num = item.num * mult;
        }

        this.rewardLabel.string = 'x' + num;

        // this.newNode.active = data.degree === -1; //新手任务


        this.coinIcon.active = item.type === ItemType.MONEY;
        this.zongZiIcon.active = item.type === ItemType.ZONG_ZI;; //3是粽子的类型
        if (this.coinIcon.active || this.zongZiIcon.active) {
            this.skinIcon.node.active = false;
            this.rewardLabel.node.active = true;
        } else {
            this.rewardLabel.node.active = false;
            this.skinIcon.node.active = true;
            UIUtil.loadResSprite(this.skinIcon, item.itemData.url);
        }

        if (isTrggle && !newbie) {
            this.adverIcon.active = hasAdver;
            this.shareIcon.active = !hasAdver;
        } else {
            this.adverIcon.active = false;
            this.shareIcon.active = false;
        }
    },


    setJumpCallback: function setJumpCallback(callback) {
        this.jumpCallback = callback;
    },
    onJump: function onJump() {
        if (this.jumpCallback) this.jumpCallback();
    },

    playRefreshAnim: function playRefreshAnim() {
        this.refreshAnim.play();
    },

    setIcon: function setIcon(hasAdver) {
        this.adverIcon.active = hasAdver;
        this.shareIcon.active = !hasAdver;
    },

    closeIcon: function closeIcon() {
        this.adverIcon.active = false;
        this.shareIcon.active = false;
    },

    update: function update(dt) {
        if (this.needUpdate) {
            if (this.processBar.width < this.finalWidth) {
                this.processBar.width += 400 * dt;
            } else {
                this.needUpdate = false;
                this.processBar.width = this.finalWidth;
                this.refresh(this.data, this.item, this.isGet, this.isTrggle, this.hasAdver);
                if (this.needShowAnim) {
                    this.playRefreshAnim();
                    this.needShowAnim = false;
                }
            }
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
        //# sourceMappingURL=ItemDailyTask.js.map
        