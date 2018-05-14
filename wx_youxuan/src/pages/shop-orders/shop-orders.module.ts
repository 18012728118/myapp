import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopOrdersPage } from './shop-orders';

@NgModule({
  declarations: [
    ShopOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopOrdersPage),
  ],
})
export class ShopOrdersPageModule {}
