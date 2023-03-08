"use strict";
cc._RF.push(module, 'c184cXtlBxBgre4VjMVH7Lw', 'KnifeStateComponent');
// scripts/battle/component/knife/KnifeStateComponent.js

'use strict';

/**
 * @fileoverview 刀状态组件
 * @author jinhaitao@gameley.cn (金海涛)
 */
var KnifeState = require('Types').KnifeState;

cc.Class({
    extends: cc.Component,
    properties: {
        state: KnifeState.Normal,
        isDirty: false
    },

    onLoad: function onLoad() {
        this.node.on('updateState', this.updateState, this);
        this.node.on('resetDirty', this.resetDirty, this);
    },

    updateState: function updateState(state) {
        if (this.state === state) return;

        // if (state === KnifeState.Attack) {
        //     this.node.children[4].color = cc.Color.GREEN;
        // }

        // if (state === KnifeState.Defence) {
        //     this.node.children[4].color = cc.Color.RED;
        // }

        this.state = state;
        this.isDirty = true;
    },

    resetDirty: function resetDirty() {
        this.isDirty = false;
    }
});

cc._RF.pop();