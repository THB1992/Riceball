(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/AI/ConditionReviveTotal.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ba308JqblRMEJopKewbKfR5', 'ConditionReviveTotal', __filename);
// scripts/battle/component/player/AI/ConditionReviveTotal.js

'use strict';

/**
 * @fileoverview ConditionReviveTotal新手期不再捡的起刀的数量
 * @author meifan@gameley.cn (梅凡)
 */
var ConditionBaseComponent = require('ConditionBaseComponent');

var ConditionReviveTotal = cc.Class({
    extends: ConditionBaseComponent,

    properties: {},

    init: function init(num) {
        this.result = num;
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
        //# sourceMappingURL=ConditionReviveTotal.js.map
        