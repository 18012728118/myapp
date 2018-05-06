import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderPage } from './order';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    OrderPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderPage),
    ComponentsModule,
    PipesModule
  ],
})
export class ItemDetailPageModule { }
