import { LoginPage } from './../login/login';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { InstagramService } from './../../providers/instagram.service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  distance: number;

  constructor(
    public instaService: InstagramService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage
  ) {
    this.distance = this.navParams.get('distance');
  }

  changeDistance(distance) {
    this.instaService.changeDistance(distance);
    this.distance = this.instaService.distance;
  }

  removeKeyFromStorage() {
    this.storage.get('instagram')
      .then((instagram) => {
        if (instagram) {
          this.storage.remove('instagram').then(() => {
            this.navCtrl.setRoot(LoginPage);
          });
        }
      });
  }

}
