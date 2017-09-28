import { Component, ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

import { AppService,ApiUrl } from '../../app/app.service';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var Wechat: any;

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})


export class LoginPage {

  _resultText: string = "result";
  _r: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private modalCtrl: ModalController, private viewCtrl: ViewController,
    private _http: Http,
    private appService: AppService,
    private ref: ChangeDetectorRef) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  postLogin() {

  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

  register() {
    let modal = this.modalCtrl.create("RegisterPage")
    modal.present();
  }


  loginWx() {
    Wechat.auth("snsapi_userinfo", "wechat2", response => {
      var self = this;
      this._http.post(ApiUrl + "postWxLoginCode", response)
        .map(res => res.json())
        .subscribe(res => {
          this.appService._wxUser = res;
          self.ref.markForCheck();
          self.ref.detectChanges();
          this.dismiss();
        });

    }, reason => {
      alert("Failed: " + reason);
    });

  }
} 
