import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppState } from '../../app/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { getShopOrders } from '../../store/state/cache.State';

import * as CacheActions from "../../store/actions/cache.action";
/**
 * Generated class for the ShopOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop-orders',
  templateUrl: 'shop-orders.html',
})
export class ShopOrdersPage {

  shopOrders$: Observable<any>;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private store: Store<AppState>) {
    store.dispatch(new CacheActions.LoadShopOrders(null));
    this.shopOrders$ = store.select(getShopOrders);
  }

  ionViewDidLoad() {
  }

  loadPayLoad(buyItemId: number) {
    this.store.dispatch(new CacheActions.LoadShopOrders(buyItemId));
  }

}
