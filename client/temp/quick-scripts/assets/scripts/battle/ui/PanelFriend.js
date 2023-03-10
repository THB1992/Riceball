(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/battle/ui/PanelFriend.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a78f3ggTr1Ogbfm7hxvn+i9', 'PanelFriend', __filename);
// scripts/battle/ui/PanelFriend.js

'use strict';

/**
 * @fileoverview PanelFriend
 * @author meifan@gameley.cn (梅凡)
 */

var ShareMgr = require('ShareMgr');
var AdvertMgr = require('AdvertMgr');
var PlatformMgr = require('PlatformMgr');
var ShareType = require('Types').ShareType;
var PlatformType = require('Types').PlatformType;

var PanelFriend = cc.Class({
    extends: cc.Component,

    properties: {
        wxSubContextView: cc.Node,
        world: null,
        _texture: null,
        subDomainSprite: cc.Sprite,
        _delayRefreshCanvasTime: 0.2,
        _refreshCanvasElapsed: 0,
        _pollInterval: 0.3,
        _pollSubDomain: false,
        _pollCount: 10,
        _curPollCount: 0,
        _clickInterval: 0.2
    },

    init: function init(world) {
        this.world = world;
        this._clickInterval = 0;
        PlatformMgr.showOpenDataContext();
        this.showOpenDataContext();
        AdvertMgr.instance.showBanner();
        console.log("showBanner PanelFriend init ");
    },

    showOpenDataContext: function showOpenDataContext() {
        switch (PlatformMgr.platformType) {
            // 微信使用子域进行绘制
            case PlatformType.WECHAT:
                {
                    this._texture = new cc.Texture2D();
                    var size = cc.view.getVisibleSize();
                    var openDataContext = wx.getOpenDataContext();
                    this.sharedCanvas = openDataContext.canvas;
                    this.sharedCanvas.width = size.width;
                    this.sharedCanvas.height = size.height;

                    this.subDomainSprite.node.active = true;

                    this._delayRefreshCanvasTime = 0.2;
                    this._refreshCanvasElapsed = 0;

                    this.resetPollState();
                    break;
                }
            default:
                {
                    this.subDomainSprite.node.active = false;
                    break;
                }
        }
    },

    onShareBtnClick: function onShareBtnClick() {
        var self = this;
        ShareMgr.share(ShareType.Friend, function (isSuccess) {
            if (isSuccess) {
                self.world.uiMgr.showTips(1);
            }
        });
    },

    onCloseBtnClick: function onCloseBtnClick() {
        this.node.active = false;
        PlatformMgr.closeOpenDataContext();
        // AdvertMgr.instance.destoryBanner();
    },

    onLeftBtnClick: function onLeftBtnClick() {
        if (this._clickInterval > 0) {
            return;
        }
        this._clickInterval = 0.2;

        PlatformMgr.leftOpenDataContext();
        this.resetPollState();
    },

    onRightBtnClick: function onRightBtnClick() {
        if (this._clickInterval > 0) {
            return;
        }
        this._clickInterval = 0.2;

        PlatformMgr.rightOpenDataContext();
        this.resetPollState();
    },

    // update (dt) {},
    /** 
     * 定时刷新子域显示
     * @override 
     * */
    update: function update(dt) {
        if (this._clickInterval > 0) {
            this._clickInterval -= dt;
        }

        if (PlatformMgr.platformType == PlatformType.WECHAT) {

            if (this._delayRefreshCanvasTime > 0) {
                this._delayRefreshCanvasTime -= dt;
            } else {
                if (this._refreshCanvasElapsed > 0) {
                    this._refreshCanvasElapsed -= dt;
                } else {
                    this._refreshCanvasElapsed = this._pollInterval;
                    this._updateSubDomainCanvas();
                }
            }
        }
    },

    // 刷新子域的纹理
    _updateSubDomainCanvas: function _updateSubDomainCanvas() {
        if (!this.isPollSubDomain()) {
            return;
        }
        if (PlatformMgr.platformType == PlatformType.WECHAT && this._texture) {
            this._texture.initWithElement(this.sharedCanvas);
            this._texture.handleLoadedTexture();
            this.subDomainSprite.spriteFrame = new cc.SpriteFrame(this._texture);
        }
    },

    /**
     * 是否去轮询子域
     */
    isPollSubDomain: function isPollSubDomain() {
        if (!this._pollSubDomain) return false;
        this._curPollCount++;
        if (this._curPollCount > this._pollCount) {
            this._curPollCount = 0;
            this._pollSubDomain = false;
            return false;
        }
        return true;
    },

    resetPollState: function resetPollState() {
        this._pollSubDomain = true;
        this._curPollCount = 0;
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
        //# sourceMappingURL=PanelFriend.js.map
        