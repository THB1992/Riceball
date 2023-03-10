(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/entity/EntityFollowPlayer.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4d468NmnlVHzoantyNPTGsY', 'EntityFollowPlayer', __filename);
// scripts/battle/entity/EntityFollowPlayer.js

'use strict';

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var Tools = require('Tools');
var EntityBase = require('EntityBase');
cc.Class({
    extends: EntityBase,

    properties: {
        //type:entityPlayer
        player: null
    },

    init: function init(player) {
        this.player = player;

        var moveWithOwnerNode = Tools.getOrAddComponent(this.node, 'MoveWithOwnerNode');
        moveWithOwnerNode.init(this.node.parent, this, this.player);
        this.knivesCmp = Tools.getOrAddComponent(this.node, 'PlayerKnivesComponent');
        this.knivesCmp.init(player);

        this.knifeCollisionSoundCtrl = Tools.getOrAddComponent(this.node, 'KnifeCollisionSoundCtrl');
        this.knifeCollisionSoundCtrl.init();

        this.heroRotate = Tools.getOrAddComponent(this.node, 'HeroRotate');
        Tools.getOrAddComponent(this.node, 'HeroCollisionWallListener');
        this.followPlayerScale = Tools.getOrAddComponent(this.node, 'FollowPlayerScale');

        this.node.on('addBuff', this.addBuff, this);
        this.node.on('wallCollision', this.wallCollision, this);
        this.node.on('onAttackBox', this.onAttackBox, this);
    },

    onAttackBox: function onAttackBox() {
        this.player.node.emit('onAttackBox');
    },

    wallCollision: function wallCollision(detail) {
        this.player.isCollisionWall = detail;
    },

    updateGameLogic: function updateGameLogic(dt) {
        this.knivesCmp.updateLogic(dt);
        this.heroRotate.updateLogic(dt);
    },


    die: function die() {
        this.knivesCmp.emitAllKnivesRelease();
        this.knifeCollisionSoundCtrl.stop();
        // this.node.active = false;
    },

    addBuff: function addBuff(buffId) {
        if (this.player.beKilled()) return;
        this.player.node.emit('updateBuffState', buffId);
    },

    changeColliderState: function changeColliderState(state) {
        this.knivesCmp.changeColliderState(state);
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
        //# sourceMappingURL=EntityFollowPlayer.js.map
        