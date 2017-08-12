import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

/**
 * Generated class for the StudyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
import * as _ from 'lodash';

@Component({
  selector: 'page-study',
  templateUrl: 'study.html',
})
export class StudyPage {

  @ViewChild(Content) content: Content

  count: number = 0;
  answer: string = "";
  type: number = 2;
  x: number;
  y: number;
  times: string = "";
  starttime: Date;
  public id  : number;
  constructor(public navCtrl: NavController
    , public navParams: NavParams,
  ) {
    this.starttime = new Date()
    this. id = navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudyPage');
    console.log(this.content.contentHeight)
    this.reset();

  }

  c(value: string) {
    if (value != "-1")
      this.answer += value;
    else {
      this.answer = this.answer.substr(0, this.answer.length - 1)
    }

    let _an;
    if (this.type <= 4) {
      _an = this.x + this.y;
    } else {
      _an = this.x - this.y;
    }
    if (parseInt(this.answer) === (_an)) {
      this.count += 1;
      setTimeout(() => {
        this.reset();

      }, 200)
      //$("#question").hide().fadeIn(500);
      //swal("正确!", " 好样的,开始下一题!", "success");
    }


  }
  reset() {
    if (this.type === 2) {
      this.x = _.random(1, 9);
      this.y = _.random(1, 9);
    } else if (this.type === 1) {
      this.x = _.random(1, 9);
      this.y = _.random(1, 10 - this.x);
    } else if (this.type === 3) {
      this.x = _.random(1, 99);
      this.y = _.random(1, 100 - this.x);
    } else if (this.type === 4) {
      this.x = _.random(1, 99);
      this.y = _.random(1, 99);
    } else if (this.type === 5) {
      this.x = _.random(1, 9);
      this.y = _.random(1, this.x - 1);
    }
    if (this.count === undefined) {
      this.count = 0;
    }
    this.answer = "";

  }
}
