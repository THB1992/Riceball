"use strict";
cc._RF.push(module, 'c2befB4tAlK8IPPtk95wTNG', 'PlatformMgr');
// scripts/common/PlatformMgr.js

'use strict';

/**
 * @fileoverview PlatformMgr
 * @author <meifan@gameley.cn> (梅凡)
 */

var PlatformType = require('Types').PlatformType;
var ChannelType = require('Types').ChannelType;
var Tools = require('Tools');
var GameData = require('GameData');
var OpenDataMsgType = require('Types').OpenDataMsgType;
var CustomFunnelEvent = require('Types').CustomFunnelEvent;
var mta = require('mta_analysis');
var OSType = require('Types').OSType;

var PlatformMgr = cc.Class({
    statics: {
        // baseUrl: "https://gamebix.oss-cn-shenzhen.aliyuncs.com/", //需要加进mp后台服务器request、downloadFile合法域名里
        eolinkerApp: 'knife666',
        k6_app: 'knife666',
        // k6_baseUrl: 'https://knife666.boomegg.cn/', //"http://192.168.0.66:10010/"
        k6_baseUrl: 'https://knife666.boomegg.cn/', //"http://192.168.0.66:10010/"
        k6_baseUrl_test: 'https://k6-front.drwho.mobi:14010/', //测试环境下的服务器地址 https://k6-front.drwho.mobi:14010/
        // http://192.168.1.148:10010/
        hawkeye_baseUrl: "https://report.drwho.mobi/",
        // hawkeye_configUrl: "http://hawkeye.drwho.mobi/project-manager/",
        hawkeye_app: 'knife666outsea',
        gm_baseUrl: "https://verify.riceballgames.com",
        hawkeye_gameid: 1002,
        k6_Token: '',
        hawkeye_registerTime: 0,
        hawkeye_level: 1,
        eolinkerToken: '',
        eolinkerSettings: null,
        eolinkerUpdateTimestamp: 0,
        eolinkerChannelCode: '',
        oldVisitCids: [],
        timeDefence: 0,
        reportFunnels: [],
        uid: '',
        cid: 'lSeLUbAWNZ',
        shareUid: '',
        shareType: 0,
        /** 系统类型 @type {OSType} */
        osType: OSType.UNKNOWN,
        /** 是否是开发者工具 */
        isDevTool: false,
        /** 是否上报小游戏启动时间 */
        isReportAnalytics: false,
        heartbeatSendTimestamp: 0,
        heartbeatInterval: 300000,
        /** 默认渠道 */
        channelType: ChannelType.RiceBall_2,
        /**nft功能开关 */
        open_nft_moudle: false,
        /**nft测试：余额 */
        nft_balance_ids: {},
        /**nft测试：玩家购买数据 */
        nft_user_datas: {},
        // E:/CocosCreator_v2.2.0-alpha.3_20190817_win/CocosCreator_v2.2.0-alpha.3_20190817_win/resources/
        init: function init() {

            // if (GameData.instance.isEnvironmentTest()) {
            //     PlatformMgr.k6_baseUrl = PlatformMgr.k6_baseUrl_test;
            // }

            if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                PlatformMgr.platformType = PlatformType.WECHAT;

                var res = wx.getSystemInfoSync();
                PlatformMgr.systemInfo = res;

                if (CC_DEBUG) {
                    console.log('getSystemInfo success, info:\n', res);
                }

                if (res.system) {

                    PlatformMgr.systemSoftware = res.system;
                    if (PlatformMgr.systemSoftware.toLowerCase().indexOf('ios') >= 0) {
                        PlatformMgr.osType = OSType.IOS;
                    } else {
                        PlatformMgr.osType = OSType.ANDROID;
                    }
                }

                // 微信版本更新处理
                if (typeof wx.getUpdateManager === 'function') {
                    var updateManager = wx.getUpdateManager();

                    updateManager.onCheckForUpdate(function (res) {
                        // 请求完新版本信息的回调
                        console.log('onCheckForUpdate:', res);
                    });

                    updateManager.onUpdateReady(function () {
                        console.log('onUpdateReady');
                        // wx.showModal({
                        //     title: '更新提示',
                        //     content: '新版本已经准备好，即将重启应用',
                        //     showCancel: false,
                        //     success(res) {
                        //         if (res.confirm) {
                        //         }
                        //     }
                        // });

                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate();
                    });

                    updateManager.onUpdateFailed(function () {
                        // 新的版本下载失败
                        console.log('onUpdateFailed');
                    });
                }
            } else if (cc.sys.os === cc.sys.OS_IOS) {
                PlatformMgr.platformType = PlatformType.IOS;
            } else if (cc.sys.os === cc.sys.OS_ANDROID) {
                PlatformMgr.platformType = PlatformType.ANDROID;

                PlatformMgr.hawkeye_gameid = 1004;

                // PlatformMgr.channelType = ChannelType.RiceBall;

                PlatformMgr.channelType = ChannelType.RiceBall_2;

                switch (PlatformMgr.channelType) {
                    case ChannelType.RiceBall:
                        PlatformMgr.cid = 'lSeLUbAWNZ';
                        break;
                    case ChannelType.RiceBall_1:
                        PlatformMgr.cid = 'bQj2uesh9C';
                        break;
                    case ChannelType.RiceBall_2:
                        PlatformMgr.cid = 'lSeLUbAWNZ';
                        break;
                }
            } else {
                PlatformMgr.platformType = PlatformType.BROWSER;
            }

            if (PlatformMgr.systemInfo && PlatformMgr.systemInfo.platform === 'devtools') {
                PlatformMgr.isDevTool = true;
                // PlatformMgr.isUserRefuseUserInfo = true;
            }

            Tools.init(PlatformMgr.platformType, PlatformMgr.systemInfo);
        },

        setPlayerData: function setPlayerData(playerData) {
            PlatformMgr.playerData = playerData;
        },

        isIOS: function isIOS() {
            return PlatformMgr.osType === OSType.IOS;;
        },

        isIosApp: function isIosApp() {
            return PlatformMgr.platformType === PlatformType.IOS;
        },

        isAndroidApp: function isAndroidApp() {
            return PlatformMgr.platformType === PlatformType.ANDROID;
        },

        isApp: function isApp() {
            return PlatformMgr.isIosApp() || PlatformMgr.isAndroidApp();
        },

        isAndroidRiceBall1: function isAndroidRiceBall1() {
            return PlatformMgr.channelType === ChannelType.RiceBall_1;
        },


        doLogin: function doLogin(callback, param) {
            switch (PlatformMgr.platformType) {
                case PlatformType.WECHAT:
                    {
                        PlatformMgr.wxLogin(function (res) {
                            if (res.result) {
                                console.log('login success');
                                PlatformMgr.k6_userDate();
                                // PlatformMgr.oldUserVisit();
                                // PlatformMgr.eolinkerShare();
                                // PlatformMgr.openStatis();
                                if (PlatformMgr.is_new) {
                                    // PlatformMgr.enlinkerGameNumber();
                                    // PlatformMgr.enlinkerUserLevel();
                                }
                                if (callback) callback(res);
                                // PlatformMgr.getSessionID((res) => {
                                //     if (res.result) {
                                //         PlatformMgr.sessionID = res.sessionID;
                                //         PlatformMgr.channelOpenID = res.openID;
                                //         PlatformMgr.getUserInfo((res) => {
                                //             if (res.result && res.userInfo && res.userInfo.nickName) PlatformMgr.isAuthed = true;
                                //             callback(res);
                                //         }, param);
                                //     } else {
                                //         callback(res);
                                //     }
                                // });
                            } else {
                                console.log('login fail');
                                if (callback) callback(res);
                                // if (callback) callback({
                                //     result: false,
                                //     errType: LoginErrorType.SESSION_CHANNEL,
                                //     errMsg: res.errMsg,
                                // });
                            }
                        });
                        break;
                    }
                case PlatformType.BROWSER:
                    {
                        PlatformMgr.browserLogin(function (res) {
                            if (res.result) {
                                console.log('login success');
                                PlatformMgr.k6_userDate();
                                if (PlatformMgr.is_new) {}
                                if (callback) callback(res);
                            } else {
                                console.log('login fail');
                                if (callback) callback(res);
                            }
                        });
                        break;
                    }
                case PlatformType.IOS:
                case PlatformType.ANDROID:
                    {
                        var uuid = Tools.getItem('user_uuid');
                        console.log('uuid: ' + uuid);

                        if (uuid) {
                            PlatformMgr.k6_Token = uuid; //obj.token;
                            PlatformMgr.is_new = false; //obj.is_new;
                            PlatformMgr.uid = uuid; //obj.uid;
                        } else {
                            // 新玩家
                            var newUUID = PlatformMgr.isAndroidApp() ? jsb.reflection.callStaticMethod('org/cocos2dx/javascript/Utils', 'getUUID', '()Ljava/lang/String;') : jsb.reflection.callStaticMethod('Utils', 'getUUID');
                            console.log('newUUID: ' + newUUID);

                            PlatformMgr.k6_Token = newUUID; //obj.token;
                            PlatformMgr.is_new = true; //obj.is_new;
                            PlatformMgr.uid = newUUID; //obj.uid;

                            Tools.setItem('user_uuid', newUUID);
                        }

                        if (callback) callback({
                            result: true
                        });
                        break;
                    }
                default:
                    {
                        if (callback) callback({
                            result: true
                        });
                        break;
                    }
            }
        },

        //浏览器模拟微信登录
        browserLogin: function browserLogin(callback) {
            var res = {
                code: '11122222qwewww5'
            };
            PlatformMgr.code = res.code;

            PlatformMgr.k6_login({
                // code: 'x9ae2a3f4',
                code: res.code
                // cid: PlatformMgr.eolinkerChannelCode,
            }, function (obj) {
                if (GameData.instance.isShowLog()) {
                    console.log('k6_login login resonse data:' + JSON.stringify(obj));
                }
                if (obj.token !== undefined && obj.is_new !== undefined && obj.uid != undefined) {
                    PlatformMgr.k6_Token = obj.token;
                    PlatformMgr.is_new = obj.is_new;
                    PlatformMgr.uid = obj.uid;
                    if (callback) {
                        callback({
                            result: true
                        });
                    }
                } else {
                    // 网络连接成功 但sdk登录失败
                    if (callback) {
                        callback({
                            result: true,
                            errMsg: 'SDK登录失败，请稍后重试'
                        });
                    }
                }
            }, function () {
                if (callback) {
                    callback({
                        result: true,
                        errMsg: 'SDK登录失败，请稍后重试'
                    });
                }
            });
        },

        // 发行SDK登录
        wxLogin: function wxLogin(callback) {
            wx.login({
                success: function success(res) {
                    PlatformMgr.code = res.code;

                    PlatformMgr.k6_login({
                        // code: 'x9ae2a3f4',
                        code: res.code
                        // cid: PlatformMgr.eolinkerChannelCode,
                    }, function (obj) {
                        if (GameData.instance.isShowLog()) {
                            console.log('k6_login login resonse data:' + JSON.stringify(obj));
                        }
                        if (obj.token !== undefined && obj.is_new !== undefined && obj.uid != undefined) {
                            PlatformMgr.k6_Token = obj.token;
                            PlatformMgr.is_new = obj.is_new;
                            PlatformMgr.uid = obj.uid;
                            if (callback) {
                                callback({
                                    result: true
                                });
                            }
                        } else {
                            // 网络连接成功 但sdk登录失败
                            if (callback) {
                                callback({
                                    result: false,
                                    errMsg: 'SDK登录失败，请稍后重试'
                                });
                            }
                        }
                    }, function () {
                        if (callback) {
                            callback({
                                result: false,
                                errMsg: 'SDK登录失败，请稍后重试'
                            });
                        }
                    });
                },
                fail: function fail() {
                    if (callback) {
                        callback({
                            result: false,
                            errMsg: '微信登录失败，请稍后重试'
                        });
                    }
                }
            });
        },

        oldUserVisit: function oldUserVisit() {
            switch (PlatformMgr.platformType) {
                case PlatformType.WECHAT:
                    {
                        if (PlatformMgr.eolinkerChannelCode && PlatformMgr.eolinkerChannelCode !== '' && PlatformMgr.oldVisitCids && !PlatformMgr.oldVisitCids.includes(PlatformMgr.eolinkerChannelCode)) {
                            PlatformMgr.oldVisitCids.push(PlatformMgr.eolinkerChannelCode);
                            PlatformMgr.createEolinkerRequest('user/old-user-visit', {
                                token: PlatformMgr.eolinkerToken,
                                cid: PlatformMgr.eolinkerChannelCode
                            }, function (obj) {
                                if (GameData.instance.isShowLog()) {
                                    console.log('eolinker old-user-visit resonse data:' + JSON.stringify(obj));
                                }
                            });
                        }
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
        },

        openStatis: function openStatis() {
            //打开应用上报
            PlatformMgr.createEolinkerRequest('/data-statistics/open-app', {
                // this.$post(this.constellUrl + '/data-statistics/open-app', {
                // app: this.appName,
                token: PlatformMgr.eolinkerToken,
                scene: PlatformMgr.eolinkerScene
            }, function (res) {
                if (GameData.instance.isShowLog()) {
                    console.log("eolinker openStatis 打开应用上报:", res);
                }
            });
        },


        /**
         * 判断此次玩家登录是否由分享点击进入并上传分享数据
         */
        eolinkerShare: function eolinkerShare() {
            switch (PlatformMgr.platformType) {
                case PlatformType.WECHAT:
                    {
                        if (PlatformMgr.shareRecord && PlatformMgr.shareRecord !== '' && PlatformMgr.eolinkerToken && PlatformMgr.eolinkerToken != '') {

                            PlatformMgr.createEolinkerRequest('knife666/share', {
                                token: PlatformMgr.eolinkerToken,
                                shareRecord: PlatformMgr.shareRecord,
                                share_point: PlatformMgr.share_point,
                                share_picture: PlatformMgr.share_picture
                            }, function (obj) {
                                if (GameData.instance.isShowLog()) {
                                    console.log('eolinker eolinkerShare resonse data:' + JSON.stringify(obj));
                                }
                            });
                        }
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
        },

        /**
         * 记录新增玩家首日战斗场次
         */
        enlinkerGameNumber: function enlinkerGameNumber() {
            switch (PlatformMgr.platformType) {
                case PlatformType.WECHAT:
                    {
                        PlatformMgr.createEolinkerRequest('knife666/game-number', {
                            token: PlatformMgr.eolinkerToken
                        }, function (obj) {
                            if (GameData.instance.isShowLog()) {
                                console.log('eolinker enlinkerGameNumber resonse data:' + JSON.stringify(obj));
                            }
                        });
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
        },

        /**
         * 记录新增玩家首日段位等级
         */
        enlinkerUserLevel: function enlinkerUserLevel() {
            switch (PlatformMgr.platformType) {
                case PlatformType.WECHAT:
                    {
                        PlatformMgr.createEolinkerRequest('knife666/user-level', {
                            token: PlatformMgr.eolinkerToken
                        }, function (obj) {
                            if (GameData.instance.isShowLog()) {
                                console.log('eolinker enlinkerUserLevel resonse data:' + JSON.stringify(obj));
                            }
                        });
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
        },

        // 发行SDK获取服务器时间戳
        eolinkerUpdateDate: function eolinkerUpdateDate(callback) {
            switch (PlatformMgr.platformType) {
                case PlatformType.WECHAT:
                    {
                        PlatformMgr.createEolinkerRequest('user/date', {
                            app: PlatformMgr.eolinkerApp,
                            version: ''
                        }, function (obj) {
                            if (GameData.instance.isShowLog()) {
                                console.log('eolinker date resonse data:' + JSON.stringify(obj));
                            }
                            var serverTime = obj.data.now_time * 1000;
                            var curTime = Number(new Date().getTime());
                            PlatformMgr.timeDefence = curTime - serverTime;
                            if (callback) callback();
                            if (GameData.instance.isShowLog()) {
                                console.log(new Date(curTime), new Date(serverTime));
                                console.log('时间差：' + PlatformMgr.timeDefence);
                            }
                        });
                        break;
                    }
                default:
                    {
                        if (callback) callback();
                        break;
                    }
            }
        },

        updateUserInfo: function updateUserInfo(userInfo) {
            switch (PlatformMgr.platformType) {
                case PlatformType.WECHAT:
                    {
                        PlatformMgr.createEolinkerRequest('user/update-user-info', {
                            token: PlatformMgr.eolinkerToken,
                            cid: PlatformMgr.eolinkerChannelCode,
                            nickname: userInfo.nickName,
                            avatar: userInfo.avatarUrl,
                            gender: userInfo.gender,
                            country: userInfo.country,
                            province: userInfo.province,
                            city: userInfo.city
                        }, function (obj) {
                            if (GameData.instance.isShowLog()) {
                                console.log('eolinker updateUserInfo resonse data:' + JSON.stringify(obj));
                            }
                        });
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
        },

        createEolinkerRequest: function createEolinkerRequest(url, param, callback) {
            param.app = PlatformMgr.eolinkerApp;
            PlatformMgr.createHttpRequest('https://constellation.mamapai.net/' + url, param, function (data) {
                if (callback) callback(data);
            }, function () {
                if (GameData.instance.isShowLog()) {
                    console.error('createEolinkerRequest error, url:' + url + ' param:' + JSON.stringify(param));
                }
            });
        },

        /** 更新发行SDK配置 */
        updateEolinkerSettings: function updateEolinkerSettings(callback) {
            switch (PlatformMgr.platformType) {
                case PlatformType.WECHAT:
                    {
                        var timestamp = Tools.getTimestampMS();
                        if (PlatformMgr.eolinkerSettings === null || timestamp - PlatformMgr.eolinkerUpdateTimestamp >= 0 /*10 * 1000*/) {
                                // 发行SDK获取配置
                                PlatformMgr.createEolinkerRequest('common/get-config', {}, function (data) {
                                    if (GameData.instance.isShowLog()) {
                                        console.log('settings:' + JSON.stringify(data));
                                    }
                                    PlatformMgr.eolinkerSettings = data;
                                    if (callback) callback(PlatformMgr.eolinkerSettings);
                                    PlatformMgr.eolinkerUpdateTimestamp = Tools.getTimestampMS();
                                });
                            } else {
                            if (callback) callback(PlatformMgr.eolinkerSettings);
                        }
                    }
                    break;
                default:
                    break;
            }
        },

        /**
         * 创建http请求
         * @param {string} url url
         * @param {object} data body数据
         * @param {function} successCallback 成功回调
         * @param {function} failCallback 失败回调
         * @param {string} method http方式:'POST'||'GET'
         */
        createHttpRequest: function createHttpRequest(url, data, successCallback, failCallback) {
            var method = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'POST';

            if (GameData.instance.isShowLog()) {
                try {
                    console.log('createHttpRequest url:' + url + ' data:' + JSON.stringify(data));
                } catch (e) {
                    console.log('log excepiton:' + e);
                }
            }

            switch (PlatformMgr.platformType) {
                case PlatformType.WECHAT:
                    {

                        wx.request({
                            url: url,
                            data: data,
                            method: method,
                            success: function success(res) {
                                cc.log('http success, response:', res);
                                if (successCallback) {
                                    successCallback(res.data, res.statusCode, res.header);
                                }
                                // const responseData = res.data;
                            },
                            fail: function fail(res) {
                                cc.log('http fail, response:', res);
                                if (failCallback) {
                                    failCallback(res);
                                }
                            }
                        });
                        break;
                    }
                default:
                    {
                        var xhr = cc.loader.getXMLHttpRequest();
                        xhr.open(method, url, true);
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 400) {
                                // console.log('http       success');
                                var response = xhr.responseText;
                                // console.log('http success, response:' + response);
                                // if (CC_DEBUG) cc.log('http success, response:' + response);
                                var responseData = null;
                                try {
                                    if (response && response.length > 0) {
                                        responseData = JSON.parse(response);
                                    }
                                } catch (e) {
                                    cc.error('parse reponse to json exception:' + e);
                                }
                                if (successCallback) {
                                    successCallback(responseData, xhr.status, null);
                                }
                            } else {
                                // console.log('http       other status');
                                // switch (xhr.readyState) {
                                //     case 0: {
                                //         CC_DEBUG && cc.log("http 等待send方法的调用");
                                //         break;
                                //     }
                                //     case 1: {
                                //         CC_DEBUG && cc.log("http 正在发送请求");
                                //         break;
                                //     }
                                //     case 2: {
                                //         CC_DEBUG && cc.log("http 已获取响应头");
                                //         break;
                                //     }
                                //     case 3: {
                                //         CC_DEBUG && cc.log("http 正在下载响应体");
                                //         break;
                                //     }
                                //     default: {
                                //         CC_DEBUG && cc.log("http onreadystatechange:" + xhr.readyState);
                                //         break;
                                //     }
                                // }
                            }
                        };
                        xhr.onerror = function () {
                            cc.log('http fail onerror');
                            if (failCallback) {
                                failCallback();
                            }
                        };
                        xhr.ontimeout = function () {
                            cc.log('http fail time out');
                            if (failCallback) {
                                failCallback();
                            }
                        };
                        var sendStr = JSON.stringify(data);
                        xhr.send(sendStr);
                        break;
                    }
            }
        },

        hawkeye_getConfig: function hawkeye_getConfig(callback) {
            switch (PlatformMgr.platformType) {
                case PlatformType.WECHAT:
                case PlatformType.ANDROID:
                case PlatformType.IOS:
                case PlatformType.BROWSER:
                    {
                        var timestamp = Tools.getTimestampMS();
                        if (PlatformMgr.eolinkerSettings === null || timestamp - PlatformMgr.eolinkerUpdateTimestamp >= 0 /*10 * 1000*/) {
                                // 获取配置
                                var url = PlatformMgr.hawkeye_baseUrl + 'manager/getConfig';
                                var param = {};
                                param.app = PlatformMgr.hawkeye_app;
                                PlatformMgr.createHttpRequest(url, param, function (data) {
                                    if (GameData.instance.isShowLog()) {
                                        console.log('settings:' + JSON.stringify(data));
                                    }
                                    PlatformMgr.eolinkerSettings = data;
                                    if (callback) callback(PlatformMgr.eolinkerSettings);
                                    PlatformMgr.eolinkerUpdateTimestamp = Tools.getTimestampMS();
                                }, function () {
                                    if (GameData.instance.isShowLog()) {
                                        console.error('hawkeye_getConfig error, url:' + url + ' param:' + JSON.stringify(param));
                                    }
                                });
                            } else {
                            if (callback) callback(PlatformMgr.eolinkerSettings);
                        }
                    }
                    break;
                default:
                    break;
            }
        },

        hawkeye_report: function hawkeye_report(param) {
            switch (PlatformMgr.platformType) {
                case PlatformType.WECHAT:
                case PlatformType.ANDROID:
                case PlatformType.IOS:
                    {
                        // 获取配置
                        var url = PlatformMgr.hawkeye_baseUrl + 'report';
                        // var param = {};
                        // param.app = PlatformMgr.hawkeye_app;
                        param.gameId = PlatformMgr.hawkeye_gameid;
                        param.userId = PlatformMgr.uid;
                        param.registerTime = PlatformMgr.hawkeye_registerTime;
                        param.level = PlatformMgr.hawkeye_level;
                        param.cid = PlatformMgr.cid;
                        PlatformMgr.createHttpRequest(url, param, function (obj) {
                            if (GameData.instance.isShowLog()) {
                                console.log('hawkeye_report resonse data:' + JSON.stringify(obj));
                            }
                        }, function () {
                            if (GameData.instance.isShowLog()) {
                                console.error('hawkeye_report error, url:' + url + ' param:' + JSON.stringify(param));
                            }
                        });
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
        },

        hawkeye_report_login: function hawkeye_report_login() {
            PlatformMgr.hawkeye_report({
                reportId: '01'
            });
        },

        hawkeye_report_heartbeat: function hawkeye_report_heartbeat() {
            PlatformMgr.hawkeye_report({
                reportId: '02'
            });
        },

        /**
         * 打点局数和时长
         * @param {*} time 单位（秒） 
         */
        hawkeye_report_game: function hawkeye_report_game(time) {
            PlatformMgr.hawkeye_report({
                reportId: '03-000-' + time
            });
        },

        hawkeye_report_share_out: function hawkeye_report_share_out(shareType, sharePicId) {
            PlatformMgr.hawkeye_report({
                reportId: '05-00-' + shareType + '-' + sharePicId
            });
        },

        hawkeye_report_share_in: function hawkeye_report_share_in() {
            // console.log('PlatformMgr.shareType: ' + PlatformMgr.shareType + ', PlatformMgr.share_picture:' + PlatformMgr.share_picture)
            if (PlatformMgr.shareType && PlatformMgr.share_picture && PlatformMgr.share_picture != '' && PlatformMgr.uid && PlatformMgr.uid != '') {
                PlatformMgr.hawkeye_report({
                    reportId: '05-01-' + PlatformMgr.shareType + '-' + PlatformMgr.share_picture + '-' + (PlatformMgr.is_new ? '01' : '00')
                });
                PlatformMgr.shareType = null;
                PlatformMgr.share_picture = null;
            }
        },

        hawkeye_report_level: function hawkeye_report_level() {
            PlatformMgr.hawkeye_report({
                reportId: '07-' + PlatformMgr.hawkeye_level
            });
        },

        hawkeye_report_advert_open: function hawkeye_report_advert_open(advertId) {
            PlatformMgr.hawkeye_report({
                reportId: '06-00-' + advertId
            });
        },

        hawkeye_report_advert_show: function hawkeye_report_advert_show(advertId) {
            PlatformMgr.hawkeye_report({
                reportId: '06-01-' + advertId
            });
        },

        hawkeye_report_advert_end: function hawkeye_report_advert_end(advertId) {
            PlatformMgr.hawkeye_report({
                reportId: '06-02-' + advertId
            });
        },

        /**
         * 
         * @param {*} money 金额，精确到分
         * @param {*} id 充值配置id
         */
        hawkeye_report_purchase: function hawkeye_report_purchase(money, id) {
            PlatformMgr.hawkeye_report({
                reportId: '08-' + money + '-' + id + '0'
            });
        },

        hawkeye_report_funnel: function hawkeye_report_funnel(customEvent) {
            // var key = '';
            // key = 'KEY_Hawkeye_Funnel_EVENT_' + customEvent;
            // var value = Tools.getItem(key);
            if (PlatformMgr.playerData.hawkeyeFunnelcontains(customEvent)) {
                // if (Tools.arrContains(PlatformMgr.playerData.hawkeyeFunnelIDs, customEvent)) {
                if (GameData.instance.isShowLog()) {
                    console.log('skip hawkeye_funnel for event:' + customEvent);
                }
                return;
            }
            if (GameData.instance.isShowLog()) {
                console.log('HawkeyeFunnelEvent[customEvent]:' + CustomFunnelEvent[customEvent] + ',' + customEvent);
            }

            // Tools.setItem(key, Tools.getTimestampMS().toString());
            PlatformMgr.playerData.addHawkeyeFunnelIDs(customEvent);

            PlatformMgr.hawkeye_report({
                reportId: '04-00-' + customEvent.toString()
            });
        },

        /** 上行玩家数据 */
        k6_uploadData: function k6_uploadData(data, callback) {
            switch (PlatformMgr.platformType) {
                case PlatformType.BROWSER:
                case PlatformType.WECHAT:
                    {
                        var url = PlatformMgr.k6_baseUrl + 'common/upload-data';
                        var param = {};
                        param.app = PlatformMgr.k6_app;
                        param.token = PlatformMgr.k6_Token;
                        param.data = data;
                        PlatformMgr.createHttpRequest(url, param, function () {
                            if (GameData.instance.isShowLog()) {
                                console.log('k6_uploadData  success');
                            }
                            if (callback) callback();
                        }, function () {
                            if (GameData.instance.isShowLog()) {
                                console.error('k6_uploadData error, url:' + url + ' param:' + JSON.stringify(param));
                            }
                        });
                        break;
                    }
            }
        },

        /** 下载玩家数据 */
        k6_downloadData: function k6_downloadData(callback, errCallback) {
            var url = PlatformMgr.k6_baseUrl + 'common/download-data';
            var param = {};
            param.app = PlatformMgr.k6_app;
            param.token = PlatformMgr.k6_Token;
            PlatformMgr.createHttpRequest(url, param, function (obj) {
                if (GameData.instance.isShowLog()) {
                    console.log('k6_downloadData success:' + JSON.stringify(obj));
                }
                if (obj && obj.data) {
                    if (callback) callback(obj.data.data);
                } else {
                    if (errCallback) errCallback();
                }
            }, function () {
                if (errCallback) errCallback();
                if (GameData.instance.isShowLog()) {
                    console.error('k6_downloadData error, url:' + url + ' param:' + JSON.stringify(param));
                }
            });
        },

        /** 用户登录 */
        k6_login: function k6_login(param, callback, errCallback) {
            var url = PlatformMgr.k6_baseUrl + 'user/login';
            // var param = {};
            param.app = PlatformMgr.k6_app;
            // 106021
            // param.sharer = '106021';
            // param.shareType = 1;
            param.sharer = PlatformMgr.shareUid;
            param.shareType = PlatformMgr.shareType;
            param.ios = PlatformMgr.isIOS() ? 1 : 0;
            // param.token = PlatformMgr.eolinkerToken;
            PlatformMgr.createHttpRequest(url, param, function (obj) {
                if (GameData.instance.isShowLog()) {
                    console.log('k6_login success:' + JSON.stringify(obj));
                }
                if (obj) {
                    if (callback) callback(obj.data);
                } else {
                    if (errCallback) errCallback();
                }
            }, function () {
                if (errCallback) errCallback();
                if (GameData.instance.isShowLog()) {
                    console.error('k6_login error, url:' + url + ' param:' + JSON.stringify(param));
                }
            });
        },

        // 发行SDK获取服务器时间戳
        k6_userDate: function k6_userDate(callback) {
            switch (PlatformMgr.platformType) {
                case PlatformType.WECHAT:
                    {
                        var url = PlatformMgr.k6_baseUrl + 'user/date';
                        var param = {};
                        param.app = PlatformMgr.k6_app;
                        param.version = '';
                        param.token = PlatformMgr.k6_Token;
                        PlatformMgr.createHttpRequest(url, param, function (obj) {
                            if (GameData.instance.isShowLog()) {
                                console.log('k6_userDate response data:' + JSON.stringify(obj));
                            }
                            if (obj) {
                                var serverTime = obj.data.now_time * 1000;
                                var curTime = Number(new Date().getTime());
                                PlatformMgr.timeDefence = curTime - serverTime;
                                if (GameData.instance.isShowLog()) {
                                    console.log(curTime, serverTime);
                                    console.log('时间差：' + PlatformMgr.timeDefence);
                                }
                            }
                            if (callback) callback();
                        }, function () {
                            if (GameData.instance.isShowLog()) {
                                console.error('k6_userDate error, url:' + url + ' param:' + JSON.stringify(param));
                            }
                        });
                        break;
                    }
                default:
                    {
                        if (callback) callback();
                        break;
                    }
            }
        },

        // 发行sdk跳转上报
        // adStatis: function (appid) {

        //     PlatformMgr.createEolinkerRequest('common/ad-statistics', {
        //         token: PlatformMgr.eolinkerToken,
        //         ad_appid: appid //广告位对应的小游戏appid
        //     }, (res) => {
        //         if (GameData.instance.isShowLog()) {
        //             console.log("result: ", res); //上报统计成功
        //             // console.log('eolinker adStatis resonse data:' + JSON.stringify(obj));
        //         }
        //     });

        // },

        /**
         * 广告位统计-ad上报
         * @param navIf 跳转信息配置
         * @param spotId 中转识别id
         */
        adStatis: function adStatis(navIf) {
            var spotId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

            var middle_id = "";
            if (spotId) middle_id = navIf.appid;
            PlatformMgr.createEolinkerRequest('common/ad-statistics', {
                // app: this.appName,
                token: PlatformMgr.eolinkerToken,
                ad_appid: navIf.distid,
                middle_appid: middle_id,
                ad_id: spotId
            }, function (res) {
                if (GameData.instance.isShowLog()) {
                    console.log("result: ", res); //上报统计成功
                    // console.log('eolinker adStatis resonse data:' + JSON.stringify(obj));
                }
            });
        },

        /**
         * 小游戏跳转
         * @param navIf 跳转信息配置
         * @param susCbk 成功回调
         * @param failCbk 失败回调
         */
        navgateTo: function navgateTo(navIf) {
            var susCbk = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var failCbk = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            var spotId = "";
            if (navIf.path.search(new RegExp('(^|&)?reJ=([^&]*)(&|$)')) != -1) {
                //是中转模式
                spotId = PlatformMgr.eolinkerApp + PlatformMgr.uid + Math.round(new Date().getTime() / 1000) + "";
                if (spotId.length > 25) spotId = spotId.substr(spotId.length - 25, spotId.length); //若超过25字符，截取后面25字符
                navIf.path += "&ad_id=" + spotId; //把中转识别id带过去
            }

            // let self = this;
            if (window['wx'].navigateToMiniProgram) {
                window['wx'].navigateToMiniProgram({
                    appId: navIf.appid,
                    path: navIf.path,
                    success: function success(res) {
                        if (spotId) {
                            PlatformMgr.adStatis(navIf, spotId); //广告位中转上报
                        } else {
                            PlatformMgr.adStatis(navIf); //广告位上报(不中转)
                        }
                        susCbk && susCbk();
                        // console.log("nav successed");
                    },
                    fail: function fail() {
                        failCbk && failCbk();
                    }
                });
            }
        },


        /**
         * 预览二维码
         * @param preIf 预览信息
         * @param susCbk 成功回调
         */
        onPreView: function onPreView(preIf) {
            var susCbk = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            var url = PlatformMgr.baseUrl + "QR_code/" + preIf.path;
            // let self = this;
            window['wx'].previewImage({
                current: url, // 当前显示图片的http链接
                urls: [url], // 需要预览的图片http链接列表
                success: function success() {
                    // console.log("prev successed");
                    PlatformMgr.adStatis(preIf);
                    susCbk && susCbk();
                }
            });
        },


        // 打开子域内容
        showOpenDataContext: function showOpenDataContext() {
            switch (PlatformMgr.platformType) {
                case PlatformType.WECHAT:
                    {
                        var open = qq.getOpenDataContext();
                        open.postMessage({
                            messageType: OpenDataMsgType.Show,
                            code: PlatformMgr.code
                        });
                    }
                    break;
                default:
                    break;
            }
        },

        closeOpenDataContext: function closeOpenDataContext() {
            switch (PlatformMgr.platformType) {
                case PlatformType.WECHAT:
                    {
                        var open = qq.getOpenDataContext();
                        open.postMessage({
                            messageType: OpenDataMsgType.Close
                        });
                    }
                    break;
                default:
                    break;
            }
        },

        leftOpenDataContext: function leftOpenDataContext() {
            switch (PlatformMgr.platformType) {
                case PlatformType.WECHAT:
                    {
                        var open = qq.getOpenDataContext();
                        open.postMessage({
                            messageType: OpenDataMsgType.Left
                        });
                    }
                    break;
                default:
                    break;
            }
        },

        rightOpenDataContext: function rightOpenDataContext() {
            switch (PlatformMgr.platformType) {
                case PlatformType.WECHAT:
                    {
                        var open = qq.getOpenDataContext();
                        open.postMessage({
                            messageType: OpenDataMsgType.Right
                        });
                    }
                    break;
                default:
                    break;
            }
        },

        showMiniOpenDataContext: function showMiniOpenDataContext() {
            switch (PlatformMgr.platformType) {
                case PlatformType.WECHAT:
                    {
                        var open = qq.getOpenDataContext();
                        open.postMessage({
                            messageType: OpenDataMsgType.Mini,
                            code: PlatformMgr.code
                        });
                    }
                    break;
                default:
                    break;
            }
        },

        closeMiniOpenDataContext: function closeMiniOpenDataContext() {
            switch (PlatformMgr.platformType) {
                case PlatformType.WECHAT:
                    {
                        var open = qq.getOpenDataContext();
                        open.postMessage({
                            messageType: OpenDataMsgType.CloseMini
                        });
                    }
                    break;
                default:
                    break;
            }
        },

        setUserCloudStorage: function setUserCloudStorage(rankScore) {
            switch (PlatformMgr.platformType) {
                case PlatformType.WECHAT:
                    {
                        var kvList = [];

                        var kvData = {
                            key: 'rankStar',
                            value: '' + rankScore
                        };
                        kvList.push(kvData);

                        var timeStampData = {
                            key: 'TIMESTAMP',
                            value: Tools.getTimestampMS().toString()
                        };
                        kvList.push(timeStampData);

                        var uidData = {
                            key: 'uuid',
                            value: PlatformMgr.code
                        };
                        kvList.push(uidData);

                        // 微信排行榜数据由服务器上报
                        wx.setUserCloudStorage({
                            KVDataList: kvList,
                            complete: function complete(res) {
                                if (GameData.instance.isShowLog()) {
                                    console.log('setUserCloudStorage complete:', res);
                                }
                            }
                        });
                    }
                    break;
                default:
                    break;
            }
        },

        /**
         * 上报BI自定义事件
         * @param {CustomFunnelEvent} customEvent 自定义BI事件类型
         */
        notifyFunnelEvent: function notifyFunnelEvent(customEvent) {
            if (PlatformMgr.reportFunnels && PlatformMgr.reportFunnels[customEvent]) {
                return;
            }

            PlatformMgr.hawkeye_report_funnel(customEvent);
            PlatformMgr.mta_report_funnel(customEvent);

            if (PlatformMgr.reportFunnels) {
                PlatformMgr.reportFunnels[customEvent] = true;
            }
        },

        mta_report_funnel: function mta_report_funnel(customEvent) {

            switch (PlatformMgr.platformType) {
                case PlatformType.WECHAT:
                    {
                        var key = '';
                        key = 'KEY_CUSTOM_Funnel_EVENT_' + customEvent;
                        var value = Tools.getItem(key);
                        if (value) {
                            if (GameData.instance.isShowLog()) {
                                console.log('skip funnel for event:' + customEvent);
                            }
                            return;
                        }
                        if (GameData.instance.isShowLog()) {
                            console.log('CustomFunnelEvent[customEvent]:' + CustomFunnelEvent[customEvent] + ',' + customEvent);
                        }

                        var obj = {};
                        obj[customEvent.toString()] = 'true';
                        mta.Event.stat('startfirstgame', obj);

                        Tools.setItem(key, Tools.getTimestampMS().toString());
                        break;
                    }
                default:
                    break;
            }
        },

        getAreaInfo: function getAreaInfo(callback) {
            switch (PlatformMgr.platformType) {
                case PlatformType.WECHAT:
                    {
                        var url = PlatformMgr.k6_baseUrl + 'user/getArea';
                        var param = {
                            app: PlatformMgr.k6_app,
                            token: PlatformMgr.k6_Token
                        };

                        PlatformMgr.createHttpRequest(url, param, function (obj) {
                            if (GameData.instance.isShowLog()) {
                                console.log('getArea response data:' + JSON.stringify(obj));
                            }

                            if (obj && obj.data && obj.data.cityInfo) {
                                if (callback) callback(obj.data.cityInfo);
                            }
                        });
                        break;
                    }
                default:
                    break;
            }
        },

        getShareScore: function getShareScore(callback) {
            switch (PlatformMgr.platformType) {
                case PlatformType.WECHAT:
                    {
                        var url = PlatformMgr.k6_baseUrl + 'user/getShareScore';
                        var param = {
                            app: PlatformMgr.k6_app,
                            token: PlatformMgr.k6_Token
                        };

                        PlatformMgr.createHttpRequest(url, param, function (obj) {
                            if (GameData.instance.isShowLog()) {
                                console.log('getShareScore response data:' + JSON.stringify(obj));
                            }

                            if (obj && obj.data) {
                                if (callback) callback(obj.data.score);
                            }
                        });
                        break;
                    }
                default:
                    if (callback) callback(0);
                    break;
            }
        },

        //#region ios appsflyer 上报
        af_report_user: function af_report_user() {
            if (cc.sys.os === cc.sys.OS_IOS) {
                // jsb.reflection.callStaticMethod("PlatMgr", "reportUser");
            }
        },

        getInviteInfo: function getInviteInfo(callback) {
            switch (PlatformMgr.platformType) {
                case PlatformType.WECHAT:
                    {
                        var url = PlatformMgr.k6_baseUrl + 'user/getShareNew';
                        var param = {
                            app: PlatformMgr.k6_app,
                            token: PlatformMgr.k6_Token
                        };

                        PlatformMgr.createHttpRequest(url, param, function (obj) {
                            if (GameData.instance.isShowLog()) {
                                console.log('getInviteInfo response data:' + JSON.stringify(obj));
                            }

                            if (obj && obj.data && obj.data.newUsers) {
                                if (callback) callback(obj.data.newUsers);
                            }
                        });
                        break;
                    }
                default:
                    var info = [{
                        iconUrl: 1
                    }, {
                        iconUrl: 2
                    }, {
                        iconUrl: 3
                    }];
                    if (callback) callback(info);
                    break;
            }
        },

        resetShareDailyRequest: function resetShareDailyRequest(callback) {
            switch (PlatformMgr.platformType) {
                case PlatformType.WECHAT:
                    {
                        var url = PlatformMgr.k6_baseUrl + 'fake/resetShareDaily';
                        var param = {
                            app: PlatformMgr.k6_app,
                            token: PlatformMgr.k6_Token
                        };

                        PlatformMgr.createHttpRequest(url, param, function (obj) {
                            if (GameData.instance.isShowLog()) {
                                console.log('resetShareDailyRequest response data:' + JSON.stringify(obj));
                            }
                            if (callback) callback();
                        });
                        break;
                    }
                default:
                    break;
            }
        },

        /**
         * 当前平台是否使用微信的API，头条小游戏、QQ小游戏等平台可直接使用微信的API
         * @returns {boolean} 是否使用微信的API
         */
        isPlatformUseWxApi: function isPlatformUseWxApi() {
            return PlatformMgr.platformType === PlatformType.WECHAT
            //  || PlatformMgr.platformType === PlatformType.TOUTIAO
            //  || PlatformMgr.platformType === PlatformType.QQMINIAPP
            ;
        },

        reportAnalytics: function reportAnalytics() {
            if (PlatformMgr.isReportAnalytics) {
                return;
            }

            switch (PlatformMgr.platformType) {
                case PlatformType.WECHAT:
                    {
                        PlatformMgr.isReportAnalytics = true;
                        if (qq && qq.reportAnalytics && typeof qq.reportAnalytics === 'function') {
                            qq.reportAnalytics('finishShow');
                        }
                        break;
                    }
                default:
                    break;
            }
        },

        //暑期排行相关
        setHolidayScore: function setHolidayScore(score, callback) {
            switch (PlatformMgr.platformType) {
                case PlatformType.BROWSER:
                case PlatformType.WECHAT:
                    {
                        var url = PlatformMgr.k6_baseUrl + 'user/uploadScore';
                        var param = {
                            app: PlatformMgr.k6_app,
                            token: PlatformMgr.k6_Token,
                            score: score
                        };

                        PlatformMgr.createHttpRequest(url, param, function (obj) {
                            if (GameData.instance.isShowLog()) {
                                console.log('setHolidayScore response data:' + JSON.stringify(obj));
                            }
                            if (callback) callback();
                        });
                        break;
                    }
                default:
                    break;
            }
        },

        getHolidayPKRank: function getHolidayPKRank(callback) {
            switch (PlatformMgr.platformType) {
                case PlatformType.BROWSER:
                case PlatformType.WECHAT:
                    {
                        var url = PlatformMgr.k6_baseUrl + 'user/smallRank';
                        var param = {
                            app: PlatformMgr.k6_app,
                            token: PlatformMgr.k6_Token
                        };

                        PlatformMgr.createHttpRequest(url, param, function (obj) {
                            if (GameData.instance.isShowLog()) {
                                console.log('getHolidayPKRank response data:' + JSON.stringify(obj));
                            }
                            if (obj) {
                                if (callback) callback(obj.data);
                            }
                        });
                        break;
                    }
                default:
                    break;
            }
        },

        getHolidayWorldRank: function getHolidayWorldRank(round, callback) {
            switch (PlatformMgr.platformType) {
                case PlatformType.BROWSER:
                case PlatformType.WECHAT:
                    {
                        var url = PlatformMgr.k6_baseUrl + 'user/worldRank';
                        var param = {
                            app: PlatformMgr.k6_app,
                            token: PlatformMgr.k6_Token,
                            round: round
                        };

                        PlatformMgr.createHttpRequest(url, param, function (obj) {
                            if (GameData.instance.isShowLog()) {
                                console.log('getHolidayWorldRank response data:' + JSON.stringify(obj));
                            }
                            if (obj) {
                                if (callback) callback(obj.data);
                            }
                        });
                        break;
                    }
                default:
                    break;
            }
        },

        getHolidayPKReward: function getHolidayPKReward(callback) {
            switch (PlatformMgr.platformType) {
                case PlatformType.BROWSER:
                case PlatformType.WECHAT:
                    {
                        var url = PlatformMgr.k6_baseUrl + 'user/lastSmallRank';
                        var param = {
                            app: PlatformMgr.k6_app,
                            token: PlatformMgr.k6_Token
                        };

                        PlatformMgr.createHttpRequest(url, param, function (obj) {
                            if (GameData.instance.isShowLog()) {
                                console.log('getHolidayPKReward response data:' + JSON.stringify(obj));
                            }
                            if (obj && obj.data) {
                                if (callback) callback(obj.data);
                            }
                        });
                        break;
                    }
                default:
                    if (callback) callback();
                    break;
            }
        },

        getHolidayWorldReward: function getHolidayWorldReward(callback) {
            switch (PlatformMgr.platformType) {
                case PlatformType.BROWSER:
                case PlatformType.WECHAT:
                    {
                        var url = PlatformMgr.k6_baseUrl + 'user/lastWorldRank';
                        var param = {
                            app: PlatformMgr.k6_app,
                            token: PlatformMgr.k6_Token
                        };

                        PlatformMgr.createHttpRequest(url, param, function (obj) {
                            if (GameData.instance.isShowLog()) {
                                console.log('getHolidayWorldReward response data:' + JSON.stringify(obj));
                            }
                            if (obj && obj.data) {
                                if (callback) callback(obj.data);
                            }
                        });
                        break;
                    }
                default:
                    if (callback) callback();
                    break;
            }
        },

        getHolidayWorldRewardInfo: function getHolidayWorldRewardInfo(callback) {
            switch (PlatformMgr.platformType) {
                case PlatformType.BROWSER:
                case PlatformType.WECHAT:
                    {
                        var url = PlatformMgr.k6_baseUrl + 'user/worldRewardInfo';
                        var param = {
                            app: PlatformMgr.k6_app,
                            token: PlatformMgr.k6_Token
                        };

                        PlatformMgr.createHttpRequest(url, param, function (obj) {
                            if (GameData.instance.isShowLog()) {
                                console.log('getHolidayWorldRewardInfo response data:' + JSON.stringify(obj));
                            }
                            if (obj && obj.data) {
                                if (callback) callback(obj.data);
                            }
                        });
                        break;
                    }
                default:
                    if (callback) callback();
                    break;
            }
        },

        getCountry: function getCountry() {
            switch (PlatformMgr.platformType) {
                case PlatformType.ANDROID:
                    {
                        var country = jsb.reflection.callStaticMethod('org/cocos2dx/javascript/Utils', 'getCountry', '()Ljava/lang/String;');
                        console.log('PlatformMgr.getCountry: ' + country);
                        return country;
                    }
                    break;
                case PlatformType.IOS:
                    {
                        var country = jsb.reflection.callStaticMethod('Utils', 'getCountry');
                        console.log('PlatformMgr.getCountry: ' + country);
                        return country;
                    }
                    break;
                default:
                    break;
            }
        },

        getLanguageCode: function getLanguageCode() {
            switch (PlatformMgr.platformType) {
                case PlatformType.ANDROID:
                    {
                        var language = jsb.reflection.callStaticMethod('org/cocos2dx/javascript/Utils', 'getLanguageCode', '()Ljava/lang/String;');
                        console.log('PlatformMgr.getLanguageCode: ' + language);
                        return language;
                    }
                    break;
                case PlatformType.IOS:
                    {
                        var language = jsb.reflection.callStaticMethod('Utils', 'getLanguageCode');
                        console.log('PlatformMgr.getLanguageCode: ' + language);
                        return language;
                    }
                    break;
                default:
                    break;
            }
        },

        /**
         * 打开或跳转评论页面
         */
        openStoreComment: function openStoreComment() {
            switch (PlatformMgr.platformType) {
                case PlatformType.ANDROID:
                    {
                        jsb.reflection.callStaticMethod('org/cocos2dx/javascript/Utils', 'openStoreComment', '()V');
                    }
                    break;
                case PlatformType.IOS:
                    {
                        var url = 'itms-apps://itunes.apple.com/app/id1460796876?action=write-review';
                        cc.sys.openURL(url);
                    }
                    break;
                default:
                    break;
            }
        },
        //-----------------------------------------------------------------------//
        /**
         * 链接钱包
         */
        connectBitverse: function connectBitverse() {
            switch (PlatformMgr.platformType) {
                case PlatformType.ANDROID:
                    {
                        console.log("connectBitverse ===>");
                        jsb.reflection.callStaticMethod('org/cocos2dx/javascript/BitverseManager', 'Connect', '()V');
                    }
                    break;
                case PlatformType.IOS:
                    {
                        jsb.reflection.callStaticMethod('BitverseManager', 'Connect');
                    }
                    break;
                default:
                    break;
            }
        },

        web3_gm_api: function web3_gm_api(method, pramStr, cb1, cb2) {
            var url = PlatformMgr.gm_baseUrl + "/gmapi/game/" + method + "?" + pramStr;
            PlatformMgr.createHttpRequest(url, "", function (obj) {
                if (GameData.instance.isShowLog()) {
                    console.log('web3_gm_api resonse data:' + JSON.stringify(obj));
                    // cb1 && cb1(obj)
                }
                if (cb1) {
                    cb1(obj);
                }
            }, function () {
                if (GameData.instance.isShowLog()) {
                    console.error('web3_gm_api error, url:' + url + ' param:' + JSON.stringify(param));
                    // cb2 && cb2(obj) 
                }
                if (cb2) {
                    cb2();
                }
            });
        },

        //查询是否还有余额，表示可以领取
        qureyBalance: function qureyBalance() {
            if (!PlatformMgr.open_nft_moudle) {
                return;
            }
            // PlatformMgr.web3_gm_api("qureyBalanceFromChain", "",
            var curTime = Number(new Date().getTime());
            PlatformMgr.web3_gm_api("qureyBalanceFromDB", 'time=' + curTime, function (rsp) {
                if (rsp.result == 0) {
                    if (rsp.data) {
                        //tokenid拼接字符串
                        var dataStr = rsp.data;
                        var id_index_ar = dataStr.split("_");
                        var ids = {};
                        for (var index = 0; index < id_index_ar.length; index++) {
                            var _strs = id_index_ar[index].split("=");
                            //在钱包里page的顺序，暂时不用
                            var _i = _strs[0];
                            //tokenid：nft标识，erc1155协议 1对多，对应游戏里的商品id; 
                            //tokenId : count 即 该皮肤还有多少个NFT
                            var tokenid = _strs[1];
                            if (ids.hasOwnProperty(tokenid)) {
                                ids[tokenid] = ids[tokenid] + 1;
                            } else {
                                ids[tokenid] = 1;
                            }
                        }
                        PlatformMgr.nft_balance_ids = ids;
                        return ids;
                    } else {
                        console.log("rsp.data null");
                        return {};
                    }
                } else {
                    console.log("rsp result error", rsp.result);
                    return {};
                }
            }, function () {
                console.log("gm query failed");
                return {};
            });
        },

        //查询玩家NFT资产
        checkUserNFT: function checkUserNFT() {
            if (!PlatformMgr.open_nft_moudle) {
                return;
            }
            // if(PlatformMgr.playerData.bitverseWallet==""){
            //     PlatformMgr.connectBitverse()
            //     // AdvertMgr.instance.showUITips(Tools.getStringByFormat("请先链接Bitverse钱包"))
            //     return
            // }

            var uuid = Tools.getItem('user_uuid') || 0;
            var country = PlatformMgr.getCountry() || "";
            var adress = PlatformMgr.playerData.bitverseWallet || "1";

            var pramStr = 'uuid=' + uuid + '&country=' + country + '&adress=' + adress;
            PlatformMgr.web3_gm_api("checkNFTFormDB", pramStr, function (rsp) {
                if (rsp.result == 200) {
                    if (rsp.data) {
                        //tokenid拼接字符串
                        var dataStr = rsp.data;
                        var id_index_ar = dataStr.split("_");
                        var ids = {};
                        for (var index = 0; index < id_index_ar.length; index++) {
                            var _strs = id_index_ar[index].split("=");
                            //在钱包里page的顺序，暂时不用
                            var _i = _strs[0];
                            //tokenid：nft标识，erc1155协议 1对多，对应游戏里的商品id; 
                            //tokenId : count 即 该皮肤还有多少个NFT
                            var tokenid = _strs[1];
                            if (ids.hasOwnProperty(tokenid)) {
                                ids[tokenid] = ids[tokenid] + 1;
                            } else {
                                ids[tokenid] = 1;
                            }
                        }
                        PlatformMgr.nft_user_datas = ids;
                        return ids;
                    } else {
                        console.log("rsp.data null");
                        return {};
                    }
                } else {
                    console.log("rsp result error", rsp.result);
                    return {};
                }
            }, function () {
                console.log("gm query failed");
                return {};
            });
        },

        //发起一条NFT领取请求
        requestNFTGet: function requestNFTGet(data) {
            if (!PlatformMgr.open_nft_moudle) {
                return;
            }
            if (data.getWay != 100) return;

            // if(PlatformMgr.playerData.bitverseWallet==""){
            //     PlatformMgr.connectBitverse()
            //     // AdvertMgr.instance.showUITips(Tools.getStringByFormat("请先链接Bitverse钱包"))
            //     return
            // }

            var uuid = Tools.getItem('user_uuid') || "";
            var country = PlatformMgr.getCountry() || "";
            var adress = PlatformMgr.playerData.bitverseWallet || "";
            var goodsId = data.goodsId;
            var goodsName = encodeURIComponent(data.goodsName);
            var name = encodeURIComponent(data.name);
            var token = data.token;
            var pramStr = 'uuid=' + uuid + '&country=' + country + '&adress=' + adress + '&id=' + goodsId + '&name=' + name + '&name2=' + goodsName + '&token=' + token;
            PlatformMgr.web3_gm_api("requestNFT", pramStr, function (rsp) {
                if (rsp.result == 200) {
                    if (rsp.data) {
                        //tokenid拼接字符串
                        var dataStr = rsp.data;
                        AdvertMgr.instance.showUITips(Tools.getStringByFormat(dataStr));
                        return null;
                    } else {
                        console.log("rsp.data null");
                        return null;
                    }
                } else {
                    if (rsp.data) {
                        AdvertMgr.instance.showUITips(Tools.getStringByFormat(rsp.data));
                    } else {
                        console.log("rsp result error", rsp.result);
                    }
                    return null;
                }
            }, function () {
                console.log("gm query failed");
                return null;
            });
        }
    }

});

cc._RF.pop();