(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/AI/ConditionNoMoreKnife.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '01a40b+Y4FHJ5doUc+8p3St', 'ConditionNoMoreKnife', __filename);
// scripts/battle/component/player/AI/ConditionNoMoreKnife.js

'use strict';

/**
 * @fileoverview ConditionNoMoreKnife新手期不再捡的起刀的数量
 * @author meifan@gameley.cn (梅凡)
 */
var ConditionBaseComponent = require('ConditionBaseComponent');

var ConditionNoMoreKnife = cc.Class({
    extends: ConditionBaseComponent,

    properties: {},

    init: function init(num) {
        this.result = num;
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
        //# sourceMappingURL=ConditionNoMoreKnife.js.map
        