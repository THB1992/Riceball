"use strict";
cc._RF.push(module, 'e242dSpscpIBrCdiRJrll0h', 'PickKnifeCollisionHandleSystem');
// scripts/battle/system/PickKnifeCollisionHandleSystem.js

'use strict';

/**
 * @fileoverview 玩家碰撞事件处理系统
 * @author jinhaitao@gameley.cn (金海涛)
 */
var BaseCollisionHandleSystem = require('BaseCollisionHandleSystem');

/**
 * 专门处理玩家碰撞系统
 */

var PickKnifeCollisionHandleSystem = cc.Class({
    extends: BaseCollisionHandleSystem,

    properties: {
        _eventListName: {
            default: '_pickKnifeCollisionEvent',
            override: true
        }
    },
    /** @override */
    handelCollisionEvent: function handelCollisionEvent(event) {
        var other = event[0];
        var self = event[1]; // 被捡的刀
        // 如果已经被捡或拾取触发者无队伍，则跳过
        if (other.tag === 0 || self.tag !== 0) {
            return;
        }

        switch (other.node.group) {
            // case 'otherKnife':
            case 'knife':
            case 'hero':
                self.node.emit('emitEvent', ['onPickUpKnife', other]);
                break;

        }
    },

    updateGameLogic: function updateGameLogic(dt) {
        this._super(dt);
        this._collisionEventMgr.clearPickKnifeEvent();
    }

});

cc._RF.pop();