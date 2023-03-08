"use strict";
cc._RF.push(module, 'd4a6adB/gpNTbNbX04yNIKa', 'KnifeParentCtrl');
// scripts/battle/component/knife/ctrl/KnifeParentCtrl.js

'use strict';

/**
 * @fileoverview 刀的父节点控制
 * @author zhangzhuang@gameley.cn (张庄)
 */

var KnifeMomentState = require('Types').KnifeMomentState;
cc.Class({
    extends: cc.Component,

    properties: {},

    init: function init(itemNode) {
        var _this = this;

        this.itemNode = itemNode;
        this.node.on('isDanceRelease', function (isDanceRelease) {
            _this.isDanceRelease = isDanceRelease;
        }, this);
        this.knifeMomentStateComp = this.node.getComponent('KnifeMomentStateComponent');
        this.knifeOwnerComp = this.node.getComponent('KnifeOwnerComponent');
    },

    updateLogic: function updateLogic(dt) {
        if (!this.knifeMomentStateComp) this.knifeMomentStateComp = this.node.getComponent('KnifeMomentStateComponent');
        if (!this.knifeOwnerComp) this.knifeOwnerComp = this.node.getComponent('KnifeOwnerComponent');

        //根据组件的状态做逻辑处理
        if (this.knifeMomentStateComp.isDirty) {
            switch (this.knifeMomentStateComp.state) {
                case KnifeMomentState.Release:
                    var childWorldPos = this.node.parent.convertToWorldSpaceAR(this.node.position);
                    var childPos = this.itemNode.convertToNodeSpaceAR(childWorldPos);
                    var parentWorldPos = this.node.parent.parent.convertToWorldSpaceAR(this.node.parent.position);
                    var parentPos = this.itemNode.convertToNodeSpaceAR(parentWorldPos);

                    var dir = childPos.sub(parentPos);
                    var arr = [Math.PI / 2, -Math.PI / 2];
                    var index = Math.floor(Math.random() * 2);
                    var rotateOffset = Math.PI / 36 - Math.random() * (Math.PI / 18); //-5~5度的方向偏移
                    var rotateDir = arr[index] + rotateOffset;
                    if (this.isDanceRelease === true) {
                        rotateDir = -Math.PI / 2;
                    }
                    var mul = Math.random() + 2; //2~3倍切线距离
                    var throwDir = dir.rotate(rotateDir).mul(mul); //获得圆的切线向量

                    var newPos = throwDir.add(childPos);

                    this.node.emit('releasePosition', newPos);
                    this.changeParent(this.itemNode);
                    break;
            }
        }

        if (this.knifeOwnerComp.isDirty) {
            this.changeParent(this.knifeOwnerComp.owner);
        }
    },

    changeParent: function changeParent(newParent) {
        if (!newParent) {
            console.error('Knife changeParent newParent is null');
            return;
        }
        if (newParent === this.node.parent) {
            console.log('同一个父节点，无需更换');
            return;
        }
        var worldPos = this.node.parent.convertToWorldSpaceAR(this.node.position);
        var newPos = newParent.convertToNodeSpaceAR(worldPos);
        this.node.parent = newParent;
        this.node.position = newPos;
    }

});

cc._RF.pop();