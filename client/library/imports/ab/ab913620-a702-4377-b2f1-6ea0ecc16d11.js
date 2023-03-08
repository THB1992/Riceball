"use strict";
cc._RF.push(module, 'ab913YgpwJDd7LxbqDswW0R', 'EntityBox');
// scripts/battle/entity/EntityBox.js

'use strict';

var Tools = require('Tools');
var EntityBase = require('EntityBase');
var VibrateUtil = require('VibrateUtil');
cc.Class({
    extends: EntityBase,

    properties: {
        blood: 0,
        bloodLabel: cc.Label,
        activeNodes: [cc.Node],
        colliderNode: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init: function init(data) {
        this.data = data;
        this.blood = data.blood;
        this.bloodLabel.string = data.blood;
        this.id = data.id;

        this.nodeLandCollider = Tools.getOrAddComponent(this.colliderNode, 'NodeCollider');
        this.nodeLandCollider.init(this.node, true, true);

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.activeNodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var node = _step.value;

                node.active = false;
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

        this.activeNodes[this.id].active = true;
        this.anim = this.activeNodes[this.id].getComponent(cc.Animation);
        this.anim.play(this.anim._clips[0]._name);

        this.node.on('onAttack', this.onAttack, this);
        this.node.on('onCollByKnife', this.onCollByKnife, this);
        this.node.on('onCollByBlock', this.onCollByBlock, this);
    },
    onCollByBlock: function onCollByBlock(arr) {
        var self = arr[0];
        var other = arr[1];
        if (this.blood > 0) {
            var dir = other.node.position.add(other.node.parent.position).sub(self.node.parent.position).normalize();
            this.node.position = this.node.position.add(dir.mul(-10));
        }
    },
    onCollByKnife: function onCollByKnife(arr) {
        var self = arr[0];
        var other = arr[1];
        if (this.blood > 0) {
            var dir = other.node.parent.getComponent('KnifeOwnerComponent').oldOwner.position.sub(self.node.parent.position).normalize();
            this.node.position = this.node.position.add(dir.mul(-10));
        }
    },
    onAttack: function onAttack(arr) {
        var _this = this;

        var self = arr[0];
        var other = arr[1];
        var world = arr[2];
        var isLocal = other.node.group === 'knife' ? true : false;
        if (this.blood <= 1) {
            if (!this.isPlaying) {
                this.blood--;
                if (isLocal) VibrateUtil.vibrate(true);
                this.anim.once('finished', function () {
                    _this.isPlaying = false;
                    world.emit('onBoxDestroy', {
                        node: _this.node,
                        data: _this.data,
                        isLocal: isLocal
                    });
                    _this.recycleSelf();
                });
                this.isPlaying = true;
                this.anim.play(this.anim._clips[2]._name);
            }
        } else {
            if (!this.isPlaying) {
                this.blood--;
                if (isLocal) VibrateUtil.vibrate();
                world.emit('throwKnife', [self.node, other.node]);

                this.isPlaying = true;
                setTimeout(function () {
                    _this.isPlaying = false;
                }, 100);
                this.anim.play(this.anim._clips[1]._name);
            }
        }
        this.bloodLabel.string = this.blood;
    },
    onDie: function onDie(world) {},
    update: function update(dt) {}
});

cc._RF.pop();