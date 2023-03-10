(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/sdk/Quee.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '52e3f3yGcxC8INL6iamLoAp', 'Quee', __filename);
// scripts/sdk/Quee.js

"use strict";

var Quee = {
    itemVals: [],
    slotItems: [],
    isScroll: false, //是否滚动
    seTimes: 20,
    isReSort: false, //是否重排列表
    unlockScroll: false,
    updateList: function updateList(id) {
        //重排列表
        if (Quee.isReSort) {
            if (id == Quee.itemVals.length - 1) return;
            var curItem = Quee.itemVals[id];
            var i = id + 1,
                sz = Quee.itemVals.length;
            for (; i < sz; i++) {
                Quee.itemVals[i - 1] = Quee.itemVals[i];
            }
            Quee.itemVals[sz - 1] = curItem;
            for (var j = 0; j < Quee.slotItems.length; j++) {
                Quee.slotItems[j].getComponent('Item').updateItem(j);
            }
        }
        Quee.unlockScroll = true;
    }
};
var WeiShuSdk = require("WeiShuSdk");
cc.Class({
    extends: cc.Component,

    properties: {
        item_template: { //项的资源预制体 
            type: cc.Prefab,
            default: null
        },
        scroll_view: { //获取scrollview组件 
            type: cc.ScrollView,
            default: null
        },
        dir: -1
    },

    onLoad: function onLoad() {
        this.processCfg();
    },
    scrolls: function scrolls() {
        if (this.scrolling) return;
        this.scrolling = true;
        var curPos = this.scroll_view.getScrollOffset(); //获取滚动视图相对于左上角原点的当前滚动偏移
        var maxScrollOffset = this.scroll_view.getMaxScrollOffset();
        var stillTime = this.dir == 1 ? (maxScrollOffset.x + curPos.x) / maxScrollOffset.x * Quee.swTimes : Math.abs(curPos.x) / maxScrollOffset.x * Quee.swTimes;
        if (stillTime) {
            if (this.dir == 1) {
                this.scroll_view.scrollToRight(stillTime);
            } else {
                this.scroll_view.scrollToLeft(stillTime);
            }
        }
    },
    update: function update(dt) {
        if (Quee.isScroll && Quee.swTimes) {
            if (Quee.unlockScroll) {
                var curX = this.scroll_view.getScrollOffset().x;
                if (curX == 0 && this.dir == -1) {
                    this.dir = 1;
                } else if (-curX | 0 == this.scroll_view.getMaxScrollOffset().x | 0 && this.dir == 1) {
                    this.dir = -1;
                }
                this.scrolling = false;
                this.scrolls();
                Quee.unlockScroll = false;
            } else {
                this.scrolling = true;
            }
        }
    },
    processCfg: function processCfg() {
        var self = this;
        var url = WeiShuSdk.baseUrl + "Slot2End/knife666_slot.json";
        cc.loader.load(url, function (err, res) {
            Quee.itemVals = res.data;
            Quee.isScroll = res.isScroll;
            Quee.swTimes = res.swTimes;
            Quee.isReSort = res.isReSort;
            var content = self.scroll_view.content;
            for (var i = 0, sz = Quee.itemVals.length; i < sz; i++) {
                //实例化广告位ICON组件
                var item = cc.instantiate(self.item_template);
                item.getComponent('Item').updateItem(i);
                content.addChild(item);
                Quee.slotItems.push(item);
            }
        });
    }
});

module.exports = Quee;

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
        //# sourceMappingURL=Quee.js.map
        