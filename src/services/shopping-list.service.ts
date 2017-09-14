import {Ingredient} from "../models/ingredient.model";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {AuthService} from "./auth.service";
import 'rxjs';

@Injectable()
export class ShoppingListService {
  private ingredients: Ingredient[] = [];

  constructor(private http: Http, private authService: AuthService) {
  }

  addItem(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
    console.log(this.ingredients);
  }

  addItems(items: Ingredient[]) {
    this.ingredients.push(...items);
  }

  getItems(): Ingredient[] {
    return this.ingredients.slice();
  }

  removeItem(index: number) {
    this.ingredients.splice(index, 1);
  }

  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http
      .put(`https://ionic-recipebook-3a0ba.firebaseio.com/${userId}/shopping-list.json?auth=${token}`, this.ingredients)
      .map(resp => resp.json());
  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http
      .get(`https://ionic-recipebook-3a0ba.firebaseio.com/${userId}/shopping-list.json?auth=${token}`, this.ingredients)
      .map(resp => resp.json())
      .do(data => {
        this.ingredients = data || [];
      });

  }
}
