(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/HeroKnifeNum.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fdb04yjgs9OPYgl5JAy6/Hy', 'HeroKnifeNum', __filename);
// scripts/battle/component/player/HeroKnifeNum.js

"use strict";

/**
 * @fileoverview HeroKnifeNum
 * @author meifan@gameley.cn (梅凡)
 */

var HeroKnifeNum = cc.Class({
    extends: cc.Component,

    properties: {
        _player: null,
        knifeNumLab: cc.Label,
        _knifeNum: -1,
        crownNode: cc.Node,
        activeNode: cc.Node
    },

    init: function init(entityPlayer) {
        this._player = entityPlayer;
    },

    update: function update(dt) {
        if (this._active !== this._player.activeNode.active) {
            this._active = this._player.activeNode.active;
            this.activeNode.active = this._active;
        }

        if (this._knifeNum !== this._player.getKnifeNum()) {
            this._knifeNum = this._player.getKnifeNum();

            this.knifeNumLab.string = this._knifeNum;
        }

        if (this.crownNode.active !== (this._player.rank === 1)) {
            this.crownNode.active = this._player.rank === 1;
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
        //# sourceMappingURL=HeroKnifeNum.js.map
        