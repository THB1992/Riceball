(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/knife/KnifeOwnerComponent.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '895cdxd/pBPMaCCSQDwwc0+', 'KnifeOwnerComponent', __filename);
// scripts/battle/component/knife/KnifeOwnerComponent.js

'use strict';

/**
 * @fileoverview 刀拥有者组件，同时控制与刀主人的一些交互
 * @author jinhaitao@gameley.cn (金海涛)
 */
var KnifeOwnerComponent = cc.Class({
    extends: cc.Component,
    properties: {
        owner: null,
        isDirty: false
    },

    onLoad: function onLoad() {
        this.node.on('updateOwner', this.updateOwner, this);
        this.node.on('noticeOwnerLeave', this.noticeOwnerLeave, this);
        this.node.on('addKnife', this.addKnife, this);
        this.node.on('addBuff', this.addBuff, this);
        this.node.on('stopParentRotate', this.stopParentRotate, this);
        this.node.on('localHeroCollision', this.localHeroCollision, this);
        this.node.on('isCollCircleWall', this.isCollCircleWall, this);
        this.node.on('resetDirty', this.resetDirty, this);
        this.node.on('onAttackBox', this.onAttackBox, this);
    },

    updateOwner: function updateOwner(detail) {
        this.owner = detail;
        this.oldOwner = detail;
        this.isDirty = true;
    },

    noticeOwnerLeave: function noticeOwnerLeave() {
        if (this.owner) {
            this.owner.emit('reduceKnife', this.node);
            this.owner = null;
        }
    },

    addKnife: function addKnife(node) {
        if (this.owner) {
            this.owner.emit('addKnife', node);
        }
    },

    addBuff: function addBuff(buffId) {
        if (this.owner) {
            this.owner.emit('addBuff', buffId);
        }
    },

    onAttackBox: function onAttackBox(node) {
        if (this.owner) {
            this.owner.emit('onAttackBox', node);
        }
    },

    stopParentRotate: function stopParentRotate() {
        if (this.owner) {
            this.owner.emit('stopParentRotate');
        }
    },

    localHeroCollision: function localHeroCollision() {
        if (this.owner) {
            this.owner.emit('localHeroCollision');
        }
    },

    isCollCircleWall: function isCollCircleWall(state) {
        if (this.owner) {
            this.owner.emit('isCollCircleWall', state);
        }
    },

    resetDirty: function resetDirty() {
        this.isDirty = false;
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
        //# sourceMappingURL=KnifeOwnerComponent.js.map
        