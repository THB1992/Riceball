(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/component/player/SpeedShadow.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f33fa30DY1DpZUcH0RFmOCh', 'SpeedShadow', __filename);
// scripts/battle/component/player/SpeedShadow.js

'use strict';

var Tools = require('Tools');

cc.Class({
    extends: cc.Component,

    properties: {
        posArr: [],
        posArrMaxLength: 30,
        shadowCount: 4,
        shadowPool: []
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init: function init(iconUrl, parent) {
        var _this = this;

        // this.offset = this.node.position.sub(this.node.parent.position);
        this.canUpdate = true;

        var _loop = function _loop(i) {
            var node = _this.shadowPool[i];
            if (!node) {
                node = new cc.Node();
                node.parent = parent;
                node.opacity = (i + 1) / _this.shadowCount * 255;
                _this.shadowPool[i] = node;
                _this.posArr[i] = _this.node.position;
            }
            node.active = true;
            var sprite = Tools.getOrAddComponent(node, 'cc.Sprite');
            sprite.spriteFrame = null;
            cc.loader.loadRes(iconUrl, cc.SpriteFrame, function (error, resource) {
                if (error) {
                    cc.error(error);
                } else if (resource) {
                    sprite.spriteFrame = resource;
                }
            });
        };

        for (var i = 0; i < this.shadowCount; i++) {
            _loop(i);
        }
    },

    close: function close() {
        this.canUpdate = false;
        for (var i = 0; i < this.shadowCount; i++) {
            var _node = this.shadowPool[i];
            _node.active = false;
        }
    },

    updateGameLogic: function updateGameLogic(dt) {
        if (this.canUpdate) {
            this.updateShadow(0.02);
        }
        // this.posArr.push(this.node.position);
        // if (this.posArr.length > this.posArrMaxLength) {
        //     this.posArr.splice(0, 1);
        // }
    },


    updateShadow: function updateShadow(dt) {
        // console.log('-----------------------------')
        for (var i = 0; i < this.shadowCount; i++) {
            var node = this.shadowPool[i];
            var op = node.opacity - 255 * dt * 2;
            if (op > 0) {
                node.opacity = op;
                var pos = this.posArr[i].sub(this.node.position);
                node.position = pos;
            } else {
                node.position = cc.v2(0, 0);
                this.posArr[i] = this.node.position;
                node.opacity = 255 + op;
            }
            node.scale = node.opacity / 255 * 0.5 + 0.5;
            // console.log(node.opacity)

            // node.opacity = (i + 1) / (this.shadowCount + 1) * 255;
            // var index = this.posArrMaxLength / this.shadowCount * (i + 1);
            // var pos = this.posArr[index];
            // if (pos) {
            //     pos = pos.sub(this.node.position);
            //     if (pos !== node.position) {
            //         node.position = pos;
            //     }
            // }

            // if (node.scale !== this.node.scale) {
            //     node.scale = this.node.scale;
            // }
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
        //# sourceMappingURL=SpeedShadow.js.map
        