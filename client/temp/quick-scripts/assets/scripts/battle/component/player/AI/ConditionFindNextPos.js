(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/AI/ConditionFindNextPos.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '62311EwbJVOzIT3p7IXlUr8', 'ConditionFindNextPos', __filename);
// scripts/battle/component/player/AI/ConditionFindNextPos.js

'use strict';

/**
 * @fileoverview 寻找路点条件
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');
var GameData = require('GameData');
var Tools = require('Tools');
var MapType = require('Types').MapType;

var ConditionFindNextPos = cc.Class({
    extends: ConditionBaseComponent,

    properties: {
        _Width: 0,
        _height: 0,
        _min: null,
        _max: null,
        _dir: null
    },

    init: function init(speed) {
        this._speed = speed;
        this.setMapSize([GameData.instance.mapWidth, GameData.instance.mapHeight]);

        this.node.on('setMapSize', this.setMapSize, this);
        this.node.on('initWalls', this.initWalls, this);
    },

    initWalls: function initWalls(type) {
        this.wallType = type;
        this.setMapSize([this._Width, this._height]);
    },

    setMapSize: function setMapSize(detail) {
        var width = detail[0];
        var height = detail[1];

        this._Width = this.getReal(width);
        this._height = this.getReal(height);

        this._min = cc.v2(-this._Width / 2, -this._height / 2);
        this._max = cc.v2(this._Width / 2, this._height / 2);
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

    /** overwrite */
    doResult: function doResult() {

        this._dir = cc.v2(Tools.getRandomInt(-100, 100), Tools.getRandomInt(-100, 100)).normalizeSelf();
        // Tools.getRandomFloat(2.0,4.0)保证正常情况下走2-4s的距离
        this.result = this._dir.mulSelf(this._speed).mulSelf(Tools.getRandomFloat(2.0, 4.0)).addSelf(this.node.position).clampf(this._min, this._max);
    }

    // updateGameLogic: function (dt) {}

    // update: {}
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
        //# sourceMappingURL=ConditionFindNextPos.js.map
        