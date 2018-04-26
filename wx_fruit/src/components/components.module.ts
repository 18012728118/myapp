import { NgModule } from '@angular/core';
import { IonicModule, IonicApp } from 'ionic-angular';
import { ModalComponent } from './modal/modal';
@NgModule({
    declarations: [
        ModalComponent],
    imports: [IonicModule],
    exports: [
        ModalComponent],
    bootstrap: [IonicApp]
})
export class ComponentsModule { }
