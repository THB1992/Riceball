(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/PlayerBuffChangeListener.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '889d6yXYYJJR7uwiGgr8M4Q', 'PlayerBuffChangeListener', __filename);
// scripts/battle/component/player/PlayerBuffChangeListener.js

'use strict';

var BuffState = require('Types').BuffState;

cc.Class({
    extends: cc.Component,

    properties: {
        _hard: 0,
        _speeds: [],
        _invincible: 0
    },

    init: function init(player) {
        this.player = player;

        this._hard = 0;
        this._speeds = [];
        this._invincible = 0;

        this.node.on('onBuffChange', this.onBuffChange, this);
    },

    onBuffChange: function onBuffChange(buffData, isStart) {
        switch (buffData.type) {
            case BuffState.Big:
                if (isStart) {
                    // this.player.buffLabel.string = '大';
                    this.player._bigEffect.open();
                    this.player._bigEffectText.play();
                    this.node.emit('changeScaleMultip', buffData.buffParam);
                    this.player.followPlayer.node.emit('changeScaleMultip', buffData.buffParam);
                    if (this.player.cameraZoomSys) {
                        this.player.cameraZoomSys.setCameraZoomMultip(buffData.buffParam);
                    }
                } else {
                    this.player._bigEffect.close();
                    this.node.emit('changeScaleMultip', 1);
                    this.player.followPlayer.node.emit('changeScaleMultip', 1);
                    if (this.player.cameraZoomSys) {
                        this.player.cameraZoomSys.setCameraZoomMultip(1);
                    }
                }
                break;
            case BuffState.Fast:
                if (isStart) {
                    // this.player.buffLabel.string = '快';
                    if (!this._frenzy) {
                        this.player._fastEffect.open();
                        if (buffData.id !== 6) this.player._fastEffectText.play();
                    }
                    this._speeds.push(buffData.buffParam);
                    this.node.emit('changeSpeedRate', this.getSpeedRate());
                } else {
                    this.player._fastEffect.close();
                    var index = this._speeds.indexOf(buffData.buffParam);
                    if (index > -1) {
                        this._speeds.splice(index, 1);
                    }
                    this.node.emit('changeSpeedRate', this.getSpeedRate());
                }
                break;
            case BuffState.Hard:
                if (isStart) {
                    // this.player.buffLabel.string = '强';
                    this._hard++;
                    if (!this._frenzy) {
                        this.player._hardEffect.open();
                        this.player._hardEffectText.play();;
                    }
                    var num = 6 - this.player.followPlayer.knivesCmp.knives.length;
                    if (num > 0) {
                        if (this.player.changeKnifeCountCallback) this.player.changeKnifeCountCallback(num);
                    }
                    // this.player.isHard = true;
                } else {
                    this._hard--;
                    this.player._hardEffect.close();
                    // this.player.isHard = false;
                }
                break;
            case BuffState.Frenzy:
                {
                    if (isStart) {
                        this._hard++;
                        this._invincible++;
                        this._speeds.push(buffData.buffParam);
                        this._frenzy = true;

                        this.player._fastEffect.close();
                        this.player._hardEffect.close();
                        this.player._frenzyEffect.open();
                        this.node.emit('changeSpeedRate', this.getSpeedRate());
                    } else {
                        this._hard--;
                        this._invincible--;
                        var index = this._speeds.indexOf(buffData.buffParam);
                        if (index > -1) {
                            this._speeds.splice(index, 1);
                        }
                        this._frenzy = false;
                        this.player._frenzyEffect.close();
                        this.node.emit('changeSpeedRate', this.getSpeedRate());
                    }
                    break;
                }
            case BuffState.Magnet:
                if (isStart) {
                    this.player._magnetEffect.open();
                    this.player._magnetEffectText.play();
                    this.node.emit('changeMagnet', true);
                    // this.player.followPlayer.node.emit('changeScaleMultip', buffData.buffParam);
                    // if (this.player.cameraZoomSys) {
                    //     this.player.cameraZoomSys.setCameraZoomMultip(buffData.buffParam)
                    // }
                } else {
                    this.player._magnetEffect.close();
                    this.node.emit('changeMagnet', false);
                    // this.player.followPlayer.node.emit('changeScaleMultip', 1);
                    // if (this.player.cameraZoomSys) {
                    //     this.player.cameraZoomSys.setCameraZoomMultip(1);
                    // }
                }
                break;
            default:
                break;
        }
    },

    getSpeedRate: function getSpeedRate() {
        var ret = 1.0;

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this._speeds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var rate = _step.value;

                ret = Math.max(rate, ret);
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

        return ret;
    },

    isHard: function isHard() {
        return this._hard > 0;
    },

    isInvincible: function isInvincible() {
        return this._invincible > 0;
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
        //# sourceMappingURL=PlayerBuffChangeListener.js.map
        