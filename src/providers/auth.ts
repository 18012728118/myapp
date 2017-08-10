import { Injectable } from '@angular/core';
import { Http, Request, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {

  baseUrl: string = 'https://www.lovewujiang.com/'
  constructor(public http: Http) {


  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', window.localStorage.getItem('token'));

  }

  private() {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.baseUrl + 'private', {
      headers: headers
    }).map(res => res.json());

  }

  isLogged() {
    if (window.localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    window.localStorage.removeItem('token')
    return true;
  }
  login(data) {
    return this.http.post(this.baseUrl + 'login', data)
      .map(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    if (body.success === true) {
      window.localStorage.setItem('token', body.token);
    }
    return body || {};
  }
}
