import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

import { AppService , ApiUrl } from '../../app/app.service';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

export interface IRegister {
  Telphone: string,
  Password: string,
  Password2: string,
  Code: string
}

export interface ICallback {
  success: boolean,
  data: string
}

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  reg: IRegister;

  timer: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _http: Http,
    private viewCtrl: ViewController,
    private appService: AppService,
    private toastCtrl: ToastController

  ) {
    this.reg = { Telphone: "", Password: "", Code: "", Password2: "" };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    console.log(this.appService._time);
    this.interval();
  }

  interval() {
    console.log("_time:"+ this.appService._time);
    this.timer = setInterval(() => {
      if (this.appService._time > 1) {
        this.appService._sendCodeBtnText = this.appService._time + '秒后重试';
        this.appService._time -= 1;
      }
      else {
        this.appService._sendCodeBtnText = "发送验证码";
        this.appService._time = 0;
        clearInterval(this.timer)
      }
      console.log(this.appService._time);
    }, 1000);
  }

  postRegister() {
    console.log(this.reg);
  }

  sendCode() {
    this._http.get(ApiUrl + 'getCode?tel=' + this.reg.Telphone)
    .map(res=>res.json())
      .subscribe(res => {
        console.log(res);
        console.log(res.success);
        if (res.success) {
          this.presentToast(res.data);
          this.appService._time = 60;
          this.interval();

        }
        else {
          this.presentToast(res);
        }
      }, error => {
        this.presentToast(error);
      })
  }

  presentToast(_text) {
    let toast = this.toastCtrl.create({
      message: _text,
      duration: 2000,
      position: 'middle'
    });

    // toast.onDidDismiss(() => {
    //   console.log('Dismissed toast');
    // });

    toast.present();
  }

  verify() {

    let _result = /^\d{11}$/.test(this.reg.Telphone) &&
      /^\S{8,}$/.test(this.reg.Password) &&
      /^\d{4}$/.test(this.reg.Code)       ;
    // console.log(_result);
    return _result;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  verifyTel() {
    console.log(!/^\d{11}$/.test(this.reg.Telphone) || this.appService._time>0);
    return !/^\d{11}$/.test(this.reg.Telphone) || this.appService._time>0;
  }

  ngOnDestroy() {
    clearInterval(this.timer)
  }
}
