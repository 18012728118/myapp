import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemDetailPage } from './item-detail';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ItemDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemDetailPage),
    PipesModule
  ],
})
export class ItemDetailPageModule { }
