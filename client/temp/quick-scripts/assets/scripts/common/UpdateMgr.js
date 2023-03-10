(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/common/UpdateMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3358fRwcA1EfoaZexNqHb38', 'UpdateMgr', __filename);
// scripts/common/UpdateMgr.js

'use strict';

/**
 * @fileoverview UpdateMgr
 * @author <meifan@gameley.cn> (梅凡)
 */

var GameData = require('GameData');
var PlatformMgr = require('PlatformMgr');
var Tools = require('Tools');

/**
* UpdateMgr 更新管理器
*/
var UpdateMgr = cc.Class({
    statics: {

        /**
         * 检查是否是新安装，若是则需要清空本地下载资源
         * @param {function} callback 成功回调
         */
        checkNewClient: function checkNewClient(callback) {
            // QQ小游戏由于拉取json太慢，需要把部分json压缩打包，首次进入游戏进行解压缩
            if (PlatformMgr.isPlatformUseWxApi() &&
            // PlatformMgr.platformType === PlatformType.QQMINIAPP &&
            !PlatformMgr.isDevTool && window !== undefined && window.wxDownloader !== undefined && window.wxFsUtils !== undefined && GameData.instance.isEnvironmentCheckUpdate()) {
                console.log('UNZIP_TAG 开始检查解压缩');
                var wxDownloader = window.wxDownloader;
                var wxFsUtils = window.wxFsUtils;
                if (wx.getFileSystemManager) {
                    var fs = wx.getFileSystemManager();
                    var unzipFlag = 'res_unzip_flag_' + GameData.instance.srcVersion;
                    var unzipFlagFilePath = wxDownloader.cacheDir + '/' + unzipFlag;
                    console.log('UNZIP_TAG 开始检查res压缩包 flagFile:' + unzipFlagFilePath);
                    fs.access({
                        path: unzipFlagFilePath,
                        success: function success() {
                            console.log('UNZIP_TAG ' + unzipFlagFilePath + ' 存在，已经解压过了~');
                            if (callback) callback();
                        },
                        fail: function fail() {
                            var storageFlag = Tools.getItem(unzipFlag);
                            if (storageFlag === '1') {
                                console.log('UNZIP_TAG ' + unzipFlag + ' 存在，已经解压过了~');
                                if (callback) callback();
                            } else {
                                var relativePath = '/res/res.' + GameData.instance.srcVersion + '.zip';
                                var url = wxDownloader.REMOTE_SERVER_ROOT + relativePath;
                                var zipFilePath = wxDownloader.cacheDir + relativePath;
                                var zipDirPath = wxDownloader.cacheDir + '/res';
                                console.log('UNZIP_TAG ' + unzipFlag + ' 不存在，需要进行下载和解压 url:' + url);
                                wxFsUtils.exists(zipDirPath, function (exists) {
                                    console.log('UNZIP_TAG 下载目录是否存在:' + exists);
                                    if (!exists) {
                                        wxFsUtils.makeDirSync(zipDirPath, true);
                                    }

                                    wxFsUtils.downloadFile(url, zipFilePath, function (error, downloadFilePath) {
                                        if (error) {
                                            console.error('UNZIP_TAG 下载失败，error:', error);
                                            if (callback) callback();
                                        } else {
                                            console.log('UNZIP_TAG 下载成功，开始解压缩');
                                            var targetPath = wxDownloader.cacheDir;
                                            fs.unzip({
                                                zipFilePath: zipFilePath,
                                                targetPath: targetPath,
                                                success: function success() {
                                                    console.log('UNZIP_TAG 解压缩成功，写入缓存文件~');
                                                    var cachedFiles = wxDownloader.getCachedFileList();
                                                    if (cachedFiles) {
                                                        var files = fs.readdirSync(targetPath);
                                                        console.log('UNZIP_TAG 缓存文件夹中的文件数量:' + files.length);
                                                        for (var index = 0; index < files.length; index++) {
                                                            var file = files[index];
                                                            // console.log('UNZIP_TAG 缓存文件索引:' + index + ' file:' + file);
                                                            cachedFiles[file] = 1;
                                                        }
                                                        wxFsUtils.writeFile(wxDownloader.cacheDir + '/' + wxDownloader.cachedFileName, JSON.stringify(cachedFiles), 'utf8');

                                                        console.log('UNZIP_TAG 创建flag文件~');
                                                        Tools.setItem(unzipFlag, '1');
                                                        fs.writeFile({
                                                            filePath: unzipFlagFilePath,
                                                            data: '1',
                                                            success: function success() {
                                                                console.log('UNZIP_TAG 创建flag文件成功~');
                                                                if (callback) callback();
                                                            },
                                                            fail: function fail(errMsg) {
                                                                console.log('UNZIP_TAG 创建flag文件失败！errMsg:', errMsg);
                                                                if (callback) callback();
                                                            }
                                                        });
                                                    } else {
                                                        console.log('UNZIP_TAG 缓存信息文件不存在');
                                                        if (callback) callback();
                                                    }
                                                },
                                                fail: function fail(errMsg) {
                                                    console.log('UNZIP_TAG 解压缩失败！errMsg:', errMsg);
                                                    if (callback) callback();
                                                }
                                            });
                                        }
                                    });
                                });
                            }
                        }
                    });
                } else {
                    console.log('UNZIP_TAG wx.getFileSystemManager is undefined');
                    if (callback) callback();
                }
                // } else if (cc.sys.isNative &&
                //     PlatformMgr.platformType !== PlatformType.OPPO && 
                //     PlatformMgr.platformType !== PlatformType.VIVO &&
                //     GameData.instance.isEnvironmentCheckUpdate()) {
                //     UpdateMgr.initNativeAssetsManager();

                //     // apk包的version大于js代码里的version,说明js代码是老版本资源,需要清除本地资源并重启游戏
                //     if (GameData.instance.getVersionCode() > GameData.instance.appVersion) {
                //         console.log('versionCode greater than appVersion, need cleanup and restart!');
                //         if (UpdateMgr.cleanupLocalNativeRes(false)) {
                //             // 重启js引擎
                //             return;
                //         }
                //     }
                //     if (callback) callback();
            } else {
                if (callback) callback();
            }
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
        //# sourceMappingURL=UpdateMgr.js.map
        