import { Component, ViewChild } from '@angular/core';
import { trigger, transition, style, state, animate, keyframes } from '@angular/core';
import {
  NavController, AlertController, Content,
  LoadingController, ModalController, PopoverController, NavParams
} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'
import { Platform } from 'ionic-angular';
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
    public plt: Platform,
    public loadingCtrl: LoadingController,
    private geolocation: Geolocation,
    private modalCtrl: ModalController,
    private storage: Storage,
    private popCtrl: PopoverController
  ) {

  }

  ionViewDidLoad() {

    console.log(this.plt.platforms());
    this.showLoading();
    this.appService.GetInit().then(res => {
      if (res) {
        this.closeLoading();
        let searchP = new URL(location.href);
        let page = searchP.searchParams.get("page");
        if (page) {
          if (page === 'detail') {
            console.log("page is :"+page);
            let itemid = searchP.searchParams.get("itemid");
            console.log("itemid:" + itemid);
            if (itemid) {
              this.appService.listItems.forEach(e => {
                if (e.Id === parseInt(itemid)) {
                  setTimeout(()=>{
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

  closeLoading()
  {
    this.loading.dismiss();
    
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
    this.showLoading();
    // this.appService.listItems = [];
    // this.appService.category = [];
    this.appService.GetInit().then(res => {
      if (res) {
        refresher.complete();
        this.closeLoading();
      }
    });
  }

  // goLocation() {
  //   let modal = this.modalCtrl.create("LocationPage");
  //   modal.onDidDismiss(() => {
  //     this.storage.get('location').then(value => {
  //       if (value) {
  //         this._geo = value;
  //       }
  //     });
  //   })

  //   modal.present();
  // }

  // initPois() {
  //   console.log('initpois');
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     console.log(resp.coords);
  //     this._geo.lat = resp.coords.latitude;
  //     this._geo.lng = resp.coords.longitude;
  //     let ak: string = 'f8vW5GLQR7CaKA52XsxGXpR0';
  //     let getUrl: string = "https://api.map.baidu.com/geocoder/v2/?location=" + this._geo.lat + "," + this._geo.lng + "&output=json&pois=1&ak=" + ak
  //     this.http.get(getUrl)
  //       .map(r => {
  //         // console.log(r);
  //         return r.json();
  //       })
  //       .subscribe(res => {
  //         // console.log(res);
  //         if (res.status == 0) {
  //           this.geoTitle = res.result.formatted_address;
  //         }
  //       }, error => {
  //         console.log(error);
  //       });
  //   }).catch((error) => {
  //     console.log('Error getting location', error);
  //   });
  // }

  // geo() {
  //   this.initPois();
  // }

  //到最顶部按键
  scrollToTop() {
    if (this.content)
      this.content.scrollToTop();
  }

  //点击左侧分类 
  scrollToElement(id) {
    this.content.scrollTo(0, $('#cate' + id).position().top, 500);
  }

  //SCROLL事件
  // scroll(event) {
  //   // console.log(event);
  //   var fabbtn = document.getElementById("fabBtn");
  //   if (event && event.scrollTop) {
  //     if (event.scrollTop > 160) {
  //       fabbtn.style.visibility = "visible";
  //       // $('.leftMenu').addClass("onTop");
  //     }
  //     else {
  //       fabbtn.style.visibility = "hidden";
  //       // $('.leftMenu').removeClass("onTop");
  //     }
  //   }
  // }


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

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: '加载中...'
    });
    this.loading.present();
  }

  // getItems($event: any) {
  //   console.log($event.target.value);
  // }



  // showAlert() {
  //   let alert = this.alertCtrl.create({
  //     title: 'New Friend!',
  //     subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }

  // showPrompt() {
  //   let prompt = this.alertCtrl.create({
  //     title: 'Login',
  //     message: "Enter a name for this new album you're so keen on adding",
  //     inputs: [
  //       {
  //         name: 'title',
  //         placeholder: 'Title'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: '退出',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: '保存',
  //         handler: data => {
  //           console.log('Saved clicked');
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();


  // }
}
