import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model'

import { ShoppingListService } from '../shopping-list/shopping-list.service'

@Injectable()
export class RecipeService {

	recipeChanged = new Subject<Recipe[]>();

	private recipeList: Recipe[] = [

		new Recipe('CHOCOLATE CAKE RECIPE', "Although this cake looks very elegant and like something you'd only serve at special occasions, it's really, really easy.", 'https://i.ytimg.com/vi/niYK8DcsKQc/maxresdefault.jpg',[
			new Ingredient('Dark Chocolate',3),
			new Ingredient('Butter',1),
			new Ingredient('Boiling Water(cup)',1),
			new Ingredient('Sugar(cup)',1),
			new Ingredient('Egg',2),
			new Ingredient('All-purpose flour(cup)',1),
			new Ingredient('Baking Soda(teaspoon)',1),
			new Ingredient('Salt(teaspoon)',1)		
		]),

		new Recipe('CHICKEN BIRYANI', 'Every grain of rice colourful and flavourful, a bite of chicken with every spoonful, the crunch of fried almonds interspersed with spicy and minty freshness. This dum biryani recipe is a fail proof biryani recipe and is so easy and so full of flavours that you would want to make it every weekend. So why delay; I am making it again, and you should too.', 'https://i0.wp.com/files.hungryforever.com/wp-content/uploads/2017/06/09121657/chicken-fry-biryani-recipes.jpg?w=1269&strip=all&quality=80',[
			new Ingredient('Rice(cup)',2),
			new Ingredient('Chicken',1),
			new Ingredient('Onion',1),
			new Ingredient('Tomamto',1),
			new Ingredient('Masala(teaspoon)',1),
			new Ingredient('Yogurt(cup)',1),
			new Ingredient('Green Chillies',3)
		]);
	];


	setRecipes(recipes: Recipe[]){
		this.recipeList = recipes;
		this.recipeChanged.next(this.recipeList.slice());
	}


	constructor(private slService: ShoppingListService){

	}

	getRecipe(){
		return this.recipeList.slice();
	}

	addIngredientToShoppingList(ingredients: Ingredient[]){
		this.slService.addIngredients(ingredients);
	}

	getRecipeId(id: number){
		return this.recipeList[id];
	}

	addRecipe(recipe: Recipe){
		this.recipeList.push(recipe);
		this.recipeChanged.next(this.recipeList.slice());
	}

	updateRecipe(index: number, newRecipe:Recipe){
		this.recipeList[index] = newRecipe;
		this.recipeChanged.next(this.recipeList.slice());
	}

	deleteRecipe(index: number){
		this.recipeList.splice(index,1);
		this.recipeChanged.next(this.recipeList.slice());
	}
	
}