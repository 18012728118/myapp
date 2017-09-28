import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AppService, IShopItem } from '../../app/app.service'

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
  item: IShopItem;

  parmas: string;
  verb: string;
  sharelink: string;
  shareTitle: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appService: AppService,
    private viewCtrl: ViewController) {
    this.item = navParams.get('data');

    let vip = this.item.PriceVip < this.item.Price ? ',会员卡支付再减' + (this.item.Price - this.item.PriceVip) + '元' : '';

    this.parmas = "page=detail&itemid=" + this.item.Id;
    this.verb = location.href.indexOf('?') >= 0 ? "&" : "?";

    this.sharelink = this.appService._store.ShareData.link + this.verb + this.parmas;
    this.shareTitle = this.appService._store.ShareData.title + " "
      + this.item.Name + " 只要￥" + this.item.Price + "/" + this.item.Unit + vip;
    appService.wxshare(
      this.shareTitle,
      this.appService._store.ShareData.desc,
      this.sharelink,
      this.item.LogoUrl + "!w100"
    );
    console.log(this.shareTitle);
    console.log(this.sharelink);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }


  share(n) {
    if (this.appService.isWeixinBrowser()) {

    }
    else {
      if (Wechat) {
        Wechat.share({
          message: {
            title: this.shareTitle,
            description: this.appService._store.ShareData.desc,
            thumb: this.item.LogoUrl + "!w100",
            media: {
              type: Wechat.Type.WEBPAGE,
              webpageUrl: this.sharelink
            }
          },
          scene: n == 1 ? Wechat.Scene.TIMELINE : Wechat.Scene.SESSION   // share to Timeline
        }, () => {
          alert("分享成功");
        }, (reason) => {
        });
      }

    }
  }

  add(item: IShopItem) {
    item.Count += 1;
    this.appService.addCartNum();
  }

  remove(item: IShopItem) {
    if (item.Count > 0) {
      item.Count -= 1;
      this.appService.removeCartNum();
    }
  }

  close() {
    console.log("close");
    this.viewCtrl.dismiss();
  }
}
