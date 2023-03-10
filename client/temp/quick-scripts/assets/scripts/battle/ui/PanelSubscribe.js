(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/ui/PanelSubscribe.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '25cceoE1sBAa5YGSnMXFRba', 'PanelSubscribe', __filename);
// scripts/battle/ui/PanelSubscribe.js

'use strict';

var ConfigData = require('ConfigData');
var PlayerData = require('PlayerData');

var Tools = require('Tools');
cc.Class({
    extends: cc.Component,

    properties: {

        topBg: cc.Node,
        bottomBg: cc.Node
    },

    init: function init(world, callback) {
        this.world = world;
        this.callback = callback;
    },
    onSubscribe: function onSubscribe() {
        PlayerData.instance.updateSubscribeTime();
        this.onClose();
    },
    onClose: function onClose() {
        this.node.active = false;
        if (this.callback) this.callback();
    }
}

// update(dt) {},
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
        //# sourceMappingURL=PanelSubscribe.js.map
        