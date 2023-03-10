const PlayerData = require('PlayerData');
const NFTUnLockType = require('Types').NFTUnLockType;
const AdvertMgr = require('AdvertMgr');
const PlatformMgr = require('PlatformMgr');

cc.Class({
    extends: cc.Component,

    properties: {
        btn_label_get: cc.Node,
        btn_label_play: cc.Node,

        isProcessNode: cc.Node,
        processBar: cc.Node,

        progressLabel: cc.Label,
        progressLabelFull: cc.Label,



        status : "",
    },

    init(world, callback) {
        this.world = world;
        this.callback = callback;

        this.refresh()
    },


    refresh() {
        let canGet = PlayerData.instance.winCount >= NFTUnLockType.WIN_COUNT

        this.processBar.width = canGet ? this.isProcessNode.width : PlayerData.instance.winCount / NFTUnLockType.WIN_COUNT * this.isProcessNode.width

        this.progressLabel.string = PlayerData.instance.winCount

        this.progressLabelFull.string = "/ " + NFTUnLockType.WIN_COUNT

        this.btn_label_get.active = canGet

        this.btn_label_play.active = !canGet
    },

    setStatus(status){
        this.status = status
    },

    onBtnClick() {
        let canGet = PlayerData.instance.winCount >= NFTUnLockType.WIN_COUNT

        console.log(" PlayerData.instance.nftLock_req ", PlayerData.instance.nftLock_req)
        console.log(" PlayerData.instance.bitverseWallet ", PlayerData.instance.bitverseWallet)

        if(PlayerData.instance.nftLock_req==1){
            AdvertMgr.instance.showUITips(25)
            return
        }

        if (canGet) {
            AdvertMgr.instance.fireBaseEvent("click_n_get");
            //走NFT领取流程
            //如果没有钱包地址，链接钱包
            if (PlayerData.instance.bitverseWallet == "") {
                PlatformMgr.connectBitverse()
            } else {
                let data = {
                    "id": 101,
                    "sort": 39,
                    "quality": 8,
                    "name": "NFT2",
                    "url": "texture/weapon/dao201",
                    "getWay": 100,
                    "priceType": 0,
                    "price": 0,
                    "introduce": "Link wallet to get free !",
                    "initKnifeCount": 8,
                    "property": 0,
                    "propertyParam": 20,
                    "propertyTips": "Dodge+20%",
                    "goodsId" : 102,
                    "goodsName" : "weapon#002",
                    "token" : "87391307324056457762808332143355011852238642475825273327608161606536796308456"
                }
                PlatformMgr.requestNFTGet(PlayerData.instance.bitverseWallet,data,()=>{
                    if(PlayerData.instance.nftLock_req==0){
                        AdvertMgr.instance.fireBaseEvent("click_n_get_success");
                        PlayerData.instance.nftLock_req = 1
                    }
                })
            }

        } else {

            if(this.status=="battle"){
                this.onClose();
                return
            }

            PlayerData.instance.nftToPlayCount++
            AdvertMgr.instance.fireBaseEvent("click_n_play","round",PlayerData.instance.nftToPlayCount);

            this.world.onEquipKnifeSkin(PlayerData.instance.knifeSkin, true);

            //去玩游戏
            this.world.onStartBtnClick(null,null);
        }
        this.onClose();
    },

    onClose() {
        this.node.active = false;
        if(this.callback){
            this.callback()
        }
    },

    // update(dt) {},
});