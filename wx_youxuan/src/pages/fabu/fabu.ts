import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/app.state';
import { Observable } from 'rxjs/Observable';
import { CacheState } from '../../store/state/cache.State';

/**
 * Generated class for the FabuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: "Fabu",
  defaultHistory: ["TabsPage"]
})
@Component({
  selector: 'page-fabu',
  templateUrl: 'fabu.html',
})
export class FabuPage {
  cache$: Observable<CacheState>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store: Store<AppState>) {
    this.cache$ = this.store.select(z => z.cache);
  }

  ionViewDidLoad() {
  }

}
