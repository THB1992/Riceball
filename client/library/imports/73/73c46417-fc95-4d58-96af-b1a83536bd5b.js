"use strict";
cc._RF.push(module, '73c46QX/JVNWJavsag1Nr1b', 'MoveWithOwnerNode');
// scripts/battle/component/move/MoveWithOwnerNode.js

'use strict';

/**
 * @fileoverview 位置保持和另一个node相同
 * @author meifan@gameley.cn (梅凡)
 */

/**
 * 初始化时指定跟随的node update时设置位置
 */
var MoveWithOwnerNode = cc.Class({
    extends: cc.Component,

    properties: {
        /** @type {EntityBase} */
        _owner: null,
        /** @type {EntityBase} */
        _entity: null,
        _isSyncCulling: false,
        _followNode: null
    },

    /**
     * 初始化
     */
    init: function init(owner, entity, followPlayer) {
        this._owner = owner;
        this._entity = entity;
        this._followNode = followPlayer ? followPlayer.node : null;
        this.updatePos(true);
    },

    lateUpdate: function lateUpdate() {
        if (this._owner) {
            this.updatePos(false);
        }
    },

    updatePos: function updatePos(isForce) {
        if (this._owner) {
            var ownerPos = this.getOwnerPos();
            var nodePos = this._entity.node.position;
            if (isForce || ownerPos.x !== nodePos.x || ownerPos.y !== nodePos.y) {
                this._entity.node.position = ownerPos;
                this.isMoving = true;
                this.node.emit('heroStartMove');
            } else {
                if (this.isMoving === true) {
                    this.isMoving = false;
                    this.node.emit('heroStopMove');
                }
            }
        }
    },

    getOwnerPos: function getOwnerPos() {
        var pos = null;
        if (this._followNode) {
            var worldPos = this._followNode.parent.convertToWorldSpaceAR(this._followNode);
            var parent = this._entity.node.parent ? this._entity.node.parent : this._entity.node;
            pos = parent.convertToNodeSpaceAR(worldPos);
        } else {
            pos = this._owner ? cc.v2(this._owner.position) : cc.Vec2.ZERO;
        }
        return pos;
    }
});

cc._RF.pop();