(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/common/PosFix.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '064d3lUbS5AfqIiz3+t45Dx', 'PosFix', __filename);
// scripts/common/PosFix.js

"use strict";

//fix v2.20 透明度为0时修改position可能失效的问题
cc.Class({
    extends: cc.Component,

    properties: {
        friend: cc.Node
    },

    update: function update(dt) {
        if (this.friend && this.node.position !== this.friend.position) {
            this.node.position = this.friend.position;
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
        //# sourceMappingURL=PosFix.js.map
        