(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/PlayerReviveFrenzyComponent.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e9190Vlp9VG2bIS1QhaoeVK', 'PlayerReviveFrenzyComponent', __filename);
// scripts/battle/component/player/PlayerReviveFrenzyComponent.js

'use strict';

/**
 * @fileoverview PlayerFrenzyComponent
 * @author meifan@gameley.cn (梅凡)
 */

var FrenzyAddType = require('Types').FrenzyAddType;
var FrenzyAddNums = [1, 1, 300, 1000, 1000, 300];
var BuffState = require('Types').BuffState;
var ConfigData = require('ConfigData');

var PlayerFrenzyComponent = cc.Class({
    extends: cc.Component,

    properties: {
        _count: 0,
        _max: 1000,
        _time: 5,
        _isFrenzy: false,
        _speed: 1.0
    },

    init: function init() {

        var data = ConfigData.instance.getBuffDataById(BuffState.Frenzy);
        this._count = 0;
        this._max = 1000;
        this._time = data.keepTime;
        this._normalSpeed = this._max * 1.0 / this._time;
        this._frenzySpeed = this._max * 1.0 / 5.0;
        this._speed = this._normalSpeed;
        this._normalTime = this._time;
        this._frenzyTime = 5.0;

        this.node.on('onReviveFrenzyAdd', this.onFrenzyAdd, this);
    },

    onFrenzyAdd: function onFrenzyAdd(addType) {
        if (this._isFrenzy) {
            return;
        }

        if (addType < 0 || addType >= FrenzyAddNums.length) {
            return;
        }

        this._count += FrenzyAddNums[addType];

        if (this._count >= this._max) {
            this._count = this._max;
            this._speed = addType === FrenzyAddType.tryFrenzy ? this._frenzySpeed : this._normalSpeed;
            var customTime = addType === FrenzyAddType.tryFrenzy ? this._frenzyTime : -1;
            this._isFrenzy = true;
            this.node.emit('updateBuffState', BuffState.Frenzy, customTime);
        }
    },

    onFrenzyEnd: function onFrenzyEnd() {
        this._isFrenzy = false;
        this._count = 0;
    },

    update: function update(dt) {
        if (this._isFrenzy) {
            this._count -= this._speed * dt;
            if (this._count <= 0) {
                this.onFrenzyEnd();
            }
        }
    },


    getFrenzyRate: function getFrenzyRate() {
        return this._count * 1.0 / this._max;
    },

    isFrenzy: function isFrenzy() {
        return this._isFrenzy;
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
        //# sourceMappingURL=PlayerReviveFrenzyComponent.js.map
        