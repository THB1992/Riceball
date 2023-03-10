(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/AI/CondtionTimes/ConditionLastTimeToward.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0c595m1OVFGHZw3Ja/h+MRv', 'ConditionLastTimeToward', __filename);
// scripts/battle/component/player/AI/CondtionTimes/ConditionLastTimeToward.js

'use strict';

/**
 * @fileoverview ai追击玩家一定时间放弃
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');
// const Tools = require('Tools');

var ConditionLastTimeToward = cc.Class({
    extends: ConditionBaseComponent,

    properties: {
        needUpdate: false
    },

    init: function init() {
        this.result = -1;
        this.needUpdate = false;
    },

    /** overwrite */
    clearResult: function clearResult() {
        this.result = -1;
        this.needUpdate = false;
    },

    /** overwrite */
    doResultWithParam: function doResultWithParam(time) {
        if (!this.needUpdate) {
            this.result = time;
            this.needUpdate = true;
        }
    },

    isTrue: function isTrue() {
        return this.result < 0;
    },
    // updateGameLogic: function (dt) {}

    update: function update(dt) {
        if (this.needUpdate) {
            this.result -= dt;
        }
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
        //# sourceMappingURL=ConditionLastTimeToward.js.map
        