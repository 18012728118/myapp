import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/app.state';
import { wxShareReducer } from '../../store/reducers/wxShare.reduce';
import * as WxShareActions from "../../store/actions/wxShare.action";
import { InitDataProvider } from '../providers';

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

  constructor(public http: HttpClient,
    public toast: ToastController,
    public alertCtrl: AlertController,
    public storage: Storage,
    private store: Store<AppState>
  ) {

  }

  httpGet(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }
    if (!this.isLocalTest())
      return this.http.get(ApiUrl + endpoint, reqOpts);
    return this.http.get(TestApiUrl + endpoint, reqOpts);
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
    if (/(localhost|192.168.|127.0.)/i.test(document.location.host)) {
      return true
    }
    return false;
  }

  getWithAuth(endpoint: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.get("token_wjapp").then(token => {
        let headers = new HttpHeaders();
        let url = "";
        headers = headers.append("Authorization", token);
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
      })
        .catch(err => {
          reject("storage error");
        });
    });
  }


  postWithAuthToken(endpoint: string, body: any, reqOpts?: any): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.storage.get("token_wjapp").then(token => {
        let headers = new HttpHeaders();
        headers = headers.append("Authorization", token);
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
      })
        .catch(err => {
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
    this.store.dispatch(new WxShareActions.Update({
      title,
      desc,
      imgUrl,
      link
    }))
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
          let confirm = this.alertCtrl.create({
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
    let alert = this.alertCtrl.create({
      title: '成功',
      subTitle: `<img src="/assets/imgs/success.png" /><p>${msg}</p>`,
      buttons: ['Ok']
    });
    alert.present();
  }

  public showErrorAlert(msg?: string) {
    let alert = this.alertCtrl.create({
      title: '出错了',
      subTitle: `<img src="/assets/imgs/error.png" /><p>${msg}</p>`,
      buttons: ['Ok']
    });
    alert.present();
  }

  public showToast(title, duration, position) {
    let toast = this.toast.create({
      message: title,
      duration: duration,
      position: position
    });
    // toast.onDidDismiss(() => {
    // });
    toast.present();
  } F
}


