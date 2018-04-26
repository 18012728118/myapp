import { NgModule } from '@angular/core';
import { OrderByPipe } from './order-by';
import { FilterPipe } from './filter/filter';
import { CartFilterPipe } from './cart-pipe';
import { SearchPipe } from './search/search';

@NgModule({
	declarations: [OrderByPipe,CartFilterPipe,
		FilterPipe,
    SearchPipe],
	imports: [],
	exports: [OrderByPipe,CartFilterPipe,
		FilterPipe,
    SearchPipe]
})
export class PipesModule { }
