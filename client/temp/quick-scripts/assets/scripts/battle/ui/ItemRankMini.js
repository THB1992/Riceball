(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/ui/ItemRankMini.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a8bb4a42ApKkb2MOf/iY53q', 'ItemRankMini', __filename);
// scripts/battle/ui/ItemRankMini.js

'use strict';

var UIUtil = require('UIUtil');
cc.Class({
    extends: cc.Component,

    properties: {
        iconSprite: cc.Sprite,
        starCountLabel: cc.Label
    },

    init: function init(data) {
        UIUtil.loadResSprite(this.iconSprite, data.url);
        this.starCountLabel.string = data.star;
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
        //# sourceMappingURL=ItemRankMini.js.map
        