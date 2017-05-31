import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { InstagramService } from './../../providers/instagram.service';

@Component({
  selector: 'page-settings-menu',
  templateUrl: 'settings-menu.html',
})
export class SettingsMenuPage {

  distance: number;

  constructor(
    public instaService: InstagramService,
    public viewCtrl: ViewController,
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    this.distance = this.instaService.distance;
  }

  changeDistance(distance) {
    this.instaService.changeDistance(distance);
    this.distance = this.instaService.distance;
  }

  close() {
    this.viewCtrl.dismiss();
  }



}
