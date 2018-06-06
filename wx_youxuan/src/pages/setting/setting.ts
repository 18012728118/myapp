import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { InitDataProvider } from '../../providers/init-data/init-data';
import { Api } from '../../providers/api/api';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/app.state';

import * as CacheActions from "../../store/actions/cache.action";
import { Observable } from 'rxjs/Observable';
import { CacheState } from '../../store/state/cache.State';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  cache$: Observable<CacheState>
  _w: any = window;
  wxUser: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private api: Api,
    private store: Store<AppState>) {
    this.cache$ = this.store.select(z => z.cache);
  }

  ionViewDidLoad() {
    this.api.visitLog({ page: "SettingPage" });
  }
  ionViewDidEnter() {

  }

  partner() {
    this.navCtrl.push("PartnerPage");
  }

  ionViewWillLeave() {
  }

  goScan() {
    this.api.scanQRCode(1);
  }
  goShopOrders() {
    this.navCtrl.push("ShopOrdersPage");
  }

  clearStorage() {
    //localStorage.removeItem("token");
  }
}
