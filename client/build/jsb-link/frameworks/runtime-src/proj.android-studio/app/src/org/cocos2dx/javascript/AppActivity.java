/****************************************************************************
Copyright (c) 2015-2016 Chukong Technologies Inc.
Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
http://www.cocos2d-x.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
****************************************************************************/
package org.cocos2dx.javascript;
 
import org.cocos2dx.javascript.activity.IABManager;
import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxGLSurfaceView;
 
import android.app.Service;
import android.net.Uri;
import android.os.Bundle;
 
import android.content.Intent;
import android.content.res.Configuration;
import android.os.Vibrator;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Display;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
 
import android.view.KeyEvent;
import android.widget.Button;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.appsflyer.AppsFlyerConversionListener;
import com.appsflyer.AppsFlyerLib;
import com.appsflyer.attribution.AppsFlyerRequestListener;
import com.riceball.gpknives.BuildConfig;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Timer;
import java.util.TimerTask;
 
import zone.bitverse.connect.BitverseConnectApi;
import zone.bitverse.connect.BitverseConnectDelegate;
import zone.bitverse.connect.Session;
import zone.bitverse.connect.Transaction;

public class AppActivity extends Cocos2dxActivity {
private boolean mBackKeyPressed = false;//记录是否有首次按键
    private static final String   appKey = "95586faa6eac";
    private static AppActivity app = null;
    private int screenWidth;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Workaround in
        // https://stackoverflow.com/questions/16283079/re-launch-of-activity-on-home-button-but-only-the-first-time/16447508
        if (!isTaskRoot()) {
            // Android launched another instance of the root activity into an existing task
            // so just quietly finish and go away, dropping the user back into the activity
            // at the top of the stack (ie: the last state of this task)
            // Don't need to finish it again since it's finished in super.onCreate .
            return;
        }
        // DO OTHER INITIALIZATION BELOW
        SDKWrapper.getInstance().init(this);
 

    //     //BitverseConnectApi
    //     BitverseConnectApi connectApi = new BitverseConnectApi(new BitverseConnectDelegate() {
    //         @Override
    //         public void didConnect(@Nullable Integer integer, @Nullable List<String> list) {
    //             Log.d("BitverseConnectApi","didConnect 连接成功，返回chain id 和钱包地址");
    //             for (int i = 0; i <list.size() ; i++) {
    //                 Log.d("integer","integer = " + integer);
    //                 Log.d("list","list[i] = " + i + " " + list.get(i));
    //             }
    //         }
    //         @Override
    //         public void failedToConnect() {
    //             Log.d("BitverseConnectApi","failedToConnect 连接失败");
    //         }

    //         @Override
    //         public void didDisconnect() {
    //             Log.d("BitverseConnectApi","didDisconnect 连接断开");

    //         }
    //     });

    //     List<String> iconList=new ArrayList<>();
    //     iconList.add("https://verify.riceballgames.com/client/icons/1.png");
    //     iconList.add("https://verify.riceballgames.com/client/icons/2.png");
    //     iconList.add("https://verify.riceballgames.com/client/icons/3.png");
    //     //链接钱包
    //    connectApi.connect(this,
    //            "Knife Crash",
    //            "bitverseconnect_android_example",
    //            "https://verify.riceballgames.com/gm",
    //            iconList,
    //            "bitversedapp://www.knifecrash.com"
    //    );

        //屏幕常亮
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON, WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

        AppsFlyerConversionListener conversionListener =  new AppsFlyerConversionListener() {
            @Override
            public void onConversionDataSuccess(Map<String, Object> conversionDataMap) {
                for (String attrName : conversionDataMap.keySet())
                    Log.d("AppsFlyer", "Conversion attribute: " + attrName + " = " + conversionDataMap.get(attrName));
                String status = Objects.requireNonNull(conversionDataMap.get("af_status")).toString();
                if(status.equals("Non-organic")){
                    if( Objects.requireNonNull(conversionDataMap.get("is_first_launch")).toString().equals("true")){
                        Log.d("AppsFlyer","Conversion: First Launch");
                    } else {
                        Log.d("AppsFlyer","Conversion: Not First Launch");
                    }
                } else {
                    Log.d("AppsFlyer", "Conversion: This is an organic install.");
                }
            }

            @Override
            public void onConversionDataFail(String errorMessage) {
                Log.d("AppsFlyer", "error getting conversion data: " + errorMessage);
            }

            @Override
            public void onAppOpenAttribution(Map<String, String> attributionData) {
                Log.d("AppsFlyer", "onAppOpenAttribution: This is fake call.");
            }

            @Override
            public void onAttributionFailure(String errorMessage) {
                Log.d("AppsFlyer", "error onAttributionFailure : " + errorMessage);
            }
        };
        AppsFlyerLib.getInstance().setDebugLog(true);
        AppsFlyerLib.getInstance().init("DdWbxT9VRELdEsZiAcnGea", conversionListener, this);
        //AppsFlyerLib.getInstance().start(this);
        AppsFlyerLib.getInstance().start(getApplicationContext(), "DdWbxT9VRELdEsZiAcnGea", new AppsFlyerRequestListener() {
            @Override
            public void onSuccess() {
                Log.d("AppsFlyer", "Launch sent successfully, got 200 response code from server");
            }
            @Override
            public void onError(int i, @NonNull String s) {
                Log.d("AppsFlyer", "Launch failed to be sent:\n" +
                        "Error code: " + i + "\n"
                        + "Error description: " + s);
            }
        });


        //deepLink Url_Scheme参数
        Uri data = getIntent().getData();
        if (data != null) {
            String host = data.getHost();
            String scheme = data.getScheme();
            String authority = data.getAuthority();
            Log.d("AppActivity","host=" + host + ",scheme=" + scheme + ",auth=" + authority);
            // String type = data.getQueryParameter("type");
            // String name = data.getQueryParameter("name");
            // String url = data.getQueryParameter("url");
            // Log.d("MainActivity","type=" + type + ",name=" + name + ",url=" + url);
        } else{
            Log.e("AppActivity","data is null");
        }

        //管理初始化
        initManager();
    }
    public void initManager(){
        app = this;
        //初始化firebase
        FireBaseAnalyticsManager.getInstance().init(this);
        //初始化app跳转
        JumpToApp.getInstance().init(this);
        getSize();
        //初始化广告管理
        AdManage.getInstance().init(this,this.screenWidth);

        Utils.init(this);

        IABManager.getInstance().init(this);

        BitverseManager.getInstance().init(this);

        //获取内存信息
        String ramStr = Utils.getMaxMemoryInfo();

        AdManage.FAUserProperty("ram",ramStr);

        //获取网络状态
        String netstat = Utils.getNetstat();

        AdManage.FAUserProperty("network_type",netstat);

        // AdManage.FAUserProperty("ab_test", BuildConfig.ab_test);

        Log.d(AdManage.getInstance().TAG, "netstat =>>>>" + netstat);

        AdManage.FAEventWithParam("app_start","app_start_type","cold_start");

        //测试崩溃
        // Button crashButton = new Button(this);
        // crashButton.setText("Test Crash");
        // crashButton.setOnClickListener(new View.OnClickListener() {
        //     public void onClick(View view) {
        //         throw new RuntimeException("Test Crash"); // Force a crash
        //     }
        // });

        // addContentView(crashButton, new ViewGroup.LayoutParams(
        //     ViewGroup.LayoutParams.MATCH_PARENT,
        //     ViewGroup.LayoutParams.WRAP_CONTENT));

    }
 
    public void getSize() {
        // Step 2 - Determine the screen width (less decorations) to use for the ad width.
        Display display = getWindowManager().getDefaultDisplay();
        DisplayMetrics outMetrics = new DisplayMetrics();
        display.getMetrics(outMetrics);
 
        int widthPixels = outMetrics.widthPixels;
        int heightPixels = outMetrics.heightPixels;
        float density = outMetrics.density;
 
        int adWidth = (int) (widthPixels / density)/2;
 
        this.screenWidth = widthPixels;
 
        Log.d(AdManage.getInstance().TAG, "widthPixels: "+widthPixels);
        Log.d(AdManage.getInstance().TAG, "heightPixels: "+heightPixels);
        Log.d(AdManage.getInstance().TAG, "density: "+density);
        Log.d(AdManage.getInstance().TAG, "adWidth: "+adWidth);
 
    }
 
    //跳谷歌商城下的游戏页面=============================
//    public static void getAppByGooglePlay(String appPkg){
//        JumpToApp.getInstance().getAppByGooglePlay(appPkg);
//    }
 
    public  static  void vibrate(int time){
       // Log.d("vibrate", "shakeeeee: ");
        Vibrator vib=(Vibrator)app.getSystemService(Service.VIBRATOR_SERVICE);
        vib.vibrate(time);
    }
 
    @Override
    public Cocos2dxGLSurfaceView onCreateView() {
        Cocos2dxGLSurfaceView glSurfaceView = new Cocos2dxGLSurfaceView(this);
        // TestCpp should create stencil buffer
        glSurfaceView.setEGLConfigChooser(5, 6, 5, 0, 16, 8);
        SDKWrapper.getInstance().setGLSurfaceView(glSurfaceView, this);
 
        return glSurfaceView;
    }
 
    @Override
    protected void onResume() {
        super.onResume();
        SDKWrapper.getInstance().onResume();
 
    }
 
    @Override
    protected void onPause() {
        super.onPause();
        SDKWrapper.getInstance().onPause();
 
    }
 
    @Override
    protected void onDestroy() {
        super.onDestroy();
 
        // Workaround in https://stackoverflow.com/questions/16283079/re-launch-of-activity-on-home-button-but-only-the-first-time/16447508
        if (!isTaskRoot()) {
            return;
        }
 
        SDKWrapper.getInstance().onDestroy();
 
    }
 
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        SDKWrapper.getInstance().onActivityResult(requestCode, resultCode, data);
    }
 
    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        SDKWrapper.getInstance().onNewIntent(intent);
    }
 
    @Override
    protected void onRestart() {
        super.onRestart();
        SDKWrapper.getInstance().onRestart();
    }
 
    @Override
    protected void onStop() {
        super.onStop();
        SDKWrapper.getInstance().onStop();
    }
 
    @Override
    public void onBackPressed() {
        SDKWrapper.getInstance().onBackPressed();
        super.onBackPressed();
    }
 
    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        SDKWrapper.getInstance().onConfigurationChanged(newConfig);
        super.onConfigurationChanged(newConfig);
    }
 
    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        SDKWrapper.getInstance().onRestoreInstanceState(savedInstanceState);
        super.onRestoreInstanceState(savedInstanceState);
    }
 
    @Override
    protected void onSaveInstanceState(Bundle outState) {
        SDKWrapper.getInstance().onSaveInstanceState(outState);
        super.onSaveInstanceState(outState);
    }
 
    @Override
    protected void onStart() {
        SDKWrapper.getInstance().onStart();
        super.onStart();
    }

    @Override
    public boolean dispatchKeyEvent(KeyEvent event) {
        if (event.getKeyCode() == KeyEvent.KEYCODE_BACK) {
            if (event.getAction() == KeyEvent.ACTION_UP) {
//                onBackPressed();
//                Log.d("dispatchKeyEvent", "调用关闭返回按键");
//////                UpltvAdverManager.jsCallback("PlayerData.exitGame();");
                if (!mBackKeyPressed) {
                    Toast.makeText(this, "再按一次退出程序", Toast.LENGTH_SHORT).show();
                    mBackKeyPressed = true;
                    new Timer().schedule(new TimerTask() {//延时两秒，如果超出则擦错第一次按键记录
                        @Override
                        public void run() {
                            mBackKeyPressed = false;
                        }
                    }, 2000);
                } else {//退出程序
                    this.finish();
                    System.exit(0);
                }
            }
            return true;
        }
        return super.dispatchKeyEvent(event);
    }
}