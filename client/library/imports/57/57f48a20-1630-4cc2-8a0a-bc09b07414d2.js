"use strict";
cc._RF.push(module, '57f48ogFjBMwooKvAmwdBTS', 'MoveByRandom');
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