import {Component} from '@angular/core';
import {
  AlertController, IonicPage, LoadingController, NavController, NavParams,
  PopoverController
} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/shopping-list.service";
import {SlOptionsPage} from "./sl-options/sl-options";
import {AuthService} from "../../services/auth.service";

/**
 * Generated class for the ShoppingListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private  shoppingListService: ShoppingListService, private popoverCtrl: PopoverController, private authService: AuthService, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }

  onAddItem(f: NgForm) {
    console.log(f);
    this.shoppingListService.addItem(f.value.ingredientName, f.value.amount);
    f.reset();
  }

  onCheckItem(index: number) {
    this.shoppingListService.removeItem(index);
  }

  onShopOptions(event: MouseEvent) {
    const popover = this.popoverCtrl.create(SlOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(
      data => {
        if (!data) {
          return;
        }
        const loading = this.loadingCtrl.create({content: 'Please wait...'});
        loading.present();
        if (data.action === 'load') {
          this.authService.getActiveUser().getToken().then(token => {
            this.shoppingListService.fetchList(token)
              .do(data => loading.dismiss())
              .subscribe(data => {
                  console.log(data);
                },
                err => {
                  this.handleError(err);
                });
          });
        } else if (data.action === 'store') {
          this.authService.getActiveUser().getToken().then(token => {
            this.shoppingListService.storeList(token)
              .do(data => loading.dismiss())
              .subscribe(data => {
                  console.log(data);
                },
                err => {
                  this.handleError(err);
                });
          });
        }
      }
    )
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['OK']
    });
    alert.present();
  }
}
