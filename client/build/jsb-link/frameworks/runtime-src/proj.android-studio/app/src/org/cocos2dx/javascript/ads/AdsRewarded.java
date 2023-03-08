package org.cocos2dx.javascript.ads;
 
import android.app.Activity;
import android.content.Context;
import android.os.Handler;
import android.util.Log;
import android.widget.Toast;
 
import androidx.annotation.NonNull;
 
import com.applovin.mediation.MaxAd;
import com.applovin.mediation.MaxError;
import com.applovin.mediation.MaxReward;
import com.applovin.mediation.MaxRewardedAdListener;
import com.applovin.mediation.ads.MaxRewardedAd;
 
import org.cocos2dx.javascript.AdManage;
import org.cocos2dx.javascript.AppActivity;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;
 
import java.util.concurrent.TimeUnit;
 
public class AdsRewarded {
 
    private Context mainActive = null;
    private static MaxRewardedAd mRewardedAd;
    private static String REWARDED_TYPE = "8";  //类型常量
    private static  String AD_VIDEO_ID;//激励视频广告ID(正式)
 
    private boolean isClose;
    private boolean isRewarded;

    public void init(Context context){
        this.mainActive = context;
        AD_VIDEO_ID = AdManage.getInstance().getUnitID(REWARDED_TYPE);
    }
 
    private static int retryAttempt;
 
    public void initVideoAd(){
        AppActivity mActivity = (AppActivity) this.mainActive;
        //一定要确保在UI线程操作
        mActivity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                // AdManage.FAEventWithParam("AD","kAdId",1);
 
                MaxRewardedAd rewardedAd = MaxRewardedAd.getInstance( AdsRewarded.AD_VIDEO_ID,mActivity );
                rewardedAd.setListener(new MaxRewardedAdListener() {
                    @Override
                    public void onAdLoaded(MaxAd ad) {
                        Log.d(AdManage.getInstance().TAG, "onAdLoaded.(AdsRewarded)");
                        AdsRewarded.retryAttempt=0;
                    }
 
                    @Override
                    public void onAdLoadFailed(String adUnitId, MaxError error) {
                        String error1 =String.format("code: %d, message: %s",error.getCode(), error.getMessage());
                        Log.d(AdManage.getInstance().TAG, "AdsRewarded Failed : " + error1);
 
                        String errorMessage = error.getMessage();
                        int errorCode = error.getCode();
 
                        AdsRewarded.retryAttempt++;
                        long delayMillis = TimeUnit.SECONDS.toMillis( (long) Math.pow( 2, Math.min( 6, retryAttempt ) ) );
 
                        new Handler().postDelayed(new Runnable()
                        {
                            @Override
                            public void run()
                            {
                                AdsRewarded.mRewardedAd.loadAd();
                            }
                        }, delayMillis );
                    }
 
                    @Override
                    public void onAdDisplayFailed(MaxAd ad, MaxError error) {
                        AdsRewarded.mRewardedAd.loadAd();
                    }
 
                    @Override
                    public void onAdClicked(MaxAd ad) {
 
                    }
                    @Override
                    public void onAdDisplayed(MaxAd ad) {
                        AdManage.onAdRevenuePaid(ad);
                    }
 
                    @Override
                    public void onAdHidden(MaxAd ad) {
                        Log.d(AdManage.getInstance().TAG, "Rewarded onAdHidden");
                        
                        AdsRewarded.mRewardedAd.loadAd();
 
                        // AppActivity app = mActivity;
                        // app.runOnGLThread(new Runnable() {
                        //     @Override
                        //     public void run() {
                        //         Cocos2dxJavascriptJavaBridge.evalString("window.PlatformApi.getVideoHidden()");
                        //         Log.d(AdManage.getInstance().TAG, "AdsRewarded call onAdHidden");
                        //     }
                        // });
                        isClose = true;
                        if ( isRewarded ) {
                            jsCallback("AdvertMgr.normalAdverCallBack(true);");
                        }
                        else
                        {
                            jsCallback("AdvertMgr.normalAdverCallBack(false);");
                        }
                    }
 
                    @Override
                    public void onRewardedVideoStarted(MaxAd ad) {
 
                    }
 
                    @Override
                    public void onRewardedVideoCompleted(MaxAd ad) {
 
                    }
 
                    @Override
                    public void onUserRewarded(MaxAd ad, MaxReward reward) {
                        Log.d(AdManage.getInstance().TAG, "The user earned the reward.");
                        int rewardAmount = reward.getAmount();
                        String rewardType = reward.getLabel();
                        Log.d(AdManage.getInstance().TAG, "call before");

                        isRewarded = true;
                        if ( isClose )
                        {
                            jsCallback("AdvertMgr.normalAdverCallBack(true);");
                        }    
                        AdsRewarded.mRewardedAd.loadAd();
                    }
                });
 
                AdsRewarded.mRewardedAd = rewardedAd;
                rewardedAd.loadAd();
 
            }
        });
    }
 
    //展示广告
    public void showRewardVideoAd(String placement){
        Log.i(AdManage.getInstance().TAG, "showRewardVideoAd ===" + placement);
        
        AppActivity mActivity = (AppActivity) this.mainActive;
        
        //场景应当出激励（相当于用户点击激励btn）
        AdManage.FAEventWithParam("adv_should_show","position_id",placement);

        mActivity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (AdsRewarded.mRewardedAd != null&&AdsRewarded.mRewardedAd.isReady()) {
                    isClose = false;
                    isRewarded = false;
                    //激励广告成功展示
                    AdManage.FAEventWithParam("adv_show_succsess","position_id",placement);
                    AdsRewarded.mRewardedAd.showAd();
                } else {
                    Log.d(AdManage.getInstance().TAG, "The rewarded ad wasn't ready yet.");
                    Toast.makeText((Activity) mActivity, "Ad did not load", Toast.LENGTH_SHORT).show();
                    jsCallback("AdvertMgr.normalAdverCallBack(false);");
                    jsCallback("AdvertMgr.errorAdverCallBack();");
                    Log.i(AdManage.getInstance().TAG, "mVideoAd not ready");
                }
            }
        });
 
    }

    public void jsCallback(final String jsCodeStr) {
        Log.d("adverManager", "jsCallback code:" + jsCodeStr);
        // 一定要在 GL 线程中执行
        AppActivity mActivity = (AppActivity) this.mainActive;
        mActivity.runOnGLThread(new Runnable() {
            @Override
            public void run() {
                Log.d("adverManager", "run Cocos2dxJavascriptJavaBridge");
//              Cocos2dxJavascriptJavaBridge.evalString("console.log('Javascript Java bridge!');console.log('BNSDK:', BNSDK)");
                Cocos2dxJavascriptJavaBridge.evalString(jsCodeStr);
            }
        });
    }
 
}