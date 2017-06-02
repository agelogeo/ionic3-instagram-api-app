import { Storage } from '@ionic/storage';
import { AlertController } from "ionic-angular";
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';

@Injectable()
export class InstagramService {

  lat: number;
  long: number;
  distance: number;
  token;

  constructor(
    public alertCtrl: AlertController,
    public http: Http,
    public geo: Geolocation,
    public storage: Storage
  ) {
    this.distance = 5;
  }

  getByLocation(response) {
    this.token = response;

    return this.http.get('https://api.instagram.com/v1/media/search?lat=' + this.lat + '&lng=' + this.long + '&access_token=' + response.access_token + '&distance=' + this.distance + '000')
    .map((res) => res.json());
  }

  getLocationName() {
    return this.http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.lat + ',' + this.long + '&sensor=true')
    .map((res) => res.json());
  }

  getUserProfile(userId, access_token) {
    return this.http.get('https://api.instagram.com/v1/users/' + userId + '/?access_token=' + access_token)
    .map((res) => res.json());
  }

  getUserRecentMedias(userId, access_token) {
    return this.http.get('https://api.instagram.com/v1/users/' + userId + '/media/recent/?access_token=' + access_token)
    .map((res) => res.json());
  }

  addLikeToMedia(mediaId, token) {
    return this.http.post('https://api.instagram.com/v1/media/' + mediaId + '/likes/', {access_token: token}, {})
    .map((res) => res.json());
  }

  getLocationMedias(locationId) {
    return this.http.get('https://api.instagram.com/v1/locations/' + locationId + '/media/recent?access_token=' + this.token.access_token)
    .map((res) => res.json());
  }
  
  setLocation(lat, long) {
    this.lat = lat;
    this.long = long;
  }

  getDistance() {
    return this.distance;
  }

  changeDistance(distance) {
    this.distance = distance;
  }

  getAccessToken() {
    let token;
    this.storage.get('instagram')
      .then((instagram) => {
        token = instagram.access_token;
      });

      return token;
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      message: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
