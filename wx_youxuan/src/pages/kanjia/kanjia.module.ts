import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KanjiaPage } from './kanjia';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar';
import { ModalService } from '../../services/modalService';

@NgModule({
  declarations: [
    KanjiaPage
  ],
  imports: [
    IonicPageModule.forChild(KanjiaPage),
    PipesModule,
    ComponentsModule
  ],
})
export class KanjiaPageModule { }
