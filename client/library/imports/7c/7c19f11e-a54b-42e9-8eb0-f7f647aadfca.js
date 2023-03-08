"use strict";
cc._RF.push(module, '7c19fEepUtC6Y6w9/ZHqt/K', 'VibrateUtil');
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