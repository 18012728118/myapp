import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoratePage } from './favorate';

@NgModule({
  declarations: [
    FavoratePage,
  ],
  imports: [
    IonicPageModule.forChild(FavoratePage),
  ],
})
export class ItemDetailPageModule {}
