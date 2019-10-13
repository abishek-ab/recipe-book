import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe-model';
import { RecipeService } from 'src/app/services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  // @Output() recipeSelect=new EventEmitter<Recipe>();
  @Input() recipe:Recipe;
  @Input() index:number;
  constructor(public recipeService:RecipeService,private router:Router) { }

  ngOnInit() {
  }

}
