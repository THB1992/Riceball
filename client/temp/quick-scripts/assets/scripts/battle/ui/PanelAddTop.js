(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/ui/PanelAddTop.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e2c0dhPRXdEkrxtrk8dpv2o', 'PanelAddTop', __filename);
// scripts/battle/ui/PanelAddTop.js

'use strict';

var PlayerData = require('PlayerData');
var BagItem = require('BagItem');
cc.Class({
    extends: cc.Component,

    properties: {
        canNotReceiveNode: cc.Node,
        canReceiveNode: cc.Node,
        hasReceiveNode: cc.Node
    },

    init: function init(world, callback) {
        this.world = world;
        this.callback = callback;
        this.refresh();
    },
    refresh: function refresh() {
        var canGet = PlayerData.instance.canGetAddTopReward();
        var hasGet = PlayerData.instance.hasGetAddTopReward();;
        this.canNotReceiveNode.active = !canGet;
        this.canReceiveNode.active = canGet && !hasGet;
        // this.hasReceiveNode.active = canGet && hasGet;
    },


    onReceiveClick: function onReceiveClick() {
        var item = BagItem.createItemWithString('1,32,1');
        if (!PlayerData.instance.isOwnKnifeSkin(item.id)) {
            PlayerData.instance.addKnifeSkin(item.id);
            //装备上
            this.world.onEquipKnifeSkin(item.itemData, true);
        }
        //展示出来
        this.world.uiMgr.showReward(item.itemData);
        this.world.uiMgr.refreshRedDot();
        this.refresh();
    },

    onClose: function onClose() {
        this.node.active = false;
        if (this.callback) {
            this.callback();
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
        //# sourceMappingURL=PanelAddTop.js.map
        