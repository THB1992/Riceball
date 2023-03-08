"use strict";
cc._RF.push(module, '13b32JVhbhGC7OIMu5Z/goD', 'KnifeCountComponent');
// scripts/battle/component/knife/KnifeCountComponent.js

'use strict';

/**
 * @fileoverview 刀在玩家身上时的index与刀数量
 * @author jinhaitao@gameley.cn (金海涛)
 */
cc.Class({
    extends: cc.Component,
    properties: {
        index: 0,
        maxCount: 0,
        isDirty: false
    },

    onLoad: function onLoad() {
        this.node.on('updateCount', this.updateCount, this);
        this.node.on('resetDirty', this.resetDirty, this);
    },

    updateCount: function updateCount(detail) {
        this.index = detail[0];
        this.isMore = this.maxCount < detail[1] ? true : false;
        this.maxCount = detail[1];
        this.isDirty = true;
    },

    resetDirty: function resetDirty() {
        this.isDirty = false;
    }
});

cc._RF.pop();