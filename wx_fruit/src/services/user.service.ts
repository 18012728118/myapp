
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ApiUrl } from '../app/app.service';
import { ShopAddress } from '../models/shopAddress.model';

import { ENV } from "@app/env";

@Injectable()
export class UserService {
    _w: any = window;

    API_URI: string;



    constructor(private http: HttpClient) {
        if (ENV.production)
            this.API_URI = "http://shop.wjhaomama.com/Wx/";
        else
            this.API_URI = "http://192.168.1.181:8088/Wx/";

    }
    public getUser() {
        return this.http.get(this.API_URI + "UserInit").toPromise();
    }

    public deleteAddress(id: number) {
        return this.http.post(ApiUrl + "AddressDeleteWithToken", { "id": id });
    }

    public addAddress(address: ShopAddress) {
        return this.http.post("http://shop.wjhaomama.com/Wx/PostNewAddress", { address: address });
    }


    public setAddressDefault(id: number) {
        return this.http.post(ApiUrl + "SetAddressDefault", { "Id": id });
    }
}