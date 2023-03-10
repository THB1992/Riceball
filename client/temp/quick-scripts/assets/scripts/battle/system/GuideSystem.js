(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/system/GuideSystem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5d0f12qqj5N7pdC/aKvuAnE', 'GuideSystem', __filename);
// scripts/battle/system/GuideSystem.js

'use strict';

var Tools = require('Tools');
var KnifeState = require('Types').KnifeState;
var ConfigData = require('ConfigData');
var PlayerData = require('PlayerData');

cc.Class({
    extends: cc.Component,

    properties: {},

    init: function init(world) {
        this.world = world;
        this.uiMgr = world.uiMgr;
        this.state = 0;
        this.localPlayer = world.localPlayer;
        this.players = world.players;
        this.knifes = world.landKnifes;
        this.captureTime = 0;
        this.fixTime = 0;
        this.killTime = 0;
        this.releaseTime = 0;
        this.defenceTime = 0;

        this.dir = 1;
        this.wall = world.guideWall;
        this.wall.active = true;
        this.wall.opacity = 100;
        this.wall.width = 1520;
        this.wall.height = 2640;
        this.guideData = ConfigData.instance.guideData;
    },
    updateGameLogic: function updateGameLogic(dt) {
        var _this = this;

        //第一阶段 捡刀，数量达到指定值则成功

        //第二阶段，击杀

        //第三阶段，进入防御状态

        //第四阶段，防御击杀

        //结束返回
        if (this.allComplete) return;

        if (!this.flag) {
            this.uiMgr.showGuideStart(0);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.knifes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var knife = _step.value;

                    knife.node.position = cc.v2(Tools.getRandomInt(-360, 360), Tools.getRandomInt(-640, 640));
                    knife._arrowEffect.position = knife.node.position;
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

            this.flag = true;
        }
        this.fixHeroMove(this.localPlayer);
        switch (this.state) {
            case 0:
                this.captureTime += dt;
                var length = this.localPlayer.followPlayer.knivesCmp.knives.length;
                if (length !== this.knifeLength) {
                    this.knifeLength = length;
                    var str = length + '/' + (12 + PlayerData.instance.extraKnifeCount);
                    this.uiMgr.refreshGuideProcess(str);
                    this.captureTime = 0;
                }

                if (this.captureTime > 5) {
                    this.fixKnife(dt);
                } else if (this.captureTime === 0) {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = this.knifes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var _knife = _step2.value;

                            _knife._arrowEffect.active = false;
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
                }

                if (length >= 12 + PlayerData.instance.extraKnifeCount) {
                    this.onComplete();
                }
                break;
            case 1:
                this.killTime += dt;
                var node = this.players[1].node;
                var isDead = this.players[1].isDead;
                if (!node.active && !isDead) {
                    node.active = true;
                    this.players[1].followPlayer.node.active = true;
                    node.position = this.localPlayer.node.position.add(cc.v2(0, 1000));
                    node.emit('changeSpeedRate', this.guideData.firstSpeed);
                }
                this.fixAIMove(this.players[1], this.localPlayer);
                if (isDead) {
                    this.onComplete();
                }
                if (this.killTime > 5 && !this.isComplete) {
                    this.uiMgr.showGuideSpecial(this.state);
                    this.killTime = 2;
                }
                break;
            case 2:
                if (this.flag_2) break;
                this.releaseTime += dt;
                var isDefence = this.localPlayer.isDefence;
                if (isDefence && this.releaseTime > 2) {
                    this.flag_2 = true;
                    this.localPlayer.stopControl();
                    setTimeout(function () {
                        _this.onComplete();
                    }, 1000);
                }

                if (this.releaseTime > 5 && !this.isComplete) {
                    this.uiMgr.showGuideSpecial(this.state);
                    this.releaseTime = 2;
                }
                break;
            case 3:
                this.defenceTime += dt;
                var node = this.players[2].node;
                if (!node.active && !this.players[2].isDead) {
                    node.active = true;
                    this.players[2].followPlayer.node.active = true;
                    node.position = this.localPlayer.node.position.add(cc.v2(500, 1000));
                    node.emit('changeSpeedRate', this.guideData.secondSpeed);
                }
                node = this.players[3].node;

                if (!node.active && !this.players[3].isDead) {
                    node.active = true;
                    this.players[3].followPlayer.node.active = true;
                    node.position = this.localPlayer.node.position.add(cc.v2(-500, -1000));
                    node.emit('changeSpeedRate', this.guideData.secondSpeed);
                }

                if (this.defenceTime > 2) {
                    this.fixAIMove(this.players[2], this.localPlayer);
                    this.fixAIMove(this.players[3], this.localPlayer);
                }

                var isDead = this.players[2].isDead && this.players[3].isDead;
                if (isDead) {
                    this.onComplete();
                }

                this.localPlayer.node.on(cc.Node.EventType.TOUCH_START, function () {
                    if (!_this.isComplete) _this.uiMgr.showGuideSpecial(_this.state);
                }, this);
                break;
            case 4:
                this.allComplete = true;
                this.world.guideGameOverCallF();
                break;
        }
    },


    onComplete: function onComplete() {
        var _this2 = this;

        if (this.isComplete) return;
        this.isComplete = true;
        this.uiMgr.showGuideEnd(this.state);
        if (this.state > 3) return;
        setTimeout(function () {
            _this2.state++;
            _this2.uiMgr.showGuideStart(_this2.state);
            _this2.isComplete = false;
        }, 2000);
    },

    fixHeroMove: function fixHeroMove(player) {
        this.wall.opacity = 100;
        var node = player.node;
        var _collider = player.colliderNode.getComponent(cc.Collider);

        var heroRadius = _collider.radius * _collider.node.parent.scale;
        var distanceX = (this.wall.width - 80) / 2 - heroRadius - Math.abs(node.position.x);
        if (distanceX < 0) {
            this.wall.opacity = 255;
            this.uiMgr.showGuideSpecial(this.state);
            node.x += node.x > 0 ? distanceX : -distanceX;
        }
        var distanceY = (this.wall.height - 80) / 2 - heroRadius - Math.abs(node.position.y);
        if (distanceY < 0) {
            this.wall.opacity = 255;
            this.uiMgr.showGuideSpecial(this.state);
            node.y += node.y > 0 ? distanceY : -distanceY;
        }
    },

    fixAIMove: function fixAIMove(ai, local) {
        var dir = local.node.position.sub(ai.node.position).normalize();
        ai.node.emit('onMoveBy', {
            dPos: dir
        });
    },

    fixKnife: function fixKnife(dt) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = this.knifes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var knife = _step3.value;

                if (knife.knifeStateComp.state === KnifeState.Normal) {
                    if (!knife._arrowEffect.active) {
                        knife._arrowEffect.active = true;
                    }
                }
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
        //# sourceMappingURL=GuideSystem.js.map
        