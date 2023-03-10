(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/collide/HeroCollisionWallListener.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '69bb2ZXcVRFn4gtGfUyEd/9', 'HeroCollisionWallListener', __filename);
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
        //# sourceMappingURL=HeroCollisionWallListener.js.map
        