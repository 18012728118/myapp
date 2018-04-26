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
  progress: number;
  text: string;
  @Input('cut') Cut;
  @Input('total') Total;
  constructor() {

  }
  ngOnInit() {
    this.progress = (this.Total - this.Cut) / this.Total * 100
    if (this.Cut != this.Total)
      this.text = (this.Total - this.Cut) + "/" + this.Total;
      else
      this.text = '已最低'
  }

}
