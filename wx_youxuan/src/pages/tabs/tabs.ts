import { Component, ElementRef, ViewChild } from '@angular/core';

import { Settings, Api, InitDataProvider } from '../../providers/providers';
import { FabContainer, IonicPage, Nav, NavController, App, ModalController } from 'ionic-angular';
@IonicPage({
  segment: 'Home'
})
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
  subjectList = "SubjectListPage";

  constructor(private app: App,
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private initData: InitDataProvider,
    private api: Api) {
    setTimeout(() => {
      let page = this.api.getUriParam("page");
      let detailid = this.api.getUriParam("iid")
      if (page) {
        this.navCtrl.push(page, { DetailId: detailid })
      }
    }, 500);
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.initData.initDefaultShare();
    }, 200);
  }

  // emptyCart() {
  //   console.log("emptyCart");
  //   this.fab.close();
  // }

  goHome() {
    let nav = this.app.getActiveNavs()[0];
    if (nav.canGoBack) {
      nav.pop();
    }
  }
}
