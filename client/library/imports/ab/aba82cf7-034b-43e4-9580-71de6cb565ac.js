"use strict";
cc._RF.push(module, 'aba82z3A0tD5JWAcd5stWWs', 'PlayerSuitComponent');
// scripts/battle/component/player/PlayerSuitComponent.js

'use strict';

var SuitType = require('Types').SuitType;
var ConfigData = require('ConfigData');
var KnifeState = require('Types').KnifeState;
var KnifeMomentState = require('Types').KnifeMomentState;
cc.Class({
    extends: cc.Component,

    properties: {
        buffRemainTimes: [],
        lightTime: 0,
        lightKeepTime: 0,

        rayTime: 0
    },

    init: function init(player) {
        this.player = player;
        // this.colliders = this.player.rayNode.getComponentsInChildren(cc.Collider);
        // for (var collider of this.colliders) {
        //     collider.notColliderFlag = true;
        // }
        this.changeSuit();
        this.node.on('catchEnemyByBatMan', this.catchEnemyByBatMan, this);
    },

    changeSuit: function changeSuit() {
        if (this.player.suit === SuitType.ULTRAMAN) {
            this.player.rayNode.active = true;

            this.colliders = this.player.rayNode.getComponentsInChildren(cc.Collider);
            // for (var collider of this.colliders) {
            for (var i = 0; i < this.colliders.length; i++) {
                var collider = this.colliders[i];
                collider.notColliderFlag = true;
                collider.tag = this.player.teamID;
            }
        } else {
            this.player.rayNode.active = false;
        }
    },

    updateGameLogic: function updateGameLogic(dt, world, knifes) {
        var _this = this;

        if (this.player.isStopCtrl) return;

        if (this.player.suit !== SuitType.PIKAQIU) {
            this.player._pikaKeepEffect.stop();
        }
        if (this.player.suit !== SuitType.ULTRAMAN) {
            this.player._ultraAttackEffect.stop();
        }

        switch (this.player.suit) {
            case SuitType.SPIDERMAN:
                {
                    // this.player._pikaKeepEffect.stop();
                    var multip = this.player.heroScale.newScaleMultip;
                    var newScale = (this.player.node.scale - multip) / 1.5 + multip;
                    var index = 0;
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = knifes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var knife = _step.value;

                            if (knife.teamID === 0 && knife.knifeStateComp.state === KnifeState.Normal && !knife.knifeColliderNodeCtrl.attackCollider.notColliderFlag) {
                                // var worldPos = knife.node.parent.convertToWorldSpaceAR(knife.node.position);
                                // var dir = this.player.node.convertToNodeSpaceAR(worldPos);
                                // var dis = dir.mag()
                                var dir = knife.node.position.sub(this.player.node.position);
                                var dis = dir.mag();
                                // knife.dislabel.string = Math.floor(dis);

                                if (dis < 380 * newScale) {
                                    index++;
                                    // knife.node.emit('onPickUpKnife', this.player.pickCollider);
                                    dir = dir.normalize().mul(20);
                                    var finalPosition = this.player.node.position;
                                    knife.draw(finalPosition);
                                    knife.knifeMoveCtrl.isSpider = true;
                                    knife.knifeMoveCtrl.finalPosition = finalPosition;
                                    // console.log(knife.node.position, finalPosition)
                                }
                            }
                            if (index >= 1) {
                                break;
                            }
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

                    break;
                }
            case SuitType.PIKAQIU:
                {
                    this.lightTime += dt;
                    this.lightKeepTime += dt;
                    var _pikaAttackEffect = this.player._pikaAttackEffect;
                    if (!_pikaAttackEffect) return;
                    // ctx.clear();
                    // ctx.node.scale = 1 / this.node.scale;
                    // ctx.node.rotation = -this.node.rotation;

                    if (this.lightKeepTime < 4) {
                        // console.log('放电中', Math.floor(this.lightKeepTime))
                        if (this.lightTime > 0.4) {
                            var multip = this.player.heroScale.newScaleMultip;
                            var newScale = (this.node.scale - multip) / 1.5 + multip;
                            var _iteratorNormalCompletion2 = true;
                            var _didIteratorError2 = false;
                            var _iteratorError2 = undefined;

                            try {
                                for (var _iterator2 = knifes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                    var _knife = _step2.value;

                                    if (_knife.teamID !== 0 && _knife.teamID !== this.player.teamID && _knife.knifeStateComp.state !== KnifeState.Normal) {
                                        // && knife.knifeColliderNodeCtrl.attackCollider.notColliderFlag) {
                                        var vec = cc.v2(_knife.node.x, _knife.node.y).rotate(_knife.node.parent.rotation * Math.PI / 180);
                                        var dir = vec.add(_knife.node.parent.position).sub(this.node.position);
                                        var dis = dir.mag();
                                        if (dis < 400 * newScale) {
                                            // this.drawLighting(dir);
                                            _knife.node.emit('throwKnife');
                                            world.node.emit('destroyDefenceKnife', _knife.node);

                                            // if (!ctx.active) this.ropeNode.active = true;
                                            // var dir = this.drawPos.sub(this.node.position)
                                            var root = _pikaAttackEffect.node.children[0];
                                            root.scaleX = dir.mag() / 240 / root.parent.scaleX;

                                            var rotation = 0;
                                            if (dir.x !== 0 && dir.y !== 0) {
                                                rotation = dir.angle(cc.v2(-1, 0)) * (180 / Math.PI);
                                            }
                                            if (dir.y < 0) {
                                                rotation = -rotation;
                                            }
                                            root.rotation = rotation;
                                            _pikaAttackEffect.playOnce();
                                            // this.drawLighting(dir);
                                            this.lightTime = 0;
                                            break;
                                        }
                                    }
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
                    } else if (this.lightKeepTime < 7) {
                        this.player._pikaKeepEffect.stop();
                        // console.log('冷却中', Math.floor(this.lightKeepTime))
                        //冷却中
                    } else {
                        this.lightKeepTime = 0;
                        this.player._pikaKeepEffect.play();
                    }
                    //  else if (this.lightTime > 0.1) {
                    //     ctx.clear();
                    // }
                    break;
                }
            case SuitType.NEZHA:
                {

                    this.lightTime += dt;
                    this.lightKeepTime += dt;
                    var nezhaAttackEffect = this.player._nezhaAttackEffect.getComponent('EntityEffect');
                    if (!nezhaAttackEffect) return;
                    // ctx.clear();
                    // ctx.node.scale = 1 / this.node.scale;
                    // ctx.node.rotation = -this.node.rotation;

                    // console.log('放电中', Math.floor(this.lightKeepTime))

                    var multip = this.player.heroScale.newScaleMultip;
                    var newScale = (this.node.scale - multip) / 1.5 + multip;

                    if (this.curKnife) {
                        var _knife2 = this.curKnife;
                        var vec = cc.v2(_knife2.node.x, _knife2.node.y).rotate(_knife2.node.parent.rotation * Math.PI / 180);
                        var dir = vec.add(_knife2.node.parent.position).sub(this.node.position);
                        var dis = dir.mag();
                        if (_knife2.teamID === 0 && dis > 100 * newScale) {
                            // knife.draw(this.player.node.position);
                            _knife2.knifeMoveCtrl.isNEZHA = true;
                            _knife2.knifeMoveCtrl.finalPosition = this.player.node.position;
                            var root = nezhaAttackEffect.node;
                            var rotation = 0;
                            if (dir.x !== 0 && dir.y !== 0) {
                                rotation = dir.angle(cc.v2(-1, 0)) * (180 / Math.PI);
                            }
                            if (dir.y < 0) {
                                rotation = -rotation;
                            }
                            root.rotation = rotation - 90;
                        } else {
                            this.curKnife = null;
                        }
                    } else {
                        if (this.lightKeepTime > 0) {
                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;

                            try {
                                for (var _iterator3 = knifes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var _knife3 = _step3.value;

                                    if (_knife3.teamID !== 0 && _knife3.teamID !== this.player.teamID && _knife3.knifeStateComp.state !== KnifeState.Normal) {
                                        // && knife.knifeColliderNodeCtrl.attackCollider.notColliderFlag) {
                                        var vec = cc.v2(_knife3.node.x, _knife3.node.y).rotate(_knife3.node.parent.rotation * Math.PI / 180);
                                        var dir = vec.add(_knife3.node.parent.position).sub(this.node.position);
                                        var dis = dir.mag();
                                        if (dis < 400 * newScale) {
                                            _knife3.node.emit('throwKnife');
                                            _knife3.knifeMoveCtrl.setNeZhaPosition(this.player.node.position);
                                            // knife.node.emit('updateState', KnifeState.Normal);
                                            // knife.node.emit('updateMomentState', KnifeMomentState.ReleaseFinish)
                                            _knife3.node.scale = 2;
                                            // world.node.emit('destroyDefenceKnife', knife.node);
                                            world.node.emit('onNeZhaAttack', _knife3.node);
                                            var root = nezhaAttackEffect.node;
                                            root.scaleY = dis / 600;
                                            nezhaAttackEffect.playOnce();
                                            // this.drawLighting(dir);
                                            this.lightKeepTime = 0;
                                            this.lightTime = 0;
                                            this.curKnife = _knife3;
                                            break;
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
                    }
                    //  else if (this.lightTime > 0.1) {
                    //     ctx.clear();
                    // }
                    break;
                }
            case SuitType.ULTRAMAN:
                {
                    this.lightKeepTime += dt;
                    if (this.lightKeepTime > 10) {
                        this.player._ultraAttackEffect.playOnce();
                        setTimeout(function () {
                            if (_this && _this.colliders) {
                                for (var i = 0; i < _this.colliders.length; i++) {
                                    var collider = _this.colliders[i];
                                    if (collider) collider.notColliderFlag = false;
                                }
                            }
                        }, 2300);

                        setTimeout(function () {
                            if (_this && _this.colliders) {
                                for (var i = 0; i < _this.colliders.length; i++) {
                                    var collider = _this.colliders[i];
                                    if (collider) collider.notColliderFlag = true;
                                }
                            }
                        }, 2500);

                        this.lightKeepTime = 0;
                    }
                    break;
                }
            case SuitType.BATMAN:
                {
                    if (!this.player.isStartGame) return;
                    this.lightKeepTime += dt;

                    var time = 10;
                    if (this.lightKeepTime > time + 2.8 && this.lightKeepTime <= time + 5) {
                        if (!this.isBefore) {
                            this.isBefore = true;
                            this.player.myGuide.active = true;
                            this.player.myGuideComp.playBeforeAnim();
                        }
                        this.player.myGuide.position = this.node.position;
                        this.player.myGuide.scale = this.node.scale;
                    }

                    if (this.lightKeepTime > time + 5) {
                        if (!this.player.myGuide.canClose) {
                            this.player.myGuide.canClose = true;
                            this.player.changeColliderState(false);
                            this.player.changePosArrTarget(this.player.myGuideComp);
                            this.node.emit('onStopMove', true);
                            this.player.changeOpacity(100);
                            if (this.player.moveByTouch) {
                                this.player.moveByTouch.touchEndEvent();
                                if (this.player.moveByTouch) this.player.moveByTouch.init(this.player.myGuideComp);
                            } else {
                                var action = this.node.getComponent('ActionMove');
                                if (action) action.setTarget(this.player.myGuide);
                            }

                            // this.player.myGuide.scale = 1;
                            this.player.myGuide.emit('onStopMove', false);
                            if (this.player.myCamera) this.player.myCamera.targetNode = this.player.myGuide;
                            this.player.myGuideComp.playStartAnim();
                            this.player.myGuideComp.setShadow(true);
                        }
                    }

                    if (this.lightKeepTime > time + 10) {
                        this.lightKeepTime = 0;
                        this.isBefore = false;
                        if (this.player.myGuide.canClose) {
                            this.player.myGuide.canClose = false;
                            this.player.myGuide.scale = this.player.node.scale;
                            this.player.myGuideComp.startAnim.node.active = false;
                            this.player.myGuideComp.setShadow(false);
                            var a0 = cc.moveTo(0.5, this.player.myGuide.position).easing(cc.easeBackOut(3.0));
                            this.node.runAction(a0);
                            setTimeout(function () {
                                if (_this && _this.player && _this.player.entityWorld) _this.player.entityWorld.setTimeScale(0.2);
                            }, 300);

                            setTimeout(function () {
                                if (_this && _this.player) _this.player.myGuideComp.playEndAnim();
                            }, 500);

                            this.node.emit('onStopMove', true);
                            this.player.changeOpacity(255);
                            if (this.player.moveByTouch) {
                                this.player.moveByTouch.touchEndEvent();
                                this.player.moveByTouch.init(this);
                            } else {
                                var action = this.node.getComponent('ActionMove');
                                if (action) action.setTarget(this.node);
                            }

                            setTimeout(function () {
                                if (_this && _this.player) {
                                    if (_this.player.entityWorld) _this.player.entityWorld.setTimeScale(1);
                                }
                            }, 1000);

                            setTimeout(function () {
                                if (_this && _this.player) {
                                    _this.player.changeColliderState(true);
                                    _this.player.changePosArrTarget(_this.player);
                                    _this.node.emit('onStopMove', false);
                                    if (_this.player.myCamera) _this.player.myCamera.targetNode = _this.node;
                                }
                            }, 1500);
                        }
                    }
                    break;
                }
            case SuitType.YELLOWMAN:
                {
                    if (!this.player.isStartGame) return;
                    this.lightKeepTime += dt;
                    if (this.player.getKnifeNum() <= 2) return;
                    if (this.lightKeepTime > 10) {
                        for (var i = 0, l = knifes.length, _knife4; i < l; i++) {
                            _knife4 = knifes[i];
                            if (_knife4.teamID === this.player.teamID) {
                                _knife4.node.emit('throwKnife');
                                _knife4.node.active = false;
                                this.lightKeepTime = 0;
                                this.player._yellowManEffect.open();
                                setTimeout(function () {
                                    if (_this && _this.player) {
                                        _this.player.addBuff(5);
                                        _this.player.addBuff(6);
                                        _this.player.openShadow();
                                    }
                                }, 1000);
                                setTimeout(function () {
                                    if (_this && _this.player) {
                                        _this.player.closeShadow();
                                        _this.player._yellowManEffect.closeNode();
                                    }
                                }, 6000);
                                break;
                            }
                        }
                    }

                    break;
                }
            default:
                {
                    // this.player._pikaKeepEffect.stop();
                    break;
                }

        }
    },
    die: function die() {
        this.player._pikaKeepEffect.stop();
        this.player._ultraAttackEffect.stop();
        this.player._yellowManEffect.closeNode();
    },
    drawLighting: function drawLighting(dir) {
        var ctx = this.player.ctx;
        var step = 8;
        var index = 0;
        ctx.moveTo(0, 0);
        while (index < step) {
            index++;
            var per = index / step;
            var vec = cc.v2(per * dir.x, per * dir.y);
            // var rota = index % 2 ? 1 : -1;
            // var ro = vec.rotate(rota * Math.PI / 2).mul(0.5 - Math.abs(per - 0.5));
            // vec = vec.add(ro);

            vec.x = vec.x + (Math.random() - 0.5) * dir.x;

            // vec.y += Math.floor(Math.random() * 5) * dir.y / 10;


            ctx.lineTo(vec.x, vec.y);
        }
        ctx.lineTo(dir.x, dir.y);
        ctx.stroke();
    },
    catchEnemyByBatMan: function catchEnemyByBatMan() {
        this.lightKeepTime = 999;
    }
});

cc._RF.pop();