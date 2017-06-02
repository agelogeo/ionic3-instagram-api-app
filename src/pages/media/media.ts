import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-media',
  templateUrl: 'media.html',
})
export class MediaPage {

  media;
  title;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    this.media = this.navParams.get('media');
  }

  ionViewDidLoad() {
    this.setPageTitle();
  }

  setPageTitle() {
    
    if (this.media.type == 'image') {
      this.title = "Foto";
    } else if (this.media.type == 'video') {
      this.title = "Vídeo";
    }

  }

}
