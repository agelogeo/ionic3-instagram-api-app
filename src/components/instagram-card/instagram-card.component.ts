import { MediaPage } from './../../pages/media/media';
import { InstagramService } from './../../providers/instagram.service';
import { UserProfilePage } from './../../pages/user-profile/user-profile';
import { NavController, AlertController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'instagram-card',
  templateUrl: 'instagram-card.component.html'
})
export class InstagramCardComponent {
 
  @Input() public medias;
  @Input() public isGrade;
  @Input() public imgWidth;

  constructor(
    public navCtrl: NavController,
    public instaService: InstagramService,
    public alertCtrl: AlertController
  ) {}

  showUserProfile(userId) {
    this.navCtrl.push(UserProfilePage, {
      userId: userId
    });
  }

  showMedia(media) {
    this.navCtrl.push(MediaPage, {
      media: media
    });
  }

  likeMedia(mediaId) {
    this.instaService.addLikeToMedia(mediaId)
      .subscribe(
        (like) => this.showAlert('curtiu '),
        (err) => this.showAlert(err)
      ); 
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      message: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
