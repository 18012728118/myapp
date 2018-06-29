import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/app.state';
import { Observable } from 'rxjs/Observable';
import { CacheState, getPartner } from '../../store/state/cache.State';
import { ModalService } from '../../services/modalService';

/**
 * Generated class for the PartnerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'Partner',
  defaultHistory: ["TabsPage"]
})
@Component({
  selector: 'page-partner',
  templateUrl: 'partner.html',
})
export class PartnerPage {
  cache$: Observable<CacheState>;
  myForm: FormGroup;
  alert: any;
  partner: any;
  partner$: Observable<any>;
  list$: Observable<any>;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private modalService: ModalService,
    private api: Api,
    private store: Store<AppState>) {

    this.cache$ = this.store.select(z => z.cache);
    this.partner$ = this.store.select(getPartner)
    this.partner$.subscribe(res => {
      console.log("partner$ subscribe")
      this.partner = res;
      this.list$ = this.api.httpGet("GetBonusList");
    });
    this.myForm = this.formBuilder.group({
      'Realname': ['', [Validators.required, Validators.minLength(2)]],
      'Phone': ['', Validators.required],
      'Introducting': ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    this.api.visitLog({ page: "PartnerPage" });
  }

  selctIdx = 0
  haibaoImg = "";
  _buyItem: any;
  haibao(item, index = 0) {
    console.log(item, index);
    this._buyItem = item;
    this.selctIdx = index;
    this.haibaoImg = `http://m.wjhaomama.com/home/pHaibao?buyitemid=${item.Id}&openid=${this.partner.openid}&index=${index}&sid=${window['storeId']}&pid=${this.partner.Id}`
    this.modalService.open("modalHaibao");
  }
  goDetail(item) {
    console.log(item);
    this.navCtrl.push(this.api.getPageByType(item.Type), { DetailId: item.Id });
  }
  onSubmit() {
    if (this.myForm.valid) {
      console.log('valid! then post');
      this.api.httpPost("PartnerPost", { data: this.partner }).subscribe((res: any) => {
        if (res.success) {
          this.alert = this.alertCtrl.create({
            title: "提交成功",
            subTitle: '您的申请已提交,我们会尽快进行审核!',
            buttons: [{
              text: 'Ok',
              handler: (data) => {
                this.navCtrl.pop();
              }
            }]
          });
          this.alert.present();
        }
      })
    }
    else {
      this.api.showToast("表单内容验证失败!", 2000, 'top');
    }
  }

}
