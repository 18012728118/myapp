<<<<<<< HEAD
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, AlertController, Content } from 'ionic-angular';
=======
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
>>>>>>> parent of 4d01b70... saf


import { Http} from '@angular/http';

import { AppService ,IShopItem,ApiUrl } from '../../app/app.service'

/**
 * Generated class for the PayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {
<<<<<<< HEAD
  @ViewChild(Content) content: Content

  payType: string;
  addressList = [];
  selectAddress: any;
  _comment: string = "";
=======

>>>>>>> parent of 4d01b70... saf
  constructor(public navCtrl: NavController
    , public navParams: NavParams,
    private viewCtrl: ViewController,
    private _http:Http,
    private appService :AppService    ,
    public modalCtrl: ModalController,

  ) {
  }

  ionViewDidLoad() {
<<<<<<< HEAD
  }

  payOfftest() {
    if (!this.selectAddress) {
      this.showAlert("请在本页选择送货地址。", "未选择收货方式");
      if (this.content)
        this.content.scrollToTop();
      return;
    }
    if (this.appService.totalPrice < 60 && this.selectAddress != 1) {
      this.showAlert("亲!外送订单60元起~", undefined);
      return;
    }
    let payOffUrl = ApiUrl + 'SomePost'
    this.authHttp.httpPostWithAuth({
      address: this.selectAddress,
      carts: this.appService.cartItems,
      payType: this.payType,
      comment: this._comment,
      clientType : this.appService.getClientType()
    }, payOffUrl, this.appService._wxUser.unionid)
      .then(res => {
        console.log(res);
        if (res.success) {
          let alert = this.alertCtrl.create({
            title: '下单成功',
            subTitle: "<h2>关注公众号可接收订单进度</h2><img src='" + this.appService._store.Setting.MPQRImg + "' />",
            buttons: [{
              text: '确定',
              handler: () => {
                this.appService.removeCartAll();
                setTimeout(() => this.backToHome(), 300);
              }
            }]
          });
          alert.present();
        }
        else {
          this.showAlert(res.msg, undefined);
        }
      });
  }


  init() {
    this._http.get("http://shop.wjhaomama.com/Wx/GetAddressList?memberId=" + this.appService._wxUser.ShopMember.Id)
      .map(res => res.json())
      .subscribe(res => {
        //console.log(res);
        if (res.success) {
          this.addressList = res.data;
          console.log(this.addressList)
        }
        else {
          this.showAlert(res.msg, undefined);
        }
      });
    this.authHttp.httpPostWithAuth("", ApiUrl + "GetShopMember", this.appService._wxUser.unionid)
      .then(res => {
        console.log(res);
        this.appService._wxUser.ShopMember = res;
      });
  }

  toKeFu() {
    let alert = this.alertCtrl.create({
      title: '客服微信号',
      subTitle: "<img src='" + this.appService._store.Setting.KeFuWxQRImg + "' />",
      buttons: ['OK']
    });
    alert.present();
  }

  recharge() {
    let alert = this.alertCtrl.create({
      title: '联系客服转帐充值',
      subTitle: "<h2>会员充值最低300元</h2><img src='" + this.appService._store.Setting.KeFuWxQRImg + "' />",
      buttons: ['OK']
    });
    alert.present();
  }

  showAlert(msg, title) {
    if (!title) title = '出错了!';
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  backToHome() {
    let data = { 'success': true };
    this.viewCtrl.dismiss(data);
=======
    console.log('ionViewDidLoad PayPage');
>>>>>>> parent of 4d01b70... saf
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  payOff()
  {
    let payOffUrl = ApiUrl + 'PostCarts'
    this._http.post(payOffUrl,
      this.appService.cartItems)
      .subscribe(res=>{
        console.log(res);
      });
  }

<<<<<<< HEAD
  editAddress() {
    this.selectAddress = undefined;
=======
  editAddress(){
>>>>>>> parent of 4d01b70... saf
    let modal = this.modalCtrl.create("AddressPage");
    modal.present();
  }



}
