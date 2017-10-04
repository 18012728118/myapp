import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner';
<<<<<<< HEAD
import { Http } from "@angular/http"
import { Storage } from '@ionic/storage';
import { AppService, ApiUrl } from '../../app/app.service';
<<<<<<< HEAD
import { HttpService } from '../../providers/HttpService';
declare var WeixinJSBridge: any;
=======
import { HttpService } from '../../providers/HttpService'
import { AppUpdate } from '@ionic-native/app-update';
=======
>>>>>>> parent of 4d01b70... saf

import { Storage } from '@ionic/storage';
>>>>>>> 857bfc3985598426d2fe910b30c584cf0d5914bb

@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
})
export class MyPage {


  cardId: any;

  cameraResult: BarcodeScanResult = { text: "", cancelled: true, format: "QR_CODE" };


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private barcodeScanner: BarcodeScanner,
    private alertCtrl: AlertController,
<<<<<<< HEAD
    private storage: Storage,
    private appService: AppService,
    private http: Http,
    private authHttp: HttpService

=======
    private storage: Storage
>>>>>>> parent of 4d01b70... saf
  ) {

    //storage.set('age', 'Max');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPage');
<<<<<<< HEAD
    if (this.appService._wxUser) {
      this.authHttp.httpPostWithAuth("", ApiUrl + "GetShopMember", this.appService._wxUser.unionid)
        .then(res => {
          console.log(res);
          this.appService._wxUser.ShopMember = res;
        });
    }
  }

  goScan() {
    if (this.appService.isWeixinBrowser()) {
      this.appService.scanQRCode(1).then(res => {
        alert(res);
      })
    }
    else {
      this.camera();
    }
  }

  goUpdate() {
  }

  memberRecharge() {
    this.toPay2();
  }
  toPay2() {
    let alert = this.alertCtrl.create({
      title: '联系客服转帐充值',
      subTitle: "<h2>会员充值最低300元</h2><img src='http://img.wjhaomama.com/4/img/2017-09/09_39_48_197.png!w500' />",
      buttons: ['OK']
    });
    alert.present();
  }
  toPay() {
    this.http.get("http://m.wjhaomama.com/TenPayV3/getpay?itemid=" + 14 + "&openid=oBtN8t4KDw_BbLIxR6iyvEQRApgg")
      //    this.http.get("http://m.wjhaomama.com/TenPayV3/getpay?itemid=" + 12 + "&openid=" + this.appService._wxUser.openid)
      .map(res => res.json())
      .subscribe(res => {
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            "appId": res.appId,
            "timeStamp": res.timeStamp,
            "nonceStr": res.nonceStr,
            "package": res.package,
            "signType": res.signType,
            "paySign": res.paySign
          },
          (res) => {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              alert("支付成功");
            }
          }
        )
      });
=======
>>>>>>> parent of 4d01b70... saf
  }

  gotoAddress() {
    let modal = this.modalCtrl.create("AddressPage");
    modal.present();
  }
  gotoStudy() {
    let modal = this.modalCtrl.create("StudyPage");
    modal.present();
  }

  goOrderList() {
    let modal = this.modalCtrl.create("OrderListPage");
    modal.present();
  }


  login() {
    let modal = this.modalCtrl.create("LoginPage");
    modal.present();
  }

  doSomething() {
    this.storage.clear();
  }
  camera() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.cameraResult = barcodeData;
      if (/^quan\S+/i.test(this.cameraResult.text)) {
        let confirm = this.alertCtrl.create({
          title: '商家核销',
          message: '大吃特吃二人套餐 一分',
          buttons: [
            {
              text: '取消',
              handler: () => {
                console.log('Disagree clicked');
              }
            },
            {
              text: '同意核销',
              handler: () => {
                console.log('Agree clicked');
                confirm.present();
                let alert = this.alertCtrl.create({
                  title: '核销成功!',
                  buttons: ['OK']
                });
                alert.present();
              }
            }
          ]
        });
        confirm.present();

      }
    }, (err) => {
      // An error occurred
    });
  }

}
