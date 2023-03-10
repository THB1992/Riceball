(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/entity/EntityBase.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3d37eFW5YJBMZRnZr67iRai', 'EntityBase', __filename);
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
        //# sourceMappingURL=EntityBase.js.map
        