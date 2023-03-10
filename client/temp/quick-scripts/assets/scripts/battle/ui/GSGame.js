(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/ui/GSGame.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '41feeFZNfpMvpAU5mGKO4RQ', 'GSGame', __filename);
// scripts/battle/ui/GSGame.js

'use strict';

/**
 * @fileoverview GSGame
 * @author meifan@gameley.cn (梅凡)
 */

var Tools = require('Tools');
var UIUtil = require('UIUtil');
var GameData = require('GameData');
var PlayerData = require('PlayerData');
var GSGame = cc.Class({
    extends: cc.Component,

    properties: {
        panelTop: cc.Node,
        gameOverPanel: cc.Node,
        panelNotice: cc.Node,
        panelHeroPosArr: cc.Node,
        panelGuide: cc.Node,
        panelRevive: cc.Node,
        panelTips: cc.Node,
        panelTaskNotice: cc.Node,
        panelVictory: cc.Node,
        guideTime: 0,
        countDownNode: cc.Node,
        panelKill: cc.Node,
        panelReviveTips: cc.Node,
        effectKey: cc.Animation
    },

    init: function init(world) {
        this.world = world;
        if (PlayerData.instance.isGuide) {
            this.panelTop.active = false;
        }

        this.effectKey.node.parent.position = cc.v2(0, 200);
        this.checkPad();
    },
    checkPad: function checkPad() {
        this.panelKill.y = GameData.instance.isPad() ? 380 : 588;
        this.panelReviveTips.y = GameData.instance.isPad() ? 350 : 380;
        this.panelTop.getComponent(cc.Widget).top = GameData.instance.isLongScreen() ? 100 : 0;
    },


    cleanUp: function cleanUp() {
        this.panelTop.getComponent('PanelTop').cleanUp();
        this.panelHeroPosArr.destroyAllChildren();
        if (this.gameOverPanel) {
            this.gameOverPanel.getComponent('PanelGameOver').cleanUp();
        }
        if (this.panelGuide) {
            this.panelGuide.active = true;
        }
        this.guideTime = 0;
        if (this.panelVictory) {
            this.panelVictory.active = false;
        }
        this.panelKill.active = true;
        if (this.panelNotice) {
            this.panelNotice.active = true;
        }
    },

    startLoadPrefab: function startLoadPrefab() {
        var _this = this;

        GameData.instance.logUseTime('start prefab load');

        this.needLoadPanel = 0;
        this.loadedPanel = 0;

        var self = this;
        var callF = function callF() {
            self.loadedPanel++;

            if (self.needLoadPanel === self.loadedPanel) {

                var index = self.node.children.length;
                self.panelTips.setSiblingIndex(index);
                if (self.panelNotice) {
                    self.panelNotice.setSiblingIndex(1);
                }
                if (self.panelKeyCount) {
                    self.panelKeyCount.parent = self.node;
                }
                if (self.panelTreasureBox) {
                    self.panelTreasureBox.parent = self.node;
                }
            }
        };

        if (!this.panelNotice) {
            UIUtil.loadUIPrefab('prefab/ui/gsgame/PanelNotice', function (resource) {
                if (resource) {
                    _this.panelNotice = resource;
                    _this.panelNotice.parent = _this.node;
                    if (PlayerData.instance.isGuide) {
                        _this.panelNotice.active = false;
                    }

                    GameData.instance.logUseTime('panelNotice prefab loaded');
                    callF();
                }
            });
            this.needLoadPanel++;
        }

        this.panelTop.getComponent('PanelTop').startLoadPrefab();

        if (!this.panelRevive) {
            UIUtil.loadUIPrefab('prefab/ui/gsgame/PanelRevive', function (resource) {
                if (resource) {
                    _this.panelRevive = resource;
                    _this.panelRevive.parent = _this.node;
                    GameData.instance.logUseTime('panelRevive prefab loaded');
                    callF();
                }
            });
            this.needLoadPanel++;
        }

        if (!this.gameOverPanel) {
            UIUtil.loadUIPrefab('prefab/ui/gsgame/PanelGameOver', function (resource) {
                if (resource) {
                    _this.gameOverPanel = resource;
                    _this.gameOverPanel.parent = _this.node;
                    GameData.instance.logUseTime('gameOverPanel prefab loaded');
                    callF();
                }
            });
            this.needLoadPanel++;
        }

        if (!this.panelGuide) {
            UIUtil.loadUIPrefab('prefab/ui/gsgame/panelGuide', function (resource) {
                if (resource) {
                    _this.panelGuide = resource;
                    _this.panelGuide.parent = _this.node;
                    _this.panelGuide.y = GameData.instance.isPad() ? -213 : -313;
                    GameData.instance.logUseTime('panelGuide prefab loaded');
                    callF();
                }
            });
            this.needLoadPanel++;
        }

        if (!this.panelFirstGuide && PlayerData.instance.isGuide) {
            UIUtil.loadUIPrefab('prefab/ui/gsgame/PanelFirstGuide', function (resource) {
                if (resource) {
                    _this.panelFirstGuide = resource;
                    _this.panelFirstGuide.parent = _this.node;
                    GameData.instance.logUseTime('panelFirstGuide prefab loaded');
                    callF();
                }
            });
            this.needLoadPanel++;
        }

        if (!this.panelVictory) {
            UIUtil.loadUIPrefab('prefab/ui/gsgame/PanelVictory', function (resource) {
                if (resource) {
                    _this.panelVictory = resource;
                    _this.panelVictory.parent = _this.node;
                    GameData.instance.logUseTime('panelVictory prefab loaded');
                    callF();
                }
            });
            this.needLoadPanel++;
        }

        if (!this.panelTreasureBox) {
            UIUtil.loadUIPrefab('prefab/ui/gsgame/PanelTreasureBox', function (resource) {
                if (resource) {
                    _this.panelTreasureBox = resource;
                    // this.panelTreasureBox.parent = this.node;
                    GameData.instance.logUseTime('PanelTreasureBox prefab loaded');
                    callF();
                }
            });
            this.needLoadPanel++;
        }

        if (!this.panelKeyCount) {
            UIUtil.loadUIPrefab('prefab/ui/gsgame/KeyCount', function (resource) {
                if (resource) {
                    _this.panelKeyCount = resource;
                    GameData.instance.logUseTime('panelKeyCount prefab loaded');
                    callF();
                }
            });
            this.needLoadPanel++;
        }
    },

    /**
     * 创建玩家rankItem
     */
    addPlayerRankItem: function addPlayerRankItem(entityPlayer) {
        this.panelTop.getComponent('PanelTop').addPlayerRankItem(entityPlayer);
    },

    openGameOverPanel: function openGameOverPanel() {
        if (this.gameOverPanel) {
            this.gameOverPanel.active = true;
            this.gameOverPanel.getComponent('PanelGameOver').init(this.world);
            console.log("showBanner openGameOverPanel");
            AdvertMgr.instance.showBanner();
        }
    },

    showPanelTreasureBox: function showPanelTreasureBox() {
        if (this.panelTreasureBox) {
            this.panelTreasureBox.active = true;
            this.panelTreasureBox.getComponent('PanelTreasureBox').init(this.world);
        }
    },

    closeGameOverPanel: function closeGameOverPanel() {
        if (this.gameOverPanel) {
            this.gameOverPanel.active = false;
        }
    },

    update: function update(dt) {
        if (!this.panelGuide) return;
        if (!this.panelGuide.active) return;
        this.guideTime += dt;
        if (this.world.localPlayer.isDefence) {
            this.touchTime = this.guideTime;
        }
        if (this.guideTime > this.touchTime + 1) {
            this.panelGuide.active = false;
        }
        if (this.guideTime > 3) {
            this.panelGuide.active = false;
        }
    },

    addHeroPosArr: function addHeroPosArr(localPlayer, otherPlayer, camera) {
        this.panelHeroPosArr.getComponent('PanelHeroPosArr').addHeroPosArr(localPlayer, otherPlayer, camera);
    },

    addSpecialNotice: function addSpecialNotice(type) {
        if (!this.panelTop.getComponent('PanelTop').anyPanelOpen()) {
            if (this.panelNotice) {
                this.panelNotice.getComponent('PanelNotice').addSpecialNotice(type);
            }
        }
    },

    showImportantNotice: function showImportantNotice(type) {
        if (!this.panelTop.getComponent('PanelTop').anyPanelOpen()) {
            if (this.panelNotice) {
                this.panelNotice.getComponent('PanelNotice').showImportantNotice(type);
            }
        }
    },

    closePanelNotice: function closePanelNotice() {
        if (this.panelNotice) {
            var notice = this.panelNotice.getComponent('PanelNotice');
            if (notice.isOpen) {
                notice.close();
            }
        }
    },

    startCountDown: function startCountDown(time) {
        this.panelTop.getComponent('PanelTop').startCountDown(time);
    },

    showKillMsg: function showKillMsg(hero, otherHero) {
        this.closePanelNotice();
        this.panelTop.getComponent('PanelTop').showKillMsg(hero, otherHero);
    },

    showKillNotice: function showKillNotice(killNum) {
        this.panelTop.getComponent('PanelTop').showKillNotice(killNum);
    },

    showReviveNotice: function showReviveNotice(hero) {
        this.closePanelNotice();
        this.panelTop.getComponent('PanelTop').showReviveNotice(hero);
    },

    // setFrenzyComp : function (player) {
    //     this.panelTop.getComponent('PanelTop').setFrenzyComp(player);
    // },

    openRevivePanel: function openRevivePanel(callback, reviveCount) {
        if (this.panelRevive) {
            this.panelRevive.active = true;
            this.panelRevive.getComponent('PanelRevive').init(callback, reviveCount, this);
            this.panelRevive.children[0].scale = 0;
            var action = cc.scaleTo(0.2, 1);
            this.panelRevive.children[0].runAction(action);
        }
    },

    showTips: function showTips(tips) {
        this.panelTips.getComponent('PanelTips').init(tips);
    },

    showTaskNotice: function showTaskNotice(data, callback) {
        var action = cc.moveBy(0.3, cc.v2(-200, 0)).easing(cc.easeBackOut());
        var delay = cc.delayTime(2);
        var action2 = cc.moveBy(0.3, cc.v2(200, 0)).easing(cc.easeBackIn());;
        var callF = cc.callFunc(function () {
            callback();
        });
        this.panelTaskNotice.active = true;
        this.panelTaskNotice.runAction(cc.sequence(action, delay, action2, callF));
        this.panelTaskNotice.getComponent('PanelTaskNotice').init(data, callback);
    },

    showCountDownNode: function showCountDownNode() {
        if (this.panelNotice) {
            this.panelNotice.active = false;
        }
        this.countDownNode.active = true;
    },

    onBigBuff: function onBigBuff() {
        this.world.localPlayer.node.emit('updateBuffState', 0);
    },

    onFastBuff: function onFastBuff() {
        this.world.localPlayer.node.emit('updateBuffState', 1);
    },

    onHardBuff: function onHardBuff() {
        this.world.localPlayer.node.emit('updateBuffState', 2);
    },

    onMagnetBuff: function onMagnetBuff() {
        this.world.localPlayer.node.emit('updateBuffState', 3);
    },

    onFrenzyBuff: function onFrenzyBuff() {
        this.world.localPlayer.node.emit('onFrenzyAdd', 3);
    },

    showGuideStart: function showGuideStart(state) {
        if (this.panelFirstGuide) {
            this.panelFirstGuide.getComponent('PanelFirstGuide').showGuideStart(state);
        }
    },

    showGuideEnd: function showGuideEnd(state) {
        if (this.panelFirstGuide) {
            this.panelFirstGuide.getComponent('PanelFirstGuide').showGuideEnd(state);
        }
    },

    showGuideSpecial: function showGuideSpecial(state) {
        if (this.panelFirstGuide) {
            this.panelFirstGuide.getComponent('PanelFirstGuide').showGuideSpecial(state);
        }
    },

    refreshGuideProcess: function refreshGuideProcess(str) {
        if (this.panelFirstGuide) {
            this.panelFirstGuide.getComponent('PanelFirstGuide').refreshGuideProcess(str);
        }
    },

    showPanelVictory: function showPanelVictory() {
        if (this.panelVictory) {
            this.panelVictory.active = true;
            this.panelVictory.getChildByName('victory').getChildByName('victory').getComponent(cc.Animation).play('ani-victory', 0);
        }
        this.panelKill.active = false;
        if (this.panelNotice) {
            this.panelNotice.active = false;
        }
        this.panelTop.getComponent('PanelTop').killNoticeNode.active = false;
        // setTimeout(() => {
        //     if(this.panelVictory) {
        //         this.panelVictory.active = false;
        //     }
        // }, 1500)
    },

    showPanelKeyCount: function showPanelKeyCount(node) {
        if (this.panelKeyCount) {
            this.panelKeyCount.getComponent('KeyCount').show(this.effectKey.node.parent);
            this.effectKey.play();
        }
    },
    openPanelKeyCount: function openPanelKeyCount(active) {
        if (this.panelKeyCount) {
            this.panelKeyCount.getComponent('KeyCount').open(active);
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
        //# sourceMappingURL=GSGame.js.map
        