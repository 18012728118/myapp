import { Component } from '@angular/core';

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

  constructor(public app: AppService) {

  }
}
