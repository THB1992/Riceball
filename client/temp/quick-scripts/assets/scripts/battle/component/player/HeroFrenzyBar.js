(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/HeroFrenzyBar.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '62f325G1IVAJYvL48o+Cel0', 'HeroFrenzyBar', __filename);
// scripts/battle/component/player/HeroFrenzyBar.js

'use strict';

/**
 * @fileoverview HeroKnifeNum
 * @author meifan@gameley.cn (梅凡)
 */

var HeroKnifeNum = cc.Class({
    extends: cc.Component,

    properties: {
        _player: null,
        _frenzyComp: null,
        frenzyBar: cc.Sprite,
        activeNode: cc.Node
    },

    init: function init(entityPlayer) {
        this._player = entityPlayer;
        this._frenzyComp = entityPlayer.node.getComponent('PlayerFrenzyComponent');
    },

    update: function update(dt) {
        if (this._active !== this._player.activeNode.active) {
            this._active = this._player.activeNode.active && this._frenzyComp;
            this.activeNode.active = this._active;
        }

        if (this._frenzyComp && this.frenzyBar) {
            this.frenzyBar.fillRange = this._frenzyComp.getFrenzyRate();
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
        //# sourceMappingURL=HeroFrenzyBar.js.map
        