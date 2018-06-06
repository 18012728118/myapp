import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PartnerPage } from './partner';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    PartnerPage,
  ],
  imports: [
    IonicPageModule.forChild(PartnerPage),
    DirectivesModule
  ],
})
export class PartnerPageModule {}
