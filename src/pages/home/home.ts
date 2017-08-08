import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, Content, LoadingController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'
import { Platform } from 'ionic-angular';


import { AppService, IShopItem } from '../../app/app.service'
import { Geolocation } from '@ionic-native/geolocation';

import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild(Content) content: Content

  items: any;

  i: IShopItem;

  imagesHost :string = "https://www.lovewujiang.com/"

  newList: IShopItem[];

  cameraResult: BarcodeScanResult = { text: "", cancelled: true, format: "QR_CODE" };

  geoTitle: string

  geoResult: any;
  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public http: Http,
    public appService: AppService,
    public plt: Platform,
    public loadingCtrl: LoadingController,
    private geolocation: Geolocation,
    private barcodeScanner: BarcodeScanner,
    private modalCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    console.log(this.plt.platforms())
  }

  goLocation() {
    let modal = this.modalCtrl.create("LocationPage");

    modal.onDidDismiss(data => {
      this.geoTitle = data.pois.name;
    });

    modal.present();
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

  initPois() {
    let _geo: any;
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords);
      _geo = resp.coords;
      let ak: string = 'f8vW5GLQR7CaKA52XsxGXpR0';
      let getUrl: string = "http://api.map.baidu.com/geocoder/v2/?location=" + _geo.latitude + "," + _geo.longitude + "&output=json&pois=1&ak=" + ak

      this.http.get(getUrl)
        .map(r => {
          console.log(r);
          return r.json();
        })
        .subscribe(res => {
          console.log(res);
          if (res.status == 0) {
            this.geoTitle = res.result.formatted_address;
          }
        }, error => {
          console.log(error);
        });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }


  geo() {
    this.initPois();
  }



  scrollToTop() {
    if (this.content)
      this.content.scrollToTop();

  }

  scrollToElement(id) {
    this.content.scrollTo(0, this.content.scrollTop + $('#cate' + id).offset().top - 50, 500);
  }

  scroll(event) {
    // console.log(event);
    var fabbtn = document.getElementById("fabBtn");
    if (event && event.scrollTop) {
      if (event.scrollTop > 160) {
        fabbtn.style.visibility = "visible";
        $('.leftMenu').addClass("onTop");
      }
      else {
        fabbtn.style.visibility = "hidden";
        $('.leftMenu').removeClass("onTop");
      }
    }
  }


  add(item: IShopItem) {
    item.Count += 1;
    this.appService.addCartNum();
    console.log(item);
  }

  remove(item: IShopItem) {
    if (item.Count > 0) {
      item.Count -= 1;
      this.appService.removeCartNum();
    }
  }

  
  //下拉刷新事件
  // doRefresh(refresher) {
  //   console.log('Begin async operation', refresher);
  //   this.appService.getShopItems();
  //   setTimeout(() => {
  //     console.log('Async operation has complete');
  //     refresher.complete();
  //   }, 500);
  // }

  refresh() {
    this.appService.listItems = [];
    this.appService.category = [];
    this.appService.initCate();
    this.presentLoadingDefault();
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: '加载中...'
    });

    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }



  getItems($event: any) {
    console.log($event.target.value);
  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'New Friend!',
      subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: ['OK']
    });
    alert.present();
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Login',
      message: "Enter a name for this new album you're so keen on adding",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: '退出',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '保存',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();


  }
}
