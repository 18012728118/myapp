import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPage } from './list';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ListPage,
  ],
  imports: [
    IonicPageModule.forChild(ListPage),
    PipesModule,
    ComponentsModule
  ],
})
export class ListPageModule { }
