"use strict";
cc._RF.push(module, 'd60a0VaUjxOALBpBuEcxVBO', 'TestNodePool');
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