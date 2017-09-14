import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {EditRecipePageModule} from "../pages/edit-recipe/edit-recipe.module";
import {RecipePageModule} from "../pages/recipe/recipe.module";
import {RecipesPageModule} from "../pages/recipes/recipes.module";
import {ShoppingListPageModule} from "../pages/shopping-list/shopping-list.module";
import {TabsPageModule} from "../pages/tabs/tabs.module";
import {ShoppingListService} from "../services/shopping-list.service";
import {RecipesService} from "../services/recipes.service";

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    EditRecipePageModule,
    RecipePageModule,
    RecipesPageModule,
    ShoppingListPageModule,
    TabsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    RecipesService
  ]
})
export class AppModule {}
