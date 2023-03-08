"use strict";
cc._RF.push(module, '2330berQZRECK+SS37gSAYe', 'KnifeSkinCtrl');
// scripts/battle/component/knife/ctrl/KnifeSkinCtrl.js

'use strict';

/**
 * @fileoverview 刀的皮肤控制
 * @author zhangzhuang@gameley.cn (张庄)
 */

var KnifeState = require('Types').KnifeState;
cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
        this.knifeStateComp = this.node.parent.getComponent('KnifeStateComponent');
        this.knifeOwnerComp = this.node.parent.getComponent('KnifeOwnerComponent');
        this.node.on('changeSkin', this.changeSkin, this);
    },
    updateLogic: function updateLogic(dt) {
        if (!this.knifeStateComp) this.knifeStateComp = this.node.parent.getComponent('KnifeStateComponent');
        if (!this.knifeOwnerComp) this.knifeOwnerComp = this.node.parent.getComponent('KnifeOwnerComponent');

        //根据组件的状态做逻辑处理
        if (this.knifeOwnerComp.isDirty) {
            this.changeSkin();
        }
    },

    changeSkin: function changeSkin() {
        if (this.knifeOwnerComp.owner) {
            if (this.knifeOwnerComp.owner.getComponent('EntityFollowPlayer')) {
                var player = this.knifeOwnerComp.owner.getComponent('EntityFollowPlayer').player;
                if (player.skin) {
                    var sprite = this.node.getComponent(cc.Sprite);
                    cc.loader.loadRes(player.skin.url, cc.SpriteFrame, function (error, resource) {
                        if (error) {
                            cc.error(error);
                        } else if (resource) {
                            if (sprite.node) {
                                sprite.spriteFrame = resource;
                            }
                        }
                    });
                }
            }
        }
    }
    // update (dt) {},
});

cc._RF.pop();