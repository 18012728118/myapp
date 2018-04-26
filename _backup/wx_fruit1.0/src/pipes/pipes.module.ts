import { NgModule } from '@angular/core';
import { OrderByPipe } from './order-by';
import { FilterPipe } from './filter/filter';
import { CartFilterPipe } from './cart-pipe';

@NgModule({
	declarations: [OrderByPipe,CartFilterPipe,
		FilterPipe],
	imports: [],
	exports: [OrderByPipe,CartFilterPipe,
		FilterPipe]
})
export class PipesModule { }
