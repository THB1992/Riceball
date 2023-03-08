"use strict";
cc._RF.push(module, '69bb2ZXcVRFn4gtGfUyEd/9', 'HeroCollisionWallListener');
// scripts/battle/component/collide/HeroCollisionWallListener.js

'use strict';

var HeroCollisionWallListener = cc.Class({
    extends: cc.Component,

    properties: {
        collider: cc.CircleCollider,
        _wallCollisionCount: 0
    },

    onLoad: function onLoad() {
        this.collider = this.node.getComponent(cc.CircleCollider);
        this.node.on('radiusChange', this.radiusChange, this);
    },

    radiusChange: function radiusChange(detail) {
        this.collider.radius = detail;
    },

    onCollisionEnter: function onCollisionEnter() {
        if (this._wallCollisionCount === 0) {
            this.noticeWallCollision(true);
        }
        this._wallCollisionCount++;
    },

    onCollisionExit: function onCollisionExit() {
        this._wallCollisionCount--;
        if (this._wallCollisionCount === 0) {
            this.noticeWallCollision(false);
        }
    },

    noticeWallCollision: function noticeWallCollision(isCollision) {
        this.node.emit('wallCollision', isCollision);
    }
});

cc._RF.pop();