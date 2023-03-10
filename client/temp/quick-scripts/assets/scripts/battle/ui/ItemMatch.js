(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/ui/ItemMatch.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd6f345O9MJFT6FUsEy6nzHp', 'ItemMatch', __filename);
// scripts/battle/ui/ItemMatch.js

'use strict';

var UIUtil = require('UIUtil');
cc.Class({
    extends: cc.Component,

    properties: {
        iconSprite: cc.Sprite
    },

    init: function init(player) {
        UIUtil.loadResPortrait(this.iconSprite, player);
        this.iconSprite.node.active = false;
    },

    showIcon: function showIcon() {
        this.iconSprite.node.active = true;
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
        //# sourceMappingURL=ItemMatch.js.map
        