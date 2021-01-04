import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuItem} from '../core/backend.models';
import {AuthService} from '../core/auth.service';
import {BackendService} from '../core/backend.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Message} from 'primeng/api';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  providers: [BackendService, AuthService]
})
export class MenuItemComponent implements OnInit {

  recipeId: string;
  createdAt: Date;
  updatedAt: Date;

  recipe: MenuItem;

  recipeForm: FormGroup;
  readonly = false;

  msgs: Message[] = [];
  deCH: any;

  constructor(private authService: AuthService, private backendService: BackendService, private route: ActivatedRoute,
              private router: Router, private fb: FormBuilder) {
    route.params.subscribe(val => {
      // console.log('route activated: ' + JSON.stringify(val));
      this.ngOnInit();
    });
  }

  get title() { return this.recipeForm.get('title'); }
  get description() { return this.recipeForm.get('description'); }
  get category() { return this.recipeForm.get('category'); }
  get effort() { return this.recipeForm.get('effort'); }
  get tags() { return this.recipeForm.get('tags'); }

  ngOnInit(): void {
    // console.log('paramMap: ' + JSON.stringify(this.route.snapshot.paramMap));
    this.recipeId = this.route.snapshot.paramMap.get('mi');

    this.recipeForm = this.fb.group({
      // initial values do not work, therefore they are initialized as variables...
      id: [''],
      title: ['', Validators.required],
      description: [''],
      category: [''],
      effort: [''],
      tags: [''],
      image1: [null],
      image2: [null],
      image3: [null],
    });

    if (this.recipeId !== 'new') {
      this.backendService.getRecipe(Number(this.recipeId)).subscribe((res) => {
          const rec: MenuItem = res;
          console.log(JSON.stringify(rec));

          this.createdAt = rec.created_at;
          this.updatedAt = rec.updated_at;

          this.recipeForm.setValue({
            id: rec.id,
            title: rec.title,
            description: rec.description,
            category: rec.category,
            effort: rec.effort,
            tags: rec.tags,
            image1: null,
            image2: null,
            image3: null,
          });
        },
        error => {
          console.log('getRecipe error: ' + JSON.stringify(error));
          this.msgs.push({
            severity: 'error', summary: 'Error while loading recipe: ',
            detail: 'Are you offline?'
          });
          this.authService.logOut();
        }
      );
    } else {
      // is new...
    }
  }

  public save() {
    const val = this.recipeForm.value;
    // console.log('workoutForm values: ' + JSON.stringify(val));
    // console.log('gefühl: ' + this.gefuehl);

    let recipe: any = {
      title: val.title,
      description: val.description,
      category: val.category,
      effort: val.effort,
      tags: val.tags
    };

    if (this.recipeId === 'new') {
      this.backendService.addRecipe(recipe).subscribe(
        data1 => {
          console.log('recipe successfully added: ' + JSON.stringify(data1));
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.log('addRecipe error: ' + JSON.stringify(error));
          this.msgs.push({
            severity: 'error', summary: 'Error while saving recipe: ',
            detail: 'Are you offline or are the introduced data not correct?'
          });
          this.authService.logOut();
        }
      );
    } else {
      recipe.id = this.recipeId;
      this.backendService.changeRecipe(recipe).subscribe(
        data => {
          console.log('recipe successfully changed: ' + JSON.stringify(data));
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.log('changeWorkout error: ' + error);
          this.msgs.push({
            severity: 'error', summary: 'Error while saving recipe: ',
            detail: 'Are you offline or are the introduced data not correct?'
          });
          this.authService.logOut();
        }
      );
    }
  }

  public cancel() {
    this.router.navigate(['/dashboard']);
  }

  public isNew() {
    return this.recipeId === 'new';
  }
}
