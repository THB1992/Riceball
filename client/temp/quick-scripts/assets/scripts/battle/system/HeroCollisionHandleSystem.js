(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/system/HeroCollisionHandleSystem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '90c23cuROVNU7VqVWpLJ3Pb', 'HeroCollisionHandleSystem', __filename);
// scripts/battle/system/HeroCollisionHandleSystem.js

'use strict';

/**
 * @fileoverview 玩家碰撞事件处理系统
 * @author jinhaitao@gameley.cn (金海涛)
 */
var BaseCollisionHandleSystem = require('BaseCollisionHandleSystem');
var VibrateUtil = require('VibrateUtil');
var GameData = require('GameData');

/**
 * 专门处理玩家碰撞系统
 */

var HeroCollisionHandleSystem = cc.Class({
    extends: BaseCollisionHandleSystem,

    properties: {
        _eventListName: {
            default: '_heroCollisionEvent',
            override: true
        }
    },
    /** @override */
    handelCollisionEvent: function handelCollisionEvent(event) {
        var _this = this;

        var other = event[0];
        var self = event[1];
        switch (other.node.group) {
            // case 'otherKnife':
            case 'knife':
            case 'ray':
                // 如果是一组的直接跳过
                if (other.tag === self.tag || other.tag === 0) {
                    return;
                }

                // var followPlayer = other.node.parent.parent.getComponent('EntityFollowPlayer');
                // var killer = followPlayer ? followPlayer.player : null;
                // if(killer && killer.isSage) {
                //     // 刀的主人处于贤者模式 不杀人
                //     return;
                // }

                // 如果是被我的刀杀得播振动
                if (other.tag === GameData.instance.localHeroTid) {
                    VibrateUtil.vibrate(true);
                }
                // 通知玩家节点，死亡
                if (!this.isKillingByGuide) {
                    self.node.emit('emitEvent', ['die', other]);
                    // 通知世界击杀信息
                    this.node.emit('killMessageShow', event);
                }
                break;
            case 'block':
                self.node.emit('emitEvent', ['fixByBlock', other]);
                break;
            //这里的pickknife实际是蝙蝠侠的幻影
            case 'pickKnife':
                if (other.tag === self.tag || other.tag === 0) {
                    return;
                }
                if (this.isKillingByGuide) return;
                this.isKillingByGuide = true;

                self.node.emit('emitEvent', ['killByGuide', other]);
                setTimeout(function () {
                    if (other.tag === GameData.instance.localHeroTid) {
                        VibrateUtil.vibrate(true);
                    }
                    self.node.emit('emitEvent', ['die', other]);
                    _this.node.emit('killMessageShow', event);
                    _this.isKillingByGuide = false;
                }, 1000);

                other.node.parent.emit('catchEnemy', self.node.parent.position);
                break;
        }
    },

    updateGameLogic: function updateGameLogic(dt) {
        this._super(dt);
        this._collisionEventMgr.clearHeroEvent();
    }

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
        //# sourceMappingURL=HeroCollisionHandleSystem.js.map
        