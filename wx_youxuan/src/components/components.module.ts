import { NgModule } from '@angular/core';
import { HelperComponent } from './helper/helper';
import { IonicModule, IonicApp } from 'ionic-angular';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { ModalComponent } from './modal/modal';
import { EmptyBgComponent } from './empty-bg/empty-bg';
@NgModule({
	declarations: [HelperComponent,
    ProgressBarComponent,
    ModalComponent,
    EmptyBgComponent],
	imports: [IonicModule],
	exports: [HelperComponent,
    ProgressBarComponent,
    ModalComponent,
    EmptyBgComponent],
	bootstrap: [IonicApp]
})
export class ComponentsModule { }
