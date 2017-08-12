import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
})
export class MyPage {


  cardId: any;

  cameraResult: BarcodeScanResult = { text: "", cancelled: true, format: "QR_CODE" };


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private barcodeScanner: BarcodeScanner,
    private alertCtrl: AlertController,
    private storage: Storage
  ) {

    //storage.set('age', 'Max');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPage');
  }

  gotoAddress() {
    let modal = this.modalCtrl.create("AddressPage");
    modal.present();
  }
  gotoStudy() {
    let modal = this.modalCtrl.create("StudyPage");
    modal.present();
  }

  login() {
    let modal = this.modalCtrl.create("LoginPage");
    modal.present();
  }

  doSomething() {
    this.storage.clear();
  }
  camera() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.cameraResult = barcodeData;
      if (/^quan\S+/i.test(this.cameraResult.text)) {
        let confirm = this.alertCtrl.create({
          title: '商家核销',
          message: '大吃特吃二人套餐 一分',
          buttons: [
            {
              text: '取消',
              handler: () => {
                console.log('Disagree clicked');
              }
            },
            {
              text: '同意核销',
              handler: () => {
                console.log('Agree clicked');
                confirm.present();
                let alert = this.alertCtrl.create({
                  title: '核销成功!',
                  buttons: ['OK']
                });
                alert.present();
              }
            }
          ]
        });
        confirm.present();

      }
    }, (err) => {
      // An error occurred
    });
  }

}
