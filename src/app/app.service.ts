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
    LogoUrl:string
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

@Injectable()
export class AppService {

    public _apiUrl: string = "http://106.14.137.103/api/"

    //验证码发送倒数
    public _time: number = 0;
    public _sendCodeBtnText = "发送验证码";


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
        this.getShopItems();
        this.getShopCategory();
        //this.category.push({Id:0,Name:'全部',ParentId:0,Level:0,Sort:0,DateTimeCreate:'',StoreId:0});
    }

    public getShopItems() {
        let _url: string = this._apiUrl + "app/get";
        this._http.get(_url)
            .subscribe((res) => {
                this.listItems = res.json();
                this.listItems.forEach(d => d.Count = 0);
            });
        this.cartNum = 0;
    }

    public getShopCategory() {
        let _url = this._apiUrl + "app/getCategory";
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