(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/entity/EntityBuff.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4e685B8gGBBfIgZfyF3Dp/v', 'EntityBuff', __filename);
// scripts/battle/entity/EntityBuff.js

'use strict';

/**
 * @fileoverview buff实体
 * @author zhangzhuang@gameley.cn (张庄)
 */

var Tools = require('Tools');
var EntityBase = require('EntityBase');

cc.Class({
    extends: EntityBase,

    properties: {
        attackNode: cc.Node,
        pickNode: cc.Node,
        landNode: cc.Node,
        skinNode: cc.Node
    },

    init: function init(state) {
        this.buffState = state;
        var skin = this.skinNode.children[state];
        if (skin) {
            skin.active = true;
        }
        this.nodeLandCollider = Tools.getOrAddComponent(this.landNode, 'NodeCollider');
        this.nodeLandCollider.init(this.node, true);

        this.buffColliderListener = Tools.getOrAddComponent(this.node, 'BuffColliderListener');
        this.buffColliderListener.init(this);

        this.node.once('onByPick', this.onByPick, this);
    },


    onByPick: function onByPick() {
        var skin = this.skinNode.children[this.buffState];
        if (skin) {
            skin.active = false;
        }

        this.recycleSelf();
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
        //# sourceMappingURL=EntityBuff.js.map
        