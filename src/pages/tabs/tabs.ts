import { Component } from '@angular/core';

import { NavParams,IonicPage } from 'ionic-angular'

import { CartPage } from '../cart/cart';
import { MyPage } from '../my/my';
import { HomePage } from '../home/home';

import { AppService } from '../../app/app.service'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homePage = HomePage;
  cartPage = CartPage;
  myPage = MyPage;

  public tabId: number;
  selectTabIndex :number = 0;

  constructor(public app: AppService,
    public params: NavParams
  ) {
    this.tabId = params.get('tabId');
    console.log("tabId:"+this.tabId);

    if (this.tabId != undefined || this.tabId != null) {
      this.selectTabIndex = this.tabId;
    }
    console.log("selectTabIndex:"+this.selectTabIndex );
  }
}
