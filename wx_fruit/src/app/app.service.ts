import { Injectable } from '@angular/core';
import { ToastController, AlertController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpService } from '../providers/providers';

import { WxUserInfo } from '../models/wxUserInfo.model';
import { ShopCategory } from '../models/shopCategory.model';
import { HttpClient } from '@angular/common/http';


import { ENV } from "@app/env"
import { ShopItem } from '../models/shop.model';
import { CacheState, getShop } from '../store/states/cache.state';
import { Store } from '@ngrx/store';
import { AppState } from 'app/app.state';
import { Observable } from 'rxjs/Observable';
declare var wx: any;


export const ApiUrl: string = "http://shop.wjhaomama.com/Api/V1/";

@Injectable()
export class AppService {

    _w: any = window;
    //验证码发送倒数
    public _time: number = 0;
    public _sendCodeBtnText = "发送验证码";

    public loading: any;
    public defaultShareData: any;
    API_URI: string;

    constructor(
        private toastCtrl: ToastController,
        private storage: Storage,
        private _http: HttpService,
        private http: HttpClient,
        private store: Store<AppState>
    ) {
        // this.cartNum = 0;

        if (ENV.production)
            this.API_URI = "http://shop.wjhaomama.com/Wx/";
        else
            this.API_URI = "http://192.168.1.181:8088/Wx/";


    }


    public scanQRCode(needResult) {
        needResult = needResult ? needResult : 0;
        return wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: (res1) => {
                return res1.toPromise();
            }
        });
    }

    public wxshare(title, desc, link, imgUrl) {
        console.log("--START SET WXSHARE--")
        wx.onMenuShareTimeline({
            title: title, // 分享标题
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareQQ({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    }

    public getShopInit() {
        let url = this.API_URI + "getShopInit?appId=" + this._w.AppId
        return this.http.get(url).toPromise();

    }


    // public GetInit() {
    //     this.jssdkInit(this._store.ShareData);
    // }


    // public getShopItems() {
    //     let _url: string = ApiUrl + "get";
    //     this._http.httpGet(_url)
    //         .then((res) => {
    //             this.listItems = res.json();
    //             this.listItems.forEach(d => d.Count = 0);
    //         });
    //     this.cartNum = 0;
    // }

    // public getShopCategory() {
    //     let _url = ApiUrl + "getCategoryDtc";
    //     this._http.httpGet(_url)
    //         .then((res) => {
    //             let _l: ShopCategory[] = res.json();
    //             this.category = _l;
    //             console.log(this.category);
    //         });
    // }


    public toPay(payData: CacheState) {

        let postData = {
            address: payData.selectAddress,
            carts: payData.cartItems,
            payType: payData.payType,
            comment: payData.comment,
            totalPrice: payData.totalVipPrice < payData.totalPrice ? payData.totalVipPrice : payData.totalPrice
        }
        //return this.http.post(this.API_URI + "testErr", { data: postData, f: true });
        return this.http.post("http://shop.wjhaomama.com/Api/V1/" + "SomePostWithToken", postData);
    }
}