(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/ui/ItemKnifeSkin.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '33c462nfAFEzpaVv7usdwe1', 'ItemKnifeSkin', __filename);
// scripts/battle/ui/ItemKnifeSkin.js

'use strict';

/**
 * @fileoverview 刀的商店皮肤item
 * @author zhangzhuang@gameley.cn (张庄)
 */
var ListItemBase = require('ListItemBase');
var Tools = require('Tools');
cc.Class({
    extends: ListItemBase,

    properties: {
        lockNode: cc.Node,
        checkNode: cc.Node,
        equipNode: cc.Node,
        priceNode: cc.Node,
        priceLabel: cc.Label,
        iconSprite: cc.Sprite,
        taskLabel: cc.Label,
        needCheckNode: cc.Node,
        canUnLockNode: cc.Node,

        propertyNode: cc.Node,
        propertyLabel: cc.Label,

        newNode: cc.Node,

        goldIcon: cc.Node,
        diamondIcon: cc.Node,
        suitNode: cc.Node
    },

    init: function init(data) {
        var _this = this;

        this.data = data;
        if (data.price) this.priceLabel.string = Tools.getGoldStr(data.price);
        if (data.propertyTips) this.propertyLabel.string = data.propertyTips;
        this.goldIcon.active = data.priceType === 0;
        this.diamondIcon.active = data.priceType === 1;

        cc.loader.loadRes(data.url, cc.SpriteFrame, function (error, resource) {
            if (error) {
                cc.error(error);
            } else if (resource) {
                _this.iconSprite.spriteFrame = resource;
            }
        });

        for (var i = 0; i < this.suitNode.children.length; i++) {
            if (this.suitNode.children[i]) {
                this.suitNode.children[i].active = i + 1 == data.suit;
            }
        }
    },

    refresh: function refresh(isGet, canUnLock, needCheck, isNew, processStr) {
        this.isGet = isGet;
        this.lockNode.active = isGet || canUnLock ? false : true;
        // this.iconSprite.setState(isGet || canUnLock ? cc.Sprite.State.NORMAL : cc.Sprite.State.GRAY);
        this.iconSprite.node.opacity = isGet || canUnLock ? 255 : 153;
        this.priceNode.active = isGet || this.data.getWay === 1 ? false : true;
        this.taskLabel.node.active = !isGet && this.data.getWay === 1 && !canUnLock ? true : false;
        this.needCheckNode.active = isGet && needCheck ? true : false;
        this.canUnLockNode.active = !isGet && canUnLock ? true : false;

        this.propertyNode.active = this.data.propertyTips ? true : false;
        this.propertyNode.y = isGet ? -50 : 50;
        this.suitNode.y = isGet || canUnLock ? -50 : 50;
        this.newNode.active = !isGet && isNew ? true : false;
        if (processStr || processStr === '') {
            var one = this.data.taskShortOne ? this.data.taskShortOne : '';
            var two = this.data.taskShortTwo ? this.data.taskShortTwo : '';
            var str = '';
            this.taskLabel.string = one;
            str = this.taskLabel.string + processStr;
            this.taskLabel.string = two;
            str += this.taskLabel.string;
            this.taskLabel.string = str;
        }
    },

    setCheck: function setCheck(isCheck) {
        this.checkNode.active = isCheck;
    },

    setEquip: function setEquip(isEquip) {
        this.equipNode.active = isEquip;
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
        //# sourceMappingURL=ItemKnifeSkin.js.map
        