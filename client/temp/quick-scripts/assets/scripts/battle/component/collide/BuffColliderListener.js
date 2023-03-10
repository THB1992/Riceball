(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/collide/BuffColliderListener.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'acb4aJbQGNDvbyj+zPKmni5', 'BuffColliderListener', __filename);
// scripts/battle/component/collide/BuffColliderListener.js

'use strict';

var KnifeState = require('Types').KnifeState;
var GameData = require('GameData');

cc.Class({
    extends: cc.Component,

    properties: {},

    init: function init(buff) {
        this.buff = buff;
        this.node.on('onPickUpBuff', this.onPickUpBuff, this);
    },

    // otherCollider可能是刀的碰撞组件也可能是人的，node节点不是主体,传事件得传递
    onPickUpBuff: function onPickUpBuff(otherCollider) {
        this.node.emit('onByPick');
        // this.node.active = false;
        otherCollider.node.emit('emitEvent', ['addBuff', this.buff.buffState]);
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
        //# sourceMappingURL=BuffColliderListener.js.map
        