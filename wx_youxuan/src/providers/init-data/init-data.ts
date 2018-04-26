
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
  token: any;
  store: any;

  constructor(
    public api: Api,
    private http: HttpClient,
    private cachestore: Store<AppState>
  ) {
    var _url = encodeURIComponent(location.href.split('#')[0]);
    console.log("InitDataProvider start")
    http.get<any>("http://m.wjhaomama.com/V1/" + "jssdk?url=" + _url).subscribe(res2 => {
      wx.config({
        debug: false,
        appId: res2.AppId,
        timestamp: res2.Timestamp,
        nonceStr: res2.NonceStr,
        signature: res2.Signature,
        jsApiList: [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'hideMenuItems',
          'showMenuItems',
          'hideAllNonBaseMenuItem',
          'showAllNonBaseMenuItem',
          'chooseImage',
          'scanQRCode',
          'openLocation',
          'getLocation'
        ]
      });
      this.cachestore.select("cache").subscribe(res => {
        this.BuyItemList = res.BuyItemList;
        this.SlideList = res.SlideList;
        this.token = res.token;
        if (this.token) {
          console.log("localStorage_setItem_token")
          localStorage.setItem("token", this.token);
        }
        this.WxUser = res.WxUser;
        this.store = res.store;
        if (!this.WxUser || !this.store) return;
        this.wxshare(this.store.StoreName, this.store.Description, this.store.LogoUrl, this.store.WxOpenLink);
      });

      this.cachestore.select("wxShare").subscribe(res => {
        if (res) {
          console.log("wxShare changed,start to share " + res.title)
          // wx.ready(() => {
          this.wxshare(res.title, res.desc, res.imgUrl, res.link);
          // });
        }
      });
    });
  }


  public initDefaultShare() {
    if (this.store)
      this.cachestore.dispatch(new WxShareActions.Update({ title: this.store.StoreName, desc: this.store.Description, imgUrl: this.store.LogoUrl, link: this.store.WxOpenLink }))
  }

  private wxshare(title, desc, imgUrl, link) {
    wx.onMenuShareAppMessage({
      title: title,
      desc: desc,
      link: link,
      imgUrl: imgUrl,
      type: 'link',
      success: () => {
        console.log("success onMenuShareAppMessage");
        this.api.postWithAuthToken("shareCallback", { title, link }).then(res =>
          console.log(res));
      },
      cancel: () => {
        console.log("cancel onMenuShareAppMessage");
      }
    });

    wx.onMenuShareTimeline({
      title: title,
      desc: desc,
      link: link,
      imgUrl: imgUrl,
      success: () => {
        console.log("success onMenuShareTimeline");
        this.api.postWithAuthToken("shareCallback", { title, link }).then(res =>
          console.log(res));
      },
      cancel: () => {
        console.log("cancel onMenuShareTimeline");
      }
    }
    );
  }

}
