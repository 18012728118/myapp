import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FreeItemPage } from './free-item';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    FreeItemPage,
  ],
  imports: [
    IonicPageModule.forChild(FreeItemPage),
    PipesModule,
    ComponentsModule
  ],
})
export class FreeItemPageModule { }
