"use strict";
cc._RF.push(module, 'c5056lWCptGwrp0X2Qatw//', 'AttackBoxCollisionHandleSystem');
// scripts/battle/system/AttackBoxCollisionHandleSystem.js

'use strict';

/**
 * @fileoverview box碰撞事件处理系统
 * @author zhangzhuang@gameley.cn (张庄)
 */
var BaseCollisionHandleSystem = require('BaseCollisionHandleSystem');

/**
 * 专门处理玩家碰撞系统
 */

var AttackBoxCollisionHandleSystem = cc.Class({
    extends: BaseCollisionHandleSystem,

    properties: {
        _eventListName: {
            default: '_attackBoxCollisionEvent',
            override: true
        }
    },
    /** @override */
    handelCollisionEvent: function handelCollisionEvent(event) {
        var other = event[0];
        var self = event[1];
        var isStay = event[2];

        if (isStay) {
            self.node.emit('emitEvent', ['onCollByBlock', [self, other, this.node]]);
        } else {
            // other.node.emit('emitEvent', ['onAttackBox']);
            // self.node.emit('emitEvent', ['onCollByKnife', [self, other, this.node]]);
            self.node.emit('emitEvent', ['onAttack', [self, other, this.node]]);
        }

        // if (self.node.parent.getComponent('EntityBox').blood > 0) {

        // } else {

        // }

        // other.node.emit('emitEvent', ['onAttackBox']);
    },

    updateGameLogic: function updateGameLogic(dt) {
        this._super(dt);
        this._collisionEventMgr.clearAttackBoxEvent();
    }

});

cc._RF.pop();