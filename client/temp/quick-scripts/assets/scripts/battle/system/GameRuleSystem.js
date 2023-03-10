(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/system/GameRuleSystem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bf3bea8pWtLs6ACPjZhM6LO', 'GameRuleSystem', __filename);
// scripts/battle/system/GameRuleSystem.js

'use strict';

/**
 * @fileoverview GameRuleSystem
 * @author meifan@gameley.cn (梅凡)
 */

var Tools = require('Tools');

var GameRuleSystem = cc.Class({
    extends: cc.Component,

    properties: {
        _countDownTime: 99,
        players: []
    },

    cleanUp: function cleanUp() {
        this.players = [];
    },

    init: function init(gameOverFunc, localPlayer, entityPlayers, gameTime, reviveFunc) {
        this._gameOverFunc = gameOverFunc;
        this._localPlayer = localPlayer;
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

        this._countDownTime = gameTime;
        this._allDead = false;
        this._reviveFunc = reviveFunc;
        this.isRevive = false;
        this.isGameOver = false;
    },

    updateGameLogic: function updateGameLogic(dt) {
        if (this.isGameOver) return;
        this._countDownTime -= dt;
        if (this._countDownTime <= 0) {
            // 游戏结束
            this.onGameOver();
            return;
        }

        if (this._localPlayer.firstDead && !this.isRevive) {
            this.onRevive();
            return;
        }

        if (this._localPlayer.isDead) {
            // 游戏结束
            this.onGameOver();
            return;
        }

        this._allDead = true;
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
                if (!player.isDead) {
                    this._allDead = false;
                    break;
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

        if (this._allDead) {
            // 游戏结束
            this.onGameOver();
            return;
        }
    },

    onGameOver: function onGameOver() {
        if (this._gameOverFunc) {
            this._gameOverFunc();
            this._gameOverFunc = null;
            this.isGameOver = true;
        }
    },

    onRevive: function onRevive() {
        if (this._reviveFunc) {
            this._reviveFunc();
            // this._reviveFunc = null;
            this.isRevive = true;
        }
    },

    onContinue: function onContinue() {
        this.isRevive = false;
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
        //# sourceMappingURL=GameRuleSystem.js.map
        