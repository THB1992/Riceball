"use strict";
cc._RF.push(module, '3a957SKyE5MxoQ54Qptlwk7', 'ActionBaseComponent');
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