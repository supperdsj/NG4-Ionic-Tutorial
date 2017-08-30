import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {UsersPageModule} from "../pages/users/users.module";
import {ShopPageModule} from "../pages/shop/shop.module";
import {BuyoutPage} from "../pages/buyout/buyout";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BuyoutPage
  ],
  imports: [
    BrowserModule,
    UsersPageModule,
    ShopPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BuyoutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
