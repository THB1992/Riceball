(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/AI/ConditionLowKnifeNumLocalHero.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '44663r8hmpNN7d0yYha8/B/', 'ConditionLowKnifeNumLocalHero', __filename);
// scripts/battle/component/player/AI/ConditionLowKnifeNumLocalHero.js

'use strict';

/**
 * @fileoverview ConditionLowKnifeNumLocalHero
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');

var ConditionLowKnifeNumLocalHero = cc.Class({
    extends: ConditionBaseComponent,

    properties: {
        _localHero: null
    },

    init: function init() {},

    setLocalHero: function setLocalHero(hero) {
        this._localHero = hero;
    },

    /** overwrite */
    doResult: function doResult() {
        this.result = this._localHero ? this._localHero.getKnifeNum() < 3 : false;
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
        //# sourceMappingURL=ConditionLowKnifeNumLocalHero.js.map
        