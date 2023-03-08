"use strict";
cc._RF.push(module, 'acb4aJbQGNDvbyj+zPKmni5', 'BuffColliderListener');
// scripts/battle/component/collide/BuffColliderListener.js

'use strict';

var KnifeState = require('Types').KnifeState;
var GameData = require('GameData');

cc.Class({
    extends: cc.Component,

    properties: {},

    init: function init(buff) {
        this.buff = buff;
        this.node.on('onPickUpBuff', this.onPickUpBuff, this);
    },

    // otherCollider可能是刀的碰撞组件也可能是人的，node节点不是主体,传事件得传递
    onPickUpBuff: function onPickUpBuff(otherCollider) {
        this.node.emit('onByPick');
        // this.node.active = false;
        otherCollider.node.emit('emitEvent', ['addBuff', this.buff.buffState]);
    }

    // update (dt) {},
});

cc._RF.pop();