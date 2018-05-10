import { Component, Input } from '@angular/core';

/**
 * Generated class for the ShopCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'shop-card',
  templateUrl: 'shop-card.html'
})
export class ShopCardComponent {
  @Input("shop") shop;

  constructor() {
  }

}
