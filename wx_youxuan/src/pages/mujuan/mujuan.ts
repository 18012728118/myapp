import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, IonicPage } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import 'rxjs/add/operator/map'
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { InitDataProvider, Api } from '../../providers/providers';
import { HttpClient } from '@angular/common/http';

import { ApiUrl_V1, ApiUrl } from '../../providers/api/api';

declare var WeixinJSBridge: any;
declare var wx: any;

@IonicPage(
  {
    segment: 'mujuan/:DetailId',
    defaultHistory: ["TabsPage"]
  }
)
@Component({
  selector: 'page-mujuan',
  templateUrl: 'mujuan.html',
})
export class MuJuanPage {

  _count = 10;
  _buyItem: any = { LogoList: [""], Name: '', VipPrice: 0, Price: 0, Count: 0 };
  loading: any;
  alert: any;
  _payList: any;
  _total = 0;
  _totalNum = 0;
  _id: number;
  _skip = 0;

  moneyList = [10, 20, 30, 50, 100, 200, 500, 1000];

  ionViewDidLoad() {
    this.api.visitLog({ page: 'MuJuanPage', iid: this._id })
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastContrl: ToastController,
    private initData: InitDataProvider,
    private api: Api
  ) {
    this._id = navParams.get('DetailId');
    if (this._id == undefined) {
      this._buyItem = navParams.get('data');
      this._id = this._buyItem.Id;
    }
    this.loading = this.loadingCtrl.create({
      content: '加载中...'
    });
    this.loading.present();

    this.http.get<any>(ApiUrl + "getDetail?itemid=" + this._id)
      .subscribe(res => {
        this._buyItem = res;
        this.loading.dismiss();
        wx.ready(() => {
          this.initShare();
        });
        this.initShare();
      });
    this.http.get<any>(ApiUrl + "GetMuJuanOrder?buyItemId=" + this._id)
      .subscribe(res => {
        this._total = res.total;
        this._payList = res.list;
        this._totalNum = res.totalNum;
        console.log(this._payList);
      });
  }

  goOrder() {
    this.navCtrl.push("OrderPage");
  }
  //更多名单 
  seeMore() {
    if (this._skip + 20 < this._total) {
      this._skip += 20;
    }
    this.http.get<any>(ApiUrl + "GetMuJuanOrder?buyItemId=" + this._id + "&skip=" + this._skip)
      .subscribe(res => {
        this._total = res.total;
        this._totalNum = res.totalNum;
        res.list.forEach(element => {
          this._payList.push(element);
        });
      });
  }

  setCount(v) {
    this._count = v;
  }
  getClass(v) {
    if (v == this._count)
      return "primary";
    else
      return "light";
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
    if (this.initData.WxUser) {
      let wxData = {
        title: this._buyItem.Name,
        desc: this._buyItem.ShareDesc,
        imgUrl: this._buyItem.LogoList[0] + "!w100",
        link: `http://m.wjhaomama.com/?sid=6&sfrom=${this.initData.WxUser.openid}&page=MuJuanPage&iid=${this._buyItem.Id}`
      }
      this.api.wxshare(wxData.title, wxData.desc, wxData.link, wxData.imgUrl);
    }
  }

  toPay() {
    this.alert = this.alertCtrl.create({
      title: "正在转至微信支付",
      inputs: [
        {
          name: 'realname',
          placeholder: '称呼（公开显示）'
        },
        {
          name: 'telphone',
          placeholder: '手机号（隐藏公示）'
        }
      ],
      subTitle: this._buyItem.SuccessText,
      buttons: [{
        text: '微信支付',
        handler: (data) => {
          if (!/^1(3|4|5|6|7|8|9)[0-9]\d{8}$/i.test(data.telphone)) {
            this.api.showToast("请正确填写手机号", 2000, 'middle');
            return false;
          }
          //2~5个汉字
          if (!/^.{1,20}$/i.test(data.realname)) {
            this.api.showToast("请正确填写称呼，至少一个字符", 2000, 'middle');
            return false;
          }
          this.http.get<any>("http://m.wjhaomama.com/TenPayV3/getpay?itemid=" + this._buyItem.Id + "&count=" + this._count
            + "&realname=" + data.realname + "&telphone=" + data.telphone + "&openid=" + this.initData.WxUser.openid
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
                      subTitle: "谢谢您的无私奉献",
                      buttons: [{
                        text: 'Ok',
                        handler: () => {
                          this._payList.unshift({ RealName: data.realname, TelPhone: data.telphone, count: this._count });
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
