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
  counts;
  userId;
  medias;
  imgWidth = '33.333%';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public instaService: InstagramService
  ) {
    this.user = {};
    this.counts = {};
    this.medias = [];
  }

  ionViewWillLoad() {
    this.userId = this.navParams.get('userId');

    this.getUserProfile();
    this.getRecentMedias();
  }

  getUserProfile() {
    this.instaService.getUserProfile(this.userId)
      .subscribe((user) => {
        this.user = user.data;
        this.counts = user.data.counts;
      });
  }

  getRecentMedias() {
    this.instaService.getUserRecentMedias(this.userId)
      .subscribe((medias) => {
        this.medias = medias.data;
      });
  }

}
