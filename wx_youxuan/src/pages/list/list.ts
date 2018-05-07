import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/app.state';
import { Observable } from 'rxjs/Observable';
import { CacheState } from '../../store/state/cache.State';
import { InitDataProvider } from '../../providers/providers';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: "List/:iid",
  defaultHistory: ["TabsPage"]
})
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  type: any;

  cache$: Observable<CacheState>
  constructor(
    private initData: InitDataProvider,
    private navParams: NavParams,
    private store: Store<AppState>) {
    this.type = this.initData.BuyItemType[navParams.get('iid')];
    this.cache$ = store.select(z => z.cache);

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ListPage');
  }

}
