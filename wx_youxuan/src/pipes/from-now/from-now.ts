import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";
/**
 * Generated class for the FromNowPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'fromNow',
})
export class FromNowPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value, format = "end") {
    if (format === "end")
      return moment(value).locale('zh-cn').endOf('minute').fromNow();
    else
      return moment(value).locale('zh-cn').startOf('minute').fromNow();

  }
}
