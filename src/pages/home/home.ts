import { Component, ViewChild } from '@angular/core';
import { trigger, transition, style, state, animate, keyframes } from '@angular/core';
<<<<<<< HEAD
import {
  NavController, AlertController, Content,
  LoadingController, ModalController, PopoverController, NavParams,ToastController
} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'
=======
import { NavController, AlertController, Content, LoadingController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'
import { Platform } from 'ionic-angular';


>>>>>>> parent of 4d01b70... saf
import { AppService, IShopItem } from '../../app/app.service'
import { Geolocation } from '@ionic-native/geolocation';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations:[
    trigger('bounce',[
      state('*',style({
        transform:'translateX(0)'
      })),
      transition('* => inactive',animate('700ms ease-out',keyframes([
        style({transform:'translateX(0)',offset:0}),
        style({transform:'translate(65px,65px)',offset:.3}),
        style({transform:'translateX(0)',offset:1})
      ]))),
      
      transition('* => active',animate('700ms ease-out',keyframes([
        style({transform:'translateX(0)',offset:0}),
        style({transform:'translate(65px,65px)',offset:.3}),
        style({transform:'translateX(0)',offset:1})
      ])))
    ])
  ]
})

export class HomePage {
  @ViewChild(Content) content: Content

  items: any;

 state:string = 'inactive';

  i: IShopItem;

  imagesHost: string = "https://www.lovewujiang.com/"

  newList: IShopItem[];


  geoTitle: any;
  loading: any;
  geoResult: any;

  _geo = { lat: 30.905481, lng: 120.658958, poisTitle: "请选择收货地址" };

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public http: Http,
    public appService: AppService,
    public loadingCtrl: LoadingController,
    private geolocation: Geolocation,
    private modalCtrl: ModalController,
<<<<<<< HEAD
    private storage: Storage,
    private popCtrl: PopoverController,
    private toastCtrl :ToastController
  ) {
    appService.ShowLoading();
  }

  ionViewDidLoad() {
    //console.log(this.plt.platforms());
    this.appService.GetInit().then(res => {
      if (res) {
        this.appService.LoadingDismiss();
        let searchP = new URL(location.href);
        let page = searchP.searchParams.get("page");
        if (page) {
          if (page === 'detail') {
            let itemid = searchP.searchParams.get("itemid");
            if (itemid) {
              this.appService.listItems.forEach(e => {
                if (e.Id === parseInt(itemid)) {
                  setTimeout(() => {
                    this.goDetail(e);
                  }, 500);
                }
              });
            }
          }
        }
=======
    private storage: Storage
  ) {
  }

  ionViewDidLoad() {

    this.initPois();
    console.log(this.plt.platforms())
    this.storage.get('location').then(value => {
      if (value) {
        this._geo = value;
>>>>>>> parent of 4d01b70... saf
      }
    });

<<<<<<< HEAD
  public goDetail(item) {
    let popover = this.popCtrl.create("DetailPage", { data: item });
    popover.present();
    popover.onDidDismiss(() => {
      let shareData = this.appService._store.ShareData;
      this.appService.wxshare(shareData.title, shareData.desc, shareData.link, shareData.imgUrl);
    });
  }
=======
  }

  goLocation() {
    let modal = this.modalCtrl.create("LocationPage");
    modal.onDidDismiss(() => {
      this.storage.get('location').then(value => {
        if (value) {
          this._geo = value;
        }
      });
    })
>>>>>>> parent of 4d01b70... saf

    modal.present();
  }

<<<<<<< HEAD
  //下拉刷新事件
  doRefresh(refresher) {
    this.appService.GetInit().then(res => {
      if (res) {
        refresher.complete();
        this.appService.showToast("刷新成功",1000,"top");
      }
    });
  }

=======
  initPois() {
    console.log('initpois');
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords);
      this._geo.lat = resp.coords.latitude;
      this._geo.lng = resp.coords.longitude;
      let ak: string = 'f8vW5GLQR7CaKA52XsxGXpR0';
      let getUrl: string = "https://api.map.baidu.com/geocoder/v2/?location=" + this._geo.lat + "," + this._geo.lng + "&output=json&pois=1&ak=" + ak
      this.http.get(getUrl)
        .map(r => {
          // console.log(r);
          return r.json();
        })
        .subscribe(res => {
          // console.log(res);
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


>>>>>>> parent of 4d01b70... saf
  //到最顶部按键
  scrollToTopTop() {
    if (this.content)
      this.content.scrollToTop();

  }

  //点击左侧分类 
  scrollToElement(id) {
    this.content.scrollTo(0, this.content.scrollTop + $('#cate' + id).offset().top - 50, 500);
  }

<<<<<<< HEAD
=======

  //SCROLL事件
  scroll(event) {
    // console.log(event);
    var fabbtn = document.getElementById("fabBtn");
    if (event && event.scrollTop) {
      if (event.scrollTop > 160) {
        fabbtn.style.visibility = "visible";
        // $('.leftMenu').addClass("onTop");
      }
      else {
        fabbtn.style.visibility = "hidden";
        // $('.leftMenu').removeClass("onTop");
      }
    }
  }


>>>>>>> parent of 4d01b70... saf
  add(item: IShopItem) {
    item.Count += 1;
    this.appService.addCartNum();
    console.log(item);

    this.state = (this.state === 'active' ? 'inactive' : 'active');
  }

  remove(item: IShopItem) {
    if (item.Count > 0) {
      item.Count -= 1;
      this.appService.removeCartNum();
    }
  }
<<<<<<< HEAD
=======


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
    this.presentLoadingDefault();
    this.appService.initCate().then(res => {
      if (res) {
        this.loading.dismiss();
      }
    });
  }


  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: '加载中...'
    });

    this.loading.present();

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
>>>>>>> parent of 4d01b70... saf
}
