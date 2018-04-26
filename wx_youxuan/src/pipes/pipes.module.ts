import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './safe-html/safe-html';
import { CheckStatePipe } from './check-state/check-state';
@NgModule({
	declarations: [SafeHtmlPipe,
    CheckStatePipe],
	imports: [],
	exports: [SafeHtmlPipe,
    CheckStatePipe]
})
export class PipesModule {}
