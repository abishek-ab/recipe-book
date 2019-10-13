import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-list-details',
  templateUrl: './shopping-list-details.component.html',
  styleUrls: ['./shopping-list-details.component.css']
})
export class ShoppingListDetailsComponent implements OnInit {

  // @ViewChild('itemName',{static:false}) itemName:ElementRef;
  // @ViewChild('itemAmount',{static:false}) itemAmount:ElementRef;
  @ViewChild('shoppingForm', { static: false }) form: NgForm;
  public ingredient:Ingredient;
  editMode:boolean=false;
  editedId:number;

  constructor(public shoppingService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingService.shoppingEdit.subscribe(
      (data:number)=> {
        this.editMode=true;
        this.editedId=data;
        this.ingredient=this.shoppingService.getIngredientById(data);
      this.form.setValue({
        name:this.ingredient.name,
        amount:this.ingredient.amount
      })
    }
    );
}
  onSumbit() {
    if(this.editMode){
      this.shoppingService.updateIngerdient(this.editedId,new Ingredient(this.form.value.name,
        this.form.value.amount));
    }else{
      this.shoppingService.addIngerdients(new Ingredient(this.form.value.name,
        this.form.value.amount));
    }
      this.form.reset();
      this.editedId=null;
      this.editMode=false;
  }

  onDelete(){
    this.shoppingService.deleteIngredient(this.editedId);
    this.onClear();
  }

  onClear(){
    this.form.reset();
    this.editMode=false;
  }
}
