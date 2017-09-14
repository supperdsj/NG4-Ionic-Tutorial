import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/shopping-list.service";
import {Recipe} from "../../models/recipe.model";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private  shoppingListService: ShoppingListService) {
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
}
