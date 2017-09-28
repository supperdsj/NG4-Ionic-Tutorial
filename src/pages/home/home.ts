import {Component} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {AddPlacePage} from "../add-place/add-place";
import {PlacesService} from "../../service/places.service";
import {Place} from "../../models/place.model";
import {PlacePage} from "../place/place";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  addPlacePage = AddPlacePage;
  places = [];

  constructor(public navCtrl: NavController,
              private placesService: PlacesService,
              private modalCtrl: ModalController) {

  }

  ngOnInit() {
    this.placesService.fetchPlaces()
      .then((places: Place[]) => {
        this.places = places;
      });
  }

  ionViewWillEnter() {
    this.places = this.placesService.loadPlaces();
  }

  onOpenPlace(place: Place, index: number) {
    const model = this.modalCtrl.create(PlacePage, {place: place, index: index});
    model.present();
  }
}
