"use strict";
cc._RF.push(module, 'fb707r8QT1Ouqga2F1avY+c', 'AdBtn');
// scripts/common/AdBtn.js

"use strict";

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        text: cc.Node,
        offset: 5
    },

    update: function update(dt) {
        var width = this.node.width + this.offset + this.text.width;
        this.node.x = -width / 2 + this.node.width / 2;
        this.text.x = this.node.x + this.node.width / 2 + this.offset + this.text.width / 2;
    }
});

cc._RF.pop();