import {Injectable} from '@angular/core';
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) {
  }

  async presentToast(content: string, duration: number, color: string, position: 'top' | 'middle' | 'bottom', icon: string) {
    const toast = await this.toastController.create({
      icon: icon,
      message: content,
      duration: duration,
      position: "bottom",
      color: color,
      cssClass: 'custom-toast'

    });

    await toast.present();
  }
}
