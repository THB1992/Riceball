"use strict";
cc._RF.push(module, '34af0w++W9NLpiLjhlY3b48', 'AudioEngine');
// scripts/common/AudioEngine.js

'use strict';

/**
 * @fileoverview 音乐播放器
 * @author meifan@gameley.cn (梅凡)
 */

var GameData = require('GameData');

var AudioEngine = cc.Class({
    extends: cc.Component,

    statics: {
        instance: null
    },

    properties: {
        musics: {
            type: cc.AudioClip, // use 'type:' to define an array of Texture2D objects
            default: []
        },
        sounds: {
            type: cc.AudioClip, // use 'type:' to define an array of Texture2D objects
            default: []
        }
    },

    init: function init() {
        AudioEngine.instance = this;

        // const volume = this.getEffectsVolume();
        // this.setEffectsVolume(0.01);
        // for(var sound of this.sounds) {
        //     cc.audioEngine.playEffect(sound, false);
        // }
        // this.setEffectsVolume(volume);
    },

    playMusic: function playMusic(musicID) {
        var loop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (GameData.instance._audioOpen) {
            var audioID = cc.audioEngine.playMusic(this.musics[musicID], loop);
            return audioID;
        }
        return -1;
    },

    stopMusic: function stopMusic() {
        if (GameData.instance._audioOpen) {
            cc.audioEngine.stopMusic();
        }
    },

    playSound: function playSound(musicID) {
        var loop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (GameData.instance._audioOpen) {
            var audioID = cc.audioEngine.playEffect(this.sounds[musicID], loop);
            return audioID;
        }
        return -1;
    },

    stopSound: function stopSound(audioID) {
        if (GameData.instance._audioOpen) {
            if (audioID) {
                cc.audioEngine.stopEffect(audioID);
            }
        }
    },

    stopAllSound: function stopAllSound() {
        if (GameData.instance._audioOpen) {
            cc.audioEngine.stopAllEffects();
        }
    },

    setEffectsVolume: function setEffectsVolume(value) {
        cc.audioEngine.setEffectsVolume(value);
    },

    getEffectsVolume: function getEffectsVolume() {
        return cc.audioEngine.getEffectsVolume();
    }

});

cc._RF.pop();