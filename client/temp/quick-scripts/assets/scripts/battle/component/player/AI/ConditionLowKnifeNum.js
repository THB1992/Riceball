(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/AI/ConditionLowKnifeNum.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd1535gorLlL07MVWsMtH8Cv', 'ConditionLowKnifeNum', __filename);
// scripts/battle/component/player/AI/ConditionLowKnifeNum.js

'use strict';

/**
 * @fileoverview ConditionLowKnifeNum
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');

var ConditionLowKnifeNum = cc.Class({
    extends: ConditionBaseComponent,

    properties: {
        _player: null
    },

    init: function init(entityPlayer) {
        this._player = entityPlayer;
    },

    /** overwrite */
    doResult: function doResult() {
        this.result = this._player.getKnifeNum() < 3;
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
        //# sourceMappingURL=ConditionLowKnifeNum.js.map
        