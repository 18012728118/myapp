import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable'
import { AppService } from '../../app/app.service'
import { UiProvider } from '../../providers/providers';

//redux
import { Store } from '@ngrx/store';
import { AppState } from '../../app/app.state';
import { ShopAddress } from '../../models/shopAddress.model';
import * as UserActions from '../../store/actions/user.action';



@IonicPage({
  defaultHistory: ["HomePage"]
})
@Component({
  selector: 'page-addressnew',
  templateUrl: 'addressnew.html',
})
export class AddressnewPage {

  _geo: any = { lat: 0, lng: 0, poisTitle: "" };
  address: ShopAddress = {
    RealName: ""
    , Phone: "", LocationLable: "", Lat: 0, Lng: 0, Id: 0,
    StoreId: 0, MemberId: 0, NickName: "", IsDefault: false
  };

  addressList$: Observable<ShopAddress[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private storage: Storage,
    private appService: AppService,
    private UI: UiProvider,
    private store: Store<AppState>
  ) {
    this.addressList$ = this.store.select(z => z.user.addressList);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressnewPage');
  }

  //关闭
  dismiss() {
    this.viewCtrl.dismiss();
  }


  save() {
    if (!this.address.RealName) {
      this.UI.showToast("请填写姓名", 2000, "top");
      return;
    }
    if (!this.address.Phone) {
      this.UI.showToast("请填写手机号码", 2000, "top");
      return;
    }
    if (!/^1(3|4|5|7|8)[0-9]\d{8}$/i.test(this.address.Phone)) {
      this.UI.showToast("手机号码错误", 2000, "top");
      return;
    }

    this.UI.ShowLoading();

    this.address.Lat = this._geo.lat;
    this.address.Lng = this._geo.lng;
    let t = this.address.LocationLable;
    this.address.LocationLable = this._geo.poisTitle + " " + t;
    this.store.dispatch(new UserActions.AddAddress(this.address));

    setTimeout(() => {
      this.viewCtrl.dismiss();
    }, 500);
    // this.http.httpPost("http://shop.wjhaomama.com/Wx/PostNewAddress", { address: this.address, user: this.appService._wxUser })
    //   .then(res => {
    //     console.log(res);
    //     if (res.success) {
    //       this.UI.HideLoading();
    //       this.viewCtrl.dismiss();
    //     }
    //     else {
    //       this.address.LocationLable = t;
    //     }
    //   })
  }

  goLocation() {
    let modal = this.modalCtrl.create("LocationPage");
    this.storage.remove("location");
    modal.onDidDismiss(() => {
      this.storage.get('location').then(res => {
        if (res) {
          this._geo = res;
        }
      });
    })

    modal.present();
  }

}

