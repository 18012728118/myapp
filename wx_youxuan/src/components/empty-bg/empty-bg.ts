import { Component } from '@angular/core';

/**
 * Generated class for the EmptyBgComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'empty-bg',
  templateUrl: 'empty-bg.html'
})
export class EmptyBgComponent {

  text: string;

  constructor() {
    console.log('Hello EmptyBgComponent Component');
    this.text = 'Hello World';
  }

}
