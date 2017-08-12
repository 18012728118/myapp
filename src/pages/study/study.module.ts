import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudyPage } from "./study";
@NgModule({
  declarations: [
    StudyModule,
  ],
  imports: [
    IonicPageModule.forChild(StudyModule),
  ],
})
export class StudyModule { }
