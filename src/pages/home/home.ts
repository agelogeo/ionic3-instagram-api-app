import { Geolocation } from '@ionic-native/geolocation';
import { LocationsPage } from './../locations/locations';
import { InstagramService } from './../../providers/instagram.service';
import { Component, ViewChild } from '@angular/core';
import { NavController, PopoverController, NavParams, Content, Loading } from 'ionic-angular';

import { AlertController, Header, LoadingController } from 'ionic-angular';
import { SettingsPage } from './../settings/settings';
import { SettingsMenuPage } from './../settings-menu/settings-menu';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;

  distance: number;
  medias;
  locationName: string;
  isGrade = false;
  imgWidth; 

  constructor(
    public alertCtrl: AlertController,
    public instaService: InstagramService,
    public popoverCtrl: PopoverController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public geo: Geolocation,
    public loadingCtrl: LoadingController
  ) {
    this.medias = [];
  } 

  ionViewWillEnter() {
    this.distance = this.instaService.distance;
    this.imgWidth = (this.content.contentWidth/3);
    let loading: Loading = this.showLoading();
    this.loadLocationAndMedias(loading);
  }

  loadLocationAndMedias(loading) {

    this.geo.getCurrentPosition()
      .then((resp) => {
        this.instaService.setLocation(resp.coords.latitude, resp.coords.longitude);
      })
      .then(() => {
        let response = this.navParams.get('response')
          
        this.instaService.getByLocation(response)
          .subscribe((res) => {
            this.medias = res.data;
          }, (error) => {
            this.showAlert('ERROR: ' + error)
          });
        
        this.instaService.getLocationName()
          .subscribe((address) => {
            this.locationName = address.results[1].formatted_address;
          });
        
        if (loading.dismiss) {
          loading.dismiss();
        } else {
          loading.complete();
        }

      })
      .catch((error) => {
        loading.dismiss();
        this.showAlert('erro ao conferir geolocalização: ' + error);
      });
  }

  toggleView() {
    this.isGrade = !this.isGrade;
  }

  showSettings() {
    this.navCtrl.push(SettingsPage, {
      distance: this.distance
    });
  }

  listLocations() {
    this.navCtrl.push(LocationsPage, {
      medias: this.medias
    })
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      message: message,
      buttons: ['OK']
    });
    alert.present();
  }

  showLoading(): Loading {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    return loader;
  }

  doRefresh(refresher) {
    this.loadLocationAndMedias(refresher);
  }

  /*
  onScroll() {
    if (this.content.scrollTop > 50) {
      this.title = 'OPA!!';
    } else {
      this.title = 'NEARGRAM';
    }
  }
  */

}
