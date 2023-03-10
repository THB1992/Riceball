(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/effect/ScaleFix.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c9f3a36POVD+KVIkw1sWbIf', 'ScaleFix', __filename);
// scripts/battle/component/effect/ScaleFix.js

'use strict';

//修正固化特效的scale
cc.Class({
    extends: cc.Component,

    properties: {},

    init: function init(entityNode) {
        this.ownerNode = entityNode;
    },

    update: function update(dt) {
        var multip = this.ownerNode.getComponent('HeroScale').newScaleMultip;
        var newScale = (this.ownerNode.scale - multip) / 1.5 + multip;
        // if (this.ownerNode.getComponent('EntityPlayer').isDefence) {
        //     newScale = 0.9 * newScale;
        // }
        if (this.node.scale !== newScale) this.node.scale = newScale;
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
        //# sourceMappingURL=ScaleFix.js.map
        