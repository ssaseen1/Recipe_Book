import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Recipe } from '../recipe.model';

import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  
  subscription: Subscription;
	recipeList: Recipe[];


  constructor(private recipeService: RecipeService,
  				private router: Router,
  				private route : ActivatedRoute) {
   }

  ngOnInit() {

    this.subscription = this.recipeService.recipeChanged.subscribe((recipes: Recipe[]) => {
      this.recipeList = recipes;
    });

    this.recipeList = this.recipeService.getRecipe();
  }

  onNewRecipe(){
  	this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  
}
