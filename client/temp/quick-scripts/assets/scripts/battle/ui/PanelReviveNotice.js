(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/ui/PanelReviveNotice.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '69c6fclhbFMpp3AKC8v1nvB', 'PanelReviveNotice', __filename);
// scripts/battle/ui/PanelReviveNotice.js

'use strict';

/**
 * @fileoverview PanelReviveNotice
 * @author meifan@gameley.cn (梅凡)
 */
var UIUtil = require('UIUtil');

var PanelReviveNotice = cc.Class({
    extends: cc.Component,

    properties: {
        head: cc.Sprite,
        nick: cc.Label,
        isOpen: false,

        reviveLabel: cc.Label
    },

    onLoad: function onLoad() {
        this.reviveLabel.string = 'revive';
    },


    update: function update(dt) {
        if (this._time > 0) {
            this._time -= dt;
            if (this._time < 0) {
                this.close();
            }
        }
    },

    showReviveNotice: function showReviveNotice(hero) {
        this.node.active = true;
        this.isOpen = true;

        UIUtil.loadResPortrait(this.head, hero);
        this.nick.string = hero.name;

        this._time = 2.0;
    },

    close: function close() {
        this.node.active = false;
        this.isOpen = false;
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
        //# sourceMappingURL=PanelReviveNotice.js.map
        