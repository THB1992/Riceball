(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/AI/CondtionTrue.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '273c5kQChdFqrcgLI8Tlwff', 'CondtionTrue', __filename);
// scripts/battle/component/player/AI/CondtionTrue.js

'use strict';

/**
 * @fileoverview CondtionTrue
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');

var CondtionTrue = cc.Class({
    extends: ConditionBaseComponent,

    properties: {},

    init: function init() {},

    /** overwrite */
    isTrue: function isTrue() {
        return true;
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
        //# sourceMappingURL=CondtionTrue.js.map
        