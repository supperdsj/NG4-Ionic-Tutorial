import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingListPage } from './shopping-list';
import {SlOptionsPage} from "./sl-options/sl-options";

@NgModule({
  declarations: [
    ShoppingListPage,
    SlOptionsPage
  ],
  imports: [
    IonicPageModule.forChild(ShoppingListPage),
    IonicPageModule.forChild(SlOptionsPage)
  ],
})
export class ShoppingListPageModule {}
