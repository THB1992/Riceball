"use strict";
cc._RF.push(module, '348d6+2sfdKkKYvtDOm4HVO', 'PickBuffCollisionHandleSystem');
// scripts/battle/system/PickBuffCollisionHandleSystem.js

'use strict';

/**
 * @fileoverview buff碰撞事件处理系统
 * @author zhangzhuang@gameley.cn (张庄)
 */
var BaseCollisionHandleSystem = require('BaseCollisionHandleSystem');

/**
 * 专门处理玩家碰撞系统
 */

var PickBuffCollisionHandleSystem = cc.Class({
    extends: BaseCollisionHandleSystem,

    properties: {
        _eventListName: {
            default: '_pickBuffCollisionEvent',
            override: true
        }
    },
    /** @override */
    handelCollisionEvent: function handelCollisionEvent(event) {
        var other = event[0];
        var self = event[1]; // 被捡的刀
        self.node.emit('emitEvent', ['onPickUpBuff', other]);
    },

    updateGameLogic: function updateGameLogic(dt) {
        this._super(dt);
        this._collisionEventMgr.clearPickBuffEvent();
    }

});

cc._RF.pop();