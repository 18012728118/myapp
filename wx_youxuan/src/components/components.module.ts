import { NgModule } from '@angular/core';
import { HelperComponent } from './helper/helper';
import { IonicModule, IonicApp } from 'ionic-angular';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { ModalComponent } from './modal/modal';
@NgModule({
	declarations: [HelperComponent,
    ProgressBarComponent,
    ModalComponent],
	imports: [IonicModule],
	exports: [HelperComponent,
    ProgressBarComponent,
    ModalComponent],
	bootstrap: [IonicApp]
})
export class ComponentsModule { }
