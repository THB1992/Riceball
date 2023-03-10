(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/move/MoveByRandom.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '57f48ogFjBMwooKvAmwdBTS', 'MoveByRandom', __filename);
// scripts/battle/component/move/MoveByRandom.js

'use strict';

var Tools = require('Tools');

cc.Class({
    extends: cc.Component,

    properties: {
        time: 0
    },

    update: function update(dt) {
        var x = Tools.getRandomInt(-2, 2);
        var y = Tools.getRandomInt(-2, 2);
        this.node.emit('onMoveBy', {
            dPos: cc.v2(x, y)
        });
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
        //# sourceMappingURL=MoveByRandom.js.map
        