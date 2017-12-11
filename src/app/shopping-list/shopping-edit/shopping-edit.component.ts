import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';


import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
  
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

	@ViewChild('f') slform: NgForm;
	subscription: Subscription;
	editMode = false;
	editIndex: number;
	editedItem: Ingredient;

  constructor( private slService: ShoppingListService) { }

  ngOnInit() {
  	this.subscription = this.slService.startEditting.subscribe((index: number) => {
  	this.editMode = true;
  	this.editIndex = index;
  	this.editedItem = this.slService.getIngredient(index);
  	this.slform.setValue({
  		name: this.editedItem.name,
  		amount: this.editedItem.amount,
  	});
  	});

  }
	
	onSubmit(form: NgForm){
		const newIngredient = new Ingredient(form.value.name, form.value.amount);
		if(this.editMode){
			this.slService.updateIngredient(this.editIndex, newIngredient);
		}
		else{
			this.slService.addIngredient(newIngredient);
		}
		this.editMode = false;
		form.reset();
		
	}

	onClear(){
		this.slform.reset();
		this.editMode = false;
	}

	onDeleteItem(){
		this.onClear();
		this.slService.deleteIngredient(this.editIndex);
	}

	ngOnDestroy() {
    this.subscription.unsubscribe();
  }

 

}
