(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/AI/ConditionKnifeLessThenLocalHero.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2c861pnihNDMLLiTq41Ii2B', 'ConditionKnifeLessThenLocalHero', __filename);
// scripts/battle/component/player/AI/ConditionKnifeLessThenLocalHero.js

'use strict';

/**
 * @fileoverview ConditionKnifeLessThenLocalHero
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');

var ConditionKnifeLessThenLocalHero = cc.Class({
    extends: ConditionBaseComponent,

    properties: {
        _player: null,
        _localHero: null
    },

    init: function init(entityPlayer) {
        this._player = entityPlayer;
    },

    setLocalHero: function setLocalHero(hero) {
        this._localHero = hero;
    },

    /** overwrite */
    doResult: function doResult() {
        this.result = this._localHero ? this._player.getKnifeNum() < this._localHero.getKnifeNum() + 6 : false;
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
        //# sourceMappingURL=ConditionKnifeLessThenLocalHero.js.map
        