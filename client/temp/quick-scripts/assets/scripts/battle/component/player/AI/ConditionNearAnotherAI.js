(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/AI/ConditionNearAnotherAI.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8097e3CYCZFTJr+tsFgY3Tm', 'ConditionNearAnotherAI', __filename);
// scripts/battle/component/player/AI/ConditionNearAnotherAI.js

'use strict';

/**
 * @fileoverview 离其他ai太近条件
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');

// result从PlayerDistanceSystem确定，是另外多个ai的Entity的数组
var ConditionNearAnotherAI = cc.Class({
    extends: ConditionBaseComponent,

    properties: {},

    init: function init() {
        this.result = [];
    },

    /** overwrite */
    clearResult: function clearResult() {
        this.result = [];
    },

    /** overwrite */
    doResultWithParam: function doResultWithParam(otherHero) {
        if (!this.result) {
            this.result = [];
        }
        this.result.push(otherHero);
    },

    /** overwrite */
    isTrue: function isTrue() {
        return this.result && this.result.length > 0;
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
        //# sourceMappingURL=ConditionNearAnotherAI.js.map
        