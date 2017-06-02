import { HomePage } from './../home/home';
import { InstagramService } from './../../providers/instagram.service';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Instagram } from "ng2-cordova-oauth/core";  
import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private oauth: OauthCordova = new OauthCordova();
  private instagramProvider: Instagram = new Instagram({
      clientId: "85ebf4599fb74f1c9629ee3ad64c3bef",      // Register you client id from https://www.instagram.com/developer/
      redirectUri: 'http://localhost',  // Let is be localhost for Mobile Apps
      responseType: 'token',   // Use token only 
      appScope: ['basic','public_content', 'likes', 'comments']
  });

  constructor(
    public alertCtrl: AlertController,
    public instaService: InstagramService,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage
  ) {}

  ionViewWillLoad() {}

  login() {
    this.oauth.logInVia(this.instagramProvider) 
      .then((success) => {

          this.storage.set('instagram', success)
          this.navCtrl.setRoot(HomePage, {
            response: success
          }).catch((err) => {
              this.showAlert('erro root: ' + err);
            });

      }).catch((err) => {
        this.showAlert('erro: ' + err);
      });
  }

  loginFalse() {
    this.navCtrl.setRoot(HomePage, {
      response: { access_token: '641281484.85ebf45.dada69ec7e6040a6968989cd062af79a' }
    });
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      message: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
