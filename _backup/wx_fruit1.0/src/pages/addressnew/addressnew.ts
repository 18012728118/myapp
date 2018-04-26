import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController ,LoadingController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { AppService, IShopItem, ApiUrl } from '../../app/app.service'

@IonicPage()
@Component({
  selector: 'page-addressnew',
  templateUrl: 'addressnew.html',
})
export class AddressnewPage {

  _geo: any = { lat: 0, lng: 0, poisTitle: "" };
  address = { RealName: "", Phone: undefined, LocationLable: "", lat: 0, lng: 0, };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ref: ChangeDetectorRef,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private storage: Storage,
    private http: Http,
    private appService: AppService,
    private loadingCtrl :LoadingController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressnewPage');
  }

  //关闭
  dismiss() {
    this.viewCtrl.dismiss();
  }


  save() {
    this.appService.ShowLoading();

    this.address.lat = this._geo.lat;
    this.address.lng = this._geo.lng;
    let t = this.address.LocationLable;
    this.address.LocationLable =  this._geo.poisTitle + " " + this.address.LocationLable;
    console.log(this.address);
    this.http.post("http://shop.wjhaomama.com/Wx/PostNewAddress", { address: this.address, user: this.appService._wxUser })
      .map(res => res.json())
      .subscribe(res => {
        console.log(res);
        if (res.success) {
          this.appService.LoadingDismiss();
          this.viewCtrl.dismiss();
        }
        else{
          this.address.LocationLable = t;
        }
      })
  }

  goLocation() {
    let modal = this.modalCtrl.create("LocationPage");
    this.storage.remove("location");
    modal.onDidDismiss(() => {
      this.storage.get('location').then(res => {
        if (res) {
          this._geo = res;
        }
      });
    })

    modal.present();
  }

}

