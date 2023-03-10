(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/system/HeroReviveSystem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bd821rhg6dLdrmV9HRXoyV7', 'HeroReviveSystem', __filename);
// scripts/battle/system/HeroReviveSystem.js

'use strict';

/**
 * @fileoverview HeroReviveSystem
 * @author meifan@gameley.cn (梅凡)
 */

var HeroRebornEffectState = require('Types').HeroRebornEffectState;

var HeroReviveSystem = cc.Class({
    extends: cc.Component,

    properties: {
        players: []
    },

    cleanUp: function cleanUp() {
        this.players = [];
    },

    init: function init(entityPlayers, reviveFunc, showRebornFunc) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = entityPlayers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var player = _step.value;

                this.players.push(player);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        this._reviveFunc = reviveFunc;
        this._showRebornFunc = showRebornFunc;
    },

    updateGameLogic: function updateGameLogic(dt) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {

            for (var _iterator2 = this.players[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var player = _step2.value;

                if (player.isLocal) {
                    // 排除玩家自己
                    continue;
                }
                if (player.firstDead) {
                    if (!player.canRevive()) {
                        this.onRevive(player, false);
                    } else {
                        player.updateReviveLogic(dt);

                        if (player.waitToRevive) {
                            this.onRevive(player, true);
                        }

                        if (player.showRebornEffect === HeroRebornEffectState.waitToShow) {
                            player.showRebornEffect = HeroRebornEffectState.Open;
                            this.onShowReborn(player);
                        }
                    }
                }
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
    },

    onRevive: function onRevive(player, isRevive) {
        if (this._reviveFunc) {
            this._reviveFunc(player, isRevive);
            // this._reviveFunc = null;
            // this.isRevive = true;
        }
    },

    onShowReborn: function onShowReborn(player) {
        if (this._showRebornFunc) {
            this._showRebornFunc(player);
        }
    }
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
        //# sourceMappingURL=HeroReviveSystem.js.map
        