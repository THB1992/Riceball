(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/AI/ConditionAISlow.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a0400EaKRRAI7S80m6M/8PS', 'ConditionAISlow', __filename);
// scripts/battle/component/player/AI/ConditionAISlow.js

'use strict';

/**
 * @fileoverview ai慢速
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');

var ConditionAISlow = cc.Class({
    extends: ConditionBaseComponent,

    properties: {},

    /** overwrite */
    doResult: function doResult() {
        this.result = 0.8;
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
        //# sourceMappingURL=ConditionAISlow.js.map
        