import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Recipe} from "../../models/recipe.model";
import {RecipesService} from "../../services/recipes.service";
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {ShoppingListService} from "../../services/shopping-list.service";

/**
 * Generated class for the RecipePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage {
  recipe: Recipe;
  index: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private recipesService: RecipesService, private shoppingListService: ShoppingListService) {
    this.recipe = navParams.get('recipe');
    this.index = navParams.get('index');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }

  onAddIngredients() {
    this.shoppingListService.addItems(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'Edit', recipe: this.recipe, index: this.index});
  }

  onDeleteRecipe() {
    this.recipesService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }
}
