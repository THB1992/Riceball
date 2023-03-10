(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/effect/ActiveByOwner.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bec90TEHwBF/J+2wL5l858f', 'ActiveByOwner', __filename);
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
        //# sourceMappingURL=ActiveByOwner.js.map
        