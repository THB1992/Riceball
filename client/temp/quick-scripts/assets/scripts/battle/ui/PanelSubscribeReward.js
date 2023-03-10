(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/ui/PanelSubscribeReward.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '282c49ErtxLApObZ7Cmr+XI', 'PanelSubscribeReward', __filename);
// scripts/battle/ui/PanelSubscribeReward.js

'use strict';

var ConfigData = require('ConfigData');
var PlayerData = require('PlayerData');

var Tools = require('Tools');
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init: function init(world, callback) {
        this.world = world;
        this.callback = callback;
        PlayerData.instance.updateZongZi(10);
        PlayerData.instance.updateDaySubscribeReward();
    },
    onClose: function onClose() {
        this.node.active = false;
        this.world.uiMgr.showTips(Tools.getStringByFormat(ConfigData.instance.getUITipStr(15), 10));
        if (this.callback) this.callback();
    },
    update: function update(dt) {}
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
        //# sourceMappingURL=PanelSubscribeReward.js.map
        