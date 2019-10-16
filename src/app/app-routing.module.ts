import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipeDefaultComponent } from './recipes/recipe-details/recipe-default/recipe-default.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthGuardService } from './authentication/auth-guard.service';


const routes: Routes = [
  {path:'', redirectTo:'recipe',pathMatch:'full'},
  {path:'recipe',component:RecipesComponent,canActivate:[AuthGuardService],children:[
    {path:'', component:RecipeDefaultComponent},
    {path:'new',component:RecipeEditComponent},
    {path:':id',component:RecipeDetailsComponent,resolve:[RecipesResolverService]},
    {path:':id/edit',component:RecipeEditComponent}
  ]},
  {path:'shopping',component:ShoppingListComponent},
  {path:'auth',component:AuthenticationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
