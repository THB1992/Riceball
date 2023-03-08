"use strict";
cc._RF.push(module, '49123g3EKpN0aSiJjs9G+6C', 'KnifeMomentStateComponent');
// scripts/battle/component/knife/KnifeMomentStateComponent.js

'use strict';

/**
 * @fileoverview 刀瞬时状态组件
 * @author zhangzhaung@gameley.cn (张庄)
 */
var KnifeMomentState = require('Types').KnifeMomentState;

cc.Class({
    extends: cc.Component,
    properties: {
        state: null,
        isDirty: false
    },

    onLoad: function onLoad() {
        this.node.on('updateMomentState', this.updateMomentState, this);
        this.node.on('resetDirty', this.resetDirty, this);
    },

    updateMomentState: function updateMomentState(state) {
        if (this.state === state) return;
        this.state = state;
        this.isDirty = true;
    },

    resetDirty: function resetDirty() {
        this.isDirty = false;
    }
});

cc._RF.pop();