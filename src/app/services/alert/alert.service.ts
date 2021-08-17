import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertCtrl: AlertController
  ) { }
  async show(message, header = '', subHeader = '', cssClass = '') {
    const alert = await this.alertCtrl.create({
      header,
      subHeader,
      message,
      buttons: ['OK'],
      cssClass
    });

    await alert.present();
  }
}
