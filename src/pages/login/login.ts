import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Globalization } from '@ionic-native/globalization';

import { Instagram } from "ng2-cordova-oauth/core";  
import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova';
import { Storage } from '@ionic/storage';
import { TranslateService } from "@ngx-translate/core";

import { PrivacyPage } from './../privacy/privacy';
import { HomePage } from './../home/home';
import { InstagramService } from './../../providers/instagram.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private oauth: OauthCordova = new OauthCordova();
  private instagramProvider: Instagram = new Instagram({
      clientId: "YOUR_CLIENT_ID",      // Register you client id from https://www.instagram.com/developer/
      redirectUri: 'http://localhost',  // Let is be localhost for Mobile Apps
      responseType: 'token',   // Use token only 
      appScope: ['basic','public_content']
  });

  constructor(
    public alertCtrl: AlertController,
    public instaService: InstagramService,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public translate: TranslateService,
    private iab: InAppBrowser,
    public global: Globalization
  ) {}

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

  // set your token to test
  loginFalse() {
    this.navCtrl.setRoot(HomePage, {
      response: { access_token: 'YOUR_ACCESS_TOKEN' }
    });
  }

  showPrivacy() {
    const browser = this.iab.create('http://localhost/privacy/');
    browser.show();
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      message: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
