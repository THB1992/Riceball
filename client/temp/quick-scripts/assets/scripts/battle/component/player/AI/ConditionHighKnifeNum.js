(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/AI/ConditionHighKnifeNum.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e33b3aOJzxJQJ7qBx58SgpA', 'ConditionHighKnifeNum', __filename);
// scripts/battle/component/player/AI/ConditionHighKnifeNum.js

'use strict';

/**
 * @fileoverview ConditionHighKnifeNum
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');

var ConditionHighKnifeNum = cc.Class({
    extends: ConditionBaseComponent,

    properties: {
        _player: null
    },

    init: function init(entityPlayer) {
        this._player = entityPlayer;
    },

    /** overwrite */
    doResult: function doResult() {
        this.result = this._player.getKnifeNum() > 6;
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
        //# sourceMappingURL=ConditionHighKnifeNum.js.map
        