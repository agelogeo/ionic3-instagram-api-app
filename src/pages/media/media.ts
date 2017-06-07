import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-media',
  templateUrl: 'media.html',
})
export class MediaPage {

  media;
  medias;
  title;
  imgWidth = '100%';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public translate: TranslateService
  ) {
    this.media = this.navParams.get('media');
    this.medias = [this.media];
    this.setPageTitle();
  }

  setPageTitle() {
    let lang = this.translate.defaultLang;
    
    if (this.media.type == 'image') {
      if (lang == 'pt') {
        this.title = "Foto";
      } else {
        this.title = "Photo";
      }
    } else if (this.media.type == 'video') {
      if (lang == 'pt') {
        this.title = "Vídeo";
      } else {
        this.title = "Video";
      }
    }

  }

}
