import { Pipe, PipeTransform } from '@angular/core';
@Pipe(
    {
        name:'cartfilter'
    }
)
export class CartFilterPipe implements PipeTransform{

    transform(items: any[], filter: object): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter(item =>
                item.count > 0 );
    }
}