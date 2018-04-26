import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { AppService } from '../app/app.service';

import { appendNgContent } from '@angular/core/src/view/ng_content';
import { WxUserInfo, InitalWxUserInfo } from '../models/wxUserInfo.model';
import { AppState } from './app.state';
import { Store } from '@ngrx/store';
import { UserState } from '../store/states/user.state';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../providers/providers';
import { getShop } from '../store/states/cache.state';
import { WxShareState } from '../store/states/wxShare.state';


declare var wx: any;

@Component({
  templateUrl: 'app.html'
})


export class MyApp {
  @ViewChild(Nav) nav: Nav;
  _w: any = window;
  rootPage: any = "HomePage";
  pages: { title: string, page: string }[];
  _wxUser: WxUserInfo = InitalWxUserInfo;

  wxShare$: Observable<WxShareState>;
  user$: Observable<UserState>;

  constructor(private platform: Platform,
    private appService: AppService,
    private alertCtrl: AlertController,
    private _http: HttpService,
    private store: Store<AppState>) {
    this.jssdkInit();

    this.user$ = this.store.select(z => z.user);
    this.wxShare$ = this.store.select(z => z.wxShare);

    this.wxShare$.subscribe(res => {
      if (res.shareData.title) {
        console.log("监视wxsharedata")
        console.log(res.shareData.title)
        this.appService.wxshare(res.shareData.title, res.shareData.desc, res.shareData.link, res.shareData.imgUrl);
      }
    });

    localStorage.setItem("token", this._w.token);
    platform.ready().then(() => {
      this.pages = [
        { title: '我的订单', page: "OrderListPage" },
        { title: '我的收货地址', page: "AddressPage" }
      ];

    });
  }

  openPage(page) {
    this.nav.push(page.page);
  }

  //扫码BUTTON
  goScan() {
    this.appService.scanQRCode(1).then(res => {
      alert(res);
    });
  }

  //充值
  memberRecharge() {
    this.toPay2();
  }

  public jssdkInit() {
    var _url = encodeURIComponent(location.href.split('#')[0]);
    this._http.httpGet("http://shop.wjhaomama.com/Api/V1/" + "jssdk?url=" + _url + "&appId=" + this._w.AppId)
      .then(res => {
        //alert(_url);
        if (res.success) {
          wx.config({
            debug: false,
            appId: res.data.AppId,
            timestamp: res.data.Timestamp,
            nonceStr: res.data.NonceStr,
            signature: res.data.Signature,
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
        };
      });
  }

  toPay2() {
    let alert = this.alertCtrl.create({
      title: '联系客服转帐充值',
      subTitle: "<h2>会员充值最低300元</h2><img src='http://img.wjhaomama.com/4/img/2017-09/09_39_48_197.png!w500' />",
      buttons: ['OK']
    });
    alert.present();
  }

}
