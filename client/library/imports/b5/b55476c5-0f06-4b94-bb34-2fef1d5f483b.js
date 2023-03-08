"use strict";
cc._RF.push(module, 'b5547bFDwZLlLs0L+8dX0g7', 'LanguageMgr');
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