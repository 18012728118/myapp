import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
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

  public getUriParam(key: string) {
    switch (key) {
      case "page":
        let p = /page=([^&#]+)/i.exec(location.href)
        return p && p[1] ? p[1] : null;
      case "itemid":
        let i = /itemid=([^&#]+)/i.exec(location.href);
        return i && i[1] ? i[1] : null
      case "sfrom":
        let f = /sfrom=([^&#]+)/i.exec(location.href);
        return f && f[1] ? f[1] : null
      default:
        return null;
    }
  }
}
