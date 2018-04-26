import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the CheckStatePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'checkState',
})
export class CheckStatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], state: string) {
    if (!state) return items;
    if (!items || !items.length) return [];
    return items.filter(it => {
      switch (state) {
        case "Normal":
          if (it.Count > 0 && new Date(it.DateTimeStart) <= new Date() && new Date(it.DateTimeEnd) >= new Date()) {
            return true;
          }
          return false;
        case "WillStart":
          if (it.Count > 0 && new Date(it.DateTimeStart) >= new Date()) {
            return true;
          }
          return false;
        case "Exprie":
          if (it.Count <= 0 || new Date(it.DateTimeEnd) <= new Date()) {
            return true;
          }
          return false;
        default:
          return false;
      }
    })
  }
}
