import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Globalization } from '@ionic-native/globalization';

import { HomePage } from './../pages/home/home';
import { LoginPage } from './../pages/login/login';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    storage: Storage,
    global: Globalization,
    translate: TranslateService
  ) {

    global.getPreferredLanguage()
      .then((res) => {
        let lang = res.value.substring(0,2);
        
        if (lang == 'pt' || lang == 'en') {
          translate.setDefaultLang(lang);
        } else {
          translate.setDefaultLang('en');
        }
      })
      .catch(e => translate.setDefaultLang('en'));

    storage.get('instagram')
      .then((instagram) => {
        if (instagram) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = LoginPage;
        }
      });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    });
  }

}

