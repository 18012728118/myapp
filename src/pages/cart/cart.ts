import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { ToastController } from 'ionic-angular';

import 'rxjs/add/operator/map'

import { AppService } from '../../app/app.service'



@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  constructor(public navCtrl: NavController,
    public appService: AppService,
    public modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }
  add(item: any) {
    item.Count += 1;
    this.appService.addCartNum();
  }
  remove(item: any) {
    if (item.Count > 0) {
      item.Count -= 1;
      this.appService.removeCartNum();
    }
  }

  removeAll() {
    this.appService.removeCartAll();
    this.presentToast()
    setTimeout(() => this.backToHome(), 300);
  }

  backToHome() {
    this.navCtrl.parent.select(0);
  }

  toPay() {
    if (this.appService._wxUser) {

      let modal = this.modalCtrl.create("PayPage");
      modal.onDidDismiss(data => {
        console.log(data);
        if (data.success) {
          this.appService.removeCartAll();

          this.navCtrl.parent.select(0);
        }
      });
      modal.present();
    }
    else {
      this.login();
    }
  }

  login() {
    let modal = this.modalCtrl.create("LoginPage");
    modal.present();
  }


  presentToast() {
    let toast = this.toastCtrl.create({
      message: '购物车已清空',
      duration: 1000,
      position: 'top'
    });
        // toast.onDidDismiss(() => {
    // });
    toast.present();
    


  }
}
