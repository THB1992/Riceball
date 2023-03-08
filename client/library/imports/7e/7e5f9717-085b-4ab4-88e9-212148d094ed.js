"use strict";
cc._RF.push(module, '7e5f9cXCFtKtIjpISFI0JTt', 'EntityMap');
// scripts/battle/entity/EntityMap.js

'use strict';

/**
 * @fileoverview 地图实体
 * @author meifan@gameley.cn (梅凡)
 */

var Tools = require('Tools');
var EntityBase = require('EntityBase');

cc.Class({
    extends: EntityBase,

    properties: {
        mapWidth: 0,
        mapHeight: 0,
        mapSprs: [cc.Node]

    },

    // onLoad () {}

    init: function init(id, width, height) {
        this.mapWidth = width;
        this.mapHeight = height;
        this.mapSprs[id].active = true;
        this.mapSprs[id].setContentSize(width, height);
    }

    // start() {},

    // update (dt) {},
});

cc._RF.pop();