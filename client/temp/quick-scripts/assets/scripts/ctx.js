(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/ctx.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5d3e7rXsBNF45DJIsr/Grm5', 'ctx', __filename);
// scripts/ctx.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    start: function start() {},
    update: function update(dt) {
        this.node.scale = 1 / this.node.parent.scale;
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
        //# sourceMappingURL=ctx.js.map
        