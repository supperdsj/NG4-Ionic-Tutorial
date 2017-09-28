import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Place} from "../../models/place.model";
import {PlacesService} from "../../service/places.service";

/**
 * Generated class for the PlacePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {
  place: Place;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private placesService: PlacesService) {
    this.place = this.navParams.get('place');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacePage');
  }

  onLeave() {
    this.viewCtrl.dismiss();
  }

  onDelete() {
    this.placesService.deletePlace(this.navParams.get('index'));
    this.onLeave();
  }
}
