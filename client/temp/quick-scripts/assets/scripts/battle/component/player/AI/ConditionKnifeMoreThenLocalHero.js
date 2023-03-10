(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/AI/ConditionKnifeMoreThenLocalHero.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd4e44n/t/lOd5QXYMYzFXdy', 'ConditionKnifeMoreThenLocalHero', __filename);
// scripts/battle/component/player/AI/ConditionKnifeMoreThenLocalHero.js

'use strict';

/**
 * @fileoverview ConditionKnifeMoreThenLocalHero
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');

var ConditionKnifeMoreThenLocalHero = cc.Class({
    extends: ConditionBaseComponent,

    properties: {
        _player: null,
        _localHero: null
    },

    init: function init(entityPlayer) {
        var extra = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        this._player = entityPlayer;
        this._extraNum = extra;
    },

    setLocalHero: function setLocalHero(hero) {
        this._localHero = hero;
    },

    /** overwrite */
    doResult: function doResult() {
        this.result = this._localHero ? this._player.getKnifeNum() - this._localHero.getKnifeNum() >= this._extraNum : false;
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
        //# sourceMappingURL=ConditionKnifeMoreThenLocalHero.js.map
        