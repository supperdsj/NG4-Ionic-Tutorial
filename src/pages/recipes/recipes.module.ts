import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipesPage } from './recipes';
import {SlOptionsPage} from "./sl-options/sl-options";

@NgModule({
  declarations: [
    RecipesPage,
    SlOptionsPage
  ],
  imports: [
    IonicPageModule.forChild(RecipesPage),
    IonicPageModule.forChild(SlOptionsPage)
  ],
})
export class RecipesPageModule {}
