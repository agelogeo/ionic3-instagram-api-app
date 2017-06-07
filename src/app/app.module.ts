import { Globalization } from '@ionic-native/globalization';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { PrivacyPage } from './../pages/privacy/privacy';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { InstagramCardComponent } from './../components/instagram-card/instagram-card.component';
import { InstagramService } from './../providers/instagram.service';
import { IonicStorageModule } from '@ionic/storage';
import { MediaPage } from './../pages/media/media';
import { SettingsPage } from './../pages/settings/settings';
import { SettingsMenuPage } from './../pages/settings-menu/settings-menu';
import { LocationPage } from './../pages/location/location';
import { LocationsPage } from './../pages/locations/locations';
import { LoginPage } from './../pages/login/login';
import { HttpModule } from "@angular/http";
import { UserProfilePage } from './../pages/user-profile/user-profile';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InstagramCardComponent,
    SettingsMenuPage,
    SettingsPage,
    LoginPage,
    LocationsPage,
    UserProfilePage,
    MediaPage,
    LocationPage,
    PrivacyPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SettingsMenuPage,
    SettingsPage,
    LoginPage,
    LocationsPage,
    UserProfilePage,
    MediaPage,
    LocationPage,
    PrivacyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InstagramService,
    Geolocation,
    Storage,
    InAppBrowser,
    Globalization,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
