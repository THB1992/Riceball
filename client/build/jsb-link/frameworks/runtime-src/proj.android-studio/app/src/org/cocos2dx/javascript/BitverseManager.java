package org.cocos2dx.javascript;
 
import android.content.Context;
import android.os.Bundle;
import android.util.Log;


import androidx.annotation.Nullable;

import java.util.ArrayList;
import java.util.List;

import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;

import zone.bitverse.connect.BitverseConnectApi;
import zone.bitverse.connect.BitverseConnectDelegate;
//import zone.bitverse.connect.Session;
//import zone.bitverse.connect.Transaction;


public class BitverseManager {
    private static BitverseManager mInstace = null;
    private Context mainActive = null;
    private static final String Tag = "BitverseManager";


    private  BitverseConnectApi connectApi = null;
    private List<String> iconList=new ArrayList<>();

    //private List<String> walletAdressList=new ArrayList<>();
    private String  walletAdress = "";

    public static BitverseManager getInstance() {
        if (null == mInstace) {
            mInstace = new BitverseManager();
        }
        return mInstace;
    }
 
    public void init(Context context){
        this.mainActive = context;

        iconList.add("https://verify.riceballgames.com/client/icons/1.png");
        iconList.add("https://verify.riceballgames.com/client/icons/2.png");
        iconList.add("https://verify.riceballgames.com/client/icons/3.png");
    }
 
    public static void Connect(){
        Log.d(Tag, "Connect 1");
        BitverseManager.getInstance().connect();
    }

    public void connect(){
        Log.d(Tag, "connect 2");

        //BitverseConnectApi
        connectApi = new BitverseConnectApi(new BitverseConnectDelegate() {
            @Override
            public void didConnect(@Nullable Integer integer, @Nullable List<String> list) {
                Log.d("BitverseConnectApi","didConnect 连接成功，返回chain id 和钱包地址");
                for (int i = 0; i <list.size() ; i++) {
                    Log.d("integer","integer = " + integer);
                    Log.d("list","list[i] = " + i + " " + list.get(i));
                }
                walletAdress = list.get(0); //测试： 0xDC0DB1059348584132DbB65C43bfA746ED960398
                jsCallback("AdvertMgr.onBitVerseConnectCallBack('"+ walletAdress +"')");
            }
            @Override
            public void failedToConnect() {
                Log.d("BitverseConnectApi","failedToConnect 连接失败");
            }
            @Override
            public void didDisconnect() {
                Log.d("BitverseConnectApi","didDisconnect 连接断开");

            }
        });


        //链接钱包
       connectApi.connect(this.mainActive,
               "Knife Crash",
               "bitverseconnect_android_example",
               "https://verify.riceballgames.com/gm",
               iconList,
               "bitversedapp://www.knifecrash.com"
       );
    }

    public void jsCallback(final String jsCodeStr) {
        Log.d(Tag, "jsCallback code:" + jsCodeStr);
        // 一定要在 GL 线程中执行
        AppActivity mActivity = (AppActivity) this.mainActive;
        mActivity.runOnGLThread(new Runnable() {
            @Override
            public void run() {
                Log.d(Tag, "run Cocos2dxJavascriptJavaBridge");
                Cocos2dxJavascriptJavaBridge.evalString(jsCodeStr);
            }
        });
    }
}