(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/ui/ItemPKRank.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ef8cfPNIvpOoJaFsPWM00qo', 'ItemPKRank', __filename);
// scripts/battle/ui/ItemPKRank.js

'use strict';

var ListItemBase = require('ListItemBase');
var ConfigData = require('ConfigData');
var UIUtil = require('UIUtil');
var MY_COLOR = new cc.color().fromHEX('#FFFA77');
var Tools = require('Tools');
var PlayerData = require('PlayerData');
cc.Class({
    extends: ListItemBase,

    properties: {
        bgNode: cc.Node,
        rankNode: cc.Node,
        rankLabel: cc.Label,
        nameLabel: cc.Label,
        iconSprite: cc.Sprite,
        killLabel: cc.Label
    },

    init: function init(data) {
        for (var i = 0; i < 2; i++) {
            this.bgNode.children[i].active = (data.rank + i) % 2;
        }
        for (var _i = 0; _i < 3; _i++) {
            this.rankNode.children[_i].active = _i + 1 === data.rank;
        }

        if (data.rank === -1) {
            this.rankLabel.node.active = true;
            this.rankLabel.string = '未上榜';
        } else {
            this.rankLabel.node.active = data.rank > 3;
            this.rankLabel.string = data.rank;
        }

        this.killLabel.string = data.score;
        this.iconSprite.spriteFrame = null;
        if (data.realPlayer === 0) {
            this.iconSprite.iconUrl = data.id;
            UIUtil.loadAIPortrait(this.iconSprite, data.id);
            this.nameLabel.string = Tools.getShowNickName(ConfigData.instance.getAINickById(data.id));
        } else {
            if (data.isLocal) {
                this.iconSprite.iconUrl = PlayerData.instance.iconUrl;
                UIUtil.loadFriendPortrait(this.iconSprite, PlayerData.instance.iconUrl);
                this.nameLabel.string = Tools.getShowNickName(PlayerData.instance.name);
            } else {
                this.iconSprite.iconUrl = data.headUrl;
                UIUtil.loadFriendPortrait(this.iconSprite, data.headUrl);
                this.nameLabel.string = Tools.getShowNickName(data.name);
            }
        }

        this.bgNode.children[2].active = data.isLocal;
        this.rankLabel.node.color = data.isLocal ? MY_COLOR : cc.Color.WHITE;
        this.nameLabel.node.color = data.isLocal ? MY_COLOR : cc.Color.WHITE;
        this.killLabel.node.color = data.isLocal ? MY_COLOR : cc.Color.WHITE;
    }
}

// update (dt) {},
);

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
        //# sourceMappingURL=ItemPKRank.js.map
        