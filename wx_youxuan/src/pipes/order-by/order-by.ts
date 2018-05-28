import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from "lodash"
//declare var _: any;
/**
 * Generated class for the OrderByPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform = orderBy;
}
