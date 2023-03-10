(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/knife/KnifeInit.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '01b2fZtZKJJ8KIEM6vMpfo4', 'KnifeInit', __filename);
// scripts/battle/component/knife/KnifeInit.js

'use strict';

/**
 * @fileoverview 玩家自带的刀初始化
 * @author meifan@gameley.cn (梅凡)
 */
var GameData = require('GameData');
var KnifeMomentState = require('Types').KnifeMomentState;
var KnifeInit = cc.Class({
    extends: cc.Component,

    properties: {},

    init: function init(entityPlayer) {
        this.entityPlayer = entityPlayer;
        this.node.emit('changeTag', this.entityPlayer.teamID);
        this.node.emit('updateMomentState', KnifeMomentState.Init);

        // 判定tag是否等于是本地玩家
        if (this.entityPlayer.teamID === GameData.instance.localHeroTid) {
            // this.node.emit('changeKnifeAttackGroup', 'knife');
        } else {}
            // this.node.emit('changeKnifeAttackGroup', 'otherKnife');


            // this.bInit = false;
        this.entityPlayer.addKnife(this.node);
    }

    // lateUpdate: function (dt) {
    //     if(!this.bInit) {
    //         this.bInit = true;


    //     }


    // }

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
        //# sourceMappingURL=KnifeInit.js.map
        