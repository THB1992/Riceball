(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/knife/KnifeStateComponent.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c184cXtlBxBgre4VjMVH7Lw', 'KnifeStateComponent', __filename);
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
        //# sourceMappingURL=KnifeStateComponent.js.map
        