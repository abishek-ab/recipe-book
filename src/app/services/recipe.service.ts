import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipes/recipe-model';
import { Ingredient } from '../shared/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
public onRecipeChanged=new EventEmitter<Recipe[]>();
private recipeList:Recipe[]=[];
//  private recipeList:Recipe[]=[
//     new Recipe('Pizza','Dominos pizza with cheese burst',
//     'https://www.dudleysquaregrille.com/files/images/about-us.jpg',
//     [
//       new Ingredient('Cheese',10),
//       new Ingredient('Meat',20)
//   ]),
//     new Recipe('Chicken','KFC Chicken',
//     'https://i.ytimg.com/vi/4eLdODwqYyk/maxresdefault.jpg',
//     [new Ingredient('Chicken',10),new Ingredient('Oil',50)]
//     )
// ];

getAllRecipes(){
  return this.recipeList.slice();
}

getRecipeById(id){
  return this.recipeList[id];
}
  constructor() { }

  addRecipe(recipe){
    this.recipeList.push(recipe);
    this.onRecipeChanged.emit(this.recipeList);
  }

  updateRecipe(id,recipe){
    this.recipeList[id]=recipe;
    this.onRecipeChanged.emit(this.recipeList);
  }

  deleteRecipe(id){
    this.recipeList.splice(id,1);
    this.onRecipeChanged.emit(this.recipeList);
  }

  saveFetchedRecipes(recipes:Recipe[]){
    this.recipeList=recipes;
    this.onRecipeChanged.emit(this.recipeList);
  }
}
