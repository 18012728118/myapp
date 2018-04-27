import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    _w: any = window;
    public getToken(): string {
        return localStorage.getItem("token_yx_" + this._w.storeId) ? localStorage.getItem("token_yx_" + this._w.storeId) : "";
        //return localStorage.getItem('token')?localStorage.getItem('token'):"";
    }
}