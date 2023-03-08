"use strict";
cc._RF.push(module, '5790fWm9cZNd5S1O9W63OKn', 'PoolMgr');
// scripts/common/PoolMgr.js

'use strict';

var PoolType = require('Types').PoolType;
var Tools = require('Tools');
var GameData = require('GameData');

var PoolMgr = cc.Class({
    extends: cc.Component,

    statics: {
        instance: null
    },
    properties: {
        poolArray: [],
        prefabArray: {
            default: [],
            type: cc.Prefab
        }
    },

    cleanUp: function cleanUp() {
        for (var type = 0; type < PoolType.COUNT; type++) {
            var pool = this.poolArray[type];
            if (pool) {
                pool.clear();
            }
        }
        this.poolArray = [];
    },

    init: function init() {
        for (var type = 0; type < PoolType.COUNT; type++) {
            var pool = new cc.NodePool();
            var prefab = this.prefabArray[type];
            var count = 0;
            switch (type) {
                case PoolType.PLAYER:
                    count = 8;
                    break;
                case PoolType.FOLLOW_PLAYER:
                    count = 8;
                    break;
                case PoolType.KNIFE:
                    count = 180;
                    break;
                case PoolType.BLOCK:
                case PoolType.BLOCK_01:
                case PoolType.BLOCK_02:
                case PoolType.BLOCK_03:
                case PoolType.BLOCK_04:
                case PoolType.BLOCK_05:
                case PoolType.BLOCK_06:
                case PoolType.BLOCK_07:
                case PoolType.BLOCK_08:
                    count = 2;
                    break;
                case PoolType.CIRCLE_BLOCK:
                    count = 3;
                    break;
                case PoolType.WALL:
                    count = 4;
                    break;
                case PoolType.CIRCLE_WALL:
                    count = 1;
                    break;
                case PoolType.COLL_EFFECT:
                    count = 50;
                    break;
                case PoolType.BUFF:
                case PoolType.BOX:
                    count = 10;
                    break;
                case PoolType.SHOW_KNIFE_EFFECT:
                    count = 12;
                    break;
                case PoolType.DODGE_EFFECT:
                    count = 20;
                    break;
                case PoolType.DESTROY_DEFENCE_EFFECT:
                    count = 20;
                    break;
                case PoolType.Effect_Reborn:
                    count = 8;
                    break;
                case PoolType.NEZHA_EFFECT:
                    count = 20;
                    break;

            }
            var index = 0;
            while (index < count) {
                var node = cc.instantiate(prefab);
                pool.put(node);
                index++;
            }
            this.poolArray[type] = pool;
        }
    },

    getPlayer: function getPlayer() {
        var comp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'EntityPlayer';

        return this.get(PoolType.PLAYER, comp);
    },

    getFollowPlayer: function getFollowPlayer() {
        var comp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'EntityFollowPlayer';

        return this.get(PoolType.FOLLOW_PLAYER, comp);
    },

    getKnife: function getKnife() {
        var comp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'EntityKnife';

        var node = this.get(PoolType.KNIFE, comp);
        // console.log("getKnife: this.node._pool.count: " + node._pool._pool.length);
        return node;
    },

    getBlock: function getBlock() {
        var blockType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : PoolType.BLOCK;
        var comp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'EntityBlock';

        return this.get(blockType, comp);
    },

    getCircleBlock: function getCircleBlock() {
        var comp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'EntityBlock';

        return this.get(PoolType.CIRCLE_BLOCK, comp);
    },

    getWall: function getWall() {
        var comp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'EntityWall';

        return this.get(PoolType.WALL, comp);
    },

    getCollEffect: function getCollEffect() {
        var comp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'CollEffect';

        var node = this.get(PoolType.COLL_EFFECT, comp);
        return node;
    },

    getDodgeEffect: function getDodgeEffect() {
        var comp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'DodgeEffect';

        var node = this.get(PoolType.DODGE_EFFECT, comp);
        return node;
    },

    getRebornEffect: function getRebornEffect() {
        var comp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'effectReborn';

        var node = this.get(PoolType.Effect_Reborn, comp);
        return node;
    },

    getDestroyDefenceffect: function getDestroyDefenceffect(comp) {
        var node = this.get(PoolType.DESTROY_DEFENCE_EFFECT, comp);
        return node;
    },

    getNeZhaffect: function getNeZhaffect(comp) {
        var node = this.get(PoolType.NEZHA_EFFECT, comp);
        return node;
    },

    getShowKnifeEffect: function getShowKnifeEffect() {
        var comp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'ShowKnifeEffect';

        var node = this.get(PoolType.SHOW_KNIFE_EFFECT, comp);
        return node;
    },

    getBuff: function getBuff() {
        var comp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'EntityBuff';

        var node = this.get(PoolType.BUFF, comp);
        return node;
    },

    getBox: function getBox() {
        var comp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'EntityBox';

        var node = this.get(PoolType.BOX, comp);
        return node;
    },

    getCircleWall: function getCircleWall() {
        var comp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'EntityCircleWall';

        var node = this.get(PoolType.CIRCLE_WALL, comp);
        return node;
    },

    get: function get(type, comp) {
        var pool = this.poolArray[type];
        if (pool) {
            var node = pool.get();
            if (!node) {
                var prefab = this.prefabArray[type];
                node = cc.instantiate(prefab);
                if (GameData.instance.isShowLog()) {
                    console.log('pool of type is not enough:' + type);
                }
            }
            node._pool = pool;
            return node;
        } else {
            cc.error('can\'t get pool of type:' + type);
            return null;
        }
    }

    // update (dt) {},
});

cc._RF.pop();