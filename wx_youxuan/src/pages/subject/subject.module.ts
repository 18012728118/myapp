import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubjectPage } from './subject';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    SubjectPage,
  ],
  imports: [
    IonicPageModule.forChild(SubjectPage),
    ComponentsModule,
    PipesModule
    
  ],
})
export class SubjectPageModule { }
