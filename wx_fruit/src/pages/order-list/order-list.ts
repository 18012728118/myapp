import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { ApiUrl } from '../../app/app.service';
import { HttpService } from '../../providers/HttpService'
import 'rxjs/add/operator/filter'
import { UiProvider } from '../../providers/ui/ui';

@IonicPage({
  defaultHistory: ["HomePage"]
})
@Component({
  selector: 'page-order-list',
  templateUrl: 'order-list.html',
})
export class OrderListPage {

  orders: any;
  pet: string = '未完成';
  constructor(public navCtrl: NavController,
    private http: HttpService,
    private UI: UiProvider

  ) {
    this.getOrder();
  }

  ionViewDidLoad() {
  }

  getOrder() {
    this.UI.ShowLoading();
    this.http.httpPost(ApiUrl + "GetOrders", "")
      .then(res => {
        if (res.success) {
          this.orders = res.data;
          this.UI.LoadingDismiss();
        }
      });
  }

  //关闭
  dismiss() {
    this.navCtrl.pop();
    //this.viewCtrl.dismiss();
  }

}
