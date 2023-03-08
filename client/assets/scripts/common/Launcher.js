/**
 * @fileoverview Launcher类的实现
 * @author <liqing@gameley.cn> (李清)
 */

const Tools = require('Tools');
const GameData = require('GameData');
const ConfigData = require('ConfigData');
const PlayerData = require('PlayerData');
const PlatformMgr = require('PlatformMgr');
const UpdateMgr = require('UpdateMgr');
const ShareMgr = require('ShareMgr');
const AdvertMgr = require('AdvertMgr');
const CustomFunnelEvent = require('Types').CustomFunnelEvent;
const PlatformType = require('Types').PlatformType;
const Contact = require('Contact');
const CollisionManager = require('CollisionManager');
const Scheduler = cc.Scheduler;
const LanguageMgr = require('LanguageMgr');
const v2Proto = cc.Vec2.prototype;
const PayMgr = require('PayMgr');

/**
 * Launcher 游戏入口
 */
const Launcher = cc.Class({
    extends: cc.Component,

    statics: {

    },

    properties: {
        // loadTips: cc.Label,
        waitNode: cc.Node,
        needUpdate: false,
        timeOutTime: 15,
    },

    onLoad: function () {
        // if (cc.sys.platform === cc.sys.WECHAT_GAME) {
        //     const version = wx.getSystemInfoSync().SDKVersion;
        //     if (Tools.compareVersion(version, '2.1.0') >= 0) {
        //         const self = this;
        //         cc.loader.downloader.loadSubpackage('res', function (err) {
        //             if (err) {
        //                 return console.error(err);
        //             }
        //             // console.log('load subpackage res successfully.');

        //             self.init();
        //         });

        //     } else {
        //         wx.showModal({
        //             title: '提示',
        //             content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        //         });
        //     }
        // } else {
        this.init();
        // }
    },

    init: function () {
        this.waitTime = 2;
        GameData.init();
        console.log('curTime: ' + Tools.getTimestampMS());
        GameData.instance._curTime = Tools.getTimestampMS();
        PlatformMgr.init();
        GameData.instance.logUseTime('PlatformMgr init');

        UpdateMgr.checkNewClient(() => {

            PlayerData.init();
            GameData.instance.logUseTime('PlayerData init');


            ShareMgr.init();
            GameData.instance.logUseTime('ShareMgr init');

            this.doLogin();

            ConfigData.init();
            GameData.instance.logUseTime('ConfigData init');
            AdvertMgr.init();
            PayMgr.init();
            GameData.instance.logUseTime('AdvertMgr init');
            // cc.director.preloadScene("Battle");
        });


        cc.Contact = Contact;
        let manager = cc.director.getCollisionManager();
        if (manager) {
            cc.director.getScheduler().unscheduleUpdate(manager);
        }
        cc.director._collisionManager = new CollisionManager();
        cc.director.getScheduler().scheduleUpdate(cc.director._collisionManager, Scheduler.PRIORITY_SYSTEM, false);

        var getRotation = function () {
            return -this.angle;
        };

        var setRotation = function (value) {
            this.angle = -value;
        };

        var _p = cc.Node.prototype;
        cc.js.getset(_p, 'rotation', getRotation, setRotation, false, true);

        cc.Vec3.prototype.rotate = function (radians, out) {
            // cc.warnID(1408, 'vec3.rotate', 'v2.1', 'cc.v2(selfVector).rotate(radians, out)');
            return v2Proto.rotate.call(this, radians, out);
        }

    },

    doLogin: function () {
        PlatformMgr.notifyFunnelEvent(CustomFunnelEvent.Login_Start);
        var self = this;
        PlatformMgr.doLogin((res) => {

            if (res.result) {
                PlatformMgr.notifyFunnelEvent(CustomFunnelEvent.Login_Suc);
                GameData.instance.logUseTime('login suc');
                PlayerData.instance.initUserData(() => {
                    PlatformMgr.notifyFunnelEvent(CustomFunnelEvent.Load_UserData);
                    PlatformMgr.hawkeye_report_login();
                    PlatformMgr.hawkeye_report_share_in();
                    PlatformMgr.hawkeye_report_level();
                });
                this.setLanguage();
                PlatformMgr.af_report_user();
            } else {
                GameData.instance.logUseTime('login fail');
                wx.showModal({
                    title: '提示',
                    content: '网络连接似乎有问题，请检查网络设置后重试',
                    showCancel: false,
                    success(res) {
                        if (res.confirm) {
                            self.doLogin();
                            //   console.log('用户点击确定')
                        }
                    }
                });
            }
        });

        this.needUpdate = true;
        this.timeOutTime = 15;
    },

    setLanguage: function () {
        var lang = Tools.getItem('curLanguage');
        if (lang !== null && lang !== undefined) {
            LanguageMgr.setLang(Number(lang));
        } else {
            // 先判断 languageCode
            // 如果都没有 在判断一轮 country
            // 如果还都没有 就显示默认英文
            if (PlayerData.instance.languageCode === 'ja') {
                LanguageMgr.setLang(1);
            } else if (PlayerData.instance.languageCode === 'ko') {
                LanguageMgr.setLang(2);
            } else if (PlayerData.instance.languageCode === 'de') {
                LanguageMgr.setLang(3);
            } else if (PlayerData.instance.languageCode === 'ru') {
                LanguageMgr.setLang(4);
            } else if (PlayerData.instance.languageCode === 'zh') {
                LanguageMgr.setLang(5);
            } else if (PlayerData.instance.languageCode === 'es') {
                LanguageMgr.setLang(6);
            } else if (PlayerData.instance.languageCode === 'fr') {
                LanguageMgr.setLang(7);
            } else if (PlayerData.instance.languageCode === 'pt') {
                LanguageMgr.setLang(8);
            } else {
                if (PlayerData.instance.country === 'JP') {
                    LanguageMgr.setLang(1);
                } else if (PlayerData.instance.country === 'KR') {
                    LanguageMgr.setLang(2);
                } else if (PlayerData.instance.country === 'DE') {
                    LanguageMgr.setLang(3);
                } else if (PlayerData.instance.country === 'RU') {
                    LanguageMgr.setLang(4);
                } else if (PlayerData.instance.country === 'TW') {
                    LanguageMgr.setLang(5);
                } else if (PlayerData.instance.country === 'ES') {
                    LanguageMgr.setLang(6);
                } else if (PlayerData.instance.country === 'FR') {
                    LanguageMgr.setLang(7);
                } else if (PlayerData.instance.country === 'PT') {
                    LanguageMgr.setLang(8);
                }
            }


        }
    },

    update: function (dt) {
        if (ConfigData.instance && ConfigData.instance.loadingConfigCount === ConfigData.instance.loadedConfigCount) {
            PlatformMgr.notifyFunnelEvent(CustomFunnelEvent.Load_ConfigData);
            if (PlayerData.instance.loadComplete) {
                if (!this.isloading) {

                    if (PlatformMgr.platformType == PlatformType.ANDROID) {
                        console.log("---打开时，同步信息---")
                        //是否是第一天的用户
                        let frst = PlayerData.instance.isFirstDay() ? "1" : "0"
                        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManage",
                            "FAUserProperty",
                            "(Ljava/lang/String;Ljava/lang/String;)V",
                            "is_firstopen",
                            frst)

                        //同步每日广告收益
                        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManage",
                            "FATotalRevenueSwitch",
                            "(Ljava/lang/String;Ljava/lang/String;)V",
                            PlayerData.instance.dayCanReportTotalAdsRevenue ? "1" : "0",
                            PlayerData.instance.dayTotalAdsRevenue + "")

                        //测试，随机ab——test
                        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManage",
                            "FAUserProperty",
                            "(Ljava/lang/String;Ljava/lang/String;)V",
                            "ab_test",
                            Math.random() > 0.5 ? "1.0.37_A" : "1.0.37_B")
                    }
                    else if (PlatformMgr.platformType == PlatformType.IOS) {
                        let frst = PlayerData.instance.isFirstDay() ? "1" : "0"
                        jsb.reflection.callStaticMethod("AdManage",
                            "FAUserProperty:sec:",
                            "is_firstopen",
                            frst)

                        //同步每日广告收益
                        jsb.reflection.callStaticMethod("AdManage",
                            "FATotalRevenueSwitch:sec:",
                            PlayerData.instance.dayCanReportTotalAdsRevenue ? "1" : "0",
                            PlayerData.instance.dayTotalAdsRevenue + "")
                    }

                    if (AdvertMgr.instance.getOpenAdRules()) {
                        ///////展示开屏广告////////////
                        AdvertMgr.instance.isShowingOpenAd = true
                        // PlayerData.instance.isShowOpenAdCold = true
                        AdvertMgr.instance.showOpenApp()
                        //////////////////////////////
                    }
                    else {
                        PlatformMgr.notifyFunnelEvent(CustomFunnelEvent.Switch_BattleFire);
                        GameData.instance.logUseTime('loadScene Battle');
                        cc.director.loadScene("Battle");
                        this.needUpdate = false;

                        this.isShowOpenAd = true
                    }

                    this.isloading = true;

                    // PlatformMgr.notifyFunnelEvent(CustomFunnelEvent.Switch_BattleFire);
                    // GameData.instance.logUseTime('loadScene Battle');
                    // cc.director.loadScene("Battle");
                    // this.needUpdate = false;
                }
                else {
                    if (!this.isShowOpenAd) {
                        if (AdvertMgr.instance.isShowingOpenAd) {
                            //没收到广告结果前，继续调用播放
                            AdvertMgr.instance.showOpenApp()
                        }
                        else {
                            console.log(" isShowOpenAd ", AdvertMgr.instance.isShowingOpenAd, PlayerData.instance.isShowOpenAdCold)
                            //开屏广告之后加载场景
                            PlatformMgr.notifyFunnelEvent(CustomFunnelEvent.Switch_BattleFire);
                            GameData.instance.logUseTime('loadScene Battle');
                            cc.director.loadScene("Battle");
                            this.needUpdate = false;
                            this.isShowOpenAd = true
                        }
                    }

                }
            }
        }

        if (!this.waitNode.active) {
            this.waitTime -= dt;
            if (this.waitTime <= 0) {
                this.waitNode.active = true;
            }
        }

        if (this.needUpdate) {
            this.timeOutTime -= dt;
            if (this.timeOutTime <= 0) {
                this.needUpdate = false;

                // wx.showModal({
                //     title: '提示',
                //     content: '网络连接似乎有问题，请检查网络设置后重试',
                //     showCancel: false,
                //     success(res) {
                //         if (res.confirm) {
                //             cc.director.loadScene("Launcher");
                //             //   console.log('用户点击确定')
                //         }
                //     }
                // });
            }
        }
    },
});