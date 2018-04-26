import { Component, ViewChild, ElementRef } from '@angular/core';
/**
 * Generated class for the HelperComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'helper',
  templateUrl: 'helper.html'
})
export class HelperComponent {
  @ViewChild("ref", { read: ElementRef }) private ref: ElementRef
  text: string;

  constructor() {
    this.text = 'Hello World';
  }

  async btnclick() {
    await console.log(this.ref.nativeElement);
    this.ref.nativeElement.style.color = "black";
  }
}
