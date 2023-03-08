"use strict";
cc._RF.push(module, '4e685B8gGBBfIgZfyF3Dp/v', 'EntityBuff');
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