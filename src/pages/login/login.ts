import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

import { AppService } from '../../app/app.service';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  _resultText: string = "result";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private modalCtrl: ModalController, private viewCtrl: ViewController,
    private _http: Http,
    private appService: AppService) {
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
    let reee = { code: '', state: '', country: "", lang: "" };
    // this._http.post(this.appService._apiUrl + "app/postWxLoginCode", reee)
    // .map(res=>res.json())
    // .subscribe(res => {
    //   alert(res);
    // });
    window.Wechat.auth("snsapi_userinfo", function (response) {
      // alert(JSON.stringify(response));
      // you may use response.code to get the access token.
      reee = response;
      this._http.post(this.appService._apiUrl + "app/postWxLoginCode", reee)
        .map(res => res.json())
        .subscribe(res => {
          alert(res);
        });
    }, function (reason) {
      alert("Failed: " + reason);
    });

  }
} 
