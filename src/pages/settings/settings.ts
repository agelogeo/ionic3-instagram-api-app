import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    public navParams: NavParams
  ) {
    this.distance = this.navParams.get('distance');
  }

  changeDistance(distance) {
    this.instaService.changeDistance(distance);
    this.distance = this.instaService.distance;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Settings');
  }

}
