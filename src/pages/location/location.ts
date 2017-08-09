import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';

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

  poisList: any;
  map: any;
  centerPoint: any;
  constructor(public navCtrl: NavController,
    private http: Http,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private geolocation: Geolocation
  ) {
  }

  ionViewWillEnter() {

  }

  //关闭窗口传值
  dismiss(p) {
    this.geoTitle = p.name;
    let data = { pois: p, centerPoint: this.centerPoint };
    this.viewCtrl.dismiss(data);
  }

  initPois(lng: number, lat: number) {
    let getUrl: string = "http://api.map.baidu.com/geocoder/v2/?location=" + lat + "," + lng + "&output=json&pois=1&ak=f8vW5GLQR7CaKA52XsxGXpR0";
    this.http.get(getUrl)
      .map(r => {
        console.log(r);
        return r.json();
      }
      )
      .subscribe(res => {
        console.log(res);
        if (res.status == 0) {
          this.geoTitle = res.result.formatted_address;

          this.poisList = res.result.pois;
        }

      }, error => {
        console.log(error);
      });
  }


  ionViewDidLoad() {
    let _geo = {lat:30.905481,lng:120.658958};
    this.geolocation.getCurrentPosition().then((resp) => {
      if(resp.coords)
        {
        _geo.lat = resp.coords.latitude;
        _geo.lng = resp.coords.longitude;
        }
    }).catch((error) => {
      console.log('Error getting location', error);
    });


    this.initPois(_geo.lat,_geo.lng);
    console.log('ionViewDidLoad LocationPage');
    let map = this.map = new BMap.Map(this.mapElement.nativeElement, { enableMapClick: true });//创建地图实例
    map.enableScrollWheelZoom();//启动滚轮放大缩小，默认禁用
    map.enableContinuousZoom();//连续缩放效果，默认禁用
    let point = new BMap.Point(120.658958, 30.905481);//坐标可以通过百度地图坐标拾取器获取
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


    map.addEventListener('ondragging', () => {
    });

    map.addEventListener("dragend", (e) => {
      marker.setPosition(map.getCenter());
      this.centerPoint = e.point;
      this.getPois(e.point.lng, e.point.lat)
    });
  }

  getPois(lat: number,lng: number) {
    this.initPois(lng, lat);
  }
}