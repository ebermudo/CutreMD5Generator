import { Injectable } from '@angular/core';
import { AdLoadInfo, RewardAdOptions, RewardAdPluginEvents } from '@capacitor-community/admob';
import {AdMob, AdOptions, BannerAdOptions, BannerAdPosition, BannerAdSize, InterstitialAdPluginEvents } from '@capacitor-community/admob';
import { isPlatform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdmobService {
  constructor() { }

  async initialize() {
    const {status} = await AdMob.trackingAuthorizationStatus();
    if(status == 'notDetermined') {
        console.log("display info before adLoad");
    }
    AdMob.initialize({
        requestTrackingAuthorization:true,
        testingDevices: ['YOURTESTDEVICE'],
        initializeForTesting: true
    });
  }

  async showBanner() {
    const adId = isPlatform('ios') ? 'ios-ad-id' : 'android-ad-unit';
    const options: BannerAdOptions = {
        adId,
        adSize: BannerAdSize.ADAPTIVE_BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin:0,
        isTesting: true
    }
    await AdMob.showBanner(options);
  }

  async hideBanner() {
    await AdMob.hideBanner();
  }

  async resumeBanner() {
    await AdMob.resumeBanner();
  }

  async adMobShowInterstitial() {
    
  }

  async showInterstitial(adId: string) {
    AdMob.addListener(InterstitialAdPluginEvents.Dismissed, () => {
        AdMob.prepareInterstitial({ adId: 'failed' });
    });
    AdMob.addListener(InterstitialAdPluginEvents.Loaded, () => {
        AdMob.showInterstitial();
    });
    const options: AdOptions = {
        adId: adId,
        margin:0,
        isTesting: true
    };
    const prueba = AdMob.prepareInterstitial(options);
    prueba.then((loadInfo: AdLoadInfo) => {
    })
  }

  async showVideoAd(id: string) {
    AdMob.addListener(RewardAdPluginEvents.Dismissed, () => {
        AdMob.prepareRewardVideoAd({ adId: 'failed' });
    });
    const options: RewardAdOptions = {
        adId: id,
        margin:0,
        isTesting: true
    }
    await AdMob.prepareRewardVideoAd(options);
    await AdMob.showRewardVideoAd();
  }
}