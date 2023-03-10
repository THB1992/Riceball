(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/data/singleton/GameData.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5cfb4kp4ERN+5Ww8VUgrp0f', 'GameData', __filename);
// scripts/data/singleton/GameData.js

'use strict';

/**
 * @fileoverview 游戏数据
 * @author meifan@gameley.cn (梅凡)
 */

var Tools = require('Tools');
var Environment = require('Types').Environment;

var GameData = cc.Class({
    statics: {
        instance: null,
        init: function init() {
            if (GameData.instance === null) {
                GameData.instance = new GameData();
                GameData.instance.init();
            }
        },
        cleanUp: function cleanUp() {
            if (GameData.instance) {
                Tools.cleanUp(GameData.instance);
            }
            GameData.instance = null;
        }
    },

    properties: {
        mapWidth: 3600,
        mapHeight: 6400,
        _vibrateOpen: true,
        _audioOpen: true,
        logicFps: 60,
        gameTime: 30,
        initMapScreenNum: 7,
        localHeroTid: 1,
        screenWidth: 720,
        screenHeight: 1280,
        designSize: cc.size(720, 1280),

        fatSize: cc.size(720, 1040),
        isFitHeight: false,
        isLowHeight: false,
        screenSize: null,
        knifeMin: 9,
        knifeMax: 20,
        speedRate: 1.0,
        clientVersion: '0',
        clientVersionCode: 0,
        isInReview: false,
        /** 资源版本号，用于资源更新 */
        resVersion: 0,
        /** JS资源版本号，用于JS资源更新 */
        srcVersion: null,
        /** @type {Environment} 环境 */
        environment: Environment.Publish
    },

    init: function init() {
        this.initMapScreenNum = 7;
        this.mapWidth = 720 * this.initMapScreenNum;
        this.mapHeight = 720 * this.initMapScreenNum;
        this.frameSize = cc.view.getFrameSize();
        this.screenSize = cc.view.getVisibleSizeInPixel();
        var canvas = cc.find("Canvas");
        this.screenWidth = canvas.width;
        this.screenHeight = canvas.width * this.frameSize.height / this.frameSize.width;
        this.ratio = this.frameSize.width / this.screenWidth;
        this.screenOffset = (1280 - this.screenHeight) / 2;

        var realRatio = this.frameSize.height * 1.0 / this.frameSize.width;
        var designRatio = this.designSize.height * 1.0 / this.designSize.width;
        var fatRatio = this.fatSize.height * 1.0 / this.fatSize.width;
        if (!Tools.isFloatEqual(realRatio, designRatio)) {
            this.isFitHeight = realRatio > designRatio;
            this.isLowHeight = realRatio < fatRatio;
        }

        console.log('ratio: ' + this.ratio);
        console.log('screen: ' + this.screenWidth, this.screenHeight);
        console.log('frameSize: ' + this.frameSize);
        console.log('screensize: ' + this.screenSize);

        var gameData = Tools.getItem('gameData');
        if (gameData) {
            var data = JSON.parse(gameData);
            this._vibrateOpen = data._vibrateOpen; //Tools.getItem('VibrateOpen'); 后续改为开关
            this._audioOpen = data._audioOpen;
        } else {
            this._vibrateOpen = true; //Tools.getItem('VibrateOpen'); 后续改为开关
            this._audioOpen = true;
        }

        this.logicFps = 60;
        this.gameTime = 90;
        this.localHeroTid = 1;
        this.knifeMin = 9;
        this.knifeMax = 20;
        this.speedRate = 1.0;

        this.showVersion = 'v1.0.18';
        this.clientVersion = '10018';
        this.resVersion = 6;
        this.srcVersion = this.resVersion;
        this.clientVersionCode = Number.parseInt(this.clientVersion);
        this.isInReview = false;
        //  Test  QA  Publish  Develop  Trial
        this.environment = Environment.Publish;
        // this.environment = Environment.Test;
    },

    isShowLog: function isShowLog() {
        return this.isEnvironmentTest();
    },

    isEnvironmentTest: function isEnvironmentTest() {
        return this.environment === Environment.Test || this.environment === Environment.Develop;
    },

    isEnvironmentPublish: function isEnvironmentPublish() {
        return this.environment === Environment.Publish || this.environment === Environment.Trial;
    },

    /** 
     * 当前环境是否检查资源更新
     * 注意：调试模式因为BUILD后的文件结构及资源加载逻辑不同，故不开启资源更新 
     * */
    isEnvironmentCheckUpdate: function isEnvironmentCheckUpdate() {
        return !CC_DEBUG || cc.sys.isNative; // && (this.environment === Environment.Publish || this.environment === Environment.QA);
    },

    setAudio: function setAudio(isOpen) {
        GameData.instance._audioOpen = isOpen;
        this.saveGameData();
    },

    setVibrate: function setVibrate(isOpen) {
        GameData.instance._vibrateOpen = isOpen;
        this.saveGameData();
    },

    saveGameData: function saveGameData() {
        var gameData = {
            _vibrateOpen: this._vibrateOpen,
            _audioOpen: this._audioOpen
        };
        Tools.setItem('gameData', JSON.stringify(gameData));
    },

    logUseTime: function logUseTime(scene) {
        if (this._curTime && this.isShowLog()) {
            var now = Tools.getTimestampMS();
            console.log(scene + '用时: ' + (now - this._curTime) + ' ms');
            this._curTime = now;
        }
    },

    isPad: function isPad() {
        return this.screenHeight < 1200 || this.screenHeight / this.screenWidth < 16 / 9;
    },

    isLongScreen: function isLongScreen() {
        return this.screenHeight > 1300 || this.screenHeight / this.screenWidth > 16 / 9;
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
        //# sourceMappingURL=GameData.js.map
        