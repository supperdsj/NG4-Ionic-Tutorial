import {Place} from "../models/place.model";
import {Injectable} from "@angular/core";
import {Location} from "../models/location.model";
import {Storage} from "@ionic/storage";
import {File} from "@ionic-native/file";

declare let cordova: any;

@Injectable()
export class PlacesService {
  private places: Place[] = [];

  constructor(private storage: Storage, private file: File) {
  }

  addPlace(title: string, description: string, location: Location, imageUrl: string) {
    let place = new Place(title, description, location, imageUrl);
    this.places.push(place);
    this.storage.set('places', this.places)
      .then(console.log)
      .catch(err => {
        this.places.splice(this.places.indexOf(place), 1);
      });
  }

  loadPlaces() {
    return this.places.slice();
  }

  fetchPlaces() {
    return this.storage.get('places')
      .then(
        (places: Place[]) => {
          this.places = places || [];
          return this.places;
        })
      .catch(err => console.log);
  }

  deletePlace(index: number) {
    const place = this.places[index];
    this.places.splice(index, 1);
    this.storage.set('places', this.places)
      .then(() => {
        this.removeFile(place);
      })
      .catch(console.log);
  }

  private removeFile(place: Place) {
    const currentName = place.imageUrl.replace(/^.*[\\\/]/, '');
    this.file.removeFile(cordova.dataDirectory, currentName)
      .then(console.log)
      .catch(err => {
        console.log('err while remove file');
        this.addPlace(place.title, place.description, place.location, place.imageUrl);
      });
  }
}
