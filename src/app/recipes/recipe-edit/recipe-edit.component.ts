import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  selectedId: number;
  editMode: boolean = false;
  recipeForm: FormGroup;
  ingredientsArray=new FormArray([]);

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) {

  }

  ngOnInit() {
    this.buildForm(null);
    this.route.params.subscribe(
      (data) => {
        this.selectedId = data['id'];
        this.editMode = data['id'] != null;
        this.buildForm(this.recipeService.getRecipeById(this.selectedId));
      }
    );

  } h

  private buildForm(recipe) {
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipe ? recipe.name : '',Validators.required),
      'imagePath': new FormControl(recipe ? recipe.imagePath : '',Validators.required),
      'decription': new FormControl(recipe ? recipe.decription : '',Validators.required),
      'ingredients': this.buildFormArray(recipe)
    })
  }

  buildFormArray(recipe) {
    if (recipe != null) {
      for (let ingredient of recipe.ingredients) {
        this.ingredientsArray.push(
          new FormGroup({
            'name': new FormControl(ingredient ? ingredient.name : '',Validators.required),
            'amount': new FormControl(ingredient ? ingredient.amount : '',[
              Validators.required,
              Validators.pattern(/^[0-9]*$/)
            ])
          })
        )
      }
    }
    return this.ingredientsArray;
  }



  public onSubmit() {
    console.log(this.recipeForm.value);
    if(this.editMode){
      this.recipeService.updateRecipe(this.selectedId,this.recipeForm.value);
    }else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCancel() {
    if (this.recipeForm.dirty) {
      if (confirm('Do you want to discard the changes ?')) {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    } else {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  getIngredientsControl() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  addIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl('',Validators.required),
        'amount':new FormControl('',[
          Validators.required,
          Validators.pattern(/^[0-9]*$/)
        ])
      })
    )
  }

  onIngredientDelete(id:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(id);
  }


}
