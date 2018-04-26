import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AppService } from '../../app/app.service'
import { ShopItem, Shop, ShareData } from '../../models/shop.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/app.state';
import { getShop } from '../../store/states/cache.state';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';

import * as CacheActions from '../../store/actions/cache.action'
import * as WxShareActions from "../../store/actions/wxShare.action"
declare var Wechat: any;

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  item: ShopItem;

  shop$: Observable<Shop>;
  shopSub: ISubscription;
  shop: Shop;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appService: AppService,
    private viewCtrl: ViewController,
    private store: Store<AppState>) {

    this.item = navParams.get('data');

    this.shop$ = this.store.select(getShop);
    this.shopSub = this.shop$.subscribe(s => {
      console.log("SHOPDETAIL shop Subscription")
      if (s && s.ShareData) {
        let vip = this.item.PriceVip < this.item.Price ? ',会员卡支付再减' + (this.item.Price - this.item.PriceVip) + '元' : '';
        let verb = s.ShareData.link.indexOf('?') > -1 ? "&" : "?";
        let parmas = "page=detail&itemid=" + this.item.Id;
        let shareData: ShareData = {
          title: s.ShareData.title + " "
            + this.item.Name + " 只要￥" + this.item.Price + "/" + this.item.Unit + vip,
          desc: s.ShareData.desc,
          link: s.ShareData.link + verb + parmas,
          imgUrl: this.item.LogoUrl + "!w100"
        }
        this.store.dispatch(new WxShareActions.SetShareData(shareData));
      }
    })
  }

  ionViewWillLeave() {
    this.shopSub.unsubscribe();
  }

  ionViewDidLoad() {

  }



  add(item: ShopItem) {
    item.Count += 1;
    this.store.dispatch(new CacheActions.AddToCart())
  }

  remove(item: ShopItem) {
    item.Count -= 1;
    this.store.dispatch(new CacheActions.RemoveCart())
  }

  close() {
    console.log("close");
    this.viewCtrl.dismiss();
  }
  // share(n) {
  //   if (Wechat) {
  //     Wechat.share({
  //       message: {
  //         title: this.shareTitle,
  //         description: this.shop.ShareData.desc,
  //         thumb: this.item.LogoUrl + "!w100",
  //         media: {
  //           type: Wechat.Type.WEBPAGE,
  //           webpageUrl: this.sharelink
  //         }
  //       },
  //       scene: n == 1 ? Wechat.Scene.TIMELINE : Wechat.Scene.SESSION   // share to Timeline
  //     }, () => {
  //       alert("分享成功");
  //     }, (reason) => {
  //     });
  //   }

  // }

}
