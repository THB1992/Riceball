"use strict";
cc._RF.push(module, '112c8gsj8JHWpoDuWN0W9eI', 'ScrollViewCulling');
// scripts/common/ScrollViewCulling.js

'use strict';

/**
 * @fileoverview ScrollViewCulling
 * @author <liqing@gameley.cn> (李清)
 */

var ListItemBase = require('ListItemBase');

/**
 * ScrollViewCulling ScrollView裁剪类
 */
var ScrollViewCulling = cc.Class({
    extends: cc.Component,

    properties: {
        scrollView: cc.ScrollView,
        mask: cc.Mask,
        layout: cc.Layout,
        listItems: [ListItemBase],
        listParam: null,
        startLine: -1,
        endLine: -1
    },

    init: function init(scrollView, listItems) {
        var listParam = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var mask = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        var layout = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

        this.scrollView = scrollView;
        this.listItems = listItems ? listItems : [];

        if (mask) {
            this.mask = mask;
        } else if (this.scrollView) {
            this.mask = this.scrollView.getComponentInChildren(cc.Mask);
        }
        if (layout) {
            this.layout = layout;
        } else if (this.scrollView && this.scrollView.content) {
            this.layout = this.scrollView.content.getComponent(cc.Layout);
        }
        if (this.scrollView) {
            this.scrollView.node.on('scrolling', this.onScrolling, this);
        }
        if (listParam) {
            this.listParam = listParam;
        } else {
            this.listParam = {};
        }
        if (this.listParam.listItemSize == undefined) {
            var listItem = this.listItems && this.listItems.length > 0 ? this.listItems[0] : null;
            this.listParam.listItemSize = listItem ? cc.size(listItem.node.width, listItem.node.height) : cc.size();
        }
        if (this.listParam.gapSize == undefined) {
            this.listParam.gapSize = this.layout ? cc.size(this.layout.spacingX, this.layout.spacingY) : cc.size();
        }
        if (this.listParam.listSize == undefined) {
            this.listParam.listSize = this.mask ? this.mask.node.getContentSize() : this.scrollView && this.scrollView.content ? this.scrollView.content.getContentSize() : this.scrollView.node.getContentSize();
        }
        if (this.listParam.countPerLine == undefined) {
            this.listParam.countPerLine = 1;
        }
        this.listParam.lineCount = Math.ceil(this.listItems.length / this.listParam.countPerLine);
        // console.log('scrollView:', this.scrollView);
        // console.log('listItems:', this.listItems);
        // console.log('mask:', this.mask);

        if (this.listParam.isHorizon) {
            this.isHorizon = true;
        }

        this.onScrolling(this.scrollView);
    },

    getLayout: function getLayout(layout) {
        if (layout) {
            return layout;
        } else if (this.scrollView && this.scrollView.content) {
            return this.scrollView.getComponent(cc.Layout);
        } else {
            return null;
        }
    },


    // 添加强制刷新功能，在顺序替换时使用
    onScrolling: function onScrolling(scrollView, isForce) {
        // console.log('onScrolling, offset:', scrollView.getScrollOffset());
        var offset = scrollView.getScrollOffset();
        if (!this.isHorizon) {
            var y = offset.y;
            var cellHeight = this.listParam.listItemSize.height + this.listParam.gapSize.height;
            var startLine = Math.floor(y / cellHeight);
            var endLine = Math.floor((y + this.listParam.listSize.height) / cellHeight);
            if (isForce || this.startLine !== startLine || this.endLine !== endLine) {
                this.startLine = startLine;
                this.endLine = endLine;
                var showIndex = 0;
                for (var index = 0; index < this.listItems.length; index++) {
                    var listItem = this.listItems[index];
                    if (listItem.node.active) {
                        var line = Math.floor(showIndex / this.listParam.countPerLine);
                        listItem.setVisible(line >= this.startLine && line <= this.endLine);
                        showIndex++;
                    }
                }
                // console.log('visible line:' + startLine + ' - ' + endLine);
            }
        } else {
            var x = -offset.x;
            var cellWidth = this.listParam.listItemSize.width + this.listParam.gapSize.width;
            var startLine = Math.floor(x / cellWidth);
            var endLine = Math.floor((x + this.listParam.listSize.width) / cellWidth);
            if (isForce || this.startLine !== startLine || this.endLine !== endLine) {
                this.startLine = startLine;
                this.endLine = endLine;
                var showIndex = 0;
                for (var _index = 0; _index < this.listItems.length; _index++) {
                    var _listItem = this.listItems[_index];
                    if (_listItem.node.active) {
                        var _line = Math.floor(showIndex / this.listParam.countPerLine);
                        _listItem.setVisible(_line >= this.startLine && _line <= this.endLine);
                        showIndex++;
                    }
                }
                // console.log('visible line:' + startLine + ' - ' + endLine);
            }
        }
    }
});

cc._RF.pop();