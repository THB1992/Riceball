(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/AI/ConditionLocalHeroDefence.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '816c9eetDpHbYI+tXhVgTZH', 'ConditionLocalHeroDefence', __filename);
// scripts/battle/component/player/AI/ConditionLocalHeroDefence.js

'use strict';

/**
 * @fileoverview 玩家处于龟缩
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');

// result从PlayerDistanceSystem确定，就是entityPlayer
var ConditionLocalHeroDefence = cc.Class({
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
        this.result = this._localHero ? this._localHero.isDefence : false;
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
        //# sourceMappingURL=ConditionLocalHeroDefence.js.map
        