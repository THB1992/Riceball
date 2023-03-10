(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/ui/PlayerRankItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'df09cXr/xJJ444Cs3fEGBmF', 'PlayerRankItem', __filename);
// scripts/battle/ui/PlayerRankItem.js

'use strict';

/**
 * @fileoverview 玩家名次Item
 * @author meifan@gameley.cn (梅凡)
 */

var Tools = require('Tools');
var TEAM_COLOR = require('Types').TEAM_COLOR;
var UIUtil = require('UIUtil');
var PlayerRankItem = cc.Class({
    extends: cc.Component,

    properties: {
        rankSpr: cc.Sprite,
        playerName: cc.Label,
        playerScore: cc.Label,
        flagIcon: cc.Sprite,
        _rank: 0,
        _needUpdate: false,
        _speed: 2,
        _knifeNum: 0,
        hashTag: cc.Node,
        rankLabel: cc.Label,
        effectNode: cc.Node,
        activeNode: cc.Node,
        _isDead: false,
        _time: 0.1
    },

    init: function init(entityPlayer) {

        this.playerName.langFlag = true;

        var tid = entityPlayer.teamID;
        this.rankSpr.node.color = TEAM_COLOR[tid];
        this.hashTag.color = TEAM_COLOR[tid];
        this.rankLabel.node.color = TEAM_COLOR[tid];
        this.playerName.string = entityPlayer.name;
        this.playerName.node.color = entityPlayer.isLocal ? TEAM_COLOR[tid] : TEAM_COLOR[0];
        UIUtil.loadResFlag(this.flagIcon, entityPlayer.country);

        this._player = entityPlayer;
        this.playerScore.string = 0;

        this._needUpdate = false;
        this._height = this.node.height;
        this._speed = 0.3;

        this._isDead = false;
        this._time = 0.1;

        this.setNewRank(tid);
    },

    setNewRank: function setNewRank(newRank) {
        if (newRank !== this._rank) {
            this._lastY = -this._height * this._rank;
            this._newY = -this._height * newRank;
            this._curY = this.node.y;
            this._rank = newRank;
            this._needUpdate = true;

            this.rankLabel.string = this._rank;
        }
    },

    update: function update(dt) {
        if (this._isDead) {
            if (this._time <= 0) {
                this._time = 0;
                this.activeNode.active = false;
                this.playerName.node.active = false;
            } else {
                this._time -= dt;
            }
            return;
        }

        if (this._isDead !== this._player.isDead) {
            this._isDead = this._player.isDead;
            this.effectNode.active = true;
            return;
        }

        if (this._player.nameDirty) {
            this.playerName.string = this._player.name;
            this._player.nameDirty = false;
        }

        if (this._rank !== this._player.rank) {
            this.setNewRank(this._player.rank);
        }

        if (this._knifeNum !== this._player.getKnifeNum()) {
            this._knifeNum = this._player.getKnifeNum();
            this.playerScore.string = this._knifeNum;
        }

        if (this._needUpdate) {
            this._curY = cc.misc.lerp(this._curY, this._newY, this._speed);
            // cc.log(' this._curY: ' +  this._curY + ' newY: ' +  this._newY);
            if (Tools.isFloatEqual(this._curY, this._newY)) {
                this._needUpdate = false;
                this.node.y = this._newY;
                this.playerName.node.y = this._newY;
            } else {
                this.node.y = this._curY;
                this.playerName.node.y = this._curY;
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
        //# sourceMappingURL=PlayerRankItem.js.map
        