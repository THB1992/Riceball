(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/AI/ConditionNearLocalHero.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '52922FzstdGGIIpRwfTz58i', 'ConditionNearLocalHero', __filename);
// scripts/battle/component/player/AI/ConditionNearLocalHero.js

'use strict';

/**
 * @fileoverview 离玩家很近
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');

// result从PlayerDistanceSystem确定，就是entityPlayer
var ConditionNearLocalHero = cc.Class({
    extends: ConditionBaseComponent,

    properties: {},

    init: function init() {},

    /** overwrite */
    doResultWithParam: function doResultWithParam(entityPlayer) {
        this.result = entityPlayer;
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
        //# sourceMappingURL=ConditionNearLocalHero.js.map
        