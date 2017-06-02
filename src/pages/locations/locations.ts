import { LocationPage } from './../location/location';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})
export class LocationsPage {

  locations: string[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    this.locations = [];
    this.getLocations();
  }

  getLocations() {
    let medias = this.navParams.get('medias');
    let locations: string[] = [];

    for (let m of medias) {
      locations.push(m.location);
    }

    return locations.filter((loc) => {
      this.locations.push(loc);
    })
  }

  showLocationPage(location) {
    this.navCtrl.push(LocationPage, {
      location: location
    });
  }

}
