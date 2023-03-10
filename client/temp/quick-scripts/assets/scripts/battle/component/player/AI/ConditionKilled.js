(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/AI/ConditionKilled.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '85c99CW6jtMeI4V6Rrg7NV5', 'ConditionKilled', __filename);
// scripts/battle/component/player/AI/ConditionKilled.js

'use strict';

/**
 * @fileoverview ConditionKilled
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');

var ConditionKilled = cc.Class({
    extends: ConditionBaseComponent,

    properties: {
        _player: null
    },

    init: function init(entityPlayer) {
        this._player = entityPlayer;
    },

    /** overwrite */
    doResult: function doResult() {
        this.result = this._player.beKilled();
    }

    // updateGameLogic: function (dt) {}

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
        //# sourceMappingURL=ConditionKilled.js.map
        