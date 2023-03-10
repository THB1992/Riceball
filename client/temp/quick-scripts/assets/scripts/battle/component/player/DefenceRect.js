(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/DefenceRect.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '60b2ezSY7RNlawj1fRzezvI', 'DefenceRect', __filename);
// scripts/battle/component/player/DefenceRect.js

'use strict';

/**
 * @fileoverview 身体矩形，用于简单判断是否发生碰撞
 * @author meifan@gameley.cn (梅凡)
 */

var BodyRectComponent = require('BodyRectComponent');

var DefenceRect = cc.Class({
  extends: BodyRectComponent

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
        //# sourceMappingURL=DefenceRect.js.map
        