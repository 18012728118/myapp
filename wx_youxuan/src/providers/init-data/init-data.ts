
import { Injectable } from '@angular/core';
import { Api, buyItem, ApiUrl_V1 } from '../api/api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/app.state';
import { wxShareReducer } from '../../store/reducers/wxShare.reduce';

import * as WxShareActions from "../../store/actions/wxShare.action";
/*
  Generated class for the InitDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare var WeixinJSBridge;
declare var wx: any;
@Injectable()
export class InitDataProvider {
  BuyItemList: any;
  SlideList: any;
  WxUser: any;
  store: any;
  isAdmin = false;
  BuyItemType =
    {
      1: { name: '抢购', key: 1 },
      2: { name: '免费抢购', key: 2 },
      3: { name: '全民减价', key: 3 },
      11: { name: '公益募捐', key: 11 }
    };

  constructor(
    public api: Api,
    private http: HttpClient,
    private cachestore: Store<AppState>
  ) {
    this.cachestore.select("cache").subscribe(res => {
      this.BuyItemList = res.BuyItemList;
      this.SlideList = res.SlideList;
      this.WxUser = res.WxUser;
      this.store = res.store;
      this.isAdmin = res.isAdmin;
      // if (!this.WxUser || !this.store) return;
      //this.api.wxshare(this.store.ShareTitle, this.store.ShareDesc, this.store.ShareImgUrl, this.store.WxOpenLink);
    });
  }

  public initDefaultShare() {
    if (this.store) {
      console.log("initDefaultShare", "store is ready");
      this.cachestore.dispatch(new WxShareActions.Update({ title: this.store.StoreName, desc: this.store.Description, imgUrl: this.store.LogoUrl, link: this.store.WxOpenLink }))
    }
  }

}
