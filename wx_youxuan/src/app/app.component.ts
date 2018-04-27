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
  _w: any = window;
  rootPage: any = "TabsPage";

  query(params?: any): any {
    return this.api.httpGet("GetInit", params);
  }

  constructor(
    platform: Platform,
    private initData: InitDataProvider,
    private api: Api,
    private store: Store<AppState>
  ) {
    localStorage.setItem("token_yx_" + this._w.storeId, this._w.token)
    platform.ready().then(() => {
      this.query().subscribe((res: any) => {
        this.store.dispatch(new CacheActions.Init(res));
      });
      //注册返回键处理
      // platform.registerBackButtonAction(() => {
      //   console.log("platform.registerBackButtonAction");
      //   const overlay = this.ionicApp._overlayPortal.getActive();
      //   const nav = this.app.getActiveNav();

      //   if (overlay && overlay.dismiss) {
      //     overlay.dismiss();
      //     return;
      //   }
      //   if (nav.canGoBack()) {
      //     nav.pop();
      //     return;
      //   }
      // });
      //注册返回键处理 END
    });
  }
}
