import { Component, OnInit, ViewChild, ElementRef, Output ,EventEmitter} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list-details',
  templateUrl: './shopping-list-details.component.html',
  styleUrls: ['./shopping-list-details.component.css']
})
export class ShoppingListDetailsComponent implements OnInit {

  @ViewChild('itemName',{static:false}) itemName:ElementRef;
  @ViewChild('itemAmount',{static:false}) itemAmount:ElementRef;

  constructor(public shoppingService:ShoppingListService) { }

  ngOnInit() {
  }
onAdd(){
  this.shoppingService.addIngerdients(new Ingredient(this.itemName.nativeElement.value,
    this.itemAmount.nativeElement.value))
}
}
