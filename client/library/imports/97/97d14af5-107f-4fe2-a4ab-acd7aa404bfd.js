"use strict";
cc._RF.push(module, '97d14r1EH9P4qSrrNeqQEv9', 'HeroScale');
// scripts/battle/component/player/HeroScale.js

'use strict';

var BuffState = require('Types').BuffState;
cc.Class({
    extends: cc.Component,

    properties: {
        scaleMultip: 1,
        newScaleMultip: 1
    },

    init: function init(player) {
        this.player = player;
        this.node.on('changeScaleMultip', this.changeScaleMultip, this);
    },

    changeScaleMultip: function changeScaleMultip(multip) {
        this.newScaleMultip = multip;
        this.scalePer = this.newScaleMultip - this.scaleMultip;
    },

    updateGameLogic: function updateGameLogic(dt) {

        if (this.newScaleMultip !== this.scaleMultip) {
            this.scaleMultip += this.scalePer * dt;

            if (this.scalePer > 0) {
                if (this.scaleMultip > this.newScaleMultip) {
                    this.scaleMultip = this.newScaleMultip;
                }
            } else {
                if (this.scaleMultip < this.newScaleMultip) {
                    this.scaleMultip = this.newScaleMultip;
                }
            }
        }

        var length = this.player.followPlayer.knivesCmp.knives.length;
        var newScale = (length < 8 ? 0 : length - 8) * 0.125 + 1;
        if (newScale > 2.5) newScale = 2.5;
        newScale = newScale * this.scaleMultip;
        if (this.node.scale !== newScale) {
            this.node.scale = newScale;
        }
    }
});

cc._RF.pop();