(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/entity/EntityEffect.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '87749Dr3G5NJoh7eSYTEozV', 'EntityEffect', __filename);
// scripts/battle/entity/EntityEffect.js

'use strict';

/**
 * @fileoverview 特效实体
 * @author meifan@gameley.cn (梅凡)
 */

var EntityBase = require('EntityBase');
var Tools = require('Tools');
var TEAM_COLOR = require('Types').TEAM_COLOR;

cc.Class({
    extends: EntityBase,

    properties: {
        activeNode: cc.Node
    },

    // onLoad () {}

    // init: function ()

    initAsAnim: function initAsAnim() {
        this.play();
        this.recycleAfterAnim();
    },

    initAsParticle: function initAsParticle() {
        this.playParticle();
        this.recycleAfterTime();
    },

    changeColor: function changeColor(tid) {
        Tools.setNodeColor(this.node, TEAM_COLOR[tid]);
    },

    changeColorByHex: function changeColorByHex(hex) {
        // console.log(hex)
        Tools.setNodeColor(this.node, new cc.Color().fromHEX(hex));
    },

    play: function play() {
        this.activeNode.active = true;
        var anim = this.activeNode.getComponent(cc.Animation);
        anim.play();
    },
    playOnce: function playOnce() {
        var _this = this;

        this.activeNode.active = true;
        var anim = this.activeNode.getComponent(cc.Animation);
        anim.once('finished', function () {
            _this.activeNode.active = false;
        });
        anim.play();
    },
    stop: function stop() {
        this.activeNode.active = false;
    },
    open: function open() {
        this.activeNode.active = true;
        var anim = this.activeNode.getComponent(cc.Animation);
        if (anim) {
            anim.once('finished', function () {
                anim.play(anim._clips[1]._name);
            });
            anim.play(anim._clips[0]._name);
        }
    },
    closeNode: function closeNode() {
        this.activeNode.active = false;
    },
    close: function close() {
        var anim = this.activeNode.getComponent(cc.Animation);
        if (anim) {
            // anim.stop();
            // anim.on('stop', () => {
            // this.activeNode.active = false;
            // anim.off('stop')
            // })
            anim.play(anim._clips[2]._name);
        }
    },


    recycleAfterAnim: function recycleAfterAnim() {
        var anim = this.activeNode.getComponent(cc.Animation);
        if (anim) {
            anim.once('finished', this.recycleSelf, this);
        }
    },

    // /** overwrite */
    // recycleSelf: function () {
    //     this._super();
    //     if(this.isLog) {
    //         console.log("recycle: this.node._pool.count: " + this.node._pool._pool.length);
    //     }
    // },

    playParticle: function playParticle() {
        var particle = this.activeNode.getComponent('cc.ParticleSystem');
        if (particle) {
            particle.resetSystem();
        }
    },

    recycleAfterTime: function recycleAfterTime(time) {
        if (!time) {
            var particle = this.node.getComponent('cc.ParticleSystem');
            if (particle) {
                time = Math.min(particle.life, 0.5);
            }
        }

        if (time) {
            this.needUpdate = true;
            this.recycleTime = time;
        }
    },

    update: function update(dt) {
        if (this.needUpdate) {
            this.recycleTime -= dt;
            if (this.recycleTime <= 0) {
                this.needUpdate = false;

                this.recycleSelf();
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
        //# sourceMappingURL=EntityEffect.js.map
        