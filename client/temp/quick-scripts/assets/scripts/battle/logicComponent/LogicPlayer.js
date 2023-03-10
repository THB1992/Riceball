(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/logicComponent/LogicPlayer.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1cd0f9DQRBF2qTMO9n0sDmj', 'LogicPlayer', __filename);
// scripts/battle/logicComponent/LogicPlayer.js

'use strict';

var Tools = require('Tools');
/**
 * @fileoverview 玩家的逻辑组件
 * @author jinhaitao@gameley.cn (金海涛)
 */
cc.Class({
    extends: cc.Component,
    properties: {},

    init: function init(entityPlayer) {
        this.entityPlayer = entityPlayer;
        this.knivesCmp = entityPlayer.followPlayer.knivesCmp;
    },

    updateLogic: function updateLogic() {
        if (this.knivesCmp.isDirty) {
            this.knivesCmp.emitAllKnivesCountChange();
            var radius = Tools.getRadiusByKnifeCount(this.knivesCmp.knives.length);
            this.radius = radius;
            this.knivesCmp.node.emit('radiusChange', radius);
            this.entityPlayer.node.emit('radiusChange', radius);
            this.knivesCmp.resetDirty();
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
        //# sourceMappingURL=LogicPlayer.js.map
        