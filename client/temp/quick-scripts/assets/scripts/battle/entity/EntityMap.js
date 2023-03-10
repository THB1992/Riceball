(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/entity/EntityMap.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7e5f9cXCFtKtIjpISFI0JTt', 'EntityMap', __filename);
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
        //# sourceMappingURL=EntityMap.js.map
        