(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/AI/ConditionHignKnifeNumNoPick.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f3d4eBSmIJIH7SkFVH4Uo6N', 'ConditionHignKnifeNumNoPick', __filename);
// scripts/battle/component/player/AI/ConditionHignKnifeNumNoPick.js

'use strict';

/**
 * @fileoverview ConditionHighKnifeNum
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionHighKnifeNum = require('ConditionHighKnifeNum');

var ConditionHignKnifeNumNoPick = cc.Class({
    extends: ConditionHighKnifeNum,

    properties: {
        _knifeNum: 10
    },

    init: function init(entityPlayer, knifeNum) {
        this._player = entityPlayer;
        this._knifeNum = knifeNum;
    },

    /** overwrite */
    doResult: function doResult() {
        this.result = this._player.getKnifeNum() > this._knifeNum;
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
        //# sourceMappingURL=ConditionHignKnifeNumNoPick.js.map
        