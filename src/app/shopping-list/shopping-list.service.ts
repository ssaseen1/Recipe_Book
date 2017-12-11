import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService{

ingredientsChanged = new Subject<Ingredient[]>();
startEditting = new Subject<number>();

ingredients: Ingredient[] = [
  new Ingredient('Apple', 5),
  new Ingredient('Banana', 2)
  ];


  getIngredients(){
   return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient){
  	this.ingredients.push(ingredient);
  	this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredient(index: number){
      return this.ingredients[index];
  }

  addIngredients(ingredient: Ingredient[]){
    this.ingredients.push(...ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());

  }

  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number){

    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }



}