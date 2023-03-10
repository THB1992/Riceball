(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/common/Loading.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6c86cdqfzZORrA/IhgU3+eJ', 'Loading', __filename);
// scripts/common/Loading.js

"use strict";

/**
 * @fileoverview Loading类的实现
 * @author <liqing@gameley.cn> (李清)
 */

/**
 * Loading 游戏入口
 */
var Loading = cc.Class({
    extends: cc.Component,

    statics: {},

    properties: {
        // loadTips: cc.Label,
        waitTime: 0.2,
        needUpdate: false
    },

    onLoad: function onLoad() {
        // if (cc.sys.platform === cc.sys.WECHAT_GAME) {
        //     const version = wx.getSystemInfoSync().SDKVersion;
        //     if (Tools.compareVersion(version, '2.1.0') >= 0) {
        //         const self = this;
        //         cc.loader.downloader.loadSubpackage('res', function (err) {
        //             if (err) {
        //                 return console.error(err);
        //             }
        //             // console.log('load subpackage res successfully.');

        //             self.init();
        //         });

        //     } else {
        //         wx.showModal({
        //             title: '提示',
        //             content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        //         });
        //     }
        // } else {
        this.init();
        // }
    },

    init: function init() {
        this.waitTime = 0.2;
        this.needUpdate = true;

        // cc.director.preloadScene("Battle");
    },

    update: function update(dt) {
        if (this.needUpdate) {
            this.waitTime -= dt;
            if (this.waitTime <= 0) {
                this.needUpdate = false;
                cc.director.loadScene("Battle");
            }
        }
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
        //# sourceMappingURL=Loading.js.map
        