(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/ui/PanelTop.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '52bb1YxP3RN5af6vUcn+6aF', 'PanelTop', __filename);
// scripts/battle/ui/PanelTop.js

'use strict';

var _properties;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @fileoverview PanelRank
 * @author meifan@gameley.cn (梅凡)
 */
var UIUtil = require('UIUtil');
var GameData = require('GameData');

var PanelTop = cc.Class({
    extends: cc.Component,

    properties: (_properties = {
        rankGrid: cc.Node,
        playerRankItemPrebfab: cc.Prefab,
        // playerRankItems: [],
        rankNameGrid: cc.Node,
        timeLabel: cc.Label,
        _time: -1,
        killNode: cc.Node,
        killNameNode: cc.Node,
        killMyName: cc.Label,
        killOtherName: cc.Label,
        killNoticeNode: cc.Node
    }, _defineProperty(_properties, 'killMyName', cc.Label), _defineProperty(_properties, 'killIconNode', cc.Node), _defineProperty(_properties, 'killMyIcon', cc.Sprite), _defineProperty(_properties, 'killOtherIcon', cc.Sprite), _defineProperty(_properties, 'reviveNoticeNode', cc.Node), _properties),

    onLoad: function onLoad() {
        var killMsg = this.killNode.getComponent('KillMsg');
        killMsg.init(this.killNameNode, this.killMyName, this.killOtherName, this.killIconNode, this.killMyIcon, this.killOtherIcon);
    },

    startLoadPrefab: function startLoadPrefab() {
        var _this = this;

        if (!this.killNoticeNode) {
            UIUtil.loadUIPrefab('prefab/ui/gsgame/PanelKillNotice', function (resource) {
                if (resource) {
                    _this.killNoticeNode = resource;
                    _this.killNoticeNode.parent = _this.node.parent;
                    _this.killNoticeNode.y = GameData.instance.isPad() ? 280 : 239;
                    GameData.instance.logUseTime('killNoticeNode prefab loaded');
                }
            });
        }
    },

    cleanUp: function cleanUp() {
        this.rankGrid.destroyAllChildren();
        this.rankNameGrid.destroyAllChildren();
        if (this.killNoticeNode) {
            this.killNoticeNode.active = true;
            this.killNoticeNode.getComponent('KillNotice').cleanUp();
        }
        this.killNode.getComponent('KillMsg').cleanUp();
    },

    /**
     * 创建玩家rankItem
     */
    addPlayerRankItem: function addPlayerRankItem(entityPlayer) {
        var rank = cc.instantiate(this.playerRankItemPrebfab);
        var rankItem = rank.getComponent('PlayerRankItem');
        rank.parent = this.rankGrid;
        rankItem.init(entityPlayer);
        // this.playerRankItems.push(rankItem);

        rankItem.playerName.node.parent = this.rankNameGrid;
    },

    startCountDown: function startCountDown(time) {
        this._time = time;
    },

    update: function update(dt) {
        if (this._time > 0) {
            this._time -= dt;

            var time = this._time;
            var second = Math.floor(time % 60);

            var str = '0' + Math.floor(time / 60) + ':' + (second > 9 ? second : '0' + second);
            if (time < 0) {
                str = '00:00';
            }
            if (this.timeLabel.string !== str) this.timeLabel.string = str;
        }

        // if( this.frenzyComp && this.frenzyBar) {
        //     this.frenzyBar.fillRange = this.frenzyComp.getFrenzyRate();
        // }
    },

    showKillMsg: function showKillMsg(hero, otherHero) {
        this.closeReviveNotice();
        this.killNode.getComponent('KillMsg').showKillMsg(hero, otherHero);
    },

    showKillNotice: function showKillNotice(killNum) {
        if (this.killNoticeNode) {
            this.killNoticeNode.getComponent('KillNotice').showKillNotice(killNum);
        }
    },

    // setFrenzyComp: function (player) {
    //     this.frenzyComp = player.node.getComponent('PlayerFrenzyComponent');
    // }

    showReviveNotice: function showReviveNotice(hero) {
        if (!this.killNode.getComponent('KillMsg').isOpen) {
            this.reviveNoticeNode.getComponent('PanelReviveNotice').showReviveNotice(hero);
        }
    },

    closeReviveNotice: function closeReviveNotice() {
        var reviveNotice = this.reviveNoticeNode.getComponent('PanelReviveNotice');
        if (reviveNotice.isOpen) {
            reviveNotice.close();
        }
    },

    anyPanelOpen: function anyPanelOpen() {
        return this.killNode.getComponent('KillMsg').isOpen || this.reviveNoticeNode.getComponent('PanelReviveNotice').isOpen;
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
        //# sourceMappingURL=PanelTop.js.map
        