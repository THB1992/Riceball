(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/collide/NodeCollider.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '69613Wbj/5EdKmlrGNJWDIu', 'NodeCollider', __filename);
// scripts/battle/component/collide/NodeCollider.js

'use strict';

/**
 * @fileoverview 碰撞监听器
 * @author jinhaitao@gameley.cn (金海涛)
 */
var CollisionEventManager = require('CollisionEventManager');

/**
 * 监听碰撞事件，并存至CollisionEventManager中,应该只挂在刀和玩家的碰撞体上
 */
cc.Class({
    extends: cc.Component,

    properties: {},

    // 初始化获取碰撞盒，用于碰撞时判定队伍
    onLoad: function onLoad() {
        //TODO 可能需要通过boxcollider去获取
        this._collider = this.node.getComponent(cc.Collider);
        this.node.on('changeColliderTag', this.changeColliderTag, this);
        this.node.on('changeNodeGroup', this.changeNodeGroup, this);

        this.node.on('emitEvent', this.emitEvent, this);
    },

    init: function init(parent, checkCollision, needCheckStay) {
        this.parent = parent;
        this.needCheckCollision = checkCollision;
        this.needCheckStay = needCheckStay;
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        if (this.needCheckCollision) {
            CollisionEventManager.getInstance().addCollisionEvent(other, self);
        }
    },

    onCollisionStay: function onCollisionStay(other, self) {
        if (this.needCheckCollision && this.needCheckStay) {
            CollisionEventManager.getInstance().addCollisionStayEvent(other, self);
        }
    },
    /**
     * @param  {number} tag tag编号，默认是0，只有在玩家身上的刀与玩家身上需要设置
     *  用tag进行快速的队伍判定
     */
    changeColliderTag: function changeColliderTag(tag) {
        if (!this._collider) {
            cc.error('no Collider To Change Tag');
            return;
        }
        this._collider.tag = tag;
    },

    /**
     * @param  {string} group 碰撞组名
     * 切换node的碰撞组，主要用于刀的碰撞切换
     */
    changeNodeGroup: function changeNodeGroup(group) {
        this.node.group = group;
    },

    // 将本节点的触发的事件传给父节点
    emitEvent: function emitEvent(detail) {
        if (this.parent) {
            this.parent.emit(detail[0], detail[1]);
        }
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
        //# sourceMappingURL=NodeCollider.js.map
        