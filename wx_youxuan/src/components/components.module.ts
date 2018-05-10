import { NgModule } from '@angular/core';
import { HelperComponent } from './helper/helper';
import { IonicModule, IonicApp } from 'ionic-angular';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { ModalComponent } from './modal/modal';
import { EmptyBgComponent } from './empty-bg/empty-bg';
import { BuyItemComponent } from './buy-item/buy-item';
import { ShopCardComponent } from './shop-card/shop-card';
@NgModule({
    declarations: [HelperComponent,
        ProgressBarComponent,
        ModalComponent,
        EmptyBgComponent,
        BuyItemComponent,
    ShopCardComponent],
    imports: [IonicModule],
    exports: [HelperComponent,
        ProgressBarComponent,
        ModalComponent,
        EmptyBgComponent,
        BuyItemComponent,
    ShopCardComponent],
    bootstrap: [IonicApp]
})
export class ComponentsModule { }
