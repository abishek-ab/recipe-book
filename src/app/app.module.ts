import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListDetailsComponent } from './shopping-list/shopping-list-details/shopping-list-details.component';
import { DropdownToggleDirective } from './shared/dropdown-toggle.directive';
import { RecipeService } from './services/recipe.service';
import { ShoppingListService } from './services/shopping-list.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeDetailsComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingListDetailsComponent,
    RecipeListComponent,
    DropdownToggleDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [RecipeService,ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
