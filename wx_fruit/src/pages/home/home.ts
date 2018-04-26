import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController, Content, LoadingController, ModalController, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpService, ApiProvider, UiProvider } from '../../providers/providers';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'



//service
import { AppService } from '../../app/app.service'
import { CartPage } from "../cart/cart";

//redux
import { Store } from '@ngrx/store';
import { AppState } from '../../app/app.state';
import { Observable } from 'rxjs/Observable';
import { CacheState } from '../../store/states/cache.state';
import { ShopItem, Shop } from '../../models/shop.model';

import * as CacheActions from "../../store/actions/cache.action";
import * as WxShareActions from "../../store/actions/wxShare.action"

declare var wx: any;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild(Content) content: Content;
  @ViewChild('popoverContent', { read: ElementRef }) content2: ElementRef;
  items: any;
  i: ShopItem;
  newList: ShopItem[];
  geoTitle: any;
  loading: any;
  geoResult: any;

  shop: Shop;
  listItems: ShopItem[];
  //搜索关键字
  searchText: string;
  _geo = { lat: 30.905481, lng: 120.658958, poisTitle: "请选择收货地址" };

  cache$: Observable<CacheState>
  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public http: HttpService,
    public appService: AppService,
    public loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private storage: Storage,
    private popCtrl: PopoverController,
    private api: ApiProvider,
    private store: Store<AppState>,
    private UI: UiProvider

  ) {
    this.cache$ = this.store.select(x => x.cache);

    this.cache$.subscribe(z => {
      if (z && z.shop) {
        this.shop = z.shop;
        this.listItems = z.itemList;
      }
    })

  }

  ionViewDidLoad() {
  }

  ionViewDidEnter() {
    let page = this.api.getUriParam("page");
    if (page) {
      if (page === 'detail') {
        let itemid = parseInt(this.api.getUriParam("itemid"));
        if (itemid > 0) {
          setTimeout(() => {
            this.listItems.forEach(e => {
              if (e.Id == itemid) {
                this.goDetail(e);
              }
            });
          }, 200);
        }
      }
    }
  }

  presentRadioPopover(ev: UIEvent) {
    // $("ion-backdrop").css( 'opacity','0.85' );
    let popover = this.popCtrl.create(CartPage, {
      contentEle: this.content2.nativeElement
    }, { showBackdrop: true });
    popover.present({
      ev: ev
    });
  }

  toPay() {
    let n = this.navCtrl.push("PayPage");
  }

  login() {
    let modal = this.modalCtrl.create("LoginPage");
    modal.present();
  }

  scroll(event) {
    // var header = document.getElementById("header")
    // if (event && event.scrollTop) {
    //   if (event.scrollTop > 30) {
    //     header.style.opacity = "0.5"
    //   }
    //   else {
    //     header.style.opacity = "1"
    //   }
    // }
  }

  // onSearchInput(event) {
  //   var header = document.getElementById("header");
  //   header.style.opacity = "1";
  // }

  public goDetail(item) {
    let popover = this.popCtrl.create("DetailPage", { data: item });
    popover.present();
    popover.onDidDismiss(() => {
      this.store.dispatch(new WxShareActions.SetShareData(this.appService.defaultShareData));
    });
  }

  //下拉刷新事件
  doRefresh(refresher) {
    this.store.dispatch(new CacheActions.ReLoad());
    refresher.complete();
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

  add(item: ShopItem, list: ShopItem[]) {
    item.Count += 1;
    this.store.dispatch(new CacheActions.AddToCart())
    //加入购物车动画
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

  remove(item: ShopItem) {
    item.Count -= 1;
    this.store.dispatch(new CacheActions.RemoveCart())
  }
}
