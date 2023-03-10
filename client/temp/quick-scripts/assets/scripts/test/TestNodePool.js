(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/test/TestNodePool.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd60a0VaUjxOALBpBuEcxVBO', 'TestNodePool', __filename);
// scripts/test/TestNodePool.js

'use strict';

/**
 * @fileoverview TestNodePool
 * @author meifan@gameley.cn (梅凡)
 */

var TestNodePool = cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
        this.node.getComponent('EntityEffect').recycleAfterAnim();
    }
}

// init: function ()


);

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
        //# sourceMappingURL=TestNodePool.js.map
        