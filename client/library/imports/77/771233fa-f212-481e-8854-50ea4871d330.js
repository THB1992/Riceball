"use strict";
cc._RF.push(module, '77123P68hJIHohUUOpIcdMw', 'WeiShuSdk');
// scripts/sdk/WeiShuSdk.js

"use strict";

/**SDK 封装了渠道上报、存取用户信息等常用功能接口 */
var WeiShuSdk = {
    baseUrl: "https://gamebix.oss-cn-shenzhen.aliyuncs.com/", //需要加进mp后台服务器request、downloadFile合法域名里
    constellUrl: "https://constellation.mamapai.net/", //需要加进mp后台服务器request合法域名里
    appName: "knife666", //constell后端给的游戏标识，如未提供，联系鹏程万里(鹏程)
    uinfo: {
        token: "", //接口调用凭证
        uid: "", //用户id
        is_new: false //是否新用户
    }, //https://constellation.mamapai.net后台登录返回的用户信息
    channelCode: "", //渠道id
    userData: {},
    /**初始化
     * @param susCbk 成功回调
    */
    Init: function Init(susCbk) {
        var _this = this;

        //在游戏拉起的时候调用 只调用一次
        if (cc.sys.platform != cc.sys.WECHAT_GAME) return;
        var launchOpt = wx.getLaunchOptionsSync ? wx.getLaunchOptionsSync() : {}; //获取启动参数
        this.channelCode = "";
        if (launchOpt.query) {
            //获取渠道id
            if (launchOpt.query.scene) {
                //渠道id获取场景一：玩家通过扫描带渠道参数二维码进入游戏 
                //res.query.scene形如cid%3Djtdld 需要解码
                var launchData = decodeURIComponent(launchOpt.query.scene); //解码
                //"cid"是统计后台规定的渠道标识key值
                var reg = new RegExp("(^|&)" + "cid" + "=([^&]*)(&|$)");
                var r = launchData.match(reg); //查询是否带渠道参数
                if (r != null) {
                    this.channelCode = unescape(r[2]);
                }
            } else if (launchOpt.query.cid) {
                //渠道id获取场景二：玩家通过外部渠道点击跳转进入游戏
                this.channelCode = launchOpt.query.cid;
            }
            console.log("获取到渠道id: ", this.channelCode);
        }
        this.onLogin(function () {
            susCbk && susCbk();
            _this.openStatis(launchOpt.scene); //打开上报 回传场景值
        });
    },

    /**登录获取token */
    onLogin: function onLogin(susCbk) {
        var self = this;
        wx.login({
            success: function success(res) {
                if (res.code) {
                    //这里获取wx.login
                    self.$post(self.constellUrl + 'user/login', {
                        app: self.appName, //app
                        code: res.code, //微信登录code (^^^code有5分钟的有效期，而且只能使用一次)
                        cid: self.channelCode //渠道id 【渠道上报情形一：渠道访问上报】
                    }, function (rh) {
                        if (rh.data.data && rh.data.data.token) {
                            self.uinfo.token = rh.data.data.token;
                            self.uinfo.uid = rh.data.data.uid;
                            self.uinfo.is_new = rh.data.data.is_new;
                            susCbk && susCbk();
                            self.getUserData(null, null);
                            console.log("获取token成功 token: ", self.uinfo.token);
                        } else {
                            console.warn("token不存在！");
                        }
                    });
                } else {
                    console.log('登录失败！' + res.errMsg);
                }
            }
        });
    },
    openStatis: function openStatis(scene) {
        //打开应用上报
        this.$post(this.constellUrl + '/data-statistics/open-app', {
            app: this.appName,
            token: this.uinfo.token,
            scene: scene
        }, function (res) {
            console.log("打开应用上报:", res);
        });
    },
    retainStatis: function retainStatis() {
        //渠道留存上报统计 统计同一渠道每天用户的留存，每天上报一次即可
        if (!this.userData.cidList || !this.userData.td_Stamp || this.userData.td_Stamp && this.getTimeSpanAt0() > this.userData.td_Stamp) {
            this.userData.cidList = []; //新的一天 清空已上报cid列表
        }
        if (this.userData.cidList.indexOf(this.channelCode) == -1) {
            this.userData.cidList.push(this.channelCode);
            this.saveUserData(null, null);
            this.$post(this.constellUrl + 'user/old-user-visit', {
                app: this.appName, //【渠道上报情形二：渠道留存上报】
                token: this.uinfo.token,
                cid: this.channelCode
            }, function (res) {});
        }
    },
    authStatis: function authStatis() {
        //渠道授权上报统计 用户发起授权的时候手动调用一次
        if (this.channelCode) {
            this.uinfo.token && this.$post(this.constellUrl + 'user/update-user-info', {
                app: this.appName, //【渠道上报情形三：渠道授权上报】
                token: this.uinfo.token,
                cid: this.channelCode
            }, function (res) {});
        }
    },
    getUserData: function getUserData() {
        var susCbk = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var failCbk = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        //获取用户数据
        var self = this;
        this.uinfo.token && this.$post(this.constellUrl + 'common/download-data', {
            app: this.appName,
            token: this.uinfo.token
        }, function (res) {
            if (res.data && res.data.data && res.data.data.data) {
                self.userData = JSON.parse(res.data.data.data);
                susCbk && susCbk();
                console.log("获取到用户数据: ", self.userData); //获取成功
            } else {
                self.userData = {};
                failCbk && failCbk();
            }
            self.channelCode && self.retainStatis();
        });
    },
    saveUserData: function saveUserData() {
        var susCbk = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var failCbk = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        //保存用户数据
        this.userData.td_Stamp = Date.now(); //记录最后一次保存时间
        this.uinfo.token && this.$post(this.constellUrl + 'common/upload-data', {
            app: this.appName,
            token: this.uinfo.token,
            data: JSON.stringify(this.userData) //用户数据
        }, function (res) {
            console.log("保存用户数据成功: ", res); //保存成功
            susCbk && susCbk();
        });
    },


    /**
     * 广告位统计-ad上报
     * @param navIf 跳转信息配置
     * @param spotId 中转识别id
     */
    adStatis: function adStatis(navIf) {
        var spotId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        var middle_id = "";
        if (spotId) middle_id = navIf.appid;
        this.$post(this.constellUrl + 'data-statistics/ad', {
            app: this.appName,
            token: this.uinfo.token,
            ad_appid: navIf.distid,
            middle_appid: middle_id,
            ad_id: spotId
        }, function (res) {
            console.log("广告位统计-ad上报: ", res);
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
            spotId = this.appName + this.uinfo.uid + Math.round(new Date().getTime() / 1000) + "";
            if (spotId.length > 25) spotId = spotId.substr(spotId.length - 25, spotId.length); //若超过25字符，截取后面25字符
            navIf.path += "&ad_id=" + spotId; //把中转识别id带过去
        }

        var self = this;
        if (window['wx'].navigateToMiniProgram) {
            window['wx'].navigateToMiniProgram({
                appId: navIf.appid,
                path: navIf.path,
                success: function success(res) {
                    if (spotId) {
                        self.adStatis(navIf, spotId); //广告位中转上报
                    } else {
                        self.adStatis(navIf); //广告位上报(不中转)
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

        var url = this.baseUrl + "QR_code/" + preIf.path;
        var self = this;
        window['wx'].previewImage({
            current: url, // 当前显示图片的http链接
            urls: [url], // 需要预览的图片http链接列表
            success: function success() {
                // console.log("prev successed");
                self.adStatis(preIf);
                susCbk && susCbk();
            }
        });
    },


    //获取当天零点时间戳
    getTimeSpanAt0: function getTimeSpanAt0() {
        var d = new Date(new Date().toDateString());
        return d.getTime();
    },
    $post: function $post(url, data) {
        var resolve = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var reject = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        //封装POST方法
        window['wx'].request({
            url: url,
            data: data,
            method: "POST",
            success: resolve,
            fail: reject
        });
    },


    /**
     * 比较版本号
     * @param   expVer 期望版本号
     * @return 基础库版本号是否大于等于期望版本号
     */
    overVer: function overVer(expVer) {
        var libVer = wx.getSystemInfoSync().SDKVersion;
        var _libArr = libVer.split(".");
        var _expVer = expVer.split(".");
        var len = Math.max(_libArr.length, _expVer.length);

        if (_libArr.length < len) {
            _libArr.push('0');
        }
        if (_expVer.length < len) {
            _expVer.push('0');
        }
        for (var i = 0; i < len; i++) {
            var num1 = parseInt(_libArr[i]);
            var num2 = parseInt(_expVer[i]);
            if (num1 > num2) {
                return true;
            } else if (num1 < num2) {
                return false;
            }
        }
        return true;
    }
};

module.exports = WeiShuSdk;

cc._RF.pop();