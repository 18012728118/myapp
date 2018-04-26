import { Component, ChangeDetectorRef } from '@angular/core';
import 'rxjs/add/operator/map'
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

import { AppService, ApiUrl } from '../../app/app.service';
import { HttpService, UiProvider } from '../../providers/providers';

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
  _w: any = window;
  loginModel = { telphone: '', password: '', storeid: 0 };

  _installedWechat: boolean = true;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private viewCtrl: ViewController,
    private appService: AppService,
    private http: HttpService,
    private UI: UiProvider,
    private ref: ChangeDetectorRef) {
    this.loginModel.storeid = this._w.StoreId.Id;
  }

  ionViewDidLoad() {
    if (Wechat) {
      //判断是否安装微信
      Wechat.isInstalled(function (installed) {
        this._installedWechat = installed ? true : false;
      }, function (reason) {
        alert("Failed: " + reason);
      });
    }
  }

  postLogin() {
    if (!this.loginModel.telphone) {
      this.UI.showToast("请填写手机号码", 2000, "top");
      return;
    }
    if (!/^1(3|4|5|7|8)[0-9]\d{8}$/i.test(this.loginModel.telphone)) {
      this.UI.showToast("手机号码错误", 2000, "top");
      return;
    }
    if (!this.loginModel.password) {
      this.UI.showToast("请输入密码", 2000, "top");
      return;
    }
    // this.auth.login(this.loginModel).subscribe(res => {
    //   console.log(res);
    //   if (res.success) {
    //     this.appService._wxUser = res.wxUser;
    //     this.auth.setAuthToken(res.token);
    //     if (this.auth.isLogged()) {
    //       console.log("登录成功");
    //       this.appService.showToast("登录成功", 2000, "top");
    //       this.viewCtrl.dismiss();
    //     }
    //   }
    //   else {
    //     this.appService.showToast("用户名或密码错误", 2000, "top");
    //   }
    // }
    // );
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


  forgot() {
    let modal = this.modalCtrl.create("ForgotPage")
    modal.present();
  }

  register() {
    let modal = this.modalCtrl.create("RegisterPage")
    modal.present();
  }

1
  loginWx() {
    Wechat.auth("snsapi_userinfo", "store_" + this._w.StoreId, response => {
      var self = this;
      this.http.httpPost(ApiUrl + "postWxLoginCode", response)
        .then(res => {
          if (res.success) {
            //this.appService._wxUser = res.data;
            // this.auth.setAuthToken(res.data.token);
            self.ref.markForCheck();
            self.ref.detectChanges();
            this.dismiss();
          }
          else {
            this.UI.showToast(res.data.msg, 3000, "middle");
          }
        });

    }, reason => {
      alert("Failed: " + reason);
    });

  }
} 
