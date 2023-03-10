(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/AI/ActionDefence.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '61cb5P52pVEd7HVGVzt1YB1', 'ActionDefence', __filename);
// scripts/battle/component/player/AI/ActionDefence.js

'use strict';

/**
 * @fileoverview 移动行为
 * @author meifan@gameley.cn (梅凡)
 */

var ActionBaseComponent = require('ActionBaseComponent');

var ActionDefence = cc.Class({
    extends: ActionBaseComponent,

    properties: {
        _defenceTime: 2,
        _defenceCount: 2
    },

    // CheckIfTrue: function () { },

    // onLoad: function () {
    // this.node.on('setNextPos', this.setNextPos, this);
    // },

    init: function init(defenceTime) {
        this._defenceTime = defenceTime;
    },

    reset: function reset() {
        this._defenceCount = this._defenceTime;
    },

    updateGameLogic: function updateGameLogic(dt) {
        if (this.isActionIng()) {
            this._defenceCount -= dt;
            if (this._defenceCount <= 0) {
                this.endAction();
            }
        }

        return this.actionState;
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
        //# sourceMappingURL=ActionDefence.js.map
        