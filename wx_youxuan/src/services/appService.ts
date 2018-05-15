import { Injectable } from "@angular/core";
import { Api } from "../providers/api/api";

@Injectable()
export class AppService {
    constructor(private api: Api) {

    }

    public getInit() {
        return this.api.httpGet('GetInit?sid=' + window['storeId']).toPromise();
    }

    public getShopOrders(buyitemId?: number) {
        console.log(buyitemId);
        return this.api.httpGet("GetShopOrders?buyItemId=" + buyitemId);
    }

}