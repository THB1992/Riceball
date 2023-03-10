(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/AI/ConditionBaseComponent.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ea272kZDpxMhYrOoDjj6Kum', 'ConditionBaseComponent', __filename);
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
        //# sourceMappingURL=ConditionBaseComponent.js.map
        