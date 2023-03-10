(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/knife/ctrl/KnifeColliderNodeCtrl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b2ef3EKvGRIorSKNkVlj3B3', 'KnifeColliderNodeCtrl', __filename);
// scripts/battle/component/knife/ctrl/KnifeColliderNodeCtrl.js

'use strict';

var KnifeMomentState = require('Types').KnifeMomentState;
var KnifeColliderState = require('Types').KnifeColliderState;
var GameData = require('GameData');

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init: function init(attackNode) {
        //, pickNode, landNode, attackHeroNode) {
        this.attackNode = attackNode;
        // this.pickNode = pickNode;
        // this.landNode = landNode;
        this.knifeStateComp = this.node.getComponent('KnifeStateComponent');

        this.attackCollider = attackNode.getComponent(cc.BoxCollider);
        // this.attackHeroCollider = attackHeroNode.getComponent(cc.BoxCollider);
        // this.pickCollider = pickNode.getComponent(cc.BoxCollider);
        // this.landCollider = landNode.getComponent(cc.BoxCollider);


        this.throwKnifeFinish();
    },

    // 被捡
    pickKnife: function pickKnife() {
        // this.attackNode.active = true;
        // this.pickNode.active = true;
        // this.landNode.active = false;

        this.attackCollider.notColliderFlag = false; // this.attackCollider.tag !== GameData.instance.localHeroTid;
        // this.attackHeroCollider.notColliderFlag = this.attackHeroCollider.tag === GameData.instance.localHeroTid;
        // this.pickCollider.notColliderFlag = false;
        // this.landCollider.notColliderFlag = true;

        this.attackCollider.collState = KnifeColliderState.Attack;
    },

    throwKnifeStart: function throwKnifeStart() {
        // this.attackNode.active = false;
        // this.pickNode.active = false;
        // this.landNode.active = false;


        this.attackCollider.notColliderFlag = true;
        // this.attackHeroCollider.notColliderFlag = true;
        // this.pickCollider.notColliderFlag = true;
        // this.landCollider.notColliderFlag = true;
        this.attackCollider.collState = KnifeColliderState.Throw;
    },

    throwKnifeFinish: function throwKnifeFinish() {
        // this.attackNode.active = false;
        // this.pickNode.active = false;
        // this.landNode.active = true;


        this.attackCollider.notColliderFlag = //true;
        // this.attackHeroCollider.notColliderFlag = true;
        // this.pickCollider.notColliderFlag = true;
        // this.landCollider.notColliderFlag = false;

        this.attackCollider.collState = KnifeColliderState.Land;
    },

    updateLogic: function updateLogic(dt) {
        if (!this.knifeMomentStateComp) this.knifeMomentStateComp = this.node.getComponent('KnifeMomentStateComponent');

        //根据组件的状态做逻辑处理
        if (this.knifeMomentStateComp.isDirty) {
            switch (this.knifeMomentStateComp.state) {
                case KnifeMomentState.Capture:
                case KnifeMomentState.Init:
                    this.pickKnife();
                    break;
                case KnifeMomentState.Release:
                    this.throwKnifeStart();
                    break;
                case KnifeMomentState.ReleaseFinish:
                    this.throwKnifeFinish();
                    break;
            }
        }
    }
    // update (dt) {},
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
        //# sourceMappingURL=KnifeColliderNodeCtrl.js.map
        