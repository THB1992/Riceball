(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/ui/PanelMatch.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd02b8uxErNPrIM91YlLhGTA', 'PanelMatch', __filename);
// scripts/battle/ui/PanelMatch.js

'use strict';

var Tools = require('Tools');

cc.Class({
    extends: cc.Component,

    properties: {
        itemParent: cc.Node,
        itemMatchPrefab: cc.Prefab
    },

    cleanUp: function cleanUp() {
        this.itemParent.destroyAllChildren();
    },

    init: function init(players, callback) {
        var _players = players.concat();
        _players.sort(function (a, b) {
            return Math.random() > 0.5 ? -1 : 1;
        });
        var itemPool = [];
        for (var i = 0; i < _players.length; i++) {
            var itemNode = cc.instantiate(this.itemMatchPrefab);
            itemNode.parent = this.itemParent;
            itemNode.x = i % 4 * 150;
            itemNode.y = Math.floor(i / 4) * -150;
            var itemComp = itemNode.getComponent('ItemMatch');
            itemComp.init(_players[i]);
            if (_players[i].isLocal) {
                itemComp.showIcon();
            } else {
                itemPool.push(itemComp);
            }
        }

        itemPool.sort(function (a, b) {
            return Math.random() > 0.5 ? -1 : 1;
        });

        var time = 0;

        var _loop = function _loop(_i) {
            var item = itemPool[_i];
            var showTime = Tools.getRandomInt(100, 400);
            time += showTime;
            setTimeout(function () {
                item.showIcon();
            }, time);
        };

        for (var _i = 0; _i < itemPool.length; _i++) {
            _loop(_i);
        }

        time += 300;
        setTimeout(function () {
            callback();
        }, time);
    }

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
        //# sourceMappingURL=PanelMatch.js.map
        