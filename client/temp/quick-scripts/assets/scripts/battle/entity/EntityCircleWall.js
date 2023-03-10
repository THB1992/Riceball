(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/entity/EntityCircleWall.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '665c0Ccsr9DzJ5jIAhk1dH7', 'EntityCircleWall', __filename);
// scripts/battle/entity/EntityCircleWall.js

"use strict";

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
        bgNode: cc.Node,
        wallNode: cc.Node,
        redBgNode: cc.Node,
        blackNode: cc.Node,
        redNode: cc.Node,
        moveSpeed: 0
    },

    init: function init(width, height) {
        this.rate = 1.39;
        width = this.rate * width;
        height = this.rate * height;
        this.bgNode.setContentSize(width, height);
        this.redBgNode.setContentSize(width, height);
        this.wallNode.setContentSize(width, height);

        this.reds = this.redNode.children;
        this.blacks = this.blackNode.children;
        this.setNodes(this.reds, width, height);
        this.setNodes(this.blacks, width, height);
    },

    setNodes: function setNodes(nodes, width, height) {
        nodes[0].position = cc.v2(-width / 2, 0);
        nodes[1].position = cc.v2(width / 2, 0);
        nodes[0].setContentSize(width, height * 2);
        nodes[1].setContentSize(width, height * 2);

        nodes[2].position = cc.v2(0, -height / 2);
        nodes[3].position = cc.v2(0, height / 2);
        nodes[2].setContentSize(width * 2, height);
        nodes[3].setContentSize(width * 2, height);
    },

    refreshNodes: function refreshNodes(nodes, dt) {
        var move = this.moveSpeed * dt * this.rate;
        nodes[0].x += move;
        nodes[1].x -= move;

        nodes[2].y += move;
        nodes[3].y -= move;
    },

    setMoveSpeed: function setMoveSpeed(speed) {
        this.moveSpeed = speed;
    },
    // LIFE-CYCLE CALLBACKS:
    startRedBg: function startRedBg() {
        if (!this.redBgNode.active) {
            this.redBgNode.active = true;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.reds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var node = _step.value;

                    node.active = true;
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
        }
    },

    closeRedBg: function closeRedBg() {
        if (this.redBgNode.active) {
            this.redBgNode.active = false;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.reds[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var node = _step2.value;

                    node.active = false;
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
        }
    },

    updateGameLogic: function updateGameLogic(dt) {
        var width = this.bgNode.width - this.moveSpeed * dt * 2 * this.rate;
        var height = this.bgNode.height - this.moveSpeed * dt * 2 * this.rate;

        this.bgNode.setContentSize(width, height);
        this.redBgNode.setContentSize(width, height);
        this.wallNode.setContentSize(width, height);

        this.refreshNodes(this.reds, dt);
        this.refreshNodes(this.blacks, dt);
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
        //# sourceMappingURL=EntityCircleWall.js.map
        