import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController, App, AlertController } from 'ionic-angular';
import { InitDataProvider, Api } from '../../providers/providers';
import { TabsPage } from '../tabs/tabs';
import { HttpClient } from '@angular/common/http';
import { ModalService } from '../../services/modalService';
import { AppService } from '../../services/appService';
/**
 * Generated class for the ItemDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var WeixinJSBridge: any;
declare var wx: any;

@IonicPage({
  segment: "Detail/:DetailId",
  defaultHistory: ["TabsPage"]
})
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage {

  _id: number;
  _buyItem: any;
  loading: any;
  _count: number = 1;
  alert: any;
  payUserinfo = { name: "", telphone: "" };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private initData: InitDataProvider,
    private http: HttpClient,
    private api: Api,
    private modalService: ModalService
  ) {
    this._id = navParams.get("DetailId");
    this.api.httpGet("getDetail?itemid=" + this._id).subscribe(res => {
      this._buyItem = res;
      setTimeout(() => {
        this.initShare();
      }, 1000);
    });
  }


  ionViewDidLoad() {
    this.api.visitLog({ page: 'ItemDetailPage', iid: this._id })
  }

  haibao(index = 0) {
    console.log(this._buyItem, index);
    this.selctIdx = index;
    let item = this._buyItem;
    this.haibaoImg = `http://m.wjhaomama.com/home/haibao?buyitemid=${item.Id}&openid=${this.initData.WxUser.openid}&index=${index}`
    this.modalService.open("modalHaibao");
  }
  selctIdx = 0;
  haibaoImg: string = "";

  goShop(shop) {
    this.navCtrl.push("ShopPage", { iid: shop.Id, shop: shop });
  }

  goOrder() {
    this.navCtrl.push("OrderPage");
  }


  ionViewWillLeave() {
    this.initData.initDefaultShare();
  }
  guanzhu() {
    this.modalService.open('modalMain');
  }

  back() {
    this.navCtrl.pop();
  }

  add() {
    if (this._count < this._buyItem.LimitBuyCount) {
      this._count += 1;
    }
  }
  remove() {
    this._count -= 1;
  }


  initShare() {
    if (this.initData.WxUser.openid) {
      let wxData = {
        title: this._buyItem.Name,
        desc: '吴江优选',
        // imgUrl: "http://m.wjhaomama.com/img/logo.png",
        imgUrl: this._buyItem.LogoList[0] + "!w100",
        link: `http://m.wjhaomama.com/?sid=6&sfrom=${this.initData.WxUser.openid}&page=ItemDetailPage&iid=${this._buyItem.Id}`
      }
      this.api.wxshare(wxData.title, wxData.desc, wxData.link, wxData.imgUrl);
    }
  }

  get state(): number {
    if (new Date(this._buyItem.DateTimeStart) > new Date())
      return 0;
    if (new Date(this._buyItem.DateTimeStart) < new Date() && new Date() < new Date(this._buyItem.DateTimeEnd))
      return 1;
    if (new Date() > new Date(this._buyItem.DateTimeEnd))
      return -1;
  }

  toPay() {
    this.payUserinfo = { name: this.initData.WxUser.RealName, telphone: this.initData.WxUser.Telphone }

    if (new Date(this._buyItem.DateTimeStart) > new Date()) {
      this.api.showToast("活动还没有开始");
      return;
    }

    this.alert = this.alertCtrl.create({
      title: "正在转至微信支付",
      inputs: [
        {
          name: 'realname',
          placeholder: '联系人',
          value: this.payUserinfo.name
        },
        {
          name: 'telphone',
          placeholder: '手机号',
          value: this.payUserinfo.telphone
        }
      ],
      subTitle: "付款成功后。请至 我的订单 查看已购买商品 二维码 到商家验证消费. "
        + this._buyItem.SuccessText,
      buttons: [{
        text: '微信支付',
        handler: (data) => {
          if (!/^1(3|4|5|6|7|8|9)[0-9]\d{8}$/i.test(data.telphone)) {
            this.api.showToast("请正确填写手机号", 2000, 'top');
            return false;
          }
          if (!/^.{1,20}$/i.test(data.realname)) {
            this.api.showToast("请正确填写联系人", 2000, 'top');
            return false;
          }
          this.http.get<any>(`http://m.wjhaomama.com/TenPayV3/getpay?itemid=${this._buyItem.Id}&count=${this._count}&realname=${data.realname}&telphone=${data.telphone}`
          )
            .subscribe(res => {
              WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                  "appId": res.appId,
                  "timeStamp": res.timeStamp,
                  "nonceStr": res.nonceStr,
                  "package": res.package,
                  "signType": res.signType,
                  "paySign": res.paySign
                },
                (res) => {
                  if (res.err_msg == "get_brand_wcpay_request:ok") {
                    let successAlert = this.alertCtrl.create({
                      title: "支付成功",
                      subTitle: "请尽快至门店验证消费",
                      buttons: [{
                        text: 'Ok',
                        handler: () => {
                        }
                      }]
                    });
                    successAlert.present();
                  }
                }
              )
            });
        }
      }]
    });
    this.alert.present();
  }
}

