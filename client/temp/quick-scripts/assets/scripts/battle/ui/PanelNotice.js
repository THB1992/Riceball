(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/ui/PanelNotice.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7e639Q10g1DraNCi5mzUDHo', 'PanelNotice', __filename);
// scripts/battle/ui/PanelNotice.js

'use strict';

var NoticeType = require('Types').NoticeType;

cc.Class({
    extends: cc.Component,

    properties: {
        notice: [cc.Node],
        isOpen: false
    },

    onLoad: function onLoad() {
        this.noticeArr = [0, 1, 2, 3];
        this.index = 0;
        this.time = 999;
        this.timeLimit = 5;
        this.timeInterval = 3;
        this.isOpen = false;
    },

    update: function update(dt) {
        this.time += dt;

        if (this.time >= this.timeLimit && this.isIn) {
            this.isIn = false;
            var actionOut = cc.fadeOut(1);
            if (this.curType > 8) {
                actionOut = cc.fadeOut(0);
            }
            this.isOpen = false;
            if (this.curNotice) this.curNotice.runAction(actionOut);
        }

        if (this.time >= this.timeInterval + this.timeLimit) {
            this.time = 0;
            this.isIn = true;
            this.curType = this.noticeArr[this.index];
            this.curNotice = this.notice[this.curType];

            if (this.noticeArr[this.index] > 3) {
                this.noticeArr.splice(this.index, 1);
            } else {
                this.index++;
            }
            if (this.index >= this.noticeArr.length) this.index = 0;
            var actionIn = cc.fadeIn(1);
            if (this.curType > 8) {
                actionIn = cc.fadeIn(0);
            }

            this.isOpen = true;
            this.curNotice.runAction(actionIn);
        }
    },

    addSpecialNotice: function addSpecialNotice(type) {
        // console.log(this.noticeArr)
        this.noticeArr.splice(this.index, 0, type);
        // console.log(this.noticeArr)
    },

    showImportantNotice: function showImportantNotice(type) {
        this.addSpecialNotice(type);
        this.time += 9999;
        if (this.curNotice) this.curNotice.opacity = 0;
    },

    close: function close() {
        if (this.curNotice) this.curNotice.opacity = 0;
        this.isOpen = false;
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
        //# sourceMappingURL=PanelNotice.js.map
        