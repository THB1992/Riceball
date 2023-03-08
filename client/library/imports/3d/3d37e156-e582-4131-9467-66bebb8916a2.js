"use strict";
cc._RF.push(module, '3d37eFW5YJBMZRnZr67iRai', 'EntityBase');
// scripts/battle/entity/EntityBase.js

"use strict";

/**
 * @fileoverview 实体基类
 * @author meifan@gameley.cn (梅凡)
 */

cc.Class({
    extends: cc.Component,

    properties: {
        renderPos: null,
        teamID: 0,
        shouldRemove: false
    },

    // onLoad () {}

    // start () {},

    // update (dt) {},

    /**
     * 处理逻辑
     */
    updateGameLogic: function updateGameLogic(dt) {},


    setRenderPosition: function setRenderPosition(pos) {
        this.renderPos = pos;
    },

    getRenderPosition: function getRenderPosition() {
        return this.renderPos ? this.renderPos : this.node.position;
    },

    recycleSelf: function recycleSelf() {
        if (this.node._pool) {
            this.node._pool.put(this.node);
        } else {
            this.node.removeFromParent();
        }
    }

});

cc._RF.pop();