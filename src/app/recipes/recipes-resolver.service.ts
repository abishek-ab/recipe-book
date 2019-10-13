import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Recipe } from './recipe-model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../services/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService:DataStorageService,private recipeService:RecipeService) { }

  resolve(route: import("@angular/router").ActivatedRouteSnapshot, 
  state: import("@angular/router").RouterStateSnapshot):
   Recipe[] | import("rxjs").Observable<Recipe[]> | Promise<Recipe[]> {
     const recipe=this.recipeService.getAllRecipes();
     if(recipe.length===0){
      return this.dataStorageService.fetchAllData();
     }else{
       return recipe;
     }
   
  }

  
}
