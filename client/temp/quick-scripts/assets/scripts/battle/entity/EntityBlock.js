(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/entity/EntityBlock.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd6746cB9f5M5pnxjMCMi0ZV', 'EntityBlock', __filename);
// scripts/battle/entity/EntityBlock.js

'use strict';

/**
 * @fileoverview 障碍实体
 * @author meifan@gameley.cn (梅凡)
 */

var Tools = require('Tools');
var EntityBase = require('EntityBase');

cc.Class({
    extends: EntityBase,

    properties: {
        defenceRects: []
    },

    // onLoad () {}

    init: function init(x, y) {
        this.node.position = cc.v2(x, y);

        // this.width = width;
        // this.height = height;

        // this.blockSpr.width = width;
        // this.blockSpr.height = height;

        // this.blockCollider.size.width = width;
        // this.blockCollider.size.height = height;

        var boxes = this.node.getComponentsInChildren(cc.BoxCollider);

        var rect = null;
        var xMin = x;
        var xMax = x;
        var yMin = y;
        var yMax = y;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = boxes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var box = _step.value;

                xMin = Math.min(xMin, x + box.node.x - box.size.width / 2);
                xMax = Math.max(xMax, x + box.node.x + box.size.width / 2);
                yMin = Math.min(yMin, y + box.node.y - box.size.height / 2);
                yMax = Math.max(yMax, y + box.node.y + box.size.height / 2);

                // 把box里的碰撞层拿到父节点 为ai计算提供方便
                box.node.parent = this.node.parent;
                box.node.position = cc.v2(x + box.node.x, y + box.node.y);

                rect = Tools.getOrAddComponent(box.node, 'DefenceRect');
                rect.init(box.size.width * 2, box.size.height * 2); //, false, false, 1.0, x + box.node.x - box.size.width / 2, y + box.node.y - box.size.height / 2);
                this.defenceRects.push(rect);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        var circles = this.node.getComponentsInChildren(cc.CircleCollider);

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = circles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var circle = _step2.value;

                xMin = Math.min(xMin, x + circle.node.x - circle.radius / 2);
                xMax = Math.max(xMax, x + circle.node.x + circle.radius / 2);
                yMin = Math.min(yMin, y + circle.node.y - circle.radius / 2);
                yMax = Math.max(yMax, y + circle.node.y + circle.radius / 2);

                circle.node.parent = this.node.parent;
                circle.node.position = cc.v2(x + circle.node.x, y + circle.node.y);

                rect = Tools.getOrAddComponent(circle.node, 'DefenceRect');
                rect.init(circle.radius * 2, circle.radius * 2); //, false, false, 1.0, x + box.node.x - box.size.width / 2, y + box.node.y - box.size.height / 2);
                this.defenceRects.push(rect);
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        this.defenceRect = Tools.getOrAddComponent(this.node, 'DefenceRect');
        this.defenceRect.init((xMax - xMin) * 2, (yMax - yMin) * 2);
    }

    // start() {},

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
        //# sourceMappingURL=EntityBlock.js.map
        