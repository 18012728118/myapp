import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
@Injectable()
export class UiProvider {

  constructor(private toast: ToastController) {

  }

  public showToast(title, duration = 2000, position = "bottom") {
    let toast = this.toast.create({
      message: title,
      duration: duration,
      position: position
    });
    toast.present();
  }
}
