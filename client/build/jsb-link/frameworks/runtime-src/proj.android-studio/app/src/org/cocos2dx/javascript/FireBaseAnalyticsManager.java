package org.cocos2dx.javascript;
 
import android.content.Context;
import android.os.Bundle;
import android.util.Log;

import com.applovin.mediation.MaxAd;
import com.google.firebase.analytics.FirebaseAnalytics;

import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;


public class FireBaseAnalyticsManager {
    private static FireBaseAnalyticsManager mInstace = null;
    private FirebaseAnalytics mFirebaseAnalytics;
    private Context mainActive = null;
    private static final String Tag = "firebase";
    //private Map<String, Integer> eventCount =null;
    private static long beginTime ;
    private static long endTime ;
 
    public double dayTotalRevenue;
    public boolean canReport = true; //今天是否可以上报Total_Ads_Revenue_001


    public static FireBaseAnalyticsManager getInstance() {
        if (null == mInstace) {
            mInstace = new FireBaseAnalyticsManager();
        }
        return mInstace;
    }
 
    public void init(Context context){
        this.mainActive = context;
        mFirebaseAnalytics = FirebaseAnalytics.getInstance(context);
    }
 
    public static void FAEvent(String eventName){
        Log.d(Tag, "FAEvent "+eventName);
        Bundle params = new Bundle();
       // params.putString("value","nul");
        FireBaseAnalyticsManager.getInstance().mFirebaseAnalytics.logEvent(eventName, params);
    }
 
    // public static void FAEventWithParFAEventam(String eventName , String[] key , String[] value){
    //     Log.d(Tag, "FAEventWithParFAEventam = "+eventName);
    //     int paramLength = key.length;
    //     Log.d(Tag, "paramLength"+paramLength);
    //     Bundle params = new Bundle();
    //     for(int i = 0;i<paramLength;i++){
    //         params.putString(key[i],value[i]);
    //     }
    //     FireBaseAnalyticsManager.getInstance().mFirebaseAnalytics.logEvent(eventName, params);
    // }
 
    public static void FAEventWithParFAEventam(String eventName , String key , String value){
        Log.d(Tag, "FAEventWithParFAEventam = "+eventName + " " + key + " " + value);
        Bundle params = new Bundle();
        params.putString(key,value);
        FireBaseAnalyticsManager.getInstance().mFirebaseAnalytics.logEvent(eventName, params);
    }
 
     public static void FAUserProperty(String eventName , String value){
        FireBaseAnalyticsManager.getInstance().mFirebaseAnalytics.setUserProperty(eventName, value);
    }

    public static void FAEventBegin(String eventName){
        Log.d(Tag, "FAEventBegin = "+eventName);
        beginTime = System.currentTimeMillis();
        Bundle params = new Bundle();
        // params.putString("value","nul");
        FireBaseAnalyticsManager.getInstance().mFirebaseAnalytics.logEvent(eventName, params);
    }

    public static void FAEventEnd(String eventName){
        Log.d(Tag, "FAEventEnd = "+eventName);
        endTime = System.currentTimeMillis();
        double betweenTime = (endTime - beginTime)/1000.0;
        Bundle params = new Bundle();
        String.valueOf(betweenTime);
         params.putString("time", String.valueOf(betweenTime));
        FireBaseAnalyticsManager.getInstance().mFirebaseAnalytics.logEvent(eventName, params);
        Log.d(Tag, "eventTime = "+betweenTime);
    }

    public static void onAdRevenuePaid(MaxAd impressionData) {

        double revenue = impressionData.getRevenue(); // In USD

        Log.d(Tag, "onAdRevenuePaid = "+ FirebaseAnalytics.Param.AD_SOURCE + " " +   impressionData.getNetworkName());
        Log.d(Tag, "onAdRevenuePaid = "+ FirebaseAnalytics.Param.AD_FORMAT + " " +   impressionData.getFormat().getDisplayName());
        Log.d(Tag, "onAdRevenuePaid = "+ FirebaseAnalytics.Param.AD_UNIT_NAME + " " +   impressionData.getAdUnitId());
        Log.d(Tag, "onAdRevenuePaid = "+ FirebaseAnalytics.Param.VALUE + " " +  FireBaseAnalyticsManager.getInstance().dayTotalRevenue + " " + revenue);

        if(FireBaseAnalyticsManager.getInstance().canReport){
            //今日可以上报
            FireBaseAnalyticsManager.getInstance().dayTotalRevenue += revenue;
            Log.d(Tag, "onAdRevenuePaid = "+ FireBaseAnalyticsManager.getInstance().dayTotalRevenue + " " + revenue);
            if(FireBaseAnalyticsManager.getInstance().dayTotalRevenue >= 0.01){
                FireBaseAnalyticsManager.onTotalAdsRevenue(FireBaseAnalyticsManager.getInstance().dayTotalRevenue);
                // FireBaseAnalyticsManager.getInstance().canReport = false;//修改为每日达标循环上报
                FireBaseAnalyticsManager.getInstance().dayTotalRevenue = 0;
                FireBaseAnalyticsManager.getInstance().jsCallback("AdvertMgr.onTotalAdsRevenueCallBack(0);");
            }
            else{
                double d = FireBaseAnalyticsManager.getInstance().dayTotalRevenue;
                String s = String.format("%.5f",d);
                Log.d(Tag, "onAdRevenuePaid 同步给js= "+ d + " " + s);
                FireBaseAnalyticsManager.getInstance().jsCallback("AdvertMgr.onTotalAdsRevenueCallBack('"+ s +"')");

            }
        }

        Bundle params = new Bundle();

        params.putString(FirebaseAnalytics.Param.AD_PLATFORM, "appLovin");
        params.putString(FirebaseAnalytics.Param.AD_SOURCE, impressionData.getNetworkName());
        params.putString(FirebaseAnalytics.Param.AD_FORMAT, impressionData.getFormat().getDisplayName());
        params.putString(FirebaseAnalytics.Param.AD_UNIT_NAME, impressionData.getAdUnitId());
        params.putDouble(FirebaseAnalytics.Param.VALUE, revenue);
        params.putString(FirebaseAnalytics.Param.CURRENCY, "USD"); // All Applovin revenue is sent in USD
        FireBaseAnalyticsManager.getInstance().mFirebaseAnalytics.logEvent(FirebaseAnalytics.Event.AD_IMPRESSION, params);
    }

    //自定义事件-Total_Ads_Revenue_001
    //累计规则：（广告包含Banner、插屏、激励）根据每次产生广告收益进行本地数据储存累加，当累计金额≥0.01元则上报事件Total_Ads_Revenue_001，并且带上revenue的值，\
    //每日重置一次{FirebaseAnalytics.ParameterCurrency,"USD"},{FirebaseAnalytics.ParameterValue, Total_Ads_Revenue_001}
    public static void onTotalAdsRevenue(double revenue) {
        Bundle params = new Bundle();

        Log.d(Tag, "onTotalAdsRevenue = "+ FirebaseAnalytics.Param.VALUE + " " +   revenue);

        params.putString(FirebaseAnalytics.Param.CURRENCY, "USD"); // All Applovin revenue is sent in USD
        params.putDouble(FirebaseAnalytics.Param.VALUE, revenue);
        FireBaseAnalyticsManager.getInstance().mFirebaseAnalytics.logEvent("Total_Ads_Revenue_001", params);
    }

     public void jsCallback(final String jsCodeStr) {
        Log.d(Tag, "jsCallback code:" + jsCodeStr);
        // 一定要在 GL 线程中执行
        AppActivity mActivity = (AppActivity) this.mainActive;
        mActivity.runOnGLThread(new Runnable() {
            @Override
            public void run() {
                Log.d("adverManager", "run Cocos2dxJavascriptJavaBridge");
                Cocos2dxJavascriptJavaBridge.evalString(jsCodeStr);
            }
        });
    }

}