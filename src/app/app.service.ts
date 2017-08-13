import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

export interface IShopItem {
    Id: number,
    StoreId: number,
    DateTimeCreate: Date
    Name: string,
    CategoryId: number,
    Tags: string,
    Price: number,
    priceVip: number,
    Unit: string,
    State: boolean,
    Stock: number,
    Count: number,
    Comment: string,
    Desc: string,
    Content: string,
    LogoUrl: string
}

export interface IShopCategory {
    Id: number,
    Name: string,
    ParentId: number,
    Level: number,
    Sort: number,
    DateTimeCreate: string,
    StoreId: number
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
    unionid: string
}
export const ApiUrl :string = "https://www.loveWuJiang.com/api/v1/";

@Injectable()
export class AppService {

    //验证码发送倒数
    public _time: number = 0;
    public _sendCodeBtnText = "发送验证码";

    public _wxUser: IWxUserInfo;
    //购物车数量
    cartNum: number;
    //总价格价格
    totalPrice: number = 0;
    category: IShopCategory[] = [];
    listItems: IShopItem[] = [];
    cartItems: IShopItem[] = [];

    constructor(private _http: Http) {
        this.cartNum = 0;
    }

    initCate() {
        return new Promise((resolve) => {
            this.getShopItems();
            this.getShopCategory();
            setTimeout(() => {
                return resolve(true);
            }, 1000);
        })
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
        let _url = ApiUrl + "getCategory";
        this._http.get(_url)
            .subscribe((res) => {
                let _l: IShopCategory[] = res.json();
                this.category = _l;
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
        this.cartItems.forEach(e => {
            this.totalPrice += e.Count * e.Price;
        })
    }

    removeCartAll() {
        this.listItems.forEach(element => {
            element.Count = 0;
        });
        this.cartNum = 0;
        this.updateCartItems();
    }
}