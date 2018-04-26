import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MuJuanPage } from './mujuan';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    MuJuanPage,
  ],
  imports: [
    IonicPageModule.forChild(MuJuanPage),
    PipesModule
  ],
})
export class MujuanPageModule { }
