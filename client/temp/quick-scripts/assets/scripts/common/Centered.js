(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/common/Centered.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '29179DUXRJEq6bK60OHAieE', 'Centered', __filename);
// scripts/common/Centered.js

'use strict';

//让子节点以父节点为中心居中
var NodeEvent = cc.Node.EventType;
cc.Class({
    extends: cc.Component,

    editor: CC_EDITOR && {
        menu: 'i18n:MAIN_MENU.component.ui/Centered',
        executeInEditMode: true
    },

    properties: {
        interval: 5,
        widthMax: 0
    },

    onEnable: function onEnable() {
        this._addEventListeners();
        this._doLayoutDirty();
    },

    onDisable: function onDisable() {
        this._removeEventListeners();
    },

    _doLayoutDirty: function _doLayoutDirty() {
        this._layoutDirty = true;
    },

    _addEventListeners: function _addEventListeners() {
        cc.director.on(cc.Director.EVENT_AFTER_UPDATE, this.updateLayout, this);
        this.node.on(NodeEvent.SIZE_CHANGED, this._doLayoutDirty, this);
        this.node.on(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
        this.node.on(NodeEvent.CHILD_ADDED, this._childAdded, this);
        this.node.on(NodeEvent.CHILD_REMOVED, this._childRemoved, this);
        this.node.on(NodeEvent.CHILD_REORDER, this._doLayoutDirty, this);
        this._addChildrenEventListeners();
    },

    _removeEventListeners: function _removeEventListeners() {
        cc.director.off(cc.Director.EVENT_AFTER_UPDATE, this.updateLayout, this);
        this.node.off(NodeEvent.SIZE_CHANGED, this._doLayoutDirty, this);
        this.node.off(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
        this.node.off(NodeEvent.CHILD_ADDED, this._childAdded, this);
        this.node.off(NodeEvent.CHILD_REMOVED, this._childRemoved, this);
        this.node.off(NodeEvent.CHILD_REORDER, this._doLayoutDirty, this);
        this._removeChildrenEventListeners();
    },

    _addChildrenEventListeners: function _addChildrenEventListeners() {
        var children = this.node.children;
        for (var i = 0; i < children.length; ++i) {
            var child = children[i];
            child.on(NodeEvent.SCALE_CHANGED, this._doLayoutDirty, this);
            child.on(NodeEvent.SIZE_CHANGED, this._doLayoutDirty, this);
            child.on(NodeEvent.POSITION_CHANGED, this._doLayoutDirty, this);
            child.on(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
            child.on('active-in-hierarchy-changed', this._doLayoutDirty, this);
        }
    },

    _removeChildrenEventListeners: function _removeChildrenEventListeners() {
        var children = this.node.children;
        for (var i = 0; i < children.length; ++i) {
            var child = children[i];
            child.off(NodeEvent.SCALE_CHANGED, this._doLayoutDirty, this);
            child.off(NodeEvent.SIZE_CHANGED, this._doLayoutDirty, this);
            child.off(NodeEvent.POSITION_CHANGED, this._doLayoutDirty, this);
            child.off(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
            child.off('active-in-hierarchy-changed', this._doLayoutDirty, this);
        }
    },

    _childAdded: function _childAdded(child) {
        child.on(NodeEvent.SCALE_CHANGED, this._doLayoutDirty, this);
        child.on(NodeEvent.SIZE_CHANGED, this._doLayoutDirty, this);
        child.on(NodeEvent.POSITION_CHANGED, this._doLayoutDirty, this);
        child.on(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
        child.on('active-in-hierarchy-changed', this._doLayoutDirty, this);

        this._doLayoutDirty();
    },

    _childRemoved: function _childRemoved(child) {
        child.off(NodeEvent.SCALE_CHANGED, this._doLayoutDirty, this);
        child.off(NodeEvent.SIZE_CHANGED, this._doLayoutDirty, this);
        child.off(NodeEvent.POSITION_CHANGED, this._doLayoutDirty, this);
        child.off(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
        child.off('active-in-hierarchy-changed', this._doLayoutDirty, this);

        this._doLayoutDirty();
    },

    updateLayout: function updateLayout(dt) {
        if (!this._layoutDirty) return;
        this._layoutDirty = false;

        this.widthMax = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.node.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var node = _step.value;

                if (node.active) {
                    this.widthMax += node.width + this.interval;
                }
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

        this.widthMax -= this.interval;

        var posX = -this.widthMax / 2;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = this.node.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _node = _step2.value;

                if (_node.active) {
                    _node.x = posX + _node.width / 2;
                    posX += _node.width + this.interval;
                }
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
        //# sourceMappingURL=Centered.js.map
        