"use strict";
cc._RF.push(module, '5f5ea7xUYJL5LkhhRdPz8fh', 'MoveByTouch');
// scripts/battle/component/move/MoveByTouch.js

'use strict';

/**
 * @fileoverview 移动触屏控制器
 * @author meifan@gameley.cn (梅凡)
 */

var Tools = require('Tools');

var MoveByTouch = cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {

        this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEndEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEndEvent, this);
    },

    init: function init(target) {
        this._target = target.node;
    },

    _touchStartEvent: function _touchStartEvent(event) {
        if (!this.enabled) return;
        this.startPos = event.getLocation();
        this._target.emit('heroMoveStart');
        this.beginMove = false;
    },

    _touchMoveEvent: function _touchMoveEvent(event) {
        var curPos = event.getLocation();
        var dPos = curPos.sub(this.startPos);
        // console.log('dPos.magSqr: ' + dPos.magSqr() + ' , curPos: ' + curPos + ', startPos: ' + this.startPos);
        if (dPos.magSqr() > 100) {
            this.beginMove = true;
        }
        if (Tools.compareVec2(curPos, this.startPos)) {
            this.curDir = null;
        } else {
            this.curDir = curPos.sub(this.startPos).normalize();
        }
    },

    touchEndEvent: function touchEndEvent(event) {
        this._target.emit('onStopMoving');
        this.curDir = null;
        this.beginMove = false;
    },

    update: function update(dt) {
        if (this.curDir && this.beginMove) {
            this._target.emit('onMoveBy', {
                dPos: this.curDir
            });
        }
    }

});

cc._RF.pop();