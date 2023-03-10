(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/system/CameraZoomSystem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7df05Oky6dMYqVyeTX+HecQ', 'CameraZoomSystem', __filename);
// scripts/battle/system/CameraZoomSystem.js

'use strict';

/**
 * @fileoverview 相机变焦系统
 * @author meifan@gameley.cn (梅凡)
 */

var Tools = require('Tools');
var GameData = require('GameData');
var ZoomMin = 0.55;
var ZoomMax = 1.0;
var MoveZoomMin = 0.85;
var MoveZoomMax = 1.15;

/**
 * 相机根据玩家状态进行变焦
 */
cc.Class({
    extends: cc.Component,

    properties: {
        _knifeNum: 0,
        _isMove: false,
        _curZoom: 1,
        _numZoom: 1,
        _moveZoom: 1,
        _zoomDirty: false,
        _zoomSpeedDirty: false,
        _knifeMin: 9,
        _knifeMax: 20,
        _zoomMultip: 1,
        _newZoomMultip: 1
    },

    init: function init(entityPlayer, cameraZoomCtrl) {
        this.knifesComp = entityPlayer.followPlayer.knivesCmp;
        this.cameraZoomCtrl = cameraZoomCtrl;
        entityPlayer.cameraZoomSys = this;

        this._knifeNum = 0;
        this._isMove = false;
        this._curZoom = 1;
        this._knifeMin = GameData.instance.knifeMin;
        this._knifeMax = GameData.instance.knifeMax;
    },

    setCameraZoomMultip: function setCameraZoomMultip(multip) {
        this._newZoomMultip = multip;
        this.zoomPer = this._newZoomMultip - this._zoomMultip;
    },

    update: function update(dt) {

        if (this._newZoomMultip !== this._zoomMultip) {
            this._zoomMultip += this.zoomPer * dt;
            if (this.zoomPer > 0) {
                if (this._zoomMultip > this._newZoomMultip) {
                    this._zoomMultip = this._newZoomMultip;
                }
            } else {
                if (this._zoomMultip < this._newZoomMultip) {
                    this._zoomMultip = this._newZoomMultip;
                }
            }

            this._zoomDirty = true;
        }

        if (this._knifeNum !== this.knifesComp.knives.length) {
            this._zoomSpeedDirty = this.knifesComp.knives.length < this._knifeNum && this._isMove;
            this._knifeNum = this.knifesComp.knives.length;
            // 根据飞刀数量确定当前zoom
            // const lerp = Tools.inverseLerp(this._knifeMax, this._knifeMin, this._knifeNum);
            var lerp = Tools.inverseLerp(this._knifeMin, this._knifeMax, this._knifeNum);
            lerp = Tools.clamp(0, 1, lerp);
            GameData.instance.speedRate = cc.misc.lerp(1, 1.5, lerp);
            this._numZoom = cc.misc.lerp(ZoomMax, ZoomMin, lerp);

            this._zoomDirty = true;
        }

        if (this._isMove !== this.knifesComp.isMove) {
            this._isMove = this.knifesComp.isMove;
            // 根据是否移动确定当前zoom
            this._moveZoom = this._isMove ? MoveZoomMin : MoveZoomMax;

            this._zoomDirty = true;
            this._zoomSpeedDirty = false;
        }

        if (this._zoomDirty) {
            this._zoomDirty = false;

            this._curZoom = this._numZoom * this._moveZoom;
            if (this._zoomSpeedDirty) {
                this._zoomSpeedDirty = false;
                this.cameraZoomCtrl.setCameraZoomImmediately(this._curZoom / this._zoomMultip);
            } else {
                this.cameraZoomCtrl.setCameraZoom(this._curZoom / this._zoomMultip);
            }
        }
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
        //# sourceMappingURL=CameraZoomSystem.js.map
        