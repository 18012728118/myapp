import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ModalService } from '../../services/modalService';
import { InitDataProvider, Api } from '../../providers/providers';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/app.state';
import { getWxUser } from '../../store/state/cache.State';
import { AppService } from '../../services/appService';

import * as CacheActions from '../../store/actions/cache.action';

/**
 * Generated class for the FreeItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: "FreeDetail/:DetailId",
  defaultHistory: ["TabsPage"]
})
@Component({
  selector: 'page-free-item',
  templateUrl: 'free-item.html',
})
export class FreeItemPage {
  _id: number;
  _buyItem: any;
  reg: any = { Telphone: "18012728118", Code: "" };
  wxUser$: Observable<any>;
  wxUser: any;
  timer: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService,
    private alertCtrl: AlertController,
    private initData: InitDataProvider,
    private api: Api,
    private modalService: ModalService,
    private store: Store<AppState>) {
    this._id = navParams.get("DetailId");


    console.log(this._id)
    this.api.httpGet("getDetail?itemid=" + this._id).subscribe(res => {
      console.log(res)
      this._buyItem = res;
      setTimeout(() => {
        this.initShare();
      }, 1000);
    });

    this.wxUser$ = this.store.select(getWxUser)
    this.wxUser$.subscribe(res => {
      this.wxUser = res;
    })
  }

  ionViewDidLoad() {
  }

  get state(): number {
    if (new Date(this._buyItem.DateTimeStart) > new Date())
      return 0;
    if (new Date(this._buyItem.DateTimeStart) < new Date() && new Date() < new Date(this._buyItem.DateTimeEnd))
      return 1;
    if (new Date() > new Date(this._buyItem.DateTimeEnd))
      return -1;
  }

  freeGet() {
    console.log("免费领取");
    if (!this.wxUser.IsValid) {
      this.modalService.open('modalMain');
    }
    else {
      this.api.showToast("参与成功,请至订单页查看核销二维码!");
    }
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

  verifyTel() {
    // console.log(!/^\d{11}$/.test(this.reg.Telphone));
    let v = !/^1\d{10}$/.test(this.reg.Telphone) || this.appService._time > 0;
    // console.log(v)
    return v;
  }


  checkCode() {
    if (!/^1\d{10}$/i.test(this.reg.Telphone)) {
      this.api.showToast("手机号码错误", 2000, "bottom");
      return;
    }
    if (!/^\d{6}$/i.test(this.reg.Code)) {
      this.api.showToast("验证码为六位数字", 2000, "bottom");
      return;
    }
    this.api.httpPost("CheckCode", { data: this.reg })
      .subscribe((res: any) => {
        console.log(res);
        if (res.success) {
          this.api.showToast("验证成功", 2000, "bottom");
          this.store.dispatch(new CacheActions.SetUserTelValid());
        }
        else {
          this.api.showToast(res.msg, 2000, "bottom");
        }
      });
  }



  sendCode() {
    if (!/^1\d{10}$/i.test(this.reg.Telphone)) {
      this.api.showToast("手机号码错误", 2000, "top");
      return;
    }
    this.api.httpGet('getCode?tel=' + this.reg.Telphone).subscribe((res: any) => {
      if (res.success) {
        this.api.showToast("发送成功", 2000, "top");
        this.appService._time = 60;
        this.interval();
      }
      else {
        this.api.showToast("error" + res.msg, 2000, "middle");
      }
    })
  }

  interval() {
    console.log("_time:" + this.appService._time);
    this.timer = setInterval(() => {
      if (this.appService._time > 0) {
        this.appService._sendCodeBtnText = this.appService._time + '秒后重试';
        this.appService._time -= 1;
      }
      else {
        this.appService._sendCodeBtnText = "发送验证码";
        this.appService._time = 0;
        clearInterval(this.timer)
      }
      console.log(this.appService._time);
    }, 1000);
  }


  goShop(shop) {
    this.navCtrl.push("ShopPage", { iid: shop.Id, shop: shop });
  }

  goOrder() {
    this.navCtrl.push("OrderPage");
  }


  back() {
    this.navCtrl.pop();
  }
}
