import { Component, ViewChild } from '@angular/core';
import { trigger, transition, style, state, animate, keyframes } from '@angular/core';
import {
  NavController, AlertController, Content,
  LoadingController, ModalController, PopoverController, NavParams,ToastController
} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'
import { AppService, IShopItem } from '../../app/app.service'
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';


declare var wx: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('bounce', [
      state('*', style({
        transform: 'translateX(0)'
      })),
      transition('* <=> *', animate('1000ms ease-out', keyframes([
        style({ transform: 'translateX(0)', offset: 0 }),
        style({ transform: 'translate(300px,60px)', offset: .3 }),
        style({ transform: 'translate(90px,200px)', offset: 1 })
      ])))
    ])
  ]
})

export class HomePage {
  @ViewChild(Content) content: Content
  items: any;
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
      }
    });
  }

  public goDetail(item) {
    let popover = this.popCtrl.create("DetailPage", { data: item });
    popover.present();
    popover.onDidDismiss(() => {
      let shareData = this.appService._store.ShareData;
      this.appService.wxshare(shareData.title, shareData.desc, shareData.link, shareData.imgUrl);
    });
  }

  toKeFu() {
    let alert = this.alertCtrl.create({
      title: '客服微信号',
      subTitle: "<img src='" + this.appService._store.Setting.KeFuWxQRImg + "' />",
      buttons: ['OK']
    });
    alert.present();
  }

  //下拉刷新事件
  doRefresh(refresher) {
    this.appService.GetInit().then(res => {
      if (res) {
        refresher.complete();
        this.appService.showToast("刷新成功",1000,"top");
      }
    });
  }

  //到最顶部按键
  scrollToTopTop() {
    if (this.content)
      this.content.scrollToTop();
  }

  //点击左侧分类 
  scrollToElement(id) {
    this.content.scrollTo(0, $('#cate' + id).position().top, 500);
  }

  add(item: IShopItem) {
    item.Count += 1;
    this.appService.addCartNum();
    // console.log(item);

    // let offset = $(".thumb" + item.Id).offset();
    // let rnd = Math.round((Math.random() * 10) * 10);
    // $(".thumb" + item.Id).clone()
    //   .css("left", offset.left)
    //   .css("top", offset.top)
    //   .css("position", "fixed")
    //   .css("opacity", 0.6)
    //   .removeClass("thumb" + item.Id)
    //   .prependTo("ion-content")
    //   .addClass("animated zoomOutDown copythumb" + rnd);
    //   setTimeout(()=> {
    //     $(".copythumb" + rnd).remove();
    //   }, 800);
    // .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
    // }); 
  }

  remove(item: IShopItem) {
    if (item.Count > 0) {
      item.Count -= 1;
      this.appService.removeCartNum();
    }
  }
}
