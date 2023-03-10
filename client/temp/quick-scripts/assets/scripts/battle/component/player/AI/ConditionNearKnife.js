(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/AI/ConditionNearKnife.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '38dd8ZRjG9Pm6QuEuqAC1r0', 'ConditionNearKnife', __filename);
// scripts/battle/component/player/AI/ConditionNearKnife.js

'use strict';

/**
 * @fileoverview 有离很近的刀
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');

// result从PlayerDistanceSystem确定，就是entityKnife
var ConditionNearKnife = cc.Class({
    extends: ConditionBaseComponent,

    properties: {},

    init: function init() {},

    /** overwrite */
    doResultWithParam: function doResultWithParam(entityKnife) {
        this.result = entityKnife;
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
        //# sourceMappingURL=ConditionNearKnife.js.map
        