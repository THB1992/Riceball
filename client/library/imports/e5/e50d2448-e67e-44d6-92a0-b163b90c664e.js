"use strict";
cc._RF.push(module, 'e50d2RI5n5E1pKgsWO5DGZO', 'GoldAnim');
// scripts/common/GoldAnim.js

"use strict";

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        coin: cc.Prefab,
        editBox: cc.EditBox
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        this.arr = [];
        for (var j = 0; j < 3; j++) {
            this.arr[j] = [];
            for (var i = 0; i < 20; i++) {
                var gold = cc.instantiate(this.coin);
                gold.parent = this.node;
                gold.opacity = 0;
                this.arr[j].push(gold);
            }
        }
    },
    onClick: function onClick(count, num, offset, final) {
        var _this = this;

        var _loop = function _loop(j) {
            setTimeout(function () {
                var _loop2 = function _loop2(i) {
                    var gold = _this.arr[j][i];
                    gold.opacity = 255;
                    // let fadeIn = cc.fadeIn(0.5);
                    pos = cc.v2(Math.cos(i / num * 2 * Math.PI) * 250 + offset.x, Math.sin(i / num * 2 * Math.PI) * 300 + offset.y);


                    if (pos.y > 0) {
                        pos.y += pos.y / 2;
                    } else {
                        pos.y += Math.random() * 100 + 100;
                    }

                    var moveTo1 = cc.moveTo(Math.random() * 0.2 + 0.4, pos).easing(cc.easeCircleActionInOut(1.0));
                    var moveTo2 = cc.moveTo(Math.random() * 0.2 + 0.6, final).easing(cc.easeCircleActionInOut(1.0));
                    var callf = cc.callFunc(function () {
                        gold.opacity = 0;
                    });
                    gold.position = offset;

                    gold.stopAllActions();
                    gold.runAction(cc.sequence(moveTo1, moveTo2, callf));
                    // setTimeout(() => {
                    //     gold.runAction(moveTo2);
                    // }, i * 50 + 200);
                };

                for (var i = 0; i < num; i++) {
                    var pos;

                    _loop2(i);
                }
            }, j * 400);
        };

        for (var j = 0; j < count; j++) {
            _loop(j);
        }
    },
    update: function update() {},
    onset: function onset() {
        cc.director.getScheduler().setTimeScale(Number.parseFloat(this.editBox.string));
    },
    onGetNormal: function onGetNormal(callback, offset, final) {
        this.onClick(1, 10, offset, final);
        setTimeout(callback, 1000);
    },
    onGetMore: function onGetMore(callback, offset, final) {
        this.onClick(1, 20, offset, final);
        setTimeout(callback, 1400);
    },
    onGetLucky: function onGetLucky(callback, offset, final) {
        this.onClick(3, 20, offset, final);
        setTimeout(callback, 1800);
    }
}
// update (dt) {},
);

cc._RF.pop();