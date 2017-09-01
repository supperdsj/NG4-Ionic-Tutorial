import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {FavoritesPageModule} from "../pages/favorites/favorites.module";
import {LibraryPageModule} from "../pages/library/library.module";
import {QuotePageModule} from "../pages/quote/quote.module";
import {QuotesPageModule} from "../pages/quotes/quotes.module";
import {SettingsPageModule} from "../pages/settings/settings.module";
import {TabsPage} from "../pages/tabs/tbs";
import {QuotesService} from "../services/quotes.service";
import {SettingsService} from "../services/settings.service";

@NgModule({
  declarations: [
    MyApp, TabsPage
  ],
  imports: [
    BrowserModule,
    FavoritesPageModule,
    LibraryPageModule,
    QuotePageModule,
    QuotesPageModule,
    SettingsPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QuotesService, SettingsService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
