import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe-model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output()
  recipeList:Recipe[];
  constructor(public recipeService:RecipeService) { }

  ngOnInit() {
    this.recipeList=this.recipeService.getAllRecipes();
  }

  addNewRecipe(){
    
  }

 

}
