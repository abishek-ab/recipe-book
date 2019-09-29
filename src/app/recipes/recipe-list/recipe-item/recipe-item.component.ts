import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe-model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  // @Output() recipeSelect=new EventEmitter<Recipe>();
  @Input() recipe:Recipe;
  constructor(public recipeService:RecipeService) { }

  ngOnInit() {
  }

  onRecipeClick(recipe){
    this.recipeService.onRecipeSelect.emit(recipe);
  }

}
