(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/AI/CondtionTimes/ConditionLastTime.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ac8ed24hnFEmoDeLc/v8Yth', 'ConditionLastTime', __filename);
// scripts/battle/component/player/AI/CondtionTimes/ConditionLastTime.js

'use strict';

/**
 * @fileoverview 倒计时
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');
var Tools = require('Tools');

// result从PlayerDistanceSystem确定，就是entityPlayer
var ConditionLastTime = cc.Class({
    extends: ConditionBaseComponent,

    properties: {},

    init: function init() {
        this.result = -1;
    },

    /** overwrite */
    doResultWithParam: function doResultWithParam(time) {
        this.result = time;
    },

    isTrue: function isTrue() {
        return this.result < 0;
    },
    // updateGameLogic: function (dt) {}

    update: function update(dt) {
        this.result -= dt;
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
        //# sourceMappingURL=ConditionLastTime.js.map
        