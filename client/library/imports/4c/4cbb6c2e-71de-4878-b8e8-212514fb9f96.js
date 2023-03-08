"use strict";
cc._RF.push(module, '4cbb6wucd5IeLjoISUU+5+W', 'MywIdget');
// scripts/common/MywIdget.js

'use strict';

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var GameData = require('GameData');
cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {},
    start: function start() {
        this.node.height = GameData.instance.screenHeight;
    }
});

cc._RF.pop();