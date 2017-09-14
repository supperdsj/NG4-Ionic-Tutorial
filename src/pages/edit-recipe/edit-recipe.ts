import {Component, OnInit} from '@angular/core';
import {
  ActionSheetController, AlertController, IonicPage, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipesService} from "../../services/recipes.service";
import {Ingredient} from "../../models/ingredient.model";
import {Recipe} from "../../models/recipe.model";

/**
 * Generated class for the EditRecipePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {
  mode: string = 'New';
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;
  recipe: Recipe = new Recipe(null, null, 'Easy', []);
  index: number = -1;

  ngOnInit(): void {
    this.mode = this.navParams.get('mode');
    if (this.mode === 'Edit') {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
    this.initializeForm();
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private actionSheetCtrl: ActionSheetController, private alertCtrl: AlertController, private toastCtrl: ToastController, private recipesService: RecipesService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRecipePage');
  }

  private initializeForm() {
    this.recipeForm = new FormGroup({
      title: new FormControl(this.recipe.title, Validators.required),
      description: new FormControl(this.recipe.description, Validators.required),
      difficulty: new FormControl(this.recipe.difficulty, Validators.required),
      ingredients: new FormArray([])
    });
    if (this.recipe.ingredients) {
      for (let ig of this.recipe.ingredients) {
        (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(ig.name, Validators.required));
      }
    }
  }

  onSubmit() {
    const value = this.recipeForm.value;
    const ingredients = [];
    for (let ig of value.ingredients) {
      ingredients.push(new Ingredient(ig, 1));
    }
    if (this.mode === 'New') {
      this.recipesService.addRecipe(value.title, value.description, value.difficulty, ingredients);
    } else {
      this.recipesService.updateRecipe(this.index, value.title, value.description, value.difficulty, ingredients);
    }
    console.log(this.recipesService.getRecipes());
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  private createNewIngredientAlert() {
    const newIngredientALert = this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [{
        name: 'name',
        placeholder: 'Name'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
        {
          text: 'Add',
          handler: data => {
            if (data.name.trim() === '' || data.name === null) {
              let toast = this.toastCtrl.create({
                message: 'Please input a name',
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
            } else {
              (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
            }
          }
        }]
    });
    return newIngredientALert;
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Remove all Ingredient',
          role: 'destructive',
          handler: () => {
            const fArray = (<FormArray>this.recipeForm.get('ingredients'));
            while (fArray.length > 0) {
              fArray.removeAt(0);
            }
            let toast = this.toastCtrl.create({
              message: 'All Ingredient have removed',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
}
