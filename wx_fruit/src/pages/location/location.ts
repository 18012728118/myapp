import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { AppService } from '../../app/app.service'
import { HttpService } from '../../providers/providers';

/**
 * Generated class for the LocationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


declare var BMap, BMap_Symbol_SHAPE_POINT;
declare var wx: any;

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})


export class LocationPage {


  @ViewChild('map') mapElement: ElementRef;

  geoTitle: string;
  _geo = { lat: 30.905527, lng: 120.658953, poisTitle: "请选择收货地址" };

  poisList: any;
  map: any;
  marker: any;

  centerPoint: any;
  homePoint = new BMap.Point(120.658953, 30.905527);

  distance: string;

  constructor(public navCtrl: NavController,
    private http: HttpService,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private storage: Storage,
    private ref: ChangeDetectorRef,
    public appService: AppService
  ) {

  }

  //微信取得坐标gcj02 转换为百度坐标bd09ll
  bd_encrypt(lat, lng) {
    let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    let x: number = lng
    let y: number = lat;
    let z: number = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
    let theta: number = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
    this._geo.lng = z * Math.cos(theta) + 0.0065;
    this._geo.lat = z * Math.sin(theta) + 0.006;
  }


  ionViewWillEnter() {
    this.storage.remove('location');
  }

  ionViewDidEnter() {
    //判断是不是微信微信器
    wx.checkJsApi({
      jsApiList: ['getLocation'],// 需要检测的JS接口列表，所有JS接口列表见附录2,
      success: (res) => {
        //console.log("getLocation check success");
        //getlocaition
        wx.getLocation({
          type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          //type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: (res) => {
            this.bd_encrypt(res.latitude, res.longitude);
            //var speed = res.speed; // 速度，以米/每秒计
            //var accuracy = res.accuracy; // 位置精度
            this.wxInit()
          },
          cancel: () => {
            //这个地方是用户拒绝获取地理位置  
            this.wxInit();
          },
          fail: () => {
            this.wxInit();
          }
        });
        //getlocaition end
      }
    });
  }
  back() {
    this.viewCtrl.dismiss();
  }


  //关闭窗口传值
  dismiss(p) {
    this._geo.poisTitle = p.name;
    this.storage.set('location', this._geo);
    //console.log('set location to')
    // this.storage.get('location').then(value => console.log(value));
    this.viewCtrl.dismiss();
  }

  initPois(lat: number, lng: number) {
    let getUrl: string = "http://shop.wjhaomama.com/Wx/GetPios?lat=" + lat + "&lng=" + lng + "&ak=f8vW5GLQR7CaKA52XsxGXpR0";
    this.http.httpGet(getUrl)
      .then(res => {
        if (res.status == 0) {
          this.geoTitle = res.result.formatted_address;
          this.poisList = res.result.pois;
          this.ref.detectChanges();
        }
      }, error => {
      });

  }

  showLocation(data) {
  }

  wxInit() {
    this.initPois(this._geo.lat, this._geo.lng);
    let map = this.map = new BMap.Map(this.mapElement.nativeElement, { enableMapClick: true });//创建地图实例
    map.enableScrollWheelZoom();//启动滚轮放大缩小，默认禁用
    map.enableContinuousZoom();//连续缩放效果，默认禁用
    let point = new BMap.Point(this._geo.lng, this._geo.lat);//坐标可以通过百度地图坐标拾取器获取
    map.centerAndZoom(point, 18);//设置中心和地图显示级别

    //var marker = new BMap.Marker(point);// 创建标注

    this.marker = new BMap.Marker(new BMap.Point(point.lng, point.lat)
      , {
        // 指定Marker的icon属性为Symbol
        icon: new BMap.Symbol(BMap_Symbol_SHAPE_POINT, {
          scale: 1,//图标缩放大小
          fillColor: "#F34D92",//填充颜色
          fillOpacity: .8//填充透明度
        })
      }
    );
    map.addOverlay(this.marker);             // 将标注添加到地图中 
    this.marker.setPosition(map.getCenter());


    map.addEventListener('ondragging', () => {
    });

    map.addEventListener("dragend", (e) => {
      this.marker.setPosition(map.getCenter());
      this.centerPoint = e.point;
      this._geo.lat = e.point.lat;
      this._geo.lng = e.point.lng;
      // var p2 = new BMap.Point(e.point.lng, e.point.lat);
      this.getPois(e.point.lng, e.point.lat)

      // var walking = new BMap.WalkingRoute(this.map, {
      //   renderOptions: {
      //     map: this.map,
      //     //panel:"r_result",
      //     autoViewport: false
      //   },
      //   onSearchComplete: (results) => {
      //     //if (transit.getStatus() != BMAP_STATUS_SUCCESS) {
      //     //    return;
      //     //}
      //     var plan = results.getPlan(0);
      //     this.distance = plan.getDistance(true);
      //   }
      // });
      // walking.search(this.homePoint, p2);
    });
  }

  toHome() {
    this.map.centerAndZoom(this.homePoint, 18);//设置中心和地图显示级别
    this.marker.setPosition(this.map.getCenter());
  }

  getPois(lat: number, lng: number) {
    this.initPois(lng, lat);
  }
}