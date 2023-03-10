(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/ui/ListItemBase.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '025ffByl6REMIXVTckefnig', 'ListItemBase', __filename);
// scripts/battle/ui/ListItemBase.js

'use strict';

/**
 * @fileoverview ListItemBase
 * @author <liqing@gameley.cn> (李清)
 */

var Tools = require('Tools');

/**
 * ListItemBase 列表项基类
 */
var ListItemBase = cc.Class({
    extends: cc.Component,

    properties: {
        /** 列表项按钮，可为null */
        button: cc.Button,
        /** 用于添加删除等检查的flag */
        checkFlag: {
            default: false,
            visible: false
        }
    },

    /**
     * 创建按钮点击handler
     * @param  {cc.Node} target 目标节点
     * @param  {String} component 目标组件名
     * @param  {String} handlerFuncName 响应事件函数名
     * @param  {String} customEventData 自定义事件数据
     */
    createItemClickHander: function createItemClickHander(target, component, handlerFuncName, customEventData) {
        var handler = new cc.Component.EventHandler();
        handler.target = target;
        handler.component = component;
        handler.handler = handlerFuncName;
        handler.customEventData = customEventData;
        return handler;
    },

    /**
     * 设置列表项点击handler
     * @param  {cc.Component} handlerComponent 目标组件
     * @param  {String} customEventData 自定义事件数据
     * @param  {String} [handlerFuncName] 响应事件函数名，默认为onItemClick
     */
    setOnItemClick: function setOnItemClick(handlerComponent, customEventData) {
        var handlerFuncName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'onItemClick';

        this.setOnBtnClick(this.button, handlerComponent, customEventData, handlerFuncName);
    },

    /**
     * 设置按钮点击handler
     * @param  {cc.Button} btn 按钮
     * @param  {cc.Component} handlerComponent 目标组件
     * @param  {String} customEventData 自定义事件数据
     * @param  {String} [handlerFuncName] 响应事件函数名，默认为onItemClick
     */
    setOnBtnClick: function setOnBtnClick(btn, handlerComponent, customEventData) {
        var handlerFuncName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'onItemClick';

        if (btn) {
            var handler = this.createItemClickHander(handlerComponent.node, cc.js.getClassName(handlerComponent), handlerFuncName, customEventData);
            btn.clickEvents = [handler];
        }
    },

    /**
     * 设置列表项是否可见，用于ScrollView裁剪
     * @param {boolean} isVisible 
     */
    setVisible: function setVisible(isVisible) {
        if (this.node) {
            Tools.setNodeVisible(this.node, isVisible);
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
        //# sourceMappingURL=ListItemBase.js.map
        