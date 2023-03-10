(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/sound/KnifeCollisionSoundCtrl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '964a7emOPZLqL/r2cm/XhsZ', 'KnifeCollisionSoundCtrl', __filename);
// scripts/battle/component/sound/KnifeCollisionSoundCtrl.js

'use strict';

/**
 * @fileoverview KnifeCollisionSoundCtrl
 * @author meifan@gameley.cn (梅凡)
 */

var AudioEngine = require('AudioEngine');
var SoundID = require('Types').SoundID;

var KnifeCollisionSoundCtrl = cc.Class({
    extends: cc.Component,
    properties: {
        _time: -1,
        _audioID: null,
        _soundTime: -1
    },

    init: function init() {
        this.node.on('localHeroCollision', this.localHeroCollision, this);
    },

    update: function update(dt) {
        if (this._time > 0) {
            this._time -= dt;
            if (this._time <= 0) {
                this._time = -1;
                AudioEngine.instance.stopSound(this._audioID);
                this._audioID = null;
                this._soundTime = -1;
            }
        }

        // 音效loop改成游戏侧逻辑重播，避免任何可能导致停不下来的问题
        if (this._soundTime > 0) {

            this._soundTime -= dt;
            if (this._soundTime <= 0) {
                this._audioID = null;
                this.playSound();
            }
        }
    },

    localHeroCollision: function localHeroCollision() {
        this.playSound();
        this._time = 0.5;
    },

    playSound: function playSound() {
        if (!this._audioID) {
            this._audioID = AudioEngine.instance.playSound(SoundID.HitFast);
            this._soundTime = 1.34;
        }
    },

    stop: function stop() {
        AudioEngine.instance.stopSound(this._audioID);
        this._audioID = null;
        this._soundTime = -1;
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
        //# sourceMappingURL=KnifeCollisionSoundCtrl.js.map
        