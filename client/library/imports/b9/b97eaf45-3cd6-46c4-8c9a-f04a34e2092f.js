"use strict";
cc._RF.push(module, 'b97ea9FPNZGxIya8Eo04gkv', 'PlayerName');
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