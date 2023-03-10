(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/common/LanguageMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b5547bFDwZLlLs0L+8dX0g7', 'LanguageMgr', __filename);
// scripts/common/LanguageMgr.js

'use strict';

var Languages = ['en-us', 'japan', 'korea', 'de', 'ru', 'twn', 'es', 'fr', 'pt'];
var Tools = require('Tools');
var LanguageMgr = cc.Class({
    statics: {
        curLang: 'en-us',
        curIndex: 0,
        setLang: function setLang(index) {
            if (Languages[index]) {
                Tools.setItem('curLanguage', index);
                LanguageMgr.curIndex = index;
                LanguageMgr.curLang = Languages[index];
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
        //# sourceMappingURL=LanguageMgr.js.map
        