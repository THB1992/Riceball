(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/AI/ConditionInThenOutLocalHero.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c73c9KTRyxGeriXGFXt2oeM', 'ConditionInThenOutLocalHero', __filename);
// scripts/battle/component/player/AI/ConditionInThenOutLocalHero.js

'use strict';

/**
 * @fileoverview 离玩家近而后离开玩家
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');

// result从PlayerDistanceSystem确定，就是entityPlayer
var ConditionInThenOutLocalHero = cc.Class({
    extends: ConditionBaseComponent,

    properties: {
        _heroIn: false
    },

    init: function init() {},

    /** overwrite */
    doResultWithParam: function doResultWithParam(heroIn) {
        if (this._heroIn && !heroIn) {
            this.result = true;
        }
        this._heroIn = heroIn;
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
        //# sourceMappingURL=ConditionInThenOutLocalHero.js.map
        