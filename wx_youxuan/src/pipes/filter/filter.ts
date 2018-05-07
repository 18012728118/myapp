import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], field: string, value: string) {
    if (!items) return [];
    return items.filter(z => z[field] == value);
  }

}
