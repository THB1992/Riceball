"use strict";
cc._RF.push(module, 'df866WugHxK9b6wNU18c746', 'TestTimer');
// scripts/test/TestTimer.js

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

var Tools = require('Tools');
var GameData = require('GameData');

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {

        GameData.init();
        console.log('curTime: ' + Tools.getTimestampMS());
        GameData.instance._curTime = Tools.getTimestampMS();

        var callF = function callF() {};

        for (var i = 0; i < 10000; i++) {
            // this.scheduleOnce(callF, i * 100);
            setTimeout(callF, i * 100);
        }

        GameData.instance.logUseTime();
    }
}

// update (dt) {},
);

cc._RF.pop();