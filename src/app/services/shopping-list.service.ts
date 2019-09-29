import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

 public ingredientAddedEvent=new EventEmitter<Ingredient[]>();
 
  private ingredients:Ingredient[]=[
    new Ingredient('Tomatoes',10),
    new Ingredient('Potato',20)
  ]
  constructor() { }

  getAllIngredients(){
    return this.ingredients.slice();
  }

  addIngerdients(ingredient:Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientAddedEvent.emit(this.ingredients);
  }

  addAllIngerdients(ingredient:Ingredient[]){
    this.ingredients.push(...ingredient);
    this.ingredientAddedEvent.emit(this.ingredients);
  }
}
