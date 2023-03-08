"use strict";
cc._RF.push(module, 'cc231dTte1AKaCf792v+oQt', 'PayMgr');
// scripts/common/PayMgr.js

'use strict';

var _statics;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PlatformType = require('Types').PlatformType;
var PlatformMgr = require('PlatformMgr');
var PlayerData = require('PlayerData');
var ConfigData = require('ConfigData');

var PayMgr = cc.Class({
    statics: (_statics = {
        instance: null,
        init: function init() {
            if (PayMgr.instance === null) {
                PayMgr.instance = new PayMgr();
                PayMgr.instance.init();
            }
            var _global = typeof window === 'undefined' ? global : window;
            _global.PayMgr = PayMgr;
        },
        cleanUp: function cleanUp() {
            PayMgr.instance = null;
        },

        _closeCallback: null,

        _errCallback: null

    }, _defineProperty(_statics, '_errCallback', null), _defineProperty(_statics, '_queryProductsCallback', null), _defineProperty(_statics, '_restoreCallback', null), _defineProperty(_statics, '_priceString', ""), _defineProperty(_statics, '_isSupportPurchase', true), _defineProperty(_statics, 'normalPayCallBack', function normalPayCallBack(result) {

        if (result) {
            // 下发游戏奖励
            PayMgr._closeCallback(true);

            setTimeout(function () {
                PlatformMgr.hawkeye_report_purchase(PayMgr._price, PayMgr._payIndex);
            }, 200);
        } else {
            PayMgr._closeCallback(false);
        }
    }), _defineProperty(_statics, 'errorPayCallBack', function errorPayCallBack() {
        console.log('errorPayCallBack=================');
        PayMgr._isSupportPurchase = false;
        if (PayMgr._errCallback) {
            PayMgr._errCallback();
        }
    }), _defineProperty(_statics, 'queryProductsCallBack', function queryProductsCallBack(priceString) {
        PayMgr._priceString = priceString;
        // console.log('queryProductsCallBack priceString=========='+ priceString);
        if (PayMgr._queryProductsCallback) {
            PayMgr._queryProductsCallback(priceString);
        }
    }), _defineProperty(_statics, 'restoreCallBack', function restoreCallBack(result) {
        if (result) {
            PlayerData.instance.updateVipWithoutInterstitial();
            if (PayMgr._restoreCallback) {
                PayMgr._restoreCallback();
            }
        }
    }), _statics),

    properties: {
        _isPaying: false
    },

    init: function init() {},

    setIsPaying: function setIsPaying(isNot) {
        this._isPaying = isNot;
    },

    getIsPaying: function getIsPaying() {
        return this._isPaying;
    },

    setUiMgr: function setUiMgr(uiMgr) {
        this.uiMgr = uiMgr;
    },

    requestProductPrices: function requestProductPrices(queryProductsCallback) {
        PayMgr._queryProductsCallback = queryProductsCallback;

        if (PayMgr._priceString != '') {
            if (queryProductsCallback) {
                queryProductsCallback(PayMgr._priceString);
                return;
            }
        }

        switch (PlatformMgr.platformType) {
            case PlatformType.WECHAT:
                {
                    break;
                }

            case PlatformType.IOS:
                {
                    jsb.reflection.callStaticMethod("IAPHelper", "requestProducts");
                }
                break;
            case PlatformType.ANDROID:
                {
                    jsb.reflection.callStaticMethod("org/cocos2dx/javascript/activity/IABManager", "requestProducts", "()V");
                }
                break;
            default:
                {
                    PayMgr._queryProductsCallback('price#PHP 105.00#PHP 410.00#PHP 775.00#PHP 1,550.00#PHP 2,850.00');
                    break;
                }
        }
    },

    restoreProducts: function restoreProducts(callback) {
        PayMgr._restoreCallback = callback;
        if (PlatformMgr.platformType === PlatformType.IOS) {
            jsb.reflection.callStaticMethod("IAPHelper", "restoreCompletedTransactions");
        }
    },

    payByIndex: function payByIndex(payIndex, closeCallback, errCallback) {

        var finalCloseCallback = function finalCloseCallback(success) {
            setTimeout(function () {
                if (performance && performance.now) {
                    cc.director._lastUpdate = performance.now();
                }
                closeCallback(success);
            }, 100);
        };

        PayMgr._closeCallback = finalCloseCallback;
        PayMgr._errCallback = errCallback;
        PayMgr._payIndex = payIndex;
        PayMgr._price = ConfigData.instance.getShopDataPriceByIndex(payIndex);

        if (!PayMgr._isSupportPurchase) {
            if (errCallback) {
                errCallback();
            }

            return;
        }

        switch (PlatformMgr.platformType) {
            case PlatformType.WECHAT:
                {
                    break;
                }

            case PlatformType.IOS:
                {
                    jsb.reflection.callStaticMethod("IAPHelper", "buyProductByPayIndex:", payIndex);
                    break;
                }

            case PlatformType.ANDROID:
                {
                    jsb.reflection.callStaticMethod("org/cocos2dx/javascript/activity/IABManager", "buyProductByPayIndex", "(I)V", payIndex);
                }
                break;
            default:
                {
                    finalCloseCallback(true);
                    break;
                }
        }
    }

});

cc._RF.pop();