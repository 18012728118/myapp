

import { Injectable, Inject } from '@angular/core';
import { LoadingController, ToastController, AlertController, Platform, NavController, App } from 'ionic-angular';


//redux
import { Store } from '@ngrx/store';
import { AppState } from '../../app/app.state';
import { CacheState } from '../../store/states/cache.state';
import * as CacheActions from "../../store/actions/cache.action"
import { Observable } from 'rxjs/Observable';
import { ModalService } from '../../services/modal.service';

@Injectable()
export class UiProvider {
  loading: any;
  shop: any;
  shop$: Observable<CacheState>;
  platfrom: any;
  constructor(private loadingCtrl: LoadingController,
    private toasst: ToastController, private alertCtrl: AlertController
    , @Inject(Platform) platform
    , private store: Store<AppState>
    , private app: App
    , private modalService: ModalService
  ) {
    this.platfrom = platform;
    this.shop$ = this.store.select(z => z.cache)
    this.shop$.subscribe(state => {
      if (state && state.shop) {
        this.shop = state.shop
      }
    });
  }

  public ShowLoading() {
    this.loading = this.loadingCtrl.create({ content: '请稍后...' });
    this.loading.present();
  }

  public LoadingDismiss() {
    this.HideLoading();
  }
  public HideLoading() {
    this.loading.dismiss();

  }

  public showToast(title, duration = 2000, position = "top") {
    let toast = this.toasst.create({
      message: title,
      duration: duration,
      position: position
    });
    // toast.onDidDismiss(() => {
    // });
    toast.present();
  }

  get navCtrl(): NavController {
    return this.app.getRootNav();
  }

  public navPop() {
    this.navCtrl.pop();
  }


  public openModal(key) {
    this.modalService.open(key);
  }

  public closeModal(key) {
    this.modalService.close(key);
  }

  public alertPaySuccess() {
    let alert = this.alertCtrl.create({
      title: '下单成功',
      subTitle: "<h2>关注公众号可接收订单进度</h2><img src='" + this.shop.Setting.KeFuWxQRImg + "' />",
      buttons: [{
        text: '确定',
        handler: () => {
          let data = { success: true };
          //this.navCtrl.pop();
          // this.viewCtrl.dismiss(data);
          //alert.dismiss();
        }
      }]
    });
    alert.present();
  }
}
