import { Injectable } from "@angular/core";
import { Api } from "../providers/api/api";
import { tap } from "rxjs/operators";

@Injectable()
export class AppService {

    constructor(private api: Api) {

    }

    public _sendCodeBtnText = "发送验证码";
    //验证码发送倒数
    public _time: number = 0;

    public getInit() {
        return this.api.httpGet('GetInit?sid=' + window['storeId']).toPromise();
    }

    public visitLog(data?: any) {
        this.api.httpPost('PostVisitLog', { data: Object.assign({}, data, { url: encodeURIComponent(location.href.split('#')[0]) }) }).subscribe(res => {
            console.log("log true");
        })
    }

    public getShopOrders(buyitemId?: number) {
        return this.api.httpGet("GetShopOrders?buyItemId=" + buyitemId);
    }

    public getSubjectList(storid: number = window["storeId"], skip: number = 0, pagesize: number = 10) {
        return this.api.httpGet(`getSubjectList?sid=${storid}&skip=${skip}&pagesize=${pagesize}`);
    }

    public getSubject(id: number, skip: number = 0, pagesize: number = 20) {
        return this.api.httpGet(`getSubject?id=${id}&skip=${skip}&pagesize=${pagesize}`);
    }


    public postLocation(data: any) {
        return this.api.httpPost("LocationPost", { data });
    }

    public getBuyItemList(arg0: any): any {
        return this.api.httpPost("GetBuyItemList", arg0);
    }

    public loadSetting(): any {
        return this.api.httpGet("getSetting");

    }
}