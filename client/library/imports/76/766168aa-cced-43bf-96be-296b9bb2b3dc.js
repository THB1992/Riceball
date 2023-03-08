"use strict";
cc._RF.push(module, '76616iqzO1Dv5a+KWubsrPc', 'ConditionLastTimeHeroDefence');
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