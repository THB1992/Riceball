(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/ui/PanelInvite.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '30ba5lU93FHDLNrXfvownEJ', 'PanelInvite', __filename);
// scripts/battle/ui/PanelInvite.js

'use strict';

var PlatformMgr = require('PlatformMgr');
var PlatformType = require('Types').PlatformType;
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
        iconSprties: [cc.Sprite],

        shareLabel: cc.Label,

        shareBtn: cc.Node,
        receiveBtn: cc.Node,
        hasReceiveBtn: cc.Node
    },

    init: function init(world) {
        this.world = world;
        this.data = PlayerData.instance.inviteDatas;
        PlayerData.instance.updateCheckInviteLength();
        this.world.uiMgr.refreshRedDot();
        for (var i = 0; i < this.data.length; i++) {
            if (this.iconSprties[i]) {
                UIUtil.loadFriendPortrait(this.iconSprties[i], this.data[i].iconUrl);
            }
        }
        this.shareLabel.string = this.data.length + '/3';
        this.refresh();
    },
    refresh: function refresh() {
        var complete = this.data.length >= 3;
        var receive = PlayerData.instance.hasGetInviteReward();

        this.shareBtn.active = !complete;
        this.receiveBtn.active = complete && !receive;
        this.hasReceiveBtn.active = complete && receive;
    },


    onShareClick: function onShareClick() {
        ShareMgr.share(ShareType.Invite);
    },

    onReceiveClick: function onReceiveClick() {
        var item = BagItem.createItemWithString('2,11,1');
        if (!PlayerData.instance.isOwnHeroSkin(item.id)) {
            PlayerData.instance.addHeroSkin(item.id);
            //装备上
            this.world.onEquipHeroSkin(item.itemData, true);
        }
        //展示出来
        this.world.uiMgr.showReward(item.itemData);
        this.world.uiMgr.refreshRedDot();
        this.refresh();
    },
    onClose: function onClose() {
        this.node.active = false;
        // AdvertMgr.instance.destoryBanner();
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
        //# sourceMappingURL=PanelInvite.js.map
        