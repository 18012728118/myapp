import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController } from 'ionic-angular';

/**
 * Generated class for the QglistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-qglist',
  templateUrl: 'qglist.html',
})
export class QglistPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl :ViewController
  
  
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QglistPage');
  }

  back()
  {
    this.viewCtrl.dismiss();
  }

}
