import { Component, OnInit, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe-model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipeSubscription:Subscription;

  @Output()
  recipeList:Recipe[];
  constructor(public recipeService:RecipeService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.recipeSubscription=this.recipeService.onRecipeChanged.subscribe(
      (recipe)=>{
        this.recipeList=recipe;
      }
    )
    this.recipeList=this.recipeService.getAllRecipes();
  }

  addNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }

  ngOnDestroy(){
    this.recipeSubscription.unsubscribe();
  }
 

}
