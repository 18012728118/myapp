import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    public getToken(): string {
        // return localStorage.getItem("token_yx_" + window['storeId']) ? localStorage.getItem("token_yx_" + window['storeId']) : "";
        return window["token"];
    }
}