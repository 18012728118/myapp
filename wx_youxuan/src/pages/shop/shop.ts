import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { transform, BD09, GCJ02 } from 'gcoord';

/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var wx: any;
@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {

  shop: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.shop = this.navParams.get("shop");
    console.log(this.shop);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }

  toCall(shop) {
    location.href = "tel:" + shop.ShopKeFuTel;
  }
  toMap(shop) {
    let bd = transform([shop.Lng, shop.Lat], BD09, GCJ02);
    if (shop.Lng && shop.Lat) {
      wx.openLocation({
        latitude: bd[1], // 纬度，浮点数，范围为90 ~ -90
        longitude: bd[0], // 经度，浮点数，范围为180 ~ -180。
        name: shop.ShopName, // 位置名
        address: shop.ShopAddress, // 地址详情说明
        scale: 20 // 地图缩放级别,整形值,范围从1~28。默认为最大
      });
    }
  }
}
