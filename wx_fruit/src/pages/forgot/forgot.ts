import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

import { AppService, ApiUrl } from '../../app/app.service';

import { IRegister } from "../register/register"
import { HttpService, UiProvider } from '../../providers/providers';
/**
 * Generated class for the ForgotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {

  reg: IRegister;
  timer: any;
  _w: any = window;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http: HttpService,
    private viewCtrl: ViewController,
    private appService: AppService,
    private UI: UiProvider,
    private toastCtrl: ToastController) {
    this.reg = { Telphone: "", Password: "", Code: "", Password2: "", StoreId: this._w.StoreId };
  }

  ionViewDidLoad() {
  }

  interval() {
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

  postForgot() {
    if (!/^1(3|4|5|7|8)[0-9]\d{8}$/i.test(this.reg.Telphone)) {
      this.UI.showToast("手机号码错误", 2000, "middle");
      return;
    }
    if (!/^\d{6}$/i.test(this.reg.Code)) {
      this.UI.showToast("验证码为六位数字", 2000, "middle");
      return;
    }
    if (!/^[^\s]{6,}$/i.test(this.reg.Password)) {
      this.UI.showToast("密码长度大于5位并不含空格", 2000, "middle");
      return;
    }
    this.http.httpPost(ApiUrl + "Forgot", this.reg)
      .then(res => {
        console.log(res);
        if (res.success) {
          this.UI.showToast("重设成功", 2000, "top");
          this.dismiss();
        }
        else {
          this.UI.showToast(res.msg, 2000, "middle");
        }
      });
  }


  sendCode() {
    if (!/^1(3|4|5|7|8)[0-9]\d{8}$/i.test(this.reg.Telphone)) {
      this.UI.showToast("手机号码错误", 2000, "top");
      return;
    }

    //getCodeType=2 手机号没有用户返回错误
    this.http.httpGet(ApiUrl + 'getCode?getCodeType=2&tel=' + this.reg.Telphone + "&storeid=" + this._w.StoreId)
      .then(res => {
        if (res.success) {
          this.UI.showToast("发送成功", 2000, "top");
          this.appService._time = 60;
          this.interval();
        }
        else {
          this.presentToast(res.data);
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
      /^\d{4}$/.test(this.reg.Code);
    // console.log(_result);
    return _result;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  verifyTel() {
    // console.log(!/^\d{11}$/.test(this.reg.Telphone) || this.appService._time > 0);
    return !/^\d{11}$/.test(this.reg.Telphone) || this.appService._time > 0;
  }

  ngOnDestroy() {
    clearInterval(this.timer)
  }
}
