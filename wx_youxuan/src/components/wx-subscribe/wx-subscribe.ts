import { Component, Input } from '@angular/core';

/**
 * Generated class for the WxSubscribeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'wx-subscribe',
  templateUrl: 'wx-subscribe.html'
})
export class WxSubscribeComponent {

  @Input("store") store: any;
  @Input("needSubscribe") needSubscribe: boolean = false;
  constructor() {
    console.log(this.store);
  }

}
