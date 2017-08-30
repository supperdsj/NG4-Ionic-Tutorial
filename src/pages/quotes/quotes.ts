import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Quote} from "../../data/quotes.interface";
import {QuotesService} from "../../services/quotes.service";

/**
 * Generated class for the QuotesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage implements OnInit {
  quoteGroup: { category: string, quotes: Quote[], icon: string };

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private quotesService: QuotesService) {
  }

  ngOnInit(): void {
    this.quoteGroup = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuotesPage');
  }

  isFavorite(quote: Quote) {
    return this.quotesService.isQuoteFavorite(quote);
  }

  onRemoveFromFavorite(quote: Quote) {
    this.quotesService.removeQuoteFromFavorite(quote);
  }

  onAddToFavorite(quote: Quote) {
    const alert = this.alertCtrl.create({
      title: 'Add Quote?',
      subTitle: 'Are you sure?',
      message: `Are you sure you want to add this quote?`,
      buttons: [{
        text: 'Yes, go ahead',
        handler: () => {
          console.log('OK');
          this.quotesService.addQuoteToFavorite(quote);
        }
      }, {
        text: 'Nope',
        role: 'cancel',
        handler: () => {
          console.log('CANCELED');
        }
      }]
    });
    alert.present();
  }
}
