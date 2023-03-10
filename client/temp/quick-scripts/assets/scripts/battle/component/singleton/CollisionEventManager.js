(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/singleton/CollisionEventManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '367d2WgeaJHfoLyJbZv9lIQ', 'CollisionEventManager', __filename);
// scripts/battle/component/singleton/CollisionEventManager.js

'use strict';

/**
 * @fileoverview 碰撞事件单例组件
 * @author jinhaitao@gameley.cn (金海涛)
 */

var KnifeColliderState = require('Types').KnifeColliderState;
/**
 * 专门存储碰撞事件，在system的update，做成单例便于addEvent
 */

var CollisionEventManager = cc.Class({
    statics: {
        instance: null,

        getInstance: function getInstance() {
            if (CollisionEventManager.instance === null) {
                CollisionEventManager.instance = new CollisionEventManager();
                CollisionEventManager.instance.init();
            }
            return CollisionEventManager.instance;
        },

        cleanUp: function cleanUp() {
            if (CollisionEventManager.instance) {
                Tools.cleanUp(CollisionEventManager.instance);
            }
            CollisionEventManager.instance = null;
        }
    },

    properties: {
        _heroCollisionEvent: [],
        _knifeCollisionEvent: [],
        _pickKnifeCollisionEvent: [],
        _pickBuffCollisionEvent: [],
        _attackBoxCollisionEvent: []
    },

    init: function init() {
        this.clear();
        var mgr = cc.director.getCollisionManager();
        mgr.enabled = true;
        // mgr.enabledDebugDraw = true;
    },

    //只对主体为在人身上的刀与玩家进行处理
    addCollisionEvent: function addCollisionEvent(other, self) {
        if (self.node.groupIndex === 1) {
            this._heroCollisionEvent.push([other, self]);
        } else if (self.node.groupIndex === 2) {
            // || self.node.groupIndex === 7) {
            if (self.collState === KnifeColliderState.Attack) {
                if (!other.collState || other.collState === KnifeColliderState.Attack) {
                    this._knifeCollisionEvent.push([other, self]);
                }
            } else if (self.collState === KnifeColliderState.Land) {
                this._pickKnifeCollisionEvent.push([other, self]);
            }
        }
        //  else if (self.node.groupIndex === 6) {
        //     this._pickKnifeCollisionEvent.push([other, self]);
        // } 
        else if (self.node.groupIndex === 11) {
                this._pickBuffCollisionEvent.push([other, self]);
            } else if (self.node.groupIndex === 12 && other.node.groupIndex !== 3) {
                this._attackBoxCollisionEvent.push([other, self]);
            }
    },

    // "group-list": [
    //  0   "default",
    //  1   "hero",
    //  2  "knife",
    //  3  "block",
    //  4  "ui",
    //  5  "wall",
    //  6  "landKnife",
    //  7  "otherKnife",
    //  8  "pickKnife",
    //  9  "heroWall",
    //  10 "hideKnife",
    //  11 "buff",
    //  12 "box",
    //  13 "ray"
    //   ],

    addCollisionStayEvent: function addCollisionStayEvent(other, self) {
        if (self.node.groupIndex === 2 && (other.node.groupIndex === 5 || other.node.groupIndex === 3)) {
            // || self.node.groupIndex === 7) ) {
            if (self.collState === KnifeColliderState.Attack) {
                this._knifeCollisionEvent.push([other, self]);
            }
        } else if (self.node.groupIndex === 12 && other.node.groupIndex === 3) {
            this._attackBoxCollisionEvent.push([other, self, true]);
        }
    },

    clearHeroEvent: function clearHeroEvent() {
        this._heroCollisionEvent = [];
    },

    clearKnifeEvent: function clearKnifeEvent() {
        this._knifeCollisionEvent = [];
    },

    clearPickKnifeEvent: function clearPickKnifeEvent() {
        this._pickKnifeCollisionEvent = [];
    },

    clearPickBuffEvent: function clearPickBuffEvent() {
        this._pickBuffCollisionEvent = [];
    },

    clearAttackBoxEvent: function clearAttackBoxEvent() {
        this._attackBoxCollisionEvent = [];
    },

    // 清除碰撞事件，每次事件处理完成后清除
    clear: function clear() {
        this._heroCollisionEvent = [];
        this._knifeCollisionEvent = [];
        this._pickKnifeCollisionEvent = [];
        this._pickBuffCollisionEvent = [];
        this._attackBoxCollisionEvent = [];
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
        //# sourceMappingURL=CollisionEventManager.js.map
        