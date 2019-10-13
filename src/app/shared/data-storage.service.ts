import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../recipes/recipe-model';
import {map, tap} from 'rxjs/operators'
import { Ingredient } from './ingredients.model';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient,private recipeService:RecipeService) { }

saveAllData(){
  const recipes=this.recipeService.getAllRecipes();
  this.http.put("https://recipe-shoppinglist-89d0d.firebaseio.com/recipes.json",recipes)
  .subscribe((data)=>{
    console.log(data);
  });
}

fetchAllData(){
  return this.http.get<Recipe[]>("https://recipe-shoppinglist-89d0d.firebaseio.com/recipes.json")
  .pipe(map(
    recipes=>{
      for(let key in recipes){
        const ingr=recipes[key].ingredients;
        recipes[key].ingredients=ingr? ingr:[];
      }
      return recipes;
    }
  ),tap((data)=>{
    this.recipeService.saveFetchedRecipes(data);
  }))
  
}
} 
