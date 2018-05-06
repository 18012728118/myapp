import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ViewController, LoadingController } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { InitDataProvider } from '../../providers/providers';
import { ModalService } from '../../services/modalService';

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  orderList: any;
  loading: any;
  qrUrl: string = "";
  modalData: any;
  now: Date = new Date();

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController,
    private api: Api,
    private initData: InitDataProvider,
    private loadingCtrl: LoadingController,
    private modalService: ModalService,

  ) {
    // this.modalService.open("modalCut");
  }

  doDate(data) { return new Date(data); }

  ionViewDidEnter() {
    this.orderList = null;
    this.loading = this.loadingCtrl.create({
      content: '加载中...'
    });
    this.loading.present();
    setTimeout(() => {
      this.api.getWithAuth("GetOrder")
        .then(res => {
          this.orderList = res;
          this.loading.dismiss();
        })
    }, 300);
  }

  ionViewDidLoad() {
    console.log("CAT PAGE ionViewDidLoad!!")
  }
  showQR(x) {
    this.qrUrl = `http://m.wjhaomama.com/home/qr?str=${x.openid}!${x.sp_billno}`;
    this.modalData = x;
    console.log(JSON.stringify(x));
    this.modalService.open("modalQR");
  }
}
