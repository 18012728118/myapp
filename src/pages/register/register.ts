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
  Code: string,
  StoreId : number
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
    this.reg = { Telphone: "", Password: "", Code: "", Password2: "" , StoreId:this.appService._store.Id };
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
    if (!/^1(3|4|5|7|8)[0-9]\d{8}$/i.test(this.reg.Telphone)) {
      this.appService.showToast("手机号码错误", 2000, "middle");
      return;
    }
    if(!/^\d{6}$/i.test(this.reg.Code))
    {
      this.appService.showToast("验证码为六位数字", 2000, "middle");
      return;
    }
    if(!/^[^\s]{6,}$/i.test(this.reg.Password))
    {
      this.appService.showToast("密码长度大于5位并不含空格", 2000, "middle");
      return;
    }
    this._http.post(ApiUrl+"Register",this.reg)
    .map(res=>res.json())
    .subscribe(res=>{
      console.log(res);
      if(res.success)
      {
        this.appService.showToast("注册成功", 2000, "top");
      }
      else
      {
        this.appService.showToast(res.msg, 2000, "middle");
      }
    });
  }

  sendCode() {
    if (!/^1(3|4|5|7|8)[0-9]\d{8}$/i.test(this.reg.Telphone)) {
      this.appService.showToast("手机号码错误", 2000, "top");
      return;
    }

    this._http.get(ApiUrl + 'getCode?tel=' + this.reg.Telphone+"&storeid="+this.appService._store.Id)
    .map(res=>res.json())
      .subscribe(res => {
        if (res.success) {
          this.appService.showToast("发送成功",2000,"top");
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
