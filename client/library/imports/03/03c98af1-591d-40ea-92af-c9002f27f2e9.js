"use strict";
cc._RF.push(module, '03c98rxWR1A6pKvyQAvJ/Lp', 'PlaySoundByOwner');
// scripts/battle/component/player/PlaySoundByOwner.js

'use strict';

/**
 * @fileoverview PlaySoundByOwner
 * @author meifan@gameley.cn (梅凡)
 */

var AudioEngine = require('AudioEngine');
var SoundID = require('Types').SoundID;

var PlaySoundByOwner = cc.Class({
    extends: cc.Component,

    properties: {
        player: null,
        _isDefence: true,
        audioID: null
    },

    init: function init(entityPlayer) {
        this.player = entityPlayer;
    },

    update: function update(dt) {
        if (this.player.isDead) {
            if (this._isDefence) {
                this._isDefence = false;
                AudioEngine.instance.stopSound(this.audioID);
                this.audioID = null;
            }
            return;
        }

        if (this._isDefence !== this.player.isDefence) {
            this._isDefence = this.player.isDefence;

            if (this._isDefence) {
                this.audioID = AudioEngine.instance.playSound(SoundID.Spin, true);
            } else {
                AudioEngine.instance.stopSound(this.audioID);
                this.audioID = null;
            }
        }
    }

});

cc._RF.pop();