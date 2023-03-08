package org.cocos2dx.javascript.manager;

import android.app.Activity;
import android.content.Context;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.android.billingclient.api.BillingClient;
import com.android.billingclient.api.BillingClientStateListener;
import com.android.billingclient.api.BillingFlowParams;
import com.android.billingclient.api.BillingResult;
import com.android.billingclient.api.ConsumeParams;
import com.android.billingclient.api.ConsumeResponseListener;
import com.android.billingclient.api.Purchase;
import com.android.billingclient.api.PurchasesUpdatedListener;
import com.android.billingclient.api.SkuDetails;
import com.android.billingclient.api.SkuDetailsParams;
import com.android.billingclient.api.SkuDetailsResponseListener;

import org.cocos2dx.javascript.callback.PayCallback;

import java.util.ArrayList;
import java.util.List;

public class PayManager {
    public static volatile PayManager instance = null;

    public static PayManager getInstance() {
        if (null == instance){
            synchronized (PayManager.class){
                if (null == instance){
                    instance = new PayManager();
                }
            }
        }
        return instance;
    }

    private BillingClient billingClient;

    private String prices = "prices";

    private PurchasesUpdatedListener purchasesUpdatedListener = (billingResult, list) -> {
        Log.v("Constents.LOG_TAG", "purchasesUpdatedListener code " + billingResult.getResponseCode() + " msg " + billingResult.getDebugMessage());
        if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK
                && list != null) {
            if (null != payCallback) {
                handlePurchase(list.get(0));
            }


        } else if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.USER_CANCELED) {
            // Handle an error caused by a user cancelling the purchase flow.
            if (null != payCallback) {
                payCallback.onError("pay cancel");
                payCallback = null;
            }
        } else {
            // Handle any other error codes.
            if (null != payCallback) {
                payCallback.onError("pay error");
                payCallback = null;

//                handlePurchase(list.get(0));
            }
        }
    };

    private boolean isConnectGooglePlay = false;

    private static PayCallback payCallback = null;

    public void init (Context context) {
        billingClient = BillingClient.newBuilder(context)
                .setListener(purchasesUpdatedListener)
                .enablePendingPurchases()
                .build();
        this.startConnect();
    }

    private void startConnect() {
        billingClient.startConnection(new BillingClientStateListener() {
            @Override
            public void onBillingSetupFinished(@NonNull BillingResult billingResult) {
                Log.v("Constents.LOG_TAG", "startConnection code " + billingResult.getResponseCode() + " msg " + billingResult.getDebugMessage());
                if (billingResult.getResponseCode() ==  BillingClient.BillingResponseCode.OK) {
                    // The BillingClient is ready. You can query purchases here.
                    isConnectGooglePlay = true;
                    getPrice();
                }
            }
            @Override
            public void onBillingServiceDisconnected() {
                // Try to restart the connection on the next request to
                // Google Play by calling the startConnection() method.
                Log.v("Constents.LOG_TAG", "startConnection onBillingServiceDisconnected ");
                isConnectGooglePlay = false;
                startConnect();
            }
        });
    }

    public void getPrice () {
        List<String> products = new ArrayList<>();
        products.add("com.riceball.gpknives.diamond10");
        products.add("com.riceball.gpknives.diamond50");
        products.add("com.riceball.gpknives.diamond100");
        products.add("com.riceball.gpknives.diamond250");
        products.add("com.riceball.gpknives.diamond500");
        products.add("com.riceball.gpknives.nointerstitial");
        SkuDetailsParams.Builder params = SkuDetailsParams.newBuilder();
        params.setSkusList(products).setType(BillingClient.SkuType.INAPP);
        StringBuffer stringBuffer = new StringBuffer();
        stringBuffer.append("PayMgr.queryProductsCallBack('price");

        billingClient.querySkuDetailsAsync(params.build(), (billingResult, skuDetailsList) -> {
            if(skuDetailsList!=null){
                Log.v("Constents.LOG_TAG", skuDetailsList.size() + "");
                if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK && skuDetailsList.size() != 0) {
                    for (int i = 0; i < skuDetailsList.size(); i++) {
                        SkuDetails skuDetails = skuDetailsList.get(i);
                        stringBuffer.append("#");
                        stringBuffer.append(skuDetails.getPrice());
                    }
                    stringBuffer.append("');");
                    Log.v("Constents.LOG_TAG", prices);
                } else {
                    prices = "PayMgr.queryProductsCallBack('price#PHP 105.00#PHP 410.00#PHP 775.00#PHP 1,550.00#PHP 2,850.00')";
                }
            }
            else{
                Log.v("Constents.LOG_TAG" ,"skuDetailsList==null");
                Log.v("Constents.LOG_TAG", prices);
            }
        });
    }

    public String getGPPrices () {
        return this.prices;
    }


    public void pay (Context context, String id, PayCallback callback) {
        if (!isConnectGooglePlay) {
            callback.onError("connect to GooglePlay");
            return;
        }
//        if(Constents.IS_DEBUG) {
//        id = "testtest";
//        }
        List<String> skuList = new ArrayList<>();
        skuList.add(id);
        SkuDetailsParams.Builder params = SkuDetailsParams.newBuilder();
        params.setSkusList(skuList).setType(BillingClient.SkuType.INAPP);
        billingClient.querySkuDetailsAsync(params.build(), (billingResult, skuDetailsList) -> {
            // Process the result.
            if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK && skuDetailsList.size() != 0) {
                // The BillingClient is ready. You can query purchases here.
                SkuDetails skuDetails = skuDetailsList.get(0);
                BillingFlowParams billingFlowParams = BillingFlowParams.newBuilder()
                        .setSkuDetails(skuDetails)
                        .build();
                int responseCode = billingClient.launchBillingFlow((Activity) context, billingFlowParams).getResponseCode();
                if (responseCode != BillingClient.BillingResponseCode.OK) {
                    Log.v("Constents.LOG_TAG", "querySkuDetailsAsync pay error code " + billingResult.getResponseCode() + " msg " + billingResult.getDebugMessage());
                    callback.onError("pay error");
                }
                else {
                    payCallback = callback;
                }
            } else {
                Log.v("Constents.LOG_TAG", "querySkuDetailsAsync don't have product code " + billingResult.getResponseCode() + " msg " + billingResult.getDebugMessage());
                Log.v("Constents.LOG_TAG", "don't have product skuDetailsList " + skuDetailsList.size());
                callback.onError("don't have product");
            }
        });
    }

    private void handlePurchase(Purchase purchase) {
        // Purchase retrieved from BillingClient#queryPurchasesAsync or your PurchasesUpdatedListener.

        // Verify the purchase.
        // Ensure entitlement was not already granted for this purchaseToken.
        // Grant entitlement to the user.

        ConsumeParams consumeParams =
                ConsumeParams.newBuilder()
                        .setPurchaseToken(purchase.getPurchaseToken())
                        .build();

        ConsumeResponseListener listener = (billingResult, purchaseToken) -> {
            Log.v("Constents.LOG_TAG", "billingClient.consumeAsync code " + billingResult.getResponseCode() + " msg " + billingResult.getDebugMessage());
            if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                // Handle the success of the consume operation.
                payCallback.onSucc();
                payCallback = null;
            }
            else {
                payCallback.onError("billingClient.consumeAsync fail");
                payCallback = null;
            }
        };

        billingClient.consumeAsync(consumeParams, listener);
    }

}
