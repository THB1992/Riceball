"use strict";
cc._RF.push(module, 'f4ac8DQ0dRBbYuYi9IRqZdy', 'WallRuleSystem');
// scripts/battle/system/WallRuleSystem.js

'use strict';

var NoticeType = require('Types').NoticeType;
var ConfigData = require('ConfigData');
cc.Class({
    extends: cc.Component,

    properties: {
        wallSpeed: 50
    },

    init: function init(world) {
        this.world = world;
        this.walls = world.walls;
        this.uiMgr = world.uiMgr;
        this.time = 0;
        this.wallTime = 0;
        var wallData = ConfigData.instance.wallData;
        this.wallTimeStart = wallData.wallTimeStart;
        this.wallTimeLimit = wallData.wallTimeLimit;
        this.wallTimeMove = wallData.wallTimeMove;
        this.wallTimeInterval = wallData.wallTimeInterval;
        this.wallComps = [];
        var compStr = world.mapType === 0 ? 'EntityWall' : 'EntityCircleWall';
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.walls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var wall = _step.value;

                var comp = wall.getComponent(compStr);
                comp.setMoveSpeed(this.wallSpeed);
                this.wallComps.push(comp);
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

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = world.players[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var player = _step2.value;

                player.initWalls(world.mapType, this.walls, world.mapWidth, world.mapHeight);
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    updateGameLogic: function updateGameLogic(dt) {
        this.time += dt;
        if (this.time > this.wallTimeStart) {
            if (!this.startMove) {
                this.startMove = true;
                this.wallTime = 0;
            }
        }

        if (!this.startMove) return;
        this.wallTime += dt;

        if (!this.isShow) {
            this.isShow = true;
            this.uiMgr.showImportantNotice(NoticeType.Wall);
        }

        if (this.wallTime > this.wallTimeLimit + this.wallTimeMove + this.wallTimeInterval) {
            this.wallTime = 0;
            this.isShow = false;
        } else if (this.wallTime > this.wallTimeLimit + this.wallTimeMove) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.wallComps[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var comp = _step3.value;

                    comp.closeRedBg();
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        } else if (this.wallTime > this.wallTimeLimit) {
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.wallComps[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var comp = _step4.value;

                    comp.startRedBg();
                    comp.updateGameLogic(dt);
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            this.world.reduceMapSize(this.wallSpeed * dt * 2);
        }
    } // update (dt) {},

});

cc._RF.pop();