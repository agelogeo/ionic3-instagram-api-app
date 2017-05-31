import { AlertController } from "ionic-angular";
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';

import { Instagram } from "ng2-cordova-oauth/core";  
import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova';
import { Observable } from "rxjs";

@Injectable()
export class InstagramService {

  lat: number;
  long: number;
  distance: number;

  constructor(
    public alertCtrl: AlertController,
    public http: Http,
    public geo: Geolocation,
  ) {
    this.distance = 2;
  }

  setLocation(lat, long) {
    this.lat = lat;
    this.long = long;
  }
  
  getByLocation(response) {
    return this.http.get('https://api.instagram.com/v1/media/search?lat=' + this.lat + '&lng=' + this.long + '&access_token=' + response.access_token + '&distance=' + this.distance + '000')
    .map((res) => res.json());
  }

  getLocationName() {
    return this.http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.lat + ',' + this.long + '&sensor=true')
    .map((res) => res.json());
  }
  
  getDistance() {
    return this.distance;
  }

  changeDistance(distance) {
    this.distance = distance;
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      message: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
