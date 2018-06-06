import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { ApiUrl, Api } from '../providers/api/api';
import { InitDataProvider } from '../providers/providers';
import 'rxjs/add/operator/map';

//redux 
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable';
import * as CacheActions from '../store/actions/cache.action';
import { HttpClient } from '@angular/common/http';
import { AppState } from './app.state';
import { WxShareState } from '../store/types/wxShare.model';
import { getStore } from '../store/state/cache.State';

declare var WeixinJSBridge;
declare var wx: any;

@Component({
  template: `
  <ion-nav [root]="rootPage"></ion-nav>
  `
})
export class MyApp {
  rootPage: any = "TabsPage";
  wxShare$: Observable<WxShareState>
  store$: Observable<any>;

  constructor(
    platform: Platform,
    private api: Api,
    private store: Store<AppState>
  ) {
    if (api.isLocalTest) {
      console.log(window['storeId']);
      console.log(window['token']);
    }
    this.store.dispatch(new CacheActions.LoadSetting());

    localStorage.setItem("token_yx_" + window['storeId'], window['token'])
    this.api.jssdk();
    this.store$ = this.store.select(getStore);
    wx.ready(() => {
      console.log("wx is ready");
      this.store$.subscribe(z => {
        if (z)
          //默认分享设置
          this.api.wxshare(z.ShareTitle, z.ShareDesc, z.ShareImgUrl, z.WxOpenLink);
      });
    });
    wx.error((err) => {
      console.log(err);
    })
    this.wxShare$ = this.store.select(z => z.wxShare);
    this.wxShare$.subscribe(res => {
      if (res) {
        console.log("wxShare changed,start to share" + res.title)
        this.api.initWxShare(res.title, res.desc, res.imgUrl, res.link);
      }
    });
    // platform.ready().then(() => {

    // });
  }

}
