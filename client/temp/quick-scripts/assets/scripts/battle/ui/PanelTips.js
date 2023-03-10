(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/ui/PanelTips.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bd727o7MNpN7Y4yMYaL2a6r', 'PanelTips', __filename);
// scripts/battle/ui/PanelTips.js

'use strict';

var GameData = require('GameData');
var ConfigData = require('ConfigData');
cc.Class({
    extends: cc.Component,

    properties: {
        anim: cc.Animation,
        bgNode: cc.Node,
        tipsLabel: cc.Label,
        isShow: false
    },

    onLoad: function onLoad() {
        this.bgNode.width = GameData.instance.isPad() ? 370 : 520;
        this.tipsLabel.node.width = GameData.instance.isPad() ? 270 : 420;
    },

    init: function init(tips) {
        var _this = this;

        if (this.isShow) return;
        this.node.active = true;
        this.isShow = true;

        if (Number(tips)) {
            var str = ConfigData.instance.getUITipStr(tips);
            this.tipsLabel.string = str;
        } else {
            this.tipsLabel.string = tips;
        }

        this.anim.once('finished', function () {
            _this.isShow = false;
        }, this);
        this.anim.play();
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
        //# sourceMappingURL=PanelTips.js.map
        