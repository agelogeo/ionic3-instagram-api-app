import { InstagramService } from './../../providers/instagram.service';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  @ViewChild(Content) content: Content;

  user;
  credentials;
  userId;
  medias;
  imgWidth;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public instaService: InstagramService
  ) {
    this.user = {};
    this.medias = [];
  }

  ionViewWillLoad() {
    this.credentials = this.navParams.get('credentials');
    this.userId = this.navParams.get('userId');
    this.imgWidth = (this.content.contentWidth/3);

    this.getUserProfile();
    this.getRecentMedias();
  }

  getUserProfile() {
    this.instaService.getUserProfile(this.userId, this.credentials.access_token)
      .subscribe((user) => {
        this.user = user.data;
      });
  }

  getRecentMedias() {
    this.instaService.getUserRecentMedias(this.userId, this.credentials.access_token)
      .subscribe((medias) => {
        this.medias = medias.data;
      });
  }

}
