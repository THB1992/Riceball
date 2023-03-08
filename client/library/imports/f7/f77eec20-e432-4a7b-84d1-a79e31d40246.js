"use strict";
cc._RF.push(module, 'f77eewg5DJKe4TRp54x1AJG', 'PlayerRankSystem');
// scripts/battle/system/PlayerRankSystem.js

"use strict";

/**
 * @fileoverview PlayerRankSystem
 * @author meifan@gameley.cn (梅凡)
 */

var PlayerRankSystem = cc.Class({
    extends: cc.Component,

    properties: {
        players: []
    },

    cleanUp: function cleanUp() {
        this.players = [];
    },

    init: function init(entityPlayers, localPlayer) {
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

        this.localPlayer = localPlayer;
    },

    updateGameLogic: function updateGameLogic(dt) {
        this.players.sort(function (a, b) {
            return b.getKnifeNum() - a.getKnifeNum();
        });

        var index = this.players.indexOf(this.localPlayer);
        while (index > 0) {
            if (this.players[index - 1].getKnifeNum() === this.localPlayer.getKnifeNum()) {
                this.players[index] = this.players[index - 1];
                this.players[index - 1] = this.localPlayer;
                index--;
            } else {
                break;
            }
        }

        this.players.sort(function (a, b) {
            var aValue = a.beKilled() ? -1 : 0;
            var bValue = b.beKilled() ? -1 : 0;
            return bValue - aValue;

            // return !b.beKilled() && a.beKilled() ? 1 : 0;
        });

        index = 1;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = this.players[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var player = _step2.value;

                // if(player.beKilled()) {
                //     player.setFinalRank(index);
                //     continue;
                // }
                player.rank = index;
                index++;
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
    }
});

cc._RF.pop();