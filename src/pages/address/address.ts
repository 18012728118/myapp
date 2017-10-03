import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { AppService, IShopItem, ApiUrl } from '../../app/app.service'

// import {AddressAddNewPage} from '../address-add-new/address-add-new'

import { HttpService } from '../../providers/HttpService'


@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {
  addressList = [];
  selectAddress: any;
  alert: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private viewCtrl: ViewController,
    private _http: Http,
    private appService: AppService,
    private alertCtrl: AlertController,
    private authHttp: HttpService
  ) {
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPage');

  }

  init() {
    this._http.get("http://shop.wjhaomama.com/Wx/GetAddressList?memberId=" + this.appService._wxUser.ShopMember.Id)
      .map(res => res.json())
      .subscribe(res => {
        console.log(res);
        if (res.success) {
          this.addressList = res.data;
          // this.selectAddress = this.addressList.filter(e=>e.IsDefault && !e.IsUserDelete);
          // console.log(this.selectAddress);
        }
        else {
          this.showAlert(res.msg);
        }
      });

  }

  showAlert(msg) {
    this.alert = this.alertCtrl.create({
      title: '出错了!',
      subTitle: msg,
      buttons: ['OK']
    });
    this.alert.present();
  }

  deleteAddress() {
    let confirm = this.alertCtrl.create({
      title: '你确定删除吗?',
      buttons: [
        {
          text: '取消',
          handler: () => {

          }
        },
        {
          text: '确定',
          handler: () => {
            console.log('Agree clicked');

            this.appService.ShowLoading();
            console.log(this.appService._wxUser);
            this.authHttp.httpPostWithAuth(this.selectAddress, ApiUrl + "AddressDelete", this.appService._wxUser.unionid)
              .then(res => {
                if (res.success) {
                  this.appService.LoadingDismiss();
                  this.init();
                }
                else {
                  this.appService.LoadingDismiss();
                  this.showAlert("好像出了什么错");
                }
              });
          }
        }
      ]
    });
    confirm.present();

  }


  selectedAddress() {
    //console.log(this.selectAddress);
    this.appService.ShowLoading();
    this._http.post(ApiUrl + "SetAddressDefault", this.selectAddress)
      .map(res => res.json())
      .subscribe((res) => {
        //console.log(res);
        if (res.success) {
          this.appService.LoadingDismiss();
          this.viewCtrl.dismiss();
        }
        else {
          this.appService.LoadingDismiss();
          this.showAlert("好像出了什么错");
        }
      }, (error) => {
        this.appService.LoadingDismiss();
        this.showAlert(error);
      });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  addressAdd() {
    let modal = this.modalCtrl.create("AddressnewPage");
    modal.present();
    modal.onDidDismiss(() => {
      this.init();
    })
  }
}
