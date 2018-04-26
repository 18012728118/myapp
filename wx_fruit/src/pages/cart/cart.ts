import { Component } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';

import 'rxjs/add/operator/map'

import { AppService } from '../../app/app.service'
import * as CacheAction from "../../store/actions/cache.action"

//redux
import { Store } from '@ngrx/store';
import { AppState } from '../../app/app.state';
import { Observable } from 'rxjs/Observable';
import { CacheState } from '../../store/states/cache.state';
import { ShopItem } from '../../models/shop.model';
import { UiProvider } from '../../providers/providers';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  cache$: Observable<CacheState>

  constructor(public navCtrl: NavController,
    public appService: AppService,
    public modalCtrl: ModalController,
    private viewCtrl: ViewController,
    private store: Store<AppState>,
    private UI: UiProvider
  ) {
    this.cache$ = this.store.select(x => x.cache);
  }
  ionViewDidLoad() {
  }

  add(item: ShopItem) {
    item.Count += 1;
    this.store.dispatch(new CacheAction.AddToCart())

  }

  remove(item: ShopItem) {
    item.Count -= 1;
    this.store.dispatch(new CacheAction.RemoveCart())
  }

  close() {
    this.viewCtrl.dismiss();
  }

  removeAll() {
    this.UI.showToast("购物车已清空", 1000, "top");
    this.store.dispatch(new CacheAction.ResetAction())
    this.close();
  }

  backToHome() {
    this.navCtrl.parent.select(0);
  }

  login() {
    let modal = this.modalCtrl.create("LoginPage");
    modal.present();
  }

}
