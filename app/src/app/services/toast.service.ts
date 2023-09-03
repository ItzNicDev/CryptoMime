import {Injectable} from '@angular/core';
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) {
  }

  async presentToast(content: string, duration: number ,color:string,position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: content,
      duration: duration,
      position: position,
      color: color
    });

    await toast.present();
  }
}
