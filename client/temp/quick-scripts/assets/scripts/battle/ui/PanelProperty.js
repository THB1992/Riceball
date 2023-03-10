(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/ui/PanelProperty.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '82f59wtrFJK35CGw4s6yGZh', 'PanelProperty', __filename);
// scripts/battle/ui/PanelProperty.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        knifePropertyNode: cc.Node,
        knifePropertyLabel: cc.Label,
        heroPropertyNode: cc.Node,
        heroPropertyLabel: cc.Label

    },

    refreshProperty: function refreshProperty(data, isHeroSkin) {
        return;
        if (isHeroSkin) {
            // this.knifePropertyNode.active = false;
            this.heroPropertyNode.active = data.propertyTips ? true : false;
            this.heroPropertyLabel.string = data.propertyTips ? data.propertyTips : '';
        } else {
            // this.heroPropertyNode.active = false;
            this.knifePropertyNode.active = data.propertyTips ? true : false;
            this.knifePropertyLabel.string = data.propertyTips ? data.propertyTips : '';
        }
    },
    refresh: function refresh() {
        return;
        this.knifePropertyNode.active = false;
        this.heroPropertyNode.active = false;
    },
    refreshHero: function refreshHero() {
        this.heroPropertyNode.active = false;
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
        //# sourceMappingURL=PanelProperty.js.map
        