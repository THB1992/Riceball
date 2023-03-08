"use strict";
cc._RF.push(module, '8212e7vBZFNub9HBtkijeWd', 'ActionMove');
// scripts/battle/component/player/AI/ActionMove.js

'use strict';

/**
 * @fileoverview 移动行为
 * @author meifan@gameley.cn (梅凡)
 */

// const ActionState = require('Types').ActionState;
var ActionBaseComponent = require('ActionBaseComponent');
var GameData = require('GameData');
var Tools = require('Tools');
var MapType = require('Types').MapType;

var ActionMove = cc.Class({
    extends: ActionBaseComponent,

    properties: {
        _curPos: null,
        _nextPos: null,
        _moveDir: null,
        _routePos: null
    },

    // CheckIfTrue: function () { },

    // onLoad: function () {
    // this.node.on('setNextPos', this.setNextPos, this);
    // },

    init: function init() {
        this.move = Tools.getOrAddComponent(this.node, 'HeroMove');

        // this.moveSpeed = moveSpeed;
        // this.moveMag = ((moveSpeed / GameData.instance.logicFps) * (moveSpeed / GameData.instance.logicFps)) + 30;

        this._Width = GameData.instance.mapWidth * 0.9;
        this._height = GameData.instance.mapHeight * 0.9;

        this._min = cc.v2(-this._Width / 2, -this._height / 2);
        this._max = cc.v2(this._Width / 2, this._height / 2);

        this.node.on('setMapSize', this.setMapSize, this);
        this.node.on('initWalls', this.initWalls, this);
    },

    initWalls: function initWalls(type) {
        this.wallType = type;
        this.setMapSize([this._Width, this._height]);
    },

    moveMag: function moveMag() {
        if (this.move) {
            return this.move.getCurSpeed() / GameData.instance.logicFps * (this.move.getCurSpeed() / GameData.instance.logicFps) + 30;
        }
        return 1000;
    },

    setMapSize: function setMapSize(detail) {
        var width = detail[0];
        var height = detail[1];

        this._Width = this.getReal(width);
        this._height = this.getReal(height);

        this._min = cc.v2(-this._Width / 2, -this._height / 2);
        this._max = cc.v2(this._Width / 2, this._height / 2);

        this.fixNextPos();
    },

    getReal: function getReal(value) {
        var ret = value * 0.9;

        if (this.wallType) {
            if (this.wallType === MapType.Circle) {
                ret = ret / 1.5;
            }
        }

        return ret;
    },

    fixNextPos: function fixNextPos() {
        this._nextPos = this._nextPos.clampf(this._min, this._max);
        this._routePos = this._routePos ? this._routePos.clampf(this._min, this._max) : null;
    },

    // initWithParam: function (speedRate) {
    // this.moveMag = ((this.moveSpeed * speedRate / GameData.instance.logicFps) * (this.moveSpeed * speedRate / GameData.instance.logicFps)) + 30;
    // },

    setNextPos: function setNextPos(detail) {
        this._nextPos = detail;
        // cc.log('setNextPos: ' + this._nextPos);
    },

    getNextPos: function getNextPos() {
        // cc.log('getNextPos: ' + this._nextPos);
        return this._nextPos;
    },

    setRoutePos: function setRoutePos(detail) {
        this._routePos = detail;
    },

    updateGameLogic: function updateGameLogic(dt) {
        if (this.isActionIng()) {
            if (this._checkIfFind()) {
                this.endAction();
            } else {
                this._CalMoveDir();
                this.node.emit('onMoveBy', {
                    dPos: this._moveDir
                });
            }
        }

        return this.actionState;
    },

    /** overwrite */
    endAction: function endAction() {
        this._super();
        this.node.emit('onStopMoving');
    },

    _checkIfFind: function _checkIfFind() {
        this._curPos = this.node.position;

        var dPos = this._nextPos.sub(this._curPos);
        // console.log('_curPos: ' + this._curPos + ', _nextPos: ' + this._nextPos + ', dPos is : ' + dPos + ',dPos.magSqr : ' + dPos.magSqr() + ',moveMag: ' + this.moveMag);
        //TODO 应该得通过HeroMove的speed得出
        return dPos.magSqr() <= this.moveMag();
    },

    _CalMoveDir: function _CalMoveDir() {
        this._curPos = this.node.position;

        this._moveDir = this._routePos ? this._routePos.sub(this._curPos) : this._nextPos.sub(this._curPos);
        // console.log('_curPos: ' + this._curPos + ', _nextPos: ' + this._nextPos);
        this._routePos = null;
    }

    // update: {}
});

cc._RF.pop();