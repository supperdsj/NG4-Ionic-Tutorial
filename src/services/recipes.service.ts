import {Ingredient} from "../models/ingredient.model";
import {Injectable} from "@angular/core";
import {Recipe} from "../models/recipe.model";

@Injectable()
export class RecipesService {
  private recipes: Recipe[] = [new Recipe('RTitle', 'RDesc', 'Easy', [new Ingredient('ig', 1)])];

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

  getRecipeByIndex(index: number): Recipe {
    return this.recipes[index];
  }
}
