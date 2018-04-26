import { Component, ElementRef, ViewChild } from '@angular/core';

import { Settings, Api, InitDataProvider } from '../../providers/providers';
import { FabContainer, IonicPage, Nav, NavController, App, ModalController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: "page-tabs",
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild(FabContainer) fab: FabContainer;
  tabHome = "HomePage";
  tabCart = "OrderPage";
  tabMessage = "MessagePage";
  tabFavorate = "FavoratePage";
  tabSetting = "SettingPage";

  constructor(private settings: Settings,
    private app: App,
    private modalCtrl: ModalController,
    private initData: InitDataProvider,
    private api: Api) {

  }
  ionViewWillEnter() {
    // this.settings.load().then(() => {
    //   this.cartNum = this.settings.allSettings.cartNum;
    // });
  }

  ionViewDidEnter() {
    setTimeout(() => {
      // console.log("ionViewDidEnter");
      let page = this.api.getUriParam("page");
      let detailid = this.api.getUriParam("iid")
      if (page && detailid) {
        let modal = this.modalCtrl.create(page, { DetailId: detailid });
        modal.onDidDismiss(() => {
          this.initData.initDefaultShare();
        });
        modal.present();
      }
    }, 500);
  }


  emptyCart() {
    console.log("emptyCart");
    this.fab.close();
  }

  goHome() {
    let nav = this.app.getActiveNavs()[0];
    if (nav.canGoBack) {
      nav.pop();
    }
  }
}
