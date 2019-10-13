import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
ingredients:Ingredient[];
  constructor(public shoppingService:ShoppingListService) { }

  ngOnInit() {
    this.ingredients=this.shoppingService.getAllIngredients();
    this.shoppingService.ingredientAddedEvent.subscribe(
      (ingredients:Ingredient[]) => {
        this.ingredients=ingredients;
      }
    )
  }

  onEdit(id:number){
    this.shoppingService.shoppingEdit.next(id);
  }
}
