(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/AI/ConditionLocalHeroDefenceSilly.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '24552u0ZS5LoI78dQBI9TvK', 'ConditionLocalHeroDefenceSilly', __filename);
// scripts/battle/component/player/AI/ConditionLocalHeroDefenceSilly.js

'use strict';

/**
 * @fileoverview 玩家处于龟缩
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionLocalHeroDefence = require('ConditionLocalHeroDefence');

// result从PlayerDistanceSystem确定，就是entityPlayer
var ConditionLocalHeroDefenceSilly = cc.Class({
  extends: ConditionLocalHeroDefence
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
        //# sourceMappingURL=ConditionLocalHeroDefenceSilly.js.map
        