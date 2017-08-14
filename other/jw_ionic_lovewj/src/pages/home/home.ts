import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, ModalController, Content, } from 'ionic-angular';
import { QglistPage } from '../qglist/qglist'

import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

export const ApiUrl = "https://lovewujiang.com/api/v1/"



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



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})




export class HomePage {



  @ViewChild(Content) content: Content;

  headerClass: string = "";

  state: string;
  code: string;

  result: string;

  wxUser: IWxUserInfo;
  constructor(public navCtrl: NavController,
    private http: Http,
    private modalCtrl: ModalController,
    private ref: ChangeDetectorRef) {


    let searchP = new URL(location.href);
    this.code = searchP.searchParams.get("code");
    this.state = searchP.searchParams.get("state")

    if (this.code) {
      this.dowxuser();
    }

  }


  toList() {
    let modal = this.modalCtrl.create(QglistPage);
    modal.present();
  }


  dowxuser() {
    //var self = this;
    let appid = "wx18b9e815c0ed9a8c";
    let appsecret = "40dd9ffd3cd7119e8314dbd02a852d8a";
    this.http.get(ApiUrl + "getwxuser?code=" + this.code + "&appid=" + appid + "&appsecret=" + appsecret)
      .map(res => res.json())
      .subscribe(res => {
        this.wxUser = res;
      });
  }

  scroll(event) {
    var header = document.getElementById("header")
    if (event && event.scrollTop) {
      if (event.scrollTop > 30) {
        header.style.opacity = "0.5"
      }
      else {
        header.style.opacity = "1"
      }
    }
  }

}
