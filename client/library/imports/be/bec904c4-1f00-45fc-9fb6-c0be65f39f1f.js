"use strict";
cc._RF.push(module, 'bec90TEHwBF/J+2wL5l858f', 'ActiveByOwner');
// scripts/battle/component/effect/ActiveByOwner.js

"use strict";

/**
 * @fileoverview ActiveByOwner
 * @author meifan@gameley.cn (梅凡)
 */

var ActiveByOwner = cc.Class({
    extends: cc.Component,

    properties: {
        player: null,
        _isDefence: true
    },

    init: function init(entityPlayer, activeNode) {
        this.player = entityPlayer;
        this.activeNode = activeNode;
        this.activeNode.active = false;
    },

    update: function update(dt) {
        if (this.player.beKilled()) {
            if (this._isDefence) {
                this._isDefence = false;
                this.activeNode.active = false;
            }
            return;
        }

        if (this._isDefence !== this.player.isDefence) {
            this._isDefence = this.player.isDefence;
            this.activeNode.active = this._isDefence;
        }
    }

});

cc._RF.pop();