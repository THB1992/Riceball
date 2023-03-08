"use strict";
cc._RF.push(module, '173058fGhVKLZ2hm7p0mJSL', 'PanelHeroPosArr');
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