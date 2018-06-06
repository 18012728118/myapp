import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ViewController, LoadingController, ModalController } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { InitDataProvider } from '../../providers/providers';
import { ModalService } from '../../services/modalService';
import { AppService } from '../../services/appService';

@IonicPage({
  segment: "Order",
  defaultHistory: ["TabsPage"]
})
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  orderList: any;
  qrUrl: string = "";
  modalData: any;
  now: Date = new Date();

  constructor(
    private modalCtrl: ModalController,
    private viewCtrl: ViewController,
    private api: Api,
    private initData: InitDataProvider,
    private loadingCtrl: LoadingController,
    private modalService: ModalService,
    private appService: AppService

  ) {
    this.appService.visitLog({ page: "OrderPage" });
  }

  doDate(data) { return new Date(data); }

  ionViewDidEnter() {
    this.api.getWithAuth("GetOrder")
      .then(res => {
        this.orderList = res;
      })
  }

  PageType = {
    1: { page: 'ItemDetailPage' },
    3: { page: 'KanjiaPage' },
    11: { page: 'MuJuanPage' }
  };

  goDetail(x) {
    this.api.httpGet("getDetail?itemid=" + x.BuyItemId).subscribe((res: any) => {
      let modal = this.modalCtrl.create(this.PageType[res.Type].page, { DetailId: res.Id });
      modal.present();
    });
  }

  ionViewDidLoad() {
  }

  showQR(x) {
    let str = `${x.openid}!${x.sp_billno}`;
    this.qrUrl = `http://m.wjhaomama.com/home/qr?type=payOrder&sid=${window['storeId']}&str=${encodeURIComponent(str)}`;
    this.modalData = x;
    console.log(JSON.stringify(x));
    this.modalService.open("modalQR");
  }
}
