import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController } from 'ionic-angular';

import {AppService,ApiUrl} from '../../app/app.service';
import { HttpService } from '../../providers/HttpService'
import 'rxjs/add/operator/filter'

@IonicPage()
@Component({
  selector: 'page-order-list',
  templateUrl: 'order-list.html',
})
export class OrderListPage {

  orders :any;
  pet:string = '未完成';
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private viewCtrl :ViewController,
    private appService :AppService,
    private authHttp:HttpService
    
  ) {
    this.getOrder();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderListPage');
  }


  getOrder()
  {
    this.appService.ShowLoading();
    this.authHttp.httpPostWithAuth("", ApiUrl + "GetOrders", this.appService._wxUser.unionid)
    .then(res => {
      if(res.success)
      {
        console.log(res.data);
        this.orders = res.data;
        this.appService.LoadingDismiss();
      }
    });
  }

  //关闭
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
