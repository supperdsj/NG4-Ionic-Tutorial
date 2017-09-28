import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {AddPlacePageModule} from "../pages/add-place/add-place.module";
import {PlacePageModule} from "../pages/place/place.module";
import {SetLocationPageModule} from "../pages/set-location/set-location.module";
import {AgmCoreModule} from "angular2-google-maps/core";
import {Geolocation} from "@ionic-native/geolocation";
import {Camera} from "@ionic-native/camera";
import {PlacesService} from "../service/places.service";
import {IonicStorageModule} from "@ionic/storage";
import {File} from "@ionic-native/file";
@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDzX5HXI3PNeDj6VeW-ECkSoJrOBY6uVaQ'
    }),

    AddPlacePageModule,
    PlacePageModule,
    SetLocationPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Camera,
    File,
    PlacesService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
