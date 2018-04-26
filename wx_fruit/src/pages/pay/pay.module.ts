import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayPage } from './pay'
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    PayPage
  ],
  imports: [
    IonicPageModule.forChild(PayPage),
    ComponentsModule
  ],
})
export class PayPageModule { }
