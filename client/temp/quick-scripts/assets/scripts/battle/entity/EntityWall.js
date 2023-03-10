(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/entity/EntityWall.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '085191Xg/pBXJiSdgq/vo9u', 'EntityWall', __filename);
// scripts/battle/entity/EntityWall.js

'use strict';

/**
 * @fileoverview 墙实体
 * @author jinhaitao@gameley.cn (金海涛)
 */
var EntityBase = require('EntityBase');

cc.Class({
    extends: cc.Component,

    properties: {
        spriteNode: cc.Node,
        lightNode: cc.Node,
        bgNode: cc.Node,
        redLightNode: cc.Node,
        redBgNode: cc.Node,
        blackNode: cc.Node,
        redNode: cc.Node,
        wallCollider: cc.Collider,

        moveSpeed: 0
    },

    init: function init(tag, width, height) {
        this.wallCollider.tag = tag; //设置碰撞tag，便于碰撞时区分撞上哪面墙

        switch (tag) {
            case 0:
                this.wallCollider.node.scaleX = width / this.wallCollider.size.width;
                this.lightNode.width = width;
                this.bgNode.width = width;
                this.redLightNode.width = width;
                this.redBgNode.width = width;

                this.spriteNode.rotation = 180;
                this.blackNode.width = width * 2;
                this.redNode.width = width * 2;
                break;
            case 1:
                this.wallCollider.node.scaleX = width / this.wallCollider.size.width;
                this.lightNode.width = width;
                this.bgNode.width = width;
                this.redLightNode.width = width;
                this.redBgNode.width = width;

                this.spriteNode.rotation = 0;
                this.blackNode.width = width * 2;
                this.redNode.width = width * 2;
                break;
            case 2:
                this.wallCollider.node.scaleY = height / this.wallCollider.size.height;
                this.lightNode.width = height;
                this.bgNode.width = height;
                this.redLightNode.width = height;
                this.redBgNode.width = height;

                this.spriteNode.rotation = 90;
                this.blackNode.width = height * 2;
                this.redNode.width = height * 2;
                break;
            case 3:
                this.wallCollider.node.scaleY = height / this.wallCollider.size.height;
                this.lightNode.width = height;
                this.bgNode.width = height;
                this.redLightNode.width = height;
                this.redBgNode.width = height;

                this.spriteNode.rotation = 270;
                this.blackNode.width = height * 2;
                this.redNode.width = height * 2;
                break;
        }
    },

    setMoveSpeed: function setMoveSpeed(speed) {
        this.moveSpeed = speed;
    },

    startRedBg: function startRedBg() {
        if (this.lightNode.active) this.lightNode.active = false;
        if (!this.redLightNode.active) this.redLightNode.active = true;
        if (!this.redBgNode.active) this.redBgNode.active = true;
        if (!this.redNode.active) this.redNode.active = true;
    },

    closeRedBg: function closeRedBg() {
        if (!this.lightNode.active) this.lightNode.active = true;
        if (this.redLightNode.active) this.redLightNode.active = false;
        if (this.redBgNode.active) this.redBgNode.active = false;
        if (this.redNode.active) this.redNode.active = false;
    },

    updateGameLogic: function updateGameLogic(dt) {
        switch (this.wallCollider.tag) {
            case 0:
                this.node.y -= this.moveSpeed * dt;
                break;
            case 1:
                this.node.y += this.moveSpeed * dt;
                break;
            case 2:
                this.node.x += this.moveSpeed * dt;
                break;
            case 3:
                this.node.x -= this.moveSpeed * dt;
                break;
        }
        this.lightNode.width -= this.moveSpeed * dt * 2;
        this.lightNode.x += this.moveSpeed * dt;
        this.bgNode.width -= this.moveSpeed * dt * 2;

        this.redLightNode.width -= this.moveSpeed * dt * 2;
        this.redBgNode.width -= this.moveSpeed * dt * 2;
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
        //# sourceMappingURL=EntityWall.js.map
        