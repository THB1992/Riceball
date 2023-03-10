(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/AI/ConditionRandomBool.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ad7c9T0sjRBNrqbCIlP2DHs', 'ConditionRandomBool', __filename);
// scripts/battle/component/player/AI/ConditionRandomBool.js

'use strict';

/**
 * @fileoverview 得到随机值
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');
var Tools = require('Tools');

// result从PlayerDistanceSystem确定，就是entityPlayer
var ConditionRandom = cc.Class({
    extends: ConditionBaseComponent,

    properties: {},

    init: function init() {},

    /** overwrite */
    doResult: function doResult() {
        this.result = Tools.getRandomBool();
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
        //# sourceMappingURL=ConditionRandomBool.js.map
        