import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './safe-html/safe-html';
import { CheckStatePipe } from './check-state/check-state';
import { MomentPipe } from './moment/moment';
import { FromNowPipe } from './from-now/from-now';
import { FilterPipe } from './filter/filter';
import { OrderByPipe } from './order-by/order-by';
@NgModule({
	declarations: [SafeHtmlPipe,
    CheckStatePipe,
    MomentPipe,
    FromNowPipe,
    FilterPipe,
    OrderByPipe],
	imports: [],
	exports: [SafeHtmlPipe,
    CheckStatePipe,
    MomentPipe,
    FromNowPipe,
    FilterPipe,
    OrderByPipe]
})
export class PipesModule {}
