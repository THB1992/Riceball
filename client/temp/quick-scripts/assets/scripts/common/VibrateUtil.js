(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/common/VibrateUtil.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7c19fEepUtC6Y6w9/ZHqt/K', 'VibrateUtil', __filename);
// scripts/common/VibrateUtil.js

'use strict';

var GameData = require('GameData');

var VibrateUtil = cc.Class({
    statics: {
        instance: null,
        vibrate: function vibrate(isLong) {
            if (GameData.instance._vibrateOpen) {
                if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                    if (isLong) {
                        wx.vibrateLong();
                    } else {
                        wx.vibrateShort();
                    }
                } else if (cc.sys.isNative) {
                    // if(cc.sys.os === cc.sys.OS_IOS) {
                    //     jsb.reflection.callStaticMethod('JSC', isLong ? 'ddd1' : 'ddd3');
                    //     // jsb.reflection.callStaticMethod('VibratorWrapper', isLong ? 'vibrateLong' : 'vibrateShort');
                    // } else
                    if (cc.sys.os === cc.sys.OS_ANDROID) {
                        jsb.reflection.callStaticMethod('org/cocos2dx/javascript/VibratorWrapper', isLong ? 'vibrateLong' : 'vibrateShort', '()V');
                    } else if (cc.sys.os === cc.sys.OS_IOS) {
                        if (isLong) {
                            jsb.reflection.callStaticMethod("JSC", "ddd1");
                        } else {
                            jsb.reflection.callStaticMethod("JSC", "ddd3");
                        }
                    }
                }
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
        //# sourceMappingURL=VibrateUtil.js.map
        