import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe-model';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
@Input() recipe:Recipe;
  constructor(public shoppingService:ShoppingListService) { }

  ngOnInit() {
  }

  addToShoppingList(ingredients:Ingredient[]){
    this.shoppingService.addAllIngerdients(ingredients);
    
  }

}
