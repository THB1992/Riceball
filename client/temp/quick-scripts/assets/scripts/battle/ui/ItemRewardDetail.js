(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/ui/ItemRewardDetail.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8340bZfpdlDnpo3HWjDM0cz', 'ItemRewardDetail', __filename);
// scripts/battle/ui/ItemRewardDetail.js

'use strict';

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

        roundAndRank: cc.RichText,
        codeLabel: cc.RichText
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init: function init(data) {
        this.roundAndRank.string = '恭喜你在<color=#fff884>"第' + data.round + '轮"</c>世界PK中获得了第' + data.rank + '名';
        this.codeLabel.string = '<color=#64ff76> 获奖码：' + data.codeKey + '</c>';
    }
}

// update (dt) {},
);

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
        //# sourceMappingURL=ItemRewardDetail.js.map
        