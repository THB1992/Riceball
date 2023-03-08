"use strict";
cc._RF.push(module, 'e45fafeLZ1PGpmSEne7SgZY', 'FollowPlayerScale');
// scripts/battle/component/player/FollowPlayerScale.js

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

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
        this.node.on('changeScaleMultip', this.changeScaleMultip, this);
        this.changeScaleMultip(1);
    },


    changeScaleMultip: function changeScaleMultip(multip) {
        this.newScale = multip;
        this.scalePer = this.newScale - this.node.scale;
    },

    update: function update(dt) {
        if (this.node.scale !== this.newScale) {
            this.node.scale += this.scalePer * dt;
            if (this.scalePer > 0) {
                if (this.node.scale > this.newScale) {
                    this.node.scale = this.newScale;
                }
            } else {
                if (this.node.scale < this.newScale) {
                    this.node.scale = this.newScale;
                }
            }
        }
    }
});

cc._RF.pop();