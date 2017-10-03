import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

declare var wx: any;

export interface IShopItem {
    Id: number,
    StoreId: number,
    DateTimeCreate: Date
    Name: string,
    CategoryId: number,
    Tags: string,
    Price: number,
    PriceVip: number,
    Unit: string,
    State: boolean,
    Stock: number,
    Count: number,
    Comment: string,
    Desc: string,
    Content: string,
    LogoUrl: string,
    DayBuyLimit: number,
    Sort: number,
    Pics: Array<string>
}

export interface IShopCategory {
    Id: number,
    Name: string,
    ParentId: number,
    Level: number,
    Sort: number,
    DateTimeCreate: string,
    StoreId: number,
    AdList: Array<any>
}

export interface IWxUserInfo {
    openid: string,
    nickname: string,
    sex: number,
    language: string,
    city: string,
    province: string,
    country: string,
    headimgurl: string,
    privilege: any,
    unionid: string,
    ShopMember: any;
}
export const ApiUrl: string = "http://shop.wjhaomama.com/api/v1/";

@Injectable()
export class AppService {

    _w: any = window;
    //验证码发送倒数
    public _time: number = 0;
    public _sendCodeBtnText = "发送验证码";

    public loading: any;
    public _wxUser: IWxUserInfo;
    public _store: any;
    //购物车数量
    cartNum: number;
    //总价格价格
    totalPrice: number = 0;
    totalPriceVip: number = 0;
    category: IShopCategory[] = [];
    listItems: IShopItem[] = [];
    cartItems: IShopItem[] = [];
    cacheCarts: IShopItem[] = [];

    constructor(
        private _http: Http,
        private loadingCtrl: LoadingController,
        private storage: Storage,
        private toastCtrl: ToastController
    ) {
        this.cartNum = 0;
    }

    public ShowLoading() {
        this.loading = this.loadingCtrl.create({ content: '请稍后...' });
        this.loading.present();
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
    public LoadingDismiss() {
        this.loading.dismiss();
    }


    public isWeixinBrowser() {
        var ua = navigator.userAgent.toLowerCase();
        return (/micromessenger/.test(ua)) ? true : false;
    }

    public getClientType() {
        var ua = navigator.userAgent.toLowerCase();
        if (/micromessenger/.test(ua))
            return "wechat";
        if (/iphone/.test(ua))
            return "ios";
        if (/ipad/.test(ua))
            return "ios";
        if (/android/.test(ua))
            return "android";
        return "unknow decices";
    }


    public showToast(title, duration, position) {
        let toast = this.toastCtrl.create({
            message: title,
            duration: duration,
            position: position
        });
        // toast.onDidDismiss(() => {
        // });
        toast.present();
    }

    public GetInit() {
        let _url: string = "http://shop.wjhaomama.com/wx/GetInit?appId=" + this._w.AppId
              + "&fortest=TT"
            ;
        return new Promise((resolve) => {
            this._http.get(_url).map(res => res.json())
                .subscribe((res) => {
                    this._store = res.Store;
                    //微信JSSDK
                    this.jssdkInit(this._store.ShareData);

                    this.category = res.ShopCategoryDtoList;
                    this.listItems = res.ShopItemList;
                    this.listItems.forEach(d => d.Count = 0);
                    if (res.WxUser)
                        this._wxUser = res.WxUser;
                    this.cartNum = 0;

                    this.storage.get("cacheCarts").then(res => {
                        this.cacheCarts = res;
                        if (this.cacheCarts) {
                            this.cacheCarts.forEach(e => {
                                //console.log(e.Id);
                                this.listItems.forEach(d => {
                                    if (d.Id == e.Id) {
                                        d.Count = e.Count;
                                        this.cartNum += e.Count;
                                    }
                                });
                            });
                        }
                    });
                    return resolve(true)
                });
        });
    }


    jssdkInit(shareData) {
        if (this.isWeixinBrowser()) {
            var _url = encodeURIComponent(location.href.split('#')[0]);
            this._http.get("http://shop.wjhaomama.com/Api/V1/" + "jssdk?url=" + _url + "&appId=wx1dfe7106c7a40821")
                .map(res => res.json()).subscribe(res => {
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
                    wx.ready(() => {
                        if (shareData) {
                            console.log("wx ready()");
                            this.wxshare(shareData.title, shareData.desc, shareData.link, shareData.imgUrl);
                        }
                    });
                });
        }
    }

    public getShopItems() {
        let _url: string = ApiUrl + "get";
        this._http.get(_url)
            .subscribe((res) => {
                this.listItems = res.json();
                this.listItems.forEach(d => d.Count = 0);
            });
        this.cartNum = 0;
    }

    public getShopCategory() {
        let _url = ApiUrl + "getCategoryDtc";
        this._http.get(_url)
            .subscribe((res) => {
                let _l: IShopCategory[] = res.json();
                this.category = _l;
                console.log(this.category);
            });
    }

    addCartNum() {
        this.cartNum += 1;
        this.updateCartItems();
    }

    removeCartNum() {
        if (this.cartNum > 0)
            this.cartNum -= 1;
        this.updateCartItems();
    }

    updateCartItems() {
        this.cartItems = this.listItems.filter(d => d.Count > 0);
        this.totalPrice = 0;
        this.totalPriceVip = 0;
        this.cartItems.forEach(e => {
            this.totalPrice += e.Count * e.Price;
            this.totalPriceVip += e.Count * e.PriceVip;
        })
        //console.log("set cache:" + JSON.stringify(this.cartItems));
        this.storage.set("cacheCarts", this.cartItems);
    }

    removeCartAll() {
        this.listItems.forEach(element => {
            element.Count = 0;
        });
        this.cartNum = 0;
        this.updateCartItems();
        this.storage.remove("cacheCarts");
    }
}