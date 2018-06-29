import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  {
    segment: "Test",
    defaultHistory: ["TabsPage"]
  }
)
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  now: any;
  test$: Observable<any>;
  test: any;
  left: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private api: Api) {
    this.test$ = this.api.httpGet("TestTime");
    this.test$.subscribe(res => {
      console.log(res);
      this.test = new Date(res);
      this.now = new Date();
      this.left = JSON.stringify( this.getRemainTime(res));
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
  }
  getRemainTime = (endTime) => {
    let t = Date.parse(new Date(endTime).toUTCString()) - Date.parse(new Date().toUTCString())
    if (t < 0)
      return null;
    let seconds = Math.floor((t / 1000) % 60)
    let minutes = Math.floor((t / 1000 / 60) % 60)
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24)
    let days = Math.floor(t / (1000 * 60 * 60 * 24))
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    }
  }
}
