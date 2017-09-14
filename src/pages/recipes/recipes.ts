import {Component} from '@angular/core';
import {
  AlertController, IonicPage, LoadingController, NavController, NavParams,
  PopoverController
} from 'ionic-angular';
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {RecipesService} from "../../services/recipes.service";
import {RecipePage} from "../recipe/recipe";
import {Recipe} from "../../models/recipe.model";
import {SlOptionsPage} from "./sl-options/sl-options";
import {AuthService} from "../../services/auth.service";

/**
 * Generated class for the RecipesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private recipesService: RecipesService, private popoverCtrl: PopoverController, private authService: AuthService, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesPage');
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, {recipe: recipe, index: index});
  }

  onRecipeOptions(event: MouseEvent) {
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
            this.recipesService.fetchList(token)
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
            this.recipesService.storeList(token)
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
