import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {QuotesService} from "../../services/quotes.service";
import {Quote} from "../../data/quotes.interface";
import {QuotePage} from "../quote/quote";

/**
 * Generated class for the FavoritesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  quotes: Quote[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private quotesService: QuotesService, private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  ionViewWillEnter() {
    this.quotes = this.quotesService.getFavoriteQuotes();
  }

  onViewQuote(quote: Quote) {
    const modal = this.modalCtrl.create(QuotePage, quote);
    modal.onDidDismiss((remove) => {
      if (remove) {
        this.onRemoveFromFavorite(quote);
      }
    });
    modal.present();
  }

  onRemoveFromFavorite(quote: Quote) {
    this.quotesService.removeQuoteFromFavorite(quote);
    this.quotes = this.quotesService.getFavoriteQuotes();
  }
}
