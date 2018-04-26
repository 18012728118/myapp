import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';

import { AppService, ApiUrl } from '../../app/app.service'

// import {AddressAddNewPage} from '../address-add-new/address-add-new'

import { HttpService } from '../../providers/HttpService'
import { UiProvider } from '../../providers/ui/ui';
import { AppState } from '../../app/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { UserState } from '../../store/states/user.state';
import { ShopAddress } from '../../models/shopAddress.model';
import * as UserActions from "../../store/actions/user.action";



@IonicPage({
  defaultHistory: ["HomePage"]
})
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {

  addressList = [];
  selectAddress: any;
  alert: any;
  size: number = 0;


  user$: Observable<UserState>

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private viewCtrl: ViewController,
    private appService: AppService,
    private alertCtrl: AlertController,
    private UI: UiProvider,
    private store: Store<AppState>
  ) {
    //this.init();
    this.user$ = this.store.select(z => z.user);
    this.user$.subscribe(list => {
      if (list) {
        this.size = list.addressList.length;
      }
    });
  }

  ionViewDidEnter() {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPage');

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
            this.UI.ShowLoading();
            this.store.dispatch(new UserActions.DeleteAddress(this.selectAddress.Id))
          }
        }
      ]
    });
    confirm.present();
  }

  selectedAddress() {
    this.UI.ShowLoading();
    this.store.dispatch(new UserActions.SetAddress(this.selectAddress.Id));
  }



  addressAdd() {
    this.navCtrl.push("AddressnewPage");
  }
}
