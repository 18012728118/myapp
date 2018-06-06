import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/app.state';

import * as CacheActions from "../../store/actions/cache.action";
import { Api } from '../../providers/api/api';
import { Observable } from 'rxjs/Observable';
import { getSubject } from '../../store/state/cache.State';
import { InitDataProvider } from '../../providers/providers';

import { transform, WGS84, BD09 } from 'gcoord';
import { AppService } from '../../services/appService';

declare var wx: any;
@IonicPage({
  segment: "Subject/:DetailId",
  defaultHistory: ["TabsPage"]
})
@Component({
  selector: 'page-subject',
  templateUrl: 'subject.html',
})
export class SubjectPage {

  subject$: Observable<any>;
  subject: any = {};
  _id: number;
  sold = { name: 'SoldCount', text: '销量 ↓', value: 'desc' };
  view = { name: 'Views', text: '点击 ↓', value: 'desc' };
  dis = { name: 'dis', text: '距离 ↓', value: 'asc' };
  price = { name: 'VipPrice', text: '价格 ↓', value: 'asc' };

  sort: any;

  point: { lng: number, lat: number } = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store: Store<AppState>,
    private initData: InitDataProvider,
    private api: Api,
    private appService: AppService
  ) {
    this._id = this.navParams.get("DetailId");
    this.store.dispatch(new CacheActions.LoadSubject(this._id));
    this.subject$ = this.store.select(getSubject);

    this.sort = this.view;

  }

  ionViewDidLoad() {
    this.api.visitLog({ page: "SubjectPage", iid: this._id });
  }

  orderByView() {
    if (this.sort === this.view)
      if (this.view.value === 'desc')
        this.view = Object.assign({}, this.view, { text: '点击 ↑', value: 'asc' });
      else
        this.view = Object.assign({}, this.view, { text: '点击 ↓', value: 'desc' });
    this.sort = this.view;
  }

  orderBySold() {
    if (this.sort === this.sold)
      if (this.sold.value === 'desc')
        this.sold = Object.assign({}, this.sold, { text: '销量 ↑', value: 'asc' });
      else
        this.sold = Object.assign({}, this.sold, { text: '销量 ↓', value: 'desc' });
    this.sort = this.sold;
  }

  priceing() {
    if (this.sort === this.price)
      if (this.price.value === 'desc')
        this.price = Object.assign({}, this.price, { text: '价格 ↓', value: 'asc' });
      else
        this.price = Object.assign({}, this.price, { text: '价格 ↑', value: 'desc' });
    this.sort = this.price;
  }

  dising() {
    this.getLocation().then(() => {
      console.log("promise resolve");
      this.calcDis();
      if (this.sort === this.dis)
        if (this.dis.value === 'desc')
          this.dis = Object.assign({}, this.dis, { text: '距离 ↓', value: 'asc' });
        else
          this.dis = Object.assign({}, this.dis, { text: '距离 ↑', value: 'desc' });
      this.sort = this.dis;
    })
      .catch(err => {
        alert(err);
      });

  }
  locationGot: boolean = false;

  getLocation() {
    return new Promise((resolve, reject) => {
      console.log("getlocation promise");
      if (!this.locationGot)
        wx.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: (res) => {
            let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            let speed = res.speed; // 速度，以米/每秒计
            let accuracy = res.accuracy; // 位置精度
            this.point = { lng: longitude, lat: latitude };
            this.locationGot = true;
            this.appService.postLocation({ latitude: res.latitude, longitude: res.longitude, speed: res.speed, accuracy: res.accuracy }).subscribe((res2) => {
              this.initData.WxUser.Lng = res.longitude;
              this.initData.WxUser.Lat = res.latitude;
              console.log(res2);
            })
            return resolve();
          },
          cancel: () => {
            return reject("用户拒绝了定位,距离排序失败");
          }
        });
      else
        return resolve();
    })

  }


  ionViewDidEnter() {
    setTimeout(() => {
      this.initShare();
    }, 1500);
    this.subject$.subscribe(res => {
      if (res && res.subject && res.buyItemList) {
        this.subject = res;
        if (this.initData.WxUser)
          if (this.initData.WxUser.Lng && this.initData.WxUser.Lat) {
            //this.sort = this.dis;
            this.point = { lng: this.initData.WxUser.Lng, lat: this.initData.WxUser.Lat };
          }
        this.calcDis();
      }
    });

  }

  goHome() {
    location.href = '#Home';
  }
  calcDis() {
    this.subject.buyItemList.forEach(element => {
      element.dis = 0;
      if (this.point)
        if (element.Shop && element.Shop.Lat && element.Shop.Lng) {
          let bd = transform([element.Shop.Lng, element.Shop.Lat], BD09, WGS84);
          element.dis = this.api.GetDistance(this.point.lng, this.point.lat, bd[0], bd[1]);
        }
    });
  }

  ionViewWillLeave() {
    this.initData.initDefaultShare();
  }

  initShare() {
    if (this.initData.WxUser.openid && this.subject && this.subject.subject) {
      let s = this.subject.subject;
      let wxData = {
        title: s.Title,
        desc: s.Desc ? s.Desc.replace(/<[^>]*>/g, '') : '',
        // imgUrl: "http://m.wjhaomama.com/img/logo.png",
        imgUrl: s.Param.TopBarImgUrl + "!w100h100",
        link: `http://m.wjhaomama.com/?sid=${window["storeId"]}&sfrom=${this.initData.WxUser.openid}&page=SubjectPage&iid=${s.Id}`
      }
      this.api.wxshare(wxData.title, wxData.desc, wxData.link, wxData.imgUrl);
    }
  }

}
