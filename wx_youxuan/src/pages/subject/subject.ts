import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/app.state';

import * as CacheActions from "../../store/actions/cache.action";
import { Api } from '../../providers/api/api';
import { Observable } from 'rxjs/Observable';
import { getSubject } from '../../store/state/cache.State';
import { InitDataProvider } from '../../providers/providers';

@IonicPage({
  segment: "Subject/:DetailId",
  defaultHistory: ["TabsPage"]
})
@Component({
  selector: 'page-subject',
  templateUrl: 'subject.html',
})
export class SubjectPage {

  subject$: Observable<any>;
  subject: any = {};
  _id: number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store: Store<AppState>,
    private initData: InitDataProvider,
    private api: Api
  ) {
    this._id = this.navParams.get("DetailId");
    this.store.dispatch(new CacheActions.LoadSubject(this._id));
    this.subject$ = this.store.select(getSubject);
  }

  ionViewDidLoad() {
    this.api.visitLog({ page: "SubjectPage", iid: this._id });
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.initShare();
    }, 1000);
    this.subject$.subscribe(res => {
      if (res)
        this.subject = res
    });

  }

  ionViewWillLeave() {
    this.initData.initDefaultShare();
  }

  initShare() {
    if (this.initData.WxUser.openid && this.subject && this.subject.subject) {
      let s = this.subject.subject;
      let wxData = {
        title: s.Title,
        desc: s.Desc ? s.Desc.replace(/<[^>]*>/g, '') : '',
        // imgUrl: "http://m.wjhaomama.com/img/logo.png",
        imgUrl: s.Param.TopBarImgUrl + "!w100h100",
        link: `http://m.wjhaomama.com/?sid=${window["storeId"]}&sfrom=${this.initData.WxUser.openid}&page=SubjectPage&iid=${s.Id}`
      }
      this.api.wxshare(wxData.title, wxData.desc, wxData.link, wxData.imgUrl);
    }
  }

}
