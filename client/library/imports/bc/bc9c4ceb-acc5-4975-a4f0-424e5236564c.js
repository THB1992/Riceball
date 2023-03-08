"use strict";
cc._RF.push(module, 'bc9c4zrrMVJdaTwQk5SNlZM', 'UIUtil');
// scripts/common/UIUtil.js

'use strict';

var PlatformMgr = require('PlatformMgr');
var PlatformType = require('Types').PlatformType;
var PlayerData = require('PlayerData');
var UIUtil = cc.Class({
    extends: cc.Component,
    statics: {
        loadResSprite: function loadResSprite(sprite, url) {
            cc.loader.loadRes(url, cc.SpriteFrame, function (error, resource) {
                if (error) {
                    cc.error(error);
                } else if (resource) {
                    sprite.spriteFrame = resource;
                }
            });
        },

        loadFriendPortrait: function loadFriendPortrait(sprite, url) {
            if (!url) return;
            if (Number(url)) {
                var newUrl = "texture/defaultPortrait/avatar-player-0" + url;
                cc.loader.loadRes(newUrl, cc.SpriteFrame, function (error, resource) {
                    if (error) {
                        cc.error(error);
                    } else if (resource) {
                        if (sprite.iconUrl === url) {
                            sprite.spriteFrame = resource;
                        }
                    }
                });
            } else {
                cc.loader.load({
                    url: url,
                    type: 'jpg'
                }, function (error, resource) {
                    if (error) {
                        cc.error(error);
                    } else if (resource) {
                        if (sprite.iconUrl === url) {
                            sprite.spriteFrame = new cc.SpriteFrame(resource);
                        }
                    }
                });
            }
        },

        /**
         * @param  {} sprite
         * @param  {} player
         * @param  {} needCheck 需要检测加载好的是不是当前需要显示的头像
         */
        loadResPortrait: function loadResPortrait(sprite, player) {
            if (player.isLocal) {
                var url = PlayerData.instance.iconUrl;
                if (Number(url)) {
                    var newUrl = "texture/defaultPortrait/avatar-player-0" + url;
                    cc.loader.loadRes(newUrl, cc.SpriteFrame, function (error, resource) {
                        if (error) {
                            cc.error(error);
                        } else if (resource) {
                            if (!sprite.iconUrl || sprite.iconUrl === url) {
                                sprite.spriteFrame = resource;
                            }
                        }
                    });
                } else {
                    if (PlatformMgr.platformType === PlatformType.WECHAT) {
                        var newUrl = '';
                        if (url.includes('?')) {
                            newUrl = url + '&t=' + Math.random();
                        } else {
                            newUrl = url + '?t=' + Math.random();
                        }
                        cc.loader.load({
                            url: newUrl,
                            type: 'jpg'
                        }, function (error, resource) {
                            if (error) {
                                cc.error(error);
                            } else if (resource) {
                                if (!sprite.iconUrl || sprite.iconUrl === url) {
                                    sprite.spriteFrame = new cc.SpriteFrame(resource);
                                }
                            }
                        });
                    }
                }
            } else {
                var newUrl = "texture/portrait/pic" + player.iconUrl;
                cc.loader.loadRes(newUrl, cc.SpriteFrame, function (error, resource) {
                    if (error) {
                        cc.error(error);
                    } else if (resource) {
                        if (!sprite.iconUrl || sprite.iconUrl === player.iconUrl) {
                            sprite.spriteFrame = resource;
                        }
                    }
                });
            }
        },

        loadAIPortrait: function loadAIPortrait(sprite, url) {
            var newUrl = "texture/portrait/pic" + url;
            cc.loader.loadRes(newUrl, cc.SpriteFrame, function (error, resource) {
                if (error) {
                    cc.error(error);
                } else if (resource) {
                    if (sprite.iconUrl === url) {
                        sprite.spriteFrame = resource;
                    }
                }
            });
        },

        loadResFlag: function loadResFlag(sprite, url) {
            var newUrl = "texture/flag/flag-US";
            if (url) {
                newUrl = "texture/flag/flag-" + url;
            }
            if (!cc.loader._getResUuid(newUrl, cc.SpriteFrame)) {
                newUrl = "texture/flag/flag-unknown";
            }

            UIUtil.loadResSprite(sprite, newUrl);
        },

        loadUIPrefab: function loadUIPrefab(prefabPath, callback) {
            cc.loader.loadRes(prefabPath, cc.Prefab, function (error, resource) {
                if (error) {
                    cc.error(error);
                    if (callback) {
                        callback(null);
                    }
                } else {
                    if (resource) {
                        if (callback) {
                            callback(cc.instantiate(resource));
                        }
                    }
                }
            });
        }
    }

    // update (dt) {},
});

cc._RF.pop();