"use strict";
cc._RF.push(module, '24552u0ZS5LoI78dQBI9TvK', 'ConditionLocalHeroDefenceSilly');
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