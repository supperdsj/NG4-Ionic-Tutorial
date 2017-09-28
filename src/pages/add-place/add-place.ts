import {Component} from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SetLocationPage} from "../set-location/set-location";
import {Location} from "../../models/location.model";
import {Geolocation} from "@ionic-native/geolocation";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {PlacesService} from "../../service/places.service";
import {Entry, File} from "@ionic-native/file";

declare let cordova: any;

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  location: Location = {
    lat: 40.7624324,
    lng: -73.9759827
  };
  locationIsSet = false;
  imageUrl: string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl: ModalController,
              private geolocation: Geolocation,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private camera: Camera,
              private placesService: PlacesService,
              private file: File) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPlacePage');
  }

  onSubmit(form: NgForm) {
    // console.log(form.value)
    this.placesService.addPlace(form.value.title, form.value.description, this.location, this.imageUrl);
    form.reset();
    this.location = {
      lat: 40.7624324,
      lng: -73.9759827
    };
    this.locationIsSet = false;
    this.imageUrl = '';
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, {location: this.location, isSet: this.locationIsSet});
    modal.present();
    modal.onDidDismiss(data => {
      console.log(data);
      if (data) {
        this.location = data.location;
        this.locationIsSet = true;
      }
    });
  }

  onLocate() {
    const loader = this.loadingCtrl.create({
      content: 'Getting your Location...'
    });
    loader.present();
    this.geolocation.getCurrentPosition()
      .then(location => {
        this.location.lat = location.coords.latitude;
        this.location.lng = location.coords.longitude;
        this.locationIsSet = true;
        loader.dismiss();
        // console.log(location);
      })
      .catch(error => {
        const toast = this.toastCtrl.create({
          message: 'Could not get location , please pick it manually!',
          duration: 2500
        });
        toast.present();
      });
  }

  onTakePhoto() {
    const options: CameraOptions = {
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    };

    this.camera.getPicture(options)
      .then((imageData) => {
        const currentName = imageData.replace(/^.*[\\\/]/, '');
        const path = imageData.replace(/[^\/]*$/, '');
        const newFileName = new Date().getUTCMilliseconds() + '.jpg';
        this.file.moveFile(path, currentName, cordova.file.dataDirectory, newFileName)
        // this.file.moveFile(path, currentName, cordova.file.dataDirectory, currentName)
          .then((data: Entry) => {
            this.imageUrl = data.nativeURL;
            this.camera.cleanup();
          })
          .catch(err => {
            this.imageUrl = '';
            const toast = this.toastCtrl.create({
              message: err.message,
              duration: 2500
            });
            toast.present();
            this.camera.cleanup();
          });
        // let base64Image = 'data:image/jpeg;base64,' + imageData;
        // this.file.createFile
        // this.imageUrl = base64Image;
      }).catch(error => {
      const toast = this.toastCtrl.create({
        message: 'Could not get camera ',
        duration: 2500
      });
      toast.present();
    });
  }
}
