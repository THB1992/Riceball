"use strict";
cc._RF.push(module, '4ac092ObyVGAZZuaRNBYk+S', 'BagItem');
// scripts/common/BagItem.js

'use strict';

var Tools = require('Tools');
var ItemType = require('Types').ItemType;
var ConfigData = require('ConfigData');

var BagItem = cc.Class({
    statics: {
        //创建一组bagItem
        createItemsWithString: function createItemsWithString(rewardStr) {
            var splitChar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ';';

            var items = [];
            if (!rewardStr) {
                return items;
            }
            var rewards = rewardStr.split(splitChar);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = rewards[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var reward = _step.value;

                    if (reward) {
                        var nums = Tools.splitToNumList(reward, ',');
                        var bagItem = null;
                        if (nums.length >= 3) {
                            bagItem = BagItem.createItem(nums[0], nums[1], nums[2]);
                            items.push(bagItem);
                        }
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

            return items;
        },
        //创建一个bagItem
        createItemWithString: function createItemWithString(itemStr) {
            var nums = Tools.splitToNumList(itemStr, ',');
            return BagItem.createItem(nums[0], nums[1], nums[2]);
        },

        createItem: function createItem(type, id, num) {
            var data = ConfigData.instance.getItemData(type, id);
            var item = new BagItem();
            item.type = type;
            item.id = id;
            item.itemData = data;
            item.num = num;
            return item;
        }
    },

    properties: {
        type: ItemType.KNIFE_SKIN,
        id: 0,
        num: 0,
        itemData: null
    }
});

cc._RF.pop();