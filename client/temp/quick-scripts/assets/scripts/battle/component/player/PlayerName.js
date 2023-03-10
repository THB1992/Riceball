(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/PlayerName.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b97ea9FPNZGxIya8Eo04gkv', 'PlayerName', __filename);
// scripts/battle/component/player/PlayerName.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        nickname: cc.Label,
        frameNode: cc.Node
    },

    onLoad: function onLoad() {
        this.nickname.langFlag = true;
    },
    start: function start() {}
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
        //# sourceMappingURL=PlayerName.js.map
        