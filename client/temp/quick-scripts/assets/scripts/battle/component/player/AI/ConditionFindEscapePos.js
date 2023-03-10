(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/AI/ConditionFindEscapePos.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5982687/HBMu76DpPAIaZ72', 'ConditionFindEscapePos', __filename);
// scripts/battle/component/player/AI/ConditionFindEscapePos.js

'use strict';

/**
 * @fileoverview 离其他ai太近条件
 * @author meifan@gameley.cn (梅凡)
 */

var ConditionBaseComponent = require('ConditionBaseComponent');
var GameData = require('GameData');
var Tools = require('Tools');
var MapType = require('Types').MapType;

// result从PlayerDistanceSystem确定，是另外多个ai的Entity的数组
var ConditionFindEscapePos = cc.Class({
    extends: ConditionBaseComponent,

    properties: {},

    init: function init() {

        this.setMapSize([GameData.instance.mapWidth, GameData.instance.mapHeight]);
        this._speed = 3;

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
    doResultWithParam: function doResultWithParam(heros) {
        if (!this.result) {}

        var v2 = null;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = heros[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var hero = _step.value;

                v2 = this.node.position.sub(hero.node.position);
                this.result = this.result ? this.result.addSelf(v2).mulSelf(0.5) : v2;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        this.result = this.result.mulSelf(this._speed).addSelf(this.node.position).clampf(this._min, this._max);
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
        //# sourceMappingURL=ConditionFindEscapePos.js.map
        