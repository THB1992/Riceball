(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/AI/ActionBaseComponent.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3a957SKyE5MxoQ54Qptlwk7', 'ActionBaseComponent', __filename);
// scripts/battle/component/player/AI/ActionBaseComponent.js

'use strict';

/**
 * @fileoverview 行为基类
 * @author meifan@gameley.cn (梅凡)
 */

var ActionState = require('Types').ActionState;

var ActionBaseComponent = cc.Class({
    extends: cc.Component,

    properties: {
        actionState: ActionState.Begin
    },

    // CheckIfTrue: function () { },

    updateGameLogic: function updateGameLogic(dt) {
        return this.actionState;
    },

    startAction: function startAction() {
        this.actionState = ActionState.Ing;
    },

    isActionIng: function isActionIng() {
        return this.actionState === ActionState.Ing;
    },

    endAction: function endAction() {
        this.actionState = ActionState.End;
    },

    isActionEnd: function isActionEnd() {
        return this.actionState === ActionState.End;
    }

    // update: {}
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
        //# sourceMappingURL=ActionBaseComponent.js.map
        