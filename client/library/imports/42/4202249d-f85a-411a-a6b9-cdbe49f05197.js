"use strict";
cc._RF.push(module, '42022Sd+FpBGqa5zb5J8FGX', 'KeyCount');
// scripts/battle/ui/KeyCount.js

'use strict';

var PlayerData = require('PlayerData');
cc.Class({
    extends: cc.Component,

    properties: {
        keys: cc.Node
    },

    open: function open(active) {
        if (!PlayerData.instance.hasGetKey) return;
        this.node.active = active;
        var keyCount = PlayerData.instance.keyCount;
        for (var i = 0; i < 3; i++) {
            this.keys.children[i].active = i < keyCount;
        }
    },
    show: function show(flyKey) {
        var _this = this;

        this.node.active = true;
        var keyCount = PlayerData.instance.keyCount;
        for (var i = 0; i < 3; i++) {
            this.keys.children[i].active = i + 1 < keyCount;
        }
        var key = this.keys.children[keyCount - 1];
        setTimeout(function () {
            key.active = true;
        }, 1600);

        setTimeout(function () {
            _this.node.active = false;
        }, 2000);

        setTimeout(function () {
            var a = flyKey.position;
            var c = _this.node.position.add(cc.v2(50 * (keyCount - 2), 0));
            var b = cc.v2(a.x, c.y);
            var bezier = [a, b, c];
            flyKey.runAction(cc.bezierTo(0.3, bezier).easing(cc.easeIn(1.0)));
        }, 1300);
    }
}

// update (dt) {},
);

cc._RF.pop();