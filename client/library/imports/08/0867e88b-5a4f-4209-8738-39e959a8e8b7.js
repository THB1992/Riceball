"use strict";
cc._RF.push(module, '0867eiLWk9CCYc4OelZqOi3', 'ScaleByOwner');
// scripts/battle/component/effect/ScaleByOwner.js

"use strict";

/**
 * @fileoverview ScaleByOwner
 * @author meifan@gameley.cn (梅凡)
 */

var ScaleByOwner = cc.Class({
    extends: cc.Component,

    properties: {
        ownerNode: null
    },

    init: function init(entityNode) {
        this.ownerNode = entityNode;
    },

    update: function update(dt) {
        var newScale = this.ownerNode.scale;

        if (this.node.scale !== newScale) this.node.scale = newScale;
    }

});

cc._RF.pop();