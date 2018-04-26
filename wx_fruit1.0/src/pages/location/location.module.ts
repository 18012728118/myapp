import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationPage } from './location';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    LocationPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationPage),
    IonicStorageModule.forRoot()
  ],
  exports:[
    LocationPage
  ]
})
export class LocationPageModule { }
