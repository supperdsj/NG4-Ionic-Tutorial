import {Ingredient} from "../models/ingredient.model";
import {Injectable} from "@angular/core";
import {Recipe} from "../models/recipe.model";
import {AuthService} from "./auth.service";
import {Http} from "@angular/http";

@Injectable()
export class RecipesService {
  // private recipes: Recipe[] = [new Recipe('RTitle', 'RDesc', 'Easy', [new Ingredient('ig', 1)])];
  private recipes: Recipe[] = [];

  constructor(private authService: AuthService, private http: Http) {
  }

  addRecipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
    this.recipes.push(new Recipe(title, description, difficulty, ingredients));
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  updateRecipe(index: number, title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
    this.recipes[index] = new Recipe(title, description, difficulty, ingredients)
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
  }

  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http
      .put(`https://ionic-recipebook-3a0ba.firebaseio.com/${userId}/recipes.json?auth=${token}`, this.recipes)
      .map(resp => resp.json());
  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http
      .get(`https://ionic-recipebook-3a0ba.firebaseio.com/${userId}/recipes.json?auth=${token}`, this.recipes)
      .map(resp => resp.json())
      .do(data => {
        this.recipes = data || [];
      });

  }
}
