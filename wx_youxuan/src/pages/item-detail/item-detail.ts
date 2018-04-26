import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController, App, AlertController } from 'ionic-angular';
import { InitDataProvider, Api } from '../../providers/providers';
import { TabsPage } from '../tabs/tabs';
import { HttpClient } from '@angular/common/http';
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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private initData: InitDataProvider,
    private http: HttpClient,
    private api: Api
  ) {
    this._id = navParams.get("DetailId");
    this.api.httpGet("getDetail?itemid=" + this._id).subscribe(res => {
      this._buyItem = res;
      this.initShare();
    });
    console.log("Detail Got Id " + this._id);

  }

  back() {
    this.navCtrl.pop();
  }

  add() {
    this._count += 1;
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
  toPay() {
    this.alert = this.alertCtrl.create({
      title: "正在转至微信支付",
      // inputs: [
      //   {
      //     name: 'realname',
      //     placeholder: '姓名'
      //   },
      //   {
      //     name: 'telphone',
      //     placeholder: '手机号'
      //   }
      // ],
      subTitle: "付款成功后。请至 我的订单 查看已购买商品 二维码 到商家验证消费. "
        + this._buyItem.SuccessText,
      buttons: [{
        text: '微信支付',
        handler: (data) => {
          // if (!/^1(3|4|5|7|8)[0-9]\d{8}$/i.test(data.telphone)) {
          //   this.showToast("请正确填写手机号",2000,'middle');
          //   return false;
          // }
          // //2~5个汉字
          // if (!/^[\u4E00-\u9FA5]{2,5}$/i.test(data.realname)) {
          //   this.showToast("请正确填写姓名",2000,'middle');
          //   return false;
          // }
          this.http.get<any>("http://m.wjhaomama.com/TenPayV3/getpay?itemid=" + this._buyItem.Id + "&count=" + this._count + "&openid=" + this.initData.WxUser.openid
            //  + "&realname=" + data.realname + "&telphone=" + data.telphone
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

