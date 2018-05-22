import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/app.state';

import * as CacheActions from "../../store/actions/cache.action";
import { Api } from '../../providers/api/api';
import { AppService } from '../../services/appService';
import { Observable } from 'rxjs/Observable';
import { getSubjectList } from '../../store/state/cache.State';

@IonicPage()
@Component({
  selector: 'page-subject-list',
  templateUrl: 'subject-list.html',
})
export class SubjectListPage {

  subjectList$: Observable<any>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store: Store<AppState>) {
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter() {
    this.store.dispatch(new CacheActions.LoadSubjectList());
    this.subjectList$ = this.store.select(getSubjectList);
  }
  goSubject(s) {
    this.navCtrl.push("SubjectPage", { DetailId: s.Id });
  }
}
