"use strict";
cc._RF.push(module, 'c9f3a36POVD+KVIkw1sWbIf', 'ScaleFix');
// scripts/battle/component/effect/ScaleFix.js

'use strict';

//修正固化特效的scale
cc.Class({
    extends: cc.Component,

    properties: {},

    init: function init(entityNode) {
        this.ownerNode = entityNode;
    },

    update: function update(dt) {
        var multip = this.ownerNode.getComponent('HeroScale').newScaleMultip;
        var newScale = (this.ownerNode.scale - multip) / 1.5 + multip;
        // if (this.ownerNode.getComponent('EntityPlayer').isDefence) {
        //     newScale = 0.9 * newScale;
        // }
        if (this.node.scale !== newScale) this.node.scale = newScale;
    }
});

cc._RF.pop();