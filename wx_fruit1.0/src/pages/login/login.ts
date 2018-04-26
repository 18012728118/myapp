import { Component, ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

import { AppService, ApiUrl } from '../../app/app.service';

import { AuthProvider } from "../../providers/auth";
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

  loginModel = { telphone: '18012729981', password: '123456', storeid: 0 };

  _installedWechat: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private modalCtrl: ModalController, private viewCtrl: ViewController,
    private _http: Http,
    private appService: AppService,
    private auth: AuthProvider,
    private ref: ChangeDetectorRef) {
    this.loginModel.storeid = this.appService._store.Id;
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
    if (!this.appService.isWeixinBrowser()) {
      if (Wechat) {
        //判断是否安装微信
        Wechat.isInstalled(function (installed) {
          this._installedWechat = installed ? true : false;
        }, function (reason) {
          alert("Failed: " + reason);
        });
      }
    }
  }

  postLogin() {
    if (!this.loginModel.telphone) {
      this.appService.showToast("请填写手机号码", 2000, "top");
      return;
    }
    if (!/^1(3|4|5|7|8)[0-9]\d{8}$/i.test(this.loginModel.telphone)) {
      this.appService.showToast("手机号码错误", 2000, "top");
      return;
    }
    if (!this.loginModel.password) {
      this.appService.showToast("请输入密码", 2000, "top");
      return;
    }
    this.auth.login(this.loginModel).subscribe(res => {
      console.log(res);
      if (res.success) {
        this.appService._wxUser = res.wxUser;
        if(this.auth.isLogged())
        {
          this.appService.showToast("登录成功",2000,"top");
          this.viewCtrl.dismiss();
        }
      }
    }
    );
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  register() {
    let modal = this.modalCtrl.create("RegisterPage")
    modal.present();
  }


  loginWx() {
    Wechat.auth("snsapi_userinfo", "store_" + this.appService._store.Id, response => {
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
