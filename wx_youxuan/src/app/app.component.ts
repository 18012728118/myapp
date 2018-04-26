import { Component } from '@angular/core';
import { Platform, App, IonicApp } from 'ionic-angular';
// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { ApiUrl, Api } from '../providers/api/api';
import { InitDataProvider } from '../providers/providers';
import 'rxjs/add/operator/map';

//redux 
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable';
import { Cache } from "../store/types/cache.model";
import * as CacheActions from '../store/actions/cache.action';

interface AppState {
  cache: Cache
}


@Component({
  template: `
  <ion-nav [root]="rootPage"></ion-nav>
  `
})
export class MyApp {
  rootPage: any = "TabsPage";

  query(params?: any): any {
    if (this.api.isLocalTest())
      return this.api.httpGet("GetInit?forTest=tt", params)

    else
      return this.api.httpGet("GetInit", params);
  }

  constructor(
    platform: Platform,
    private initData: InitDataProvider,
    private api: Api,
    private app: App,
    private ionicApp: IonicApp,
    private store: Store<AppState>
  ) {
    platform.ready().then(() => {

      this.query().subscribe((res: any) => {
        this.store.dispatch(new CacheActions.Init(res));
      });

      //注册返回键处理
      platform.registerBackButtonAction(() => {
        console.log("platform.registerBackButtonAction");
        const overlay = this.ionicApp._overlayPortal.getActive();
        const nav = this.app.getActiveNav();

        if (overlay && overlay.dismiss) {
          overlay.dismiss();
          return;
        }
        if (nav.canGoBack()) {
          nav.pop();
          return;
        }
        // if (Date.now() - this.lastBack < 500) {
        //   this.platform.exitApp();
        // }
        // this.lastBack = Date.now();
      });
      //注册返回键处理 END
    });
  }
}
