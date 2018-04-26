import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { InitDataProvider } from '../../providers/init-data/init-data';
import { Api } from '../../providers/api/api';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface AppState {
  cahce: Cache
}
@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  wxUser: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private initData: InitDataProvider,
    private api: Api) {
  }

  ionViewDidLoad() {
    this.wxUser = this.initData.WxUser;
  }

  ionViewDidEnter() {

  }

  ionViewWillLeave() {
  }

  goScan() {
    this.api.scanQRCode(1);
  }

  clearStorage()
  {
    //localStorage.removeItem("token");
  }
}
