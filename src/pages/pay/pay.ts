import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';


import { Http} from '@angular/http';

import { AppService ,IShopItem } from '../../app/app.service'

/**
 * Generated class for the PayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {

  constructor(public navCtrl: NavController
    , public navParams: NavParams,
    private viewCtrl: ViewController,
    private _http:Http,
    private appService :AppService    ,
    public modalCtrl: ModalController,

  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayPage');
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  payOff()
  {
    let payOffUrl = this.appService._apiUrl + 'app/PostCarts'
    this._http.post(payOffUrl,
      this.appService.cartItems)
      .subscribe(res=>{
        console.log(res);
      });
  }

  editAddress(){
    let modal = this.modalCtrl.create("AddressPage");
    modal.present();
  }



}
