import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AlertController, NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/app.state';
import { wxShareReducer } from '../../store/reducers/wxShare.reduce';
import * as WxShareActions from "../../store/actions/wxShare.action";
import { InitDataProvider } from '../providers';
import { ENV } from '@app/env';
import { tap } from 'rxjs/operators';

declare var WeixinJSBridge: any;
declare var wx: any;

export const TestApiUrl = "http://192.168.1.181:10080/V2/"
export const ApiUrl = "http://m.wjhaomama.com/V2/"
export const ApiUrl_V1 = "http://m.wjhaomama.com/V1/"

export interface buyItem {
  Id: number,
  Name: string,
  Price: number,
  VipPrice: number,
  LogoUrl: string,
  Desc: string,
  SuccessText: string,
  ErrorText: string,
  StoreId: number,
  DateTimeCreate: Date
}

@Injectable()
export class Api {



  private cachestore: Store<AppState>

  constructor(private http: HttpClient,
    private toast: ToastController,
    private alert: AlertController,
    private storage: Storage,
    private store: Store<AppState>
  ) {
  }


  httpGet(endpoint: string) {
    // Support easy query params for GET requests
    // if (params) {
    //   reqOpts.params = new HttpParams();
    //   for (let k in params) {
    //     reqOpts.params = reqOpts.params.set(k, params[k]);
    //   }
    // }
    if (!this.isLocalTest())
      return this.http.get(ApiUrl + endpoint);

    return this.http.get(TestApiUrl + endpoint);
  }

  httpPost(endpoint: string, data: any) {
    if (!this.isLocalTest())
      return this.http.post(ApiUrl + endpoint, data);

    return this.http.post(TestApiUrl + endpoint, data);
  }


  public addFavorate(item: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.postWithAuthToken("ToogleFavorate", { buyitemId: item.Id }).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    });
  }

  public setAuthToken(token) {
    this.storage.set('token_wjapp', token).then(res => {
      console.log("token setted")
      return true;
    }
    ).catch(err => {
      alert("error:" + JSON.stringify(err))
    });
  }

  public isLocalTest(): Boolean {
    return ENV.isDebugMode;
  }

  getWithAuth(endpoint: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = "";
      if (!this.isLocalTest()) {
        url = ApiUrl + endpoint;
      }
      else {
        url = TestApiUrl + endpoint;
      }
      // this.http.get<any>(url, { headers: headers }).subscribe(res => {
      this.http.get<any>(url).subscribe(res => {
        if (res.success) {
          resolve(res.data);
        }
        else {
          reject(res.msg);
        }
      }, err => {
        reject("httpget error");
      });
    });
  }


  postWithAuthToken(endpoint: string, body: any, reqOpts?: any): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      let url = "";
      if (!this.isLocalTest()) {
        url = ApiUrl + endpoint;
      }
      else {
        url = TestApiUrl + endpoint;
      }
      //this.http.post<any>(url, body, { headers: headers }).subscribe(res => {
      this.http.post<any>(url, body).subscribe(res => {
        if (res.success)
          resolve(res.data);
        else
          reject(res.msg)
      }, err => {
        reject(err);
      });
    });
    return promise;
  }

  public getUriParam(key: string) {
    let searchP = new URL(location.href);

    switch (key) {
      case "page":
        let p = /page=([^&#]+)/i.exec(location.href)
        return p && p[1] ? p[1] : null;
      case "iid":
        let i = /iid=(\d+)/i.exec(location.href);
        return i && i[1] ? i[1] : null
      case "sfrom":
        let f = /sfrom=([^&#]+)/i.exec(location.href);
        return f && f[1] ? f[1] : null
      default:
        return null;
    }
  }

  public wxshare(title, desc, link, imgUrl) {
    console.log("wxshare");
    this.store.dispatch(new WxShareActions.Update({
      title,
      desc,
      imgUrl,
      link
    }));
  }

  // public chooseImage(photo) {
  //   let __self__ = this;
  //   console.log("__self__", __self__);
  //   wx.chooseImage({
  //     count: 1,
  //     needResult: 1,
  //     sizeType: ['original', 'compressed'],
  //     sourceType: ['album', 'camera'],
  //     success: function (data) {
  //       console.log(data);
  //       let localIds = data.localIds[0] as string;
  //       if (photo == 1) {
  //         __self__.photoSrc_b = __self__.sanitizer.bypassSecurityTrustResourceUrl(localIds);
  //       } else {
  //         __self__.photoSrc_s = __self__.sanitizer.bypassSecurityTrustResourceUrl(localIds);

  //       }

  //       // __self__.wxuploadImage(localIds,photo);
  //     },
  //     complete: function () {
  //       console.log(__self__.photoSrc_b);
  //     }
  //   })
  // }


  public initWxShare(title, desc, imgUrl, link) {
    wx.onMenuShareAppMessage({
      title: title,
      desc: desc,
      link: link,
      imgUrl: imgUrl,
      type: 'link',
      success: () => {
        console.log("success onMenuShareAppMessage");
        this.postWithAuthToken("shareCallback", { title, link }).then(res =>
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
        this.postWithAuthToken("shareCallback", { title, link }).then(res =>
          console.log(res));
      },
      cancel: () => {
        console.log("cancel onMenuShareTimeline");
      }
    }
    );
  }



  public visitLog(data?: any) {
    if (!this.isLocalTest)
      this.httpPost('PostVisitLog', { data: Object.assign({}, data, { url: encodeURIComponent(location.href.split('#')[0]) }) }).subscribe(res => {
        console.log("log true");
      })
  }

  public jssdk() {
    var _url = encodeURIComponent(location.href.split('#')[0]);
    console.log("InitDataProvider start")
    this.http.get("http://m.wjhaomama.com/V1/" + "jssdk?url=" + _url).subscribe((res: any) => {
      wx.config({
        debug: false,
        appId: res.AppId,
        timestamp: res.Timestamp,
        nonceStr: res.NonceStr,
        signature: res.Signature,
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
    }
    )
  };



  public scanQRCode(needResult) {
    needResult = needResult ? needResult : 0;
    wx.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
      success: (res) => {
        this.doScanCode(res.resultStr)
      }
    });
  }

  private doScanCode(code: string) {
    if (!!code)
      this.http.post<any>("http://m.wjhaomama.com/V1/CheckCode", { c: code })
        .subscribe(checkResponse => {
          if (!checkResponse.success) {
            this.showErrorAlert(checkResponse.msg);
            return;
          }
          let confirm = this.alert.create({
            title: '是否使用此消费券?',
            message: `<h2>${checkResponse.data.body}<p>价格:${(checkResponse.data.price / 100)}</p><p>数量:${checkResponse.data.count}</p></h2>`,
            buttons: [
              {
                text: '取消',
                handler: () => {
                }
              },
              {
                text: '使用',
                handler: () => {
                  this.http.post<any>("http://m.wjhaomama.com/V1/UseCode", { c: code })
                    .subscribe(useResponse => {
                      useResponse.success ? this.showSuccessAlert("此券使用成功!") : this.showErrorAlert(useResponse.msg);
                    })
                }
              }
            ]
          });
          confirm.present();
        });
  }

  public showSuccessAlert(msg?: string) {
    let alert = this.alert.create({
      title: '成功',
      subTitle: `<img src="/assets/imgs/success.png" /><p>${msg}</p>`,
      buttons: ['Ok']
    });
    alert.present();
  }

  public showErrorAlert(msg?: string) {
    let alert = this.alert.create({
      title: msg ? msg : '出错了',
      buttons: ['Ok']
    });
    alert.present();
  }

  public showToast(title, duration: number = 2000, position: string = "bottom") {
    let toast = this.toast.create({
      message: title,
      duration: duration,
      position: position
    });
    // toast.onDidDismiss(() => {
    // });
    toast.present();
  }

  private Rad(d) {
    return d * Math.PI / 180.0; //经纬度转换成三角函数中度分表形式。
  }

  //计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
  public GetDistance(lat1, lng1, lat2, lng2) {
    let radLat1 = this.Rad(lat1);
    let radLat2 = this.Rad(lat2);
    let a = radLat1 - radLat2;
    let b = this.Rad(lng1) - this.Rad(lng2);
    let s = 2 *
      Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137; // EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000; //输出为公里
    //s=s.toFixed(4);
    return s;
  }
}


