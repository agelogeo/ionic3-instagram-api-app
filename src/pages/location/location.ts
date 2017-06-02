import { MediaPage } from './../media/media';
import { InstagramService } from './../../providers/instagram.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  
  medias;
  location;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public instaService: InstagramService
  ) {
    this.medias = [];
    this.location = {};
  }

  ionViewDidLoad() {
    this.location = this.navParams.get('location')
    this.showLocationMedias();
  }

  showLocationMedias() {
    console.log('LOCATION2 ' + this.location.id);
    this.instaService.getLocationMedias(this.location.id)
      .subscribe((medias) => {
        this.medias = medias.data;
      })
  }

  showMedia(media) {
    this.navCtrl.push(MediaPage, {
      media: media
    });
  }

}
