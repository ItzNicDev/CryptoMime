import {Injectable} from '@angular/core';
import {AlertController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController,) {
  }


  async showOk(header: string, content: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: content,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
