"use strict";
cc._RF.push(module, 'ea272kZDpxMhYrOoDjj6Kum', 'ConditionBaseComponent');
// scripts/battle/component/player/AI/ConditionBaseComponent.js

"use strict";

/**
 * @fileoverview 条件基类
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = cc.Class({
    extends: cc.Component,

    properties: {
        result: null
    },

    doResult: function doResult() {
        this.result = null;
    },

    doResultWithParam: function doResultWithParam(param) {
        this.result = param;
    },

    clearResult: function clearResult() {
        this.result = null;
    },

    isTrue: function isTrue() {
        return this.result;
    }

    // updateGameLogic: function (dt) {}

    // update: {}
});

cc._RF.pop();