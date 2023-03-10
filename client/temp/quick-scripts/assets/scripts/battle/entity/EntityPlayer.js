(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/entity/EntityPlayer.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8c98bHmilVHF5eXbFobErE9', 'EntityPlayer', __filename);
// scripts/battle/entity/EntityPlayer.js

'use strict';

/**
 * @fileoverview 玩家实体
 * @author meifan@gameley.cn (梅凡)
 */

var Tools = require('Tools');
var EntityBase = require('EntityBase');
var AudioEngine = require('AudioEngine');
var SoundID = require('Types').SoundID;
var NAME_COLOR = require('Types').NAME_COLOR;
var PlayerData = require('PlayerData');
var FrenzyAddType = require('Types').FrenzyAddType;
var HeroSkinProperty = require('Types').HeroSkinProperty;
var HeroRebornEffectState = require('Types').HeroRebornEffectState;
var StageType = require('Types').StageType;
var KnifeState = require('Types').KnifeState;

cc.Class({
    extends: EntityBase,

    properties: {
        colliderNode: cc.Node,
        // pickUpNode: cc.Node,
        isLocal: true,
        uid: 999,
        followPlayer: null,
        touchNode: cc.Node,
        rank: 0,
        isDead: false,
        isDefence: true,
        killNum: 0,
        pickKnifeCount: 0,
        killKnifeCount: 0,
        maxPickKnifeCount: 0,
        circleNode: cc.Node,
        _dieEffect: cc.Node,
        firstDead: false,
        waitToDie: false,
        reviveCount: 0,
        invincible: false,
        invincibleTime: 0,
        heroTeamIcon: cc.Sprite,
        heroIcon: cc.Sprite,
        scaleMultip: 2,
        // fastNode: cc.Node,
        shadowNode: cc.Node,
        isInView: false,
        goldAddition: 0,
        /** 初复活阶段 贤者模式 不杀人 半透明 */
        isSage: false,
        activeNode: cc.Node,

        ctx: cc.Graphics,
        lightTime: 0,
        redPope: cc.Node,
        rayNode: cc.Node,
        posArrowPool: []
    },

    // onLoad () {}

    init: function init(isLocal, uid, followPlayer, tid, knifeSkin, playerName, rank, rankIconNode, country, heroSkin, iconUrl, attackPower, defencePower, aiLevel, canFrenzy, isKey) {

        this.isLocal = isLocal;
        this.uid = uid;
        this.followPlayer = followPlayer;
        this.teamID = tid;
        this.aiLevel = aiLevel;
        this.rankData = rank;
        this.rankIconNode = rankIconNode;
        this.rankIconNode.active = false;
        this.country = country;
        this.skin = knifeSkin;
        this.heroSkin = heroSkin;
        this.killNum = 0;
        this.pickKnifeCount = 0;
        this.killKnifeCount = 0;
        this.maxPickKnifeCount = 0;
        this.isKey = isKey;

        this.reviveCount = 0;
        this.name = playerName.nickname.string ? playerName.nickname.string : 'player';
        this.playerName = playerName;
        this.changeName(this.name);
        this.iconUrl = iconUrl;
        this.attackPower = attackPower;
        this.defencePower = defencePower;
        // this.playerName.node.color = NAME_COLOR[tid];

        this.heroMove = Tools.getOrAddComponent(this.node, 'HeroMove');

        this.heroScale = Tools.getOrAddComponent(this.node, 'HeroScale');
        this.heroScale.init(this);

        this.moveFixByBlock = Tools.getOrAddComponent(this.node, 'HeroMoveFixByBlock');
        this.moveFixByBlock.init(this.colliderNode.getComponent(cc.Collider));

        var nodeCollider = Tools.getOrAddComponent(this.colliderNode, 'NodeCollider');
        //TODO nodeCollider 需要设置初始队伍 changeColliderTag
        nodeCollider.init(this.node, true);
        this.nodeCollider = nodeCollider;

        // var nodePickCollider = Tools.getOrAddComponent(this.pickUpNode, 'NodeCollider');
        //TODO nodeCollider 需要设置初始队伍 changeColliderTag
        // nodePickCollider.init(this.node, false);

        this.bodyCollider = this.colliderNode.getComponent(cc.Collider);
        // this.pickCollider = this.pickUpNode.getComponent(cc.Collider);
        this.bodyCollider.tag = tid;
        // var colliders = this.node.getComponentsInChildren(cc.Collider);
        // for (var collider of colliders) {
        //     collider.tag = tid;
        // }
        this.logicPlayer = Tools.getOrAddComponent(this.node, 'LogicPlayer');
        this.logicPlayer.init(this);

        this.defenceRect = Tools.getOrAddComponent(this.node, 'DefenceRect');
        this.defenceRect.init(360, 360, true);

        this.attackRect = Tools.getOrAddComponent(this.node, 'AttackRect');
        this.attackRect.init(360, 360, true, false, 1.5);

        this.buffComp = Tools.getOrAddComponent(this.node, 'PlayerBuffComponent');
        this.buffChangeListener = Tools.getOrAddComponent(this.node, 'PlayerBuffChangeListener');
        this.buffChangeListener.init(this);

        if (canFrenzy) {
            this.playerFrenzyComp = Tools.getOrAddComponent(this.node, 'PlayerFrenzyComponent');
            this.playerFrenzyComp.init();
        } else {
            this.playerReviveFrenzyComp = Tools.getOrAddComponent(this.node, 'PlayerReviveFrenzyComponent');
            this.playerReviveFrenzyComp.init();
        }

        this.isDead = false;
        this.isInView = false;

        this.node.on('addBuff', this.addBuff, this);
        this.node.on('addKnife', this.addKnife, this);
        this.node.on('die', this.die, this);
        this.node.on('isCollCircleWall', this.isCollCircleWall, this);
        this.node.on('changeMagnet', this.changeMagnet, this);
        this.node.on('killByGuide', this.killByGuide, this);

        this.changeSkin();

        this.suitComp = Tools.getOrAddComponent(this.node, 'PlayerSuitComponent');
        this.suitComp.init(this);
    },

    changeSkin: function changeSkin() {
        var self = this;
        self.heroTeamIcon.node.active = false;
        self.heroIcon.node.active = false;

        // if (self.heroSkin) {
        //     AddEntitySystem.instance.loadHeroSkinSprite(self.heroIcon, self.heroSkin.skinIndex, () => {
        //         if (self.heroSkin) {
        //             self.heroIcon.node.active = true;
        //         }
        //     });
        // } else {
        //     AddEntitySystem.instance.loadHeroSkinSprite(self.heroTeamIcon, (self.teamID - 1), () => {
        //         if (!self.heroSkin) {
        //             self.heroTeamIcon.node.active = true;
        //         }
        //     });
        // }
        if (self.heroSkin) {
            cc.loader.loadRes(self.heroSkin.url, cc.SpriteFrame, function (error, resource) {
                if (error) {
                    cc.error(error);
                } else if (resource) {
                    if (self.heroSkin) {
                        self.heroIcon.spriteFrame = resource;
                        self.heroIcon.node.active = true;
                    }
                }
            });

            //刷新皮肤属性效果
            switch (this.heroSkin.property) {
                case HeroSkinProperty.Speed:
                    this.heroMove.changeSkinSpeedAddition(this.heroSkin.propertyParam / 100);
                    this.openShadow();
                    break;
                default:
                    this.heroMove.changeSkinSpeedAddition(0);
                    this.closeShadow();
                    break;
            }
        } else {
            cc.loader.loadRes('texture/hero/player00' + self.teamID, cc.SpriteFrame, function (error, resource) {
                if (error) {
                    cc.error(error);
                } else if (resource) {
                    if (!self.heroSkin) {
                        self.heroTeamIcon.spriteFrame = resource;
                        self.heroTeamIcon.node.active = true;
                    }
                }
            });

            this.heroMove.changeSkinSpeedAddition(0);
            this.closeShadow();
        }

        this.changeSuit();
    },

    changeKnifeSkin: function changeKnifeSkin(knifeSkin) {
        this.skin = knifeSkin;
        this.changeSuit();
    },

    changeSuit: function changeSuit() {
        if (this.skin && this.heroSkin) {
            if (this.skin.suit && this.heroSkin.suit && this.skin.suit === this.heroSkin.suit) {
                this.suit = this.skin.suit;
            } else {
                this.suit = null;
            }
        } else {
            this.suit = null;
        }

        if (this.suitComp) {
            this.suitComp.changeSuit();
        }
    },
    changeEffectColor: function changeEffectColor() {
        if (this.heroSkin) {
            this._defenceEffect.changeColorByHex(this.heroSkin.hexColor);
            this._dieEffect.changeColorByHex(this.heroSkin.hexColor);
        } else {
            this._defenceEffect.changeColor(this.teamID);
            this._dieEffect.changeColor(this.teamID);
        }
    },

    startGame: function startGame(isGuide) {
        this.isStartGame = true;
        this.followPlayer.node.emit('startGame', isGuide);
        this.rankIconNode.active = true;
        this.playerName.frameNode.active = false;
        if (this._frenzyBar) {
            this._frenzyBar.active = true;
        }
        if (this.isLocal) {
            // const playSoundByOwner = Tools.getOrAddComponent(this.node, 'PlaySoundByOwner');
            // playSoundByOwner.init(this);
            this.moveByKeyboard = Tools.getOrAddComponent(this.node, 'MoveByKeyboard');
            // this.heroMove = Tools.getOrAddComponent(this.node, 'HeroMove');

            this.moveByTouch = Tools.getOrAddComponent(this.touchNode, 'MoveByTouch');
            this.moveByTouch.init(this);

            this.MoveStateNotice = Tools.getOrAddComponent(this.node, 'MoveStateNotice');
            this.MoveStateNotice.init(this, this.followPlayer.knivesCmp);

            if (this.canFrenzyBorn) {
                this.node.emit('onFrenzyAdd', FrenzyAddType.tryFrenzy);
            } else if (this.canAddBornFrenzy) {
                this.node.emit('onFrenzyAdd', FrenzyAddType.born);
            }
        } else {
            if (!isGuide) {
                this.aiMgr = Tools.getOrAddComponent(this.node, 'AIMgr');
                this.aiMgr.init(this.heroMove.moveSpeed, this.aiLevel, this);
            }
            // var moveAI = Tools.getOrAddComponent(this.node, 'MoveAI');
            // this.heroMove = Tools.getOrAddComponent(this.node, 'HeroMove');

            // moveAI.init(heroMove.moveSpeed);
        }
    },

    beKilled: function beKilled() {
        return this.isDead || this.firstDead;
    },

    die: function die(knife) {
        var forceDie = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        // console.log('player die, killTid is ', + knife.tag)
        // if (this.isLocal) {
        // 分享复活决定的无敌
        if (this.invincible) {
            return;
        }

        // buff决定的无敌
        if (this.isInvincible() && !forceDie) {
            return;
        }

        var canRevive = this._stage !== StageType.Free || this.reviveCount === 0;

        if (!this.firstDead && canRevive) {
            this.firstDead = true;
            this.waitToDie = true;
            this.reviveTime = 5;
            this.waitToRevive = false;
            this.showRebornEffect = HeroRebornEffectState.Close;

            if (this.moveByTouch) {
                this.moveByTouch.touchEndEvent();
            }

            // this.followPlayer.knifeCollisionSoundCtrl.stop();
            // this.followPlayer.node.active = false;
            // this.followPlayer.knivesCmp.emitAllKnivesRelease();
            this.rankIconNode.active = false;
            this._flagNode.active = false;
            if (this._keyNode) this._keyNode.active = false;
            this.followPlayer.die();
            this.buffComp.die();
            this.suitComp.die();
            if (this.aiMgr) {
                this.aiMgr.onDie();
            }

            this.activeNode.active = false;
            this.bodyCollider.notColliderFlag = true;
            // this.pickCollider.notColliderFlag = true;
            this.playerName.node.active = false;
            if (this._defenceTips) this._defenceTips.active = false;
            if (this._defenceStartEffect) this._defenceStartEffect.node.active = false;
            if (this._attackStartEffect) this._attackStartEffect.node.active = false;

            if (knife && knife.node) {
                var followPlayer = knife.node.parent.parent.getComponent('EntityFollowPlayer');
                var guide = knife.node.parent.getComponent('EntityGuide');
                if (followPlayer) {
                    this.killer = followPlayer.player;
                } else if (guide) {
                    this.killer = guide.player;
                } else {
                    this.killer = null;
                }

                if (this.killer) {
                    this.killer.addKillNum(this);
                }
            }

            this._dieEffect.node.active = true;
            this._dieEffect.playParticle();
            if (this.isLocal && knife) {
                AudioEngine.instance.playSound(SoundID.Death);
            } else {
                AudioEngine.instance.playSound(SoundID.Kill);
            }
            return;
        }

        if (this.waitToDie) {
            return;
        }
        // }

        if (!this.isDead) {
            this.isDead = true;
            if (this.moveByTouch) {
                this.moveByTouch.touchEndEvent();
            }
            this.followPlayer.die();
            this.buffComp.die();
            this.suitComp.die();
            if (this.aiMgr) {
                this.aiMgr.onDie();
            }
            this.activeNode.active = false;
            this.bodyCollider.notColliderFlag = true;
            // this.pickCollider.notColliderFlag = true;
            this.playerName.node.active = false;
            this.rankIconNode.active = false;
            this._flagNode.active = false;
            if (this._keyNode) this._keyNode.active = false;
            if (knife && knife.node) {
                var followPlayer = knife.node.parent.parent.getComponent('EntityFollowPlayer');
                this.killer = followPlayer ? followPlayer.player : null;
                if (this.killer) {
                    this.killer.addKillNum(this);
                }
            }

            this._dieEffect.node.active = false;
            if (this._defenceTips) this._defenceTips.active = false;
            if (this._defenceStartEffect) this._defenceStartEffect.node.active = false;
            if (this._attackStartEffect) this._attackStartEffect.node.active = false;

            if (this.isLocal && knife) {
                AudioEngine.instance.playSound(SoundID.Death);
            } else {
                // AudioEngine.instance.playSound(SoundID.Kill);
            }
            if (this.deadCallbcak) {
                this.deadCallbcak(this.node.position);
            }
        }
    },

    revive: function revive(isFrenzy) {

        this.firstDead = false;
        this.waitToDie = false;
        this.activeNode.active = true;
        this.bodyCollider.notColliderFlag = false;
        // this.pickCollider.notColliderFlag = false;
        this.playerName.node.active = true;
        this.followPlayer.node.active = true;
        this.rankIconNode.active = true;
        this._flagNode.active = true;
        this._dieEffect.node.active = false;
        this.reviveCount++;
        this.flag = false;
        if (this._keyNode) this._keyNode.active = this.isKey;

        if (this.isLocal) {
            this.invincible = true;
            this.invincibleTime = 2.0;
        }
        if (isFrenzy) {
            this.node.emit('onReviveFrenzyAdd', FrenzyAddType.revive);
        }
        // this.setSage(true);
    },

    updateDieLogic: function updateDieLogic(dt) {
        if (this.invincible) {
            this.invincibleTime -= dt;
            if (this.invincibleTime < 0) {
                this.invincible = false;
                // this.setSage(false);
            }
        }
    },

    setSage: function setSage(value) {
        // this.isSage = value;
        // this.node.opacity = value ? 128 : 255;
        // this.followPlayer.node.emit('setSage', value);
    },

    updateReviveLogic: function updateReviveLogic(dt) {
        if (this.firstDead) {
            this.reviveTime -= dt;
            if (this.reviveTime < 0) {
                this.waitToRevive = true;
            } else if (this.reviveTime < 2) {
                if (this.showRebornEffect === HeroRebornEffectState.Close) {
                    this.showRebornEffect = HeroRebornEffectState.waitToShow;
                }
            }
        }
    },

    initWalls: function initWalls(type, walls, width, height) {
        switch (type) {
            case 0:
                this.moveFix = Tools.getOrAddComponent(this.node, 'HeroMoveFix');
                this.moveFix.init(this.colliderNode.getComponent(cc.Collider));
                this.moveFix.initWalls(walls);
                break;
            case 1:
                this.moveFix = Tools.getOrAddComponent(this.node, 'HeroMoveFixByCircle');
                this.moveFix.init(this.colliderNode.getComponent(cc.Collider), this.followPlayer);
                this.moveFix.refresh(width, height);
                break;
        }
        if (this.aiMgr) {
            this.aiMgr.initWalls(type);
        }
        if (this.myGuideComp) {
            this.myGuideComp.initWalls(type, walls, width, height);
        }
    },

    refreshWalls: function refreshWalls(width, height) {
        this.moveFix.refresh(width, height);
        this.myGuideComp.moveFix.refresh(width, height);
    },

    addKnife: function addKnife(detail) {
        if (this.isNoMoreKnife()) {
            detail.getComponent('EntityKnife').reLand();
        } else {
            this.followPlayer.knivesCmp.addKnife(detail);
        }
    },

    addBuff: function addBuff(buffId) {
        if (this.beKilled()) return;
        this.node.emit('updateBuffState', buffId);
    },

    /** @override */
    updateGameLogic: function updateGameLogic(dt, world) {

        var knifes = world.knifes;
        this.updateDieLogic(dt);

        if (!this.beKilled() && this.aiMgr) {
            this.aiMgr.updateGameLogic(dt);
        }

        this.heroMove.updateGameLogic(dt);
        this.heroScale.updateGameLogic(dt);
        this.moveFixByBlock.updateGameLogic(dt);
        if (this.moveFix) {
            this.moveFix.updateGameLogic(dt);
        }
        if (this.moveGuideFix) {
            this.moveGuideFix.updateGameLogic(dt);
        }

        this.followPlayer.updateGameLogic(dt);
        this.logicPlayer.updateLogic(dt);

        if (this.speedShadow) this.speedShadow.updateGameLogic(dt);
        if (this.canMagnet) this.updateMagnetLogic(dt, knifes);

        this.buffComp.updateGameLogic(dt);
        if (!this.beKilled()) {
            this.suitComp.updateGameLogic(dt, world, knifes);
        }

        if (this.updateKey) {
            world.updateKeyCount(this.otherKeyNode);
            this.updateKey = false;
        }
        // if (this.isLocal) this.updateLightingLogic(dt, world, knifes);
        // this.drawLighting();
    },
    // update (dt) {},

    getKnifeNum: function getKnifeNum() {
        return this.followPlayer.knivesCmp.getKnifeNum();
    },

    stopControl: function stopControl() {
        this.isStopCtrl = true;
        this.moveByKeyboard.enabled = false;
        this.moveByTouch.enabled = false;
        this.MoveStateNotice.enabled = false;
    },

    changeName: function changeName(name) {
        this.name = name ? name : 'player';
        this.playerName.nickname.string = this.name;
        var width = Tools.getStrlen(this.name) * 10 + 10;
        this.playerName.frameNode.width = width;
        this._rankComp.bg.width = width;
        this._rankComp.icon.node.x = width / 2;
        this._flagComp.icon.node.x = -width / 2;
        this.nameDirty = true;
    },

    setLocalHero: function setLocalHero(hero) {
        if (!this.isLocal && this.aiMgr) {
            this.aiMgr.setLocalHero(hero);
        }
    },

    setInView: function setInView(isShow) {
        // if (this.playerName.node.active !== isShow && !this.beKilled()) {
        //     this.playerName.node.active = isShow && !this.beKilled();
        // }

        this.isInView = isShow;
    },

    heroStartMove: function heroStartMove() {
        if (this.isStopCtrl) return;
        this.isDefence = false;
        this.invincible = false;
        if (this._defenceTips) {
            // this._defenceTips.active = false;
        }
        if (this._attackStartEffect && !this.isDead) {
            if (this._defenceStartEffect) this._defenceStartEffect.node.active = false;
            this._attackStartEffect.node.active = true;
            this._attackStartEffect.play();
        }
    },

    heroStopMove: function heroStopMove() {
        if (this.isStopCtrl) return;
        this.isDefence = true;
        if (this._defenceTips && !this.isCollisionWall & !this.isDead) {
            // this._defenceTips.active = true;
        }
        if (this._defenceStartEffect && !this.isCollisionWall & !this.isDead) {
            if (this._attackStartEffect) this._attackStartEffect.node.active = false;
            this._defenceStartEffect.node.active = true;
            this._defenceStartEffect.play();
        }
    },

    setFinalRank: function setFinalRank(rank) {
        if (!this.flag) {
            this.flag = true;
            this.rank = rank;
        }
    },

    setKillCallback: function setKillCallback(callback) {
        this.killCallbcak = callback;
    },

    setDeadCallback: function setDeadCallback(callback) {
        this.deadCallbcak = callback;
    },

    setChangeKnifeCountCallback: function setChangeKnifeCountCallback(callback) {
        this.changeKnifeCountCallback = callback;
    },

    addKillNum: function addKillNum(other) {
        if (this.isLocal && other.isKey) {
            other.isKey = false;
            this.updateKey = true;
            this.otherKeyNode = other.node;
        }
        this.killNum++;
        // this.node.emit('onFrenzyAdd', FrenzyAddType.kill);
        this.node.emit('onFrenzyAdd', FrenzyAddType.kill);
        if (this.killCallbcak) this.killCallbcak();
    },

    addKnifeNum: function addKnifeNum(knifeCount) {
        if (!this.isLocal) return;
        this.pickKnifeCount++;
        this.maxPickKnifeCount = Math.max(this.maxPickKnifeCount, knifeCount);
        // console.log('累计刀数 ', this.pickKnifeCount)
        // console.log('最大刀数 ', this.maxPickKnifeCount)
    },

    //拼掉对手飞刀的数量
    addKillKnifeNum: function addKillKnifeNum() {
        if (!this.isLocal) return;
        this.killKnifeCount++;
        // console.log('累计拼掉刀数 ', this.pickKnifeCount)
    },

    //#region buff属性
    isHard: function isHard() {
        var ret = false;

        if (this.buffChangeListener) {
            ret = this.buffChangeListener.isHard();
        }

        return ret;
    },

    isInvincible: function isInvincible() {
        var ret = false;

        if (this.buffChangeListener) {
            ret = this.buffChangeListener.isInvincible();
        }

        return ret;
    },

    isFrenzy: function isFrenzy() {
        var ret = false;

        if (this.playerFrenzyComp) {
            ret = this.playerFrenzyComp.isFrenzy();
        } else if (this.playerReviveFrenzyComp) {
            ret = this.playerReviveFrenzyComp.isFrenzy();
        }

        return ret;
    },
    //#endregion

    isNoMoreKnife: function isNoMoreKnife() {
        return !this.isInView && this.aiMgr && this.getKnifeNum() >= this.aiMgr.getNoMoreKnifeNum();
    },

    canRevive: function canRevive() {
        return this.aiMgr && this.reviveCount < this.aiMgr.getReviveTotal();
    },

    refreshPowerArrow: function refreshPowerArrow(localPlayer) {
        if (this._powerArrow) this._powerArrow.refresh(this, localPlayer);
    },

    closePowerArrow: function closePowerArrow() {
        if (this._powerArrow) this._powerArrow.close();
    },

    changeAttackPower: function changeAttackPower(count) {
        this.attackPower = count;
    },

    changeDefencePower: function changeDefencePower(count) {
        this.defencePower = count;
    },

    setGoldAddition: function setGoldAddition(count) {
        this.goldAddition = count;
    },

    changeGrowSpeedAddition: function changeGrowSpeedAddition(count) {
        this.heroMove.changeGrowSpeedAddition(count);
    },

    isCollCircleWall: function isCollCircleWall(state) {
        this.followPlayer.node.emit('isCollCircleWall', state);
    },

    showTips: function showTips(type) {
        if (this.beKilled() || !this._defenceTips) return;
        if (this.tipsType === type) return;
        this.tipsType = type;
        if (!this._defenceTips.active) this._defenceTips.active = true;

        var tips = this._defenceTips.children[1].children;
        var bubble = this._defenceTips.children[0];
        if (!tips) return;
        for (var i = 0; i < tips.length; i++) {
            var tip = tips[i];
            if (!tip) return;
            if (i === type) {
                tip.active = true;
                if (bubble) bubble.width = 50 + tip.width;
            } else {
                tip.active = false;
            }
        }
    },

    closeTips: function closeTips(type) {
        if (this.tipsType === null) return;
        this.tipsType = null;
        if (this._defenceTips) {
            this._defenceTips.active = false;
            var tips = this._defenceTips.children[1].children;
            for (var i = 0; i < tips.length; i++) {
                var tip = tips[i];
                if (!tip) return;
                tip.active = false;
            }
        }
    },

    changeMagnet: function changeMagnet(state) {
        this.canMagnet = state;
    },

    updateMagnetLogic: function updateMagnetLogic(dt, knifes) {

        var multip = this.heroScale.newScaleMultip;
        var newScale = (this.node.scale - multip) / 1.5 + multip;
        var index = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = knifes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var knife = _step.value;

                if (knife.teamID === 0 && knife.knifeStateComp.state === KnifeState.Normal && !knife.knifeColliderNodeCtrl.attackCollider.notColliderFlag) {
                    // var worldPos = knife.node.parent.convertToWorldSpaceAR(knife.node.position);
                    // var dir = this.node.convertToNodeSpaceAR(worldPos);
                    // var dis = dir.mag()
                    var dir = knife.node.position.sub(this.node.position);
                    var dis = dir.mag();
                    // knife.dislabel.string = Math.floor(dis);
                    if (dis < 380 * newScale) {
                        index++;
                        // knife.node.emit('onPickUpKnife', this.pickCollider);
                        dir = dir.normalize().mul(20);
                        var finalPosition = knife.node.position.sub(dir);
                        // knife.draw(this.node.position);
                        knife.knifeMoveCtrl.finalPosition = finalPosition;
                    }
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
    },

    updateLightingLogic: function updateLightingLogic(dt, world, knifes) {},


    showNameNode: function showNameNode(show) {
        this.playerName.node.active = show;
        this._flagNode.active = show;
    },

    setScale: function setScale(scale) {
        this.node.emit('changeScaleMultip', scale);
        this.followPlayer.node.emit('changeScaleMultip', scale);
    },
    changeColliderState: function changeColliderState(state) {
        this.nodeCollider.node.active = state;
        this.followPlayer.changeColliderState(state);
    },
    killByGuide: function killByGuide() {
        this.node.emit('onStopMove', true);
    },
    changePosArrTarget: function changePosArrTarget(target) {
        var length = this.posArrowPool.length;
        for (var i = 0; i < length; i++) {
            var posArr = this.posArrowPool[i];
            posArr.changeLocalPlayer(target);
        }
    },
    openShadow: function openShadow() {
        this.speedShadow = Tools.getOrAddComponent(this.node, 'SpeedShadow');
        this.speedShadow.init(this.heroSkin.url, this.shadowNode);
    },
    closeShadow: function closeShadow() {
        if (this.speedShadow) this.speedShadow.close();
    },
    changeOpacity: function changeOpacity(opacity) {
        this.node.opacity = opacity;
        this.followPlayer.node.opacity = opacity;
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
        //# sourceMappingURL=EntityPlayer.js.map
        