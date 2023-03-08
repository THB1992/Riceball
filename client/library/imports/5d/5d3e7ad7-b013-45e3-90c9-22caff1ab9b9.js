"use strict";
cc._RF.push(module, '5d3e7rXsBNF45DJIsr/Grm5', 'ctx');
// scripts/ctx.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    start: function start() {},
    update: function update(dt) {
        this.node.scale = 1 / this.node.parent.scale;
    }
});

cc._RF.pop();