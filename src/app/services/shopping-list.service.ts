import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

 public ingredientAddedEvent=new EventEmitter<Ingredient[]>();
 shoppingEdit=new Subject<number>();
 
  private ingredients:Ingredient[]=[
    new Ingredient('Tomatoes',10),
    new Ingredient('Potato',20)
  ]
  constructor() { }

  getAllIngredients(){
    return this.ingredients.slice();
  }

  getIngredientById(id){
    return this.ingredients[id];
  }

  addIngerdients(ingredient:Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientAddedEvent.emit(this.ingredients);
  }

  addAllIngerdients(ingredient:Ingredient[]){
    this.ingredients.push(...ingredient);
    this.ingredientAddedEvent.emit(this.ingredients);
  }
  updateIngerdient(id:number,ingredient:Ingredient){
    this.ingredients[id]=ingredient;
    this.ingredientAddedEvent.emit(this.ingredients);
  }

  deleteIngredient(id:number){
    this.ingredients.splice(id,1);
    this.ingredientAddedEvent.emit(this.ingredients);
  }

}
