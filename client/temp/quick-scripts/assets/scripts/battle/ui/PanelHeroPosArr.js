(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/ui/PanelHeroPosArr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '173058fGhVKLZ2hm7p0mJSL', 'PanelHeroPosArr', __filename);
// scripts/battle/ui/PanelHeroPosArr.js

'use strict';

/**
 * @fileoverview PanelHeroPosArr
 * @author meifan@gameley.cn (梅凡)
 */

var PanelHeroPosArr = cc.Class({
    extends: cc.Component,

    properties: {
        posArrPrefab: cc.Prefab
    },

    addHeroPosArr: function addHeroPosArr(localPlayer, otherPlayer, camera) {
        var arr = cc.instantiate(this.posArrPrefab);
        var posArr = arr.getComponent('HeroPosArrow');
        arr.parent = this.node;
        posArr.init(localPlayer, otherPlayer, camera);
        localPlayer.posArrowPool.push(posArr);
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
        //# sourceMappingURL=PanelHeroPosArr.js.map
        