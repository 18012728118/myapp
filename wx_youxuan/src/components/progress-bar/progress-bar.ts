import { Component, Input } from '@angular/core';

/**
 * Generated class for the ProgressBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent {
  @Input('cut') cut;
  @Input('total') total;

  constructor() {
  }
  ngOnInit() {
  }

  get progress(): number {
    if (this.cut > this.total)
      this.cut = this.total;
    return (this.total - this.cut) / this.total * 100
  }

  get text(): String {
    if (this.cut > this.total)
      this.cut = this.total;
    if (this.cut != this.total)
      return (this.total - this.cut) + "/" + this.total;
    else
      return '已最低'
  }
}
