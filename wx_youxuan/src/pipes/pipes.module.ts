import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './safe-html/safe-html';
import { CheckStatePipe } from './check-state/check-state';
import { MomentPipe } from './moment/moment';
import { FromNowPipe } from './from-now/from-now';
@NgModule({
	declarations: [SafeHtmlPipe,
    CheckStatePipe,
    MomentPipe,
    FromNowPipe],
	imports: [],
	exports: [SafeHtmlPipe,
    CheckStatePipe,
    MomentPipe,
    FromNowPipe]
})
export class PipesModule {}
