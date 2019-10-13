import { Component, OnInit, Input, Output } from '@angular/core';
import { Recipe } from '../recipe-model';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { ActivatedRoute, RouterLinkActive, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
//@Input() 
recipe:Recipe;
id:number;
  constructor(public shoppingService:ShoppingListService,
    public route:ActivatedRoute,private recipeService:RecipeService,
    private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (data:Params)=>{
        this.id=data['id'];
        this.recipe=this.recipeService.getRecipeById(data['id'])
      }
    )
  }

   addToShoppingList(ingredients:Ingredient[]){
    this.shoppingService.addAllIngerdients(ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route});
  }

  onDelete(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'],{relativeTo:this.route});
  }

}
