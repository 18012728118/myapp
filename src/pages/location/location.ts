import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the LocationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


declare var BMap, BMap_Symbol_SHAPE_POINT;

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})


export class LocationPage {


  @ViewChild('map') mapElement: ElementRef;

  geoTitle: string;
  _geo = { lat: 30.905481, lng: 120.658958, poisTitle: "请选择收货地址" };

  poisList: any;
  map: any;
  centerPoint: any;
  constructor(public navCtrl: NavController,
    private http: Http,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private geolocation: Geolocation,
    private storage: Storage
  ) {
  }

  ionViewWillEnter() {

<<<<<<< HEAD
  ionViewDidEnter() {
    //判断是不是微信微信器
    if (this.appService.isWeixinBrowser()) {
      wx.checkJsApi({
        jsApiList: ['getLocation'],// 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: (res) => {
          console.log("getLocation check success");
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
    else {
      var options = {
        enableHighAccuracy: true,  // 是否使用 GPS
        maximumAge: 30000,         // 缓存时间
        timeout: 10000,            // 超时时间
        coorType: 'bd09ll'         // 默认是 gcj02，可填 bd09ll 以获取百度经纬度用于访问百度 API
      }
      this.geolocation.getCurrentPosition(options).then((resp) => {
        if (resp.coords) {
          //alert("geolocation:"+resp.coords.latitude+" "+resp.coords.longitude);
          //this.bd_encrypt(resp.coords.latitude, resp.coords.longitude);
          this._geo.lat = resp.coords.latitude;
          this._geo.lng = resp.coords.longitude;
          this._geo.poisTitle = "请选择下方位置 附近"
          this.wxInit();
        }
      }).catch((error) => {
        console.log('Error getting location', error);
        this.wxInit();
      });
    }
=======
>>>>>>> parent of 4d01b70... saf
  }

  back() {
    this.viewCtrl.dismiss();

  }
  //关闭窗口传值
  dismiss(p) {
    this._geo.poisTitle = p.name;
    this.storage.set('location', this._geo);
    console.log('set location to')
    this.storage.get('location').then(value => console.log(value));
    this.viewCtrl.dismiss();
  }

  initPois(lat: number, lng: number) {
    let getUrl: string = "https://api.map.baidu.com/geocoder/v2/?location=" + lat + "," + lng + "&output=json&pois=1&ak=f8vW5GLQR7CaKA52XsxGXpR0";
    this.http.get(getUrl)
      .map(r => {
        // console.log(r);
        return r.json();
      })
      .subscribe(res => {
        // console.log(res);
        if (res.status == 0) {
          this.geoTitle = res.result.formatted_address;

          this.poisList = res.result.pois;
        }

      }, error => {
        console.log(error);
      });
  }

  ionViewDidLoad() {
    console.log('get location')
    this.storage.get('location').then(value => {
      if (value) {
        console.log(value);
        this._geo = value;
      }
      else {
        this.geolocation.getCurrentPosition().then((resp) => {
          if (resp.coords) {
            this._geo.lat = resp.coords.latitude;
            this._geo.lng = resp.coords.longitude;
            this._geo.poisTitle = "请选择下方位置"
          }

        }).catch((error) => {
          console.log('Error getting location', error);
        });
      }

      this.initPois(this._geo.lat, this._geo.lng);
      let map = this.map = new BMap.Map(this.mapElement.nativeElement, { enableMapClick: true });//创建地图实例
      map.enableScrollWheelZoom();//启动滚轮放大缩小，默认禁用
      map.enableContinuousZoom();//连续缩放效果，默认禁用
      let point = new BMap.Point(this._geo.lng, this._geo.lat);//坐标可以通过百度地图坐标拾取器获取
      map.centerAndZoom(point, 16);//设置中心和地图显示级别

      //var marker = new BMap.Marker(point);// 创建标注

      var marker = new BMap.Marker(new BMap.Point(point.lng, point.lat - 0.03), {
        // 指定Marker的icon属性为Symbol
        icon: new BMap.Symbol(BMap_Symbol_SHAPE_POINT, {
          scale: 1,//图标缩放大小
          fillColor: "#F34D92",//填充颜色
          fillOpacity: .8//填充透明度
        })
      });
      map.addOverlay(marker);             // 将标注添加到地图中 
      marker.setPosition(map.getCenter());


      map.addEventListener('ondragging', () => {
      });

      map.addEventListener("dragend", (e) => {
        marker.setPosition(map.getCenter());
        this.centerPoint = e.point;
        this._geo.lat = e.point.lat;
        this._geo.lng = e.point.lng;
        this.getPois(e.point.lng, e.point.lat)
      });
    });


  }

  getPois(lat: number, lng: number) {
    this.initPois(lng, lat);
  }
}