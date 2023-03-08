"use strict";
cc._RF.push(module, 'a038bDlGolBuqAG1wEonZ/S', 'KillMsgListener');
// scripts/battle/system/KillMsgListener.js

'use strict';

/**
 * @fileoverview KillMsgListener
 * @author meifan@gameley.cn (梅凡)
 */

var AudioEngine = require('AudioEngine');
var SoundID = require('Types').SoundID;
var killSounds = [SoundID.doublekill, SoundID.tribblekill, SoundID.quadrkill, SoundID.pandakill, SoundID.godlike];
var PlayerData = require('PlayerData');
var PlatformMgr = require('PlatformMgr');
var CustomFunnelEvent = require('Types').CustomFunnelEvent;

var KillMsgListener = cc.Class({
    extends: cc.Component,

    properties: {
        players: [],
        isfirstBlood: false,
        isGuide: false
    },

    cleanUp: function cleanUp() {
        this.players = [];
    },

    init: function init(entityPlayers, uiMgr) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = entityPlayers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var player = _step.value;

                this.players.push(player);
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

        this.uiMgr = uiMgr;

        this.isGuide = PlayerData.instance.isGuide;

        this.node.on('killMessageShow', this.killMessageShow, this);
    },

    killMessageShow: function killMessageShow(event) {
        var knife = event[0];
        var deadHero = event[1];

        var myTid = knife.tag;
        var otherTid = deadHero.tag;

        var myHero = null;
        var otherHero = null;

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = this.players[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var hero = _step2.value;

                if (hero.teamID === myTid) {
                    myHero = hero;
                    continue;
                }
                if (hero.teamID === otherTid) {
                    otherHero = hero;
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

        if (otherHero && otherHero.beKilled()) {
            // 玩家被杀有可能会无敌导致没有真的死亡 就不需要走音效、弹窗等

            if (!this.isfirstBlood) {
                this.isfirstBlood = true;
                AudioEngine.instance.playSound(SoundID.firstblood);
            }

            this.uiMgr.showKillMsg(myHero, otherHero);
            if (myHero.isLocal) {
                if (!this.isGuide) {
                    this.uiMgr.showKillNotice(myHero.killNum);
                }

                if (myHero.killNum > 5) {
                    AudioEngine.instance.playSound(killSounds[killSounds.length - 1]);
                } else if (myHero.killNum >= 2) {
                    AudioEngine.instance.playSound(killSounds[myHero.killNum - 2]);
                }

                if (PlayerData.instance.isFristGame()) {
                    if (myHero.killNum === 1) {
                        PlatformMgr.notifyFunnelEvent(CustomFunnelEvent.Kill_One);
                    } else if (myHero.killNum === 2) {
                        PlatformMgr.notifyFunnelEvent(CustomFunnelEvent.Kill_Two);
                    } else if (myHero.killNum === 3) {
                        PlatformMgr.notifyFunnelEvent(CustomFunnelEvent.Kill_Three);
                    }
                }
            }
        }
    }
});

cc._RF.pop();