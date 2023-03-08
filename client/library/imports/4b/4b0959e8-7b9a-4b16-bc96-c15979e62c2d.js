"use strict";
cc._RF.push(module, '4b095noe5pLFryWwVl55iwt', 'KillMsg');
// scripts/battle/ui/KillMsg.js

'use strict';

/**
 * @fileoverview KillMsg
 * @author meifan@gameley.cn (梅凡)
 */

var TEAM_COLOR = require('Types').TEAM_COLOR;
var UIUtil = require('UIUtil');
var PlayerData = require('PlayerData');

var KillMsg = cc.Class({
    extends: cc.Component,

    properties: {
        _time: -1,
        killNode: cc.Node,
        _killNameNode: cc.Node,
        killMyBall: cc.Node,
        killOtherBall: cc.Node,
        _killMyName: cc.Label,
        _killOtherName: cc.Label,
        effectAnim: cc.Animation,
        isOpen: false
    },

    init: function init(killNameNode, killMyName, killOtherName, killIconNode, killMyIcon, killOtherIcon) {
        this._killNameNode = killNameNode;
        this._killMyName = killMyName;
        this._killOtherName = killOtherName;

        this._killIconNode = killIconNode;
        this._killMyIcon = killMyIcon;
        this._killOtherIcon = killOtherIcon;
        this.isOpen = false;

        this._killMyName.langFlag = true;
        this._killOtherName.langFlag = true;
    },

    cleanUp: function cleanUp() {
        this.close();
    },

    update: function update(dt) {
        if (this._time > 0) {
            this._time -= dt;
            if (this._time < 0) {
                this.close();
            }
        }
    },

    showKillMsg: function showKillMsg(hero, otherHero) {
        this.isOpen = true;
        this.effectAnim.node.active = true;
        this.effectAnim.play();
        // this.effectAnim.on('stop', () => {
        //     this.effectAnim.off('stop');
        //     this.effectAnim.node.active = false;
        // })
        this.killNode.active = true;
        this._killNameNode.active = true;
        this._killIconNode.active = true;
        this._time = 2.0;

        var myTid = hero.teamID;
        var otherTid = otherHero.teamID;

        this.killMyBall.color = TEAM_COLOR[myTid];
        this.killOtherBall.color = TEAM_COLOR[otherTid];

        this._killMyName.string = hero.name;
        this._killMyIcon.spriteFrame = null;
        this._killMyIcon.iconUrl = hero.isLocal ? PlayerData.instance.iconUrl : hero.iconUrl;
        UIUtil.loadResPortrait(this._killMyIcon, hero);
        // this._killMyName.node.color = hero.isLocal ? TEAM_COLOR[myTid] : TEAM_COLOR[0];
        this._killOtherName.string = otherHero.name;
        this._killOtherIcon.spriteFrame = null;
        this._killOtherIcon.iconUrl = otherHero.isLocal ? PlayerData.instance.iconUrl : otherHero.iconUrl;
        UIUtil.loadResPortrait(this._killOtherIcon, otherHero);
        // this._killOtherName.node.color = otherHero.isLocal ? TEAM_COLOR[otherTid] : TEAM_COLOR[0];
    },

    close: function close() {
        this.killNode.active = false;
        this._killNameNode.active = false;
        this._killIconNode.active = false;
        this.isOpen = false;
    }

});

cc._RF.pop();