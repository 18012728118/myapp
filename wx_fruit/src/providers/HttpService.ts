import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable()
export class HttpService {
    myInfoLocal: any;
    _w: any = window;
    constructor(private http: HttpClient, public storage: Storage) {

    }


    public httpGet(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get<any>(url).subscribe(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        })
    }

    public httpPost(url: string, body: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post<any>(url, body).subscribe(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        })
    }


    // private handleError(error: Response) {
    //     console.log(error);
    //     return Observable.throw(error.json().error || 'Server Error');
    // }
    // public httpGetNoAuth(url: string) {
    //     var headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.get(url, options).toPromise()
    //         .then(res => res.json())
    //         .catch(err => {
    //             this.handleError(err);
    //         });
    // }

    // public httpPostNoAuth(url: string, body: any) {
    //     var headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.post(url, body, options).toPromise()
    //         .then(res => res.json())
    //         .catch(err => {
    //             this.handleError(err);
    //         });
    // }

    // public httpPostWithAuthToken(body: any, url: string) {
    //     return this.storage.get('token_' + this._w.StoreId).then((token) => {
    //         console.log("token got:" + token);
    //         var headers = new Headers();
    //         headers.append('Content-Type', 'application/json');
    //         headers.append('Authorization', token)
    //         let options = new RequestOptions({ headers: headers });
    //         return this.http.post(url, body, options).map(res => res.json()).toPromise();
    //     }).catch(() => {
    //         console.log("get token error");
    //         return false
    //     });
    // }

    // public httpPostWithAuth(body: any, url: string, openid: string) {
    //     var headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     headers.append('Authorization', openid === "" ? this.appservice._wxUser.unionid : openid);
    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.post(url, body, options).map(res => res.json()).toPromise();
    // }


}