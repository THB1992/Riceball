(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/effect/ScaleByOwner.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0867eiLWk9CCYc4OelZqOi3', 'ScaleByOwner', __filename);
// scripts/battle/component/effect/ScaleByOwner.js

"use strict";

/**
 * @fileoverview ScaleByOwner
 * @author meifan@gameley.cn (梅凡)
 */

var ScaleByOwner = cc.Class({
    extends: cc.Component,

    properties: {
        ownerNode: null
    },

    init: function init(entityNode) {
        this.ownerNode = entityNode;
    },

    update: function update(dt) {
        var newScale = this.ownerNode.scale;

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
        //# sourceMappingURL=ScaleByOwner.js.map
        