(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/system/BaseCollisionHandleSystem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0f5b31ryUhLqaR///6o4ouB', 'BaseCollisionHandleSystem', __filename);
// scripts/battle/system/BaseCollisionHandleSystem.js

'use strict';

/**
 * @fileoverview 碰撞事件处理系统基类
 * @author jinhaitao@gameley.cn (金海涛)
 */
var CollisionEventManager = require('CollisionEventManager');

/**
 * 专门处理碰撞系统的基类
 */

var BaseCollisionHandleSystem = cc.Class({
    extends: cc.Component,

    properties: {
        _eventListName: ''
    },
    onLoad: function onLoad() {
        this._collisionEventMgr = CollisionEventManager.getInstance();
    },

    // 先直接放在update中，后续如果减少事件帧再改为updateGameLogic;
    updateGameLogic: function updateGameLogic(dt) {
        if (!this._collisionEventMgr[this._eventListName]) {
            return;
        }
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this._collisionEventMgr[this._eventListName][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var event = _step.value;

                this.handelCollisionEvent(event);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    },

    // 碰撞处理
    handelCollisionEvent: function handelCollisionEvent(event) {}
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
        //# sourceMappingURL=BaseCollisionHandleSystem.js.map
        