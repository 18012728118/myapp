import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, AlertController, Content } from 'ionic-angular';

import { ISubscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import "rxjs/add/operator/distinctUntilChanged"

import { AppService, ApiUrl } from '../../app/app.service'
import { HttpService } from '../../providers/HttpService'
import { ShopItem, Shop } from '../../models/shop.model';

//redux
import { Store } from '@ngrx/store';
import { AppState } from '../../app/app.state';
import { UserState } from '../../store/states/user.state';
import * as UserActions from "../../store/actions/user.action"
import { CacheState, getTotal } from '../../store/states/cache.state';
import { ShopAddress } from '../../models/shopAddress.model';
import * as CacheActions from '../../store/actions/cache.action';
import { Subject } from 'rxjs/Subject';
import { ModalService } from '../../services/modal.service';
import { UiProvider } from '../../providers/ui/ui';

@IonicPage({
  defaultHistory: ["HomePage"]
})
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {
  @ViewChild(Content) content: Content

  payType: string;
  addressList = [];
  selectAddress: ShopAddress;
  _comment: string = "";

  user$: Observable<UserState>;
  cache$: Observable<CacheState>

  shopJCAddress: any = {
    Id: -1, LocationLable: '金城商业中心'
  }
  shop: Shop;
  cartSub: ISubscription;
  cacheSub: ISubscription;
  userSub: ISubscription;

  cart: any;


  modelChanged: Subject<string> = new Subject<string>();

  constructor(public navCtrl: NavController
    , public navParams: NavParams,
    private viewCtrl: ViewController,
    private appService: AppService,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private http: HttpService,
    private store: Store<AppState>,
    private modal: ModalService,
    private UI: UiProvider
  ) {
    this.user$ = this.store.select(z => z.user);
    this.cache$ = this.store.select(z => z.cache);

    //监控如果进入是付款页购物车是空的返回首页
    this.cacheSub = this.cache$.subscribe(z => {
      if (z.total === 0) {
        console.info("total change subscribe")
        this.navCtrl.pop();
      }
    });

    this.modelChanged
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(text => this.store.dispatch(new CacheActions.SetComment(text)));
  }

  ionViewWillLeave() {
    this.cacheSub.unsubscribe();
  }

  ionViewDidLoad() {
  }


  changed(value) {
    this.modelChanged.next(value)
  }

  radioChange(checkValue) {
    console.log(checkValue)
    this.store.dispatch(new CacheActions.SelectAddress(checkValue));
  }

  payTypeChange(checkValue) {
    console.log(checkValue)
    this.store.dispatch(new CacheActions.SetPayType(checkValue));
  }

  payOfftest() {
    this.store.dispatch(new CacheActions.ToPay());
  }

  editAddress() {
    this.navCtrl.push("AddressPage");
  }



}
