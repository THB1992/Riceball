(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/AI/CondtionTimes/ConditionLastTimeHeroDefence.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '76616iqzO1Dv5a+KWubsrPc', 'ConditionLastTimeHeroDefence', __filename);
// scripts/battle/component/player/AI/CondtionTimes/ConditionLastTimeHeroDefence.js

'use strict';

/**
 * @fileoverview 玩家防御ai的龟缩或逃跑倒计时
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionLastTime = require('ConditionLastTime');
// const Tools = require('Tools');

// result从PlayerDistanceSystem确定，就是entityPlayer
var ConditionLastTimeHeroDefence = cc.Class({
  extends: ConditionLastTime
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
        //# sourceMappingURL=ConditionLastTimeHeroDefence.js.map
        