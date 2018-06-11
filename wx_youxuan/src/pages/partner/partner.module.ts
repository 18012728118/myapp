import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PartnerPage } from './partner';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PartnerPage,
  ],
  imports: [
    IonicPageModule.forChild(PartnerPage),
    DirectivesModule,
    ComponentsModule
  ],
})
export class PartnerPageModule { }
