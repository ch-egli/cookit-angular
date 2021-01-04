import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuItem} from '../core/backend.models';
import {AuthService} from '../core/auth.service';
import {BackendService} from '../core/backend.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Message, SelectItem} from 'primeng/api';
import {forkJoin, Observable, of} from 'rxjs';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  providers: [BackendService, AuthService]
})
export class MenuItemComponent implements OnInit {

  recipeId: string;
  image1: any;
  image2: any;
  image3: any;
  reader1 = new FileReader();
  reader2 = new FileReader();
  reader3 = new FileReader();

  createdAt: Date;
  updatedAt: Date;

  recipe: MenuItem;

  recipeForm: FormGroup;
  categoryOptions: SelectItem[] = [];
  effortOptions: SelectItem[] = [];
  tagOptions: SelectItem[] = [];

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

  get title() {
    return this.recipeForm.get('title');
  }

  get description() {
    return this.recipeForm.get('description');
  }

  get category() {
    return this.recipeForm.get('category');
  }

  get effort() {
    return this.recipeForm.get('effort');
  }

  get tags() {
    return this.recipeForm.get('tags');
  }

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
      tags: [[]],
      image1: [null],
      image2: [null],
      image3: [null],
    });

    forkJoin({
      cats: this.backendService.getCategories(),
      effs: this.backendService.getEffortValues(),
      tags: this.backendService.getTags(),
      rcps: this.getRecipes()
    })
      .subscribe(({cats, effs, tags, rcps}) => {
        console.log('got categories: ' + JSON.stringify(cats));
        this.categoryOptions = [];
        cats.forEach((category) => {
          this.categoryOptions.push({ label: category, value: category });
        });

        console.log('got effortValues: ' + JSON.stringify(effs));
        this.effortOptions = [];
        effs.forEach((effort) => {
          this.effortOptions.push({ label: effort, value: effort });
        });

        console.log('got tagValues: ' + JSON.stringify(tags));
        this.tagOptions = [];
        tags.forEach((tag) => {
          this.tagOptions.push({ label: tag, value: tag });
        });

        const rec: MenuItem = rcps;
        console.log('got recipe: ' + JSON.stringify(rec));
        if (rec !== null) {
          this.createdAt = rec.created_at;
          this.updatedAt = rec.updated_at;
          this.recipeForm.setValue({
            id: rec.id,
            title: rec.title,
            description: rec.description,
            category: rec.category,
            effort: rec.effort,
            tags: rec.tags.split(','),
            image1: null,
            image2: null,
            image3: null,
          });
          this.getImages(rec);
        }
      }, error => {
        console.log('get categories/effortValues/tagValues/recipe error: ' + JSON.stringify(error));
        this.authService.logOut();
      });
  }

  public getRecipes(): Observable<any> {
    if (this.recipeId !== 'new') {
      return this.backendService.getRecipe(Number(this.recipeId));
    } else {
      return of(null)
    }
  }

  public save() {
    const val = this.recipeForm.value;
    //console.log('form value: ' + JSON.stringify(val));

    let recipe: any = {
      title: val.title,
      description: val.description,
      category: val.category,
      effort: val.effort,
      tags: val.tags.join(',')
    };

    if (this.recipeId === 'new') {
      console.log('submitted recipe (new): ' + JSON.stringify(recipe));
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
      console.log('submitted recipe (update): ' + JSON.stringify(recipe));
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

  public getImages(recipe: any) {
    if (recipe.image1 !== null) {
      this.backendService.getImage(Number(this.recipeId), 1).subscribe(data => {
          this.image1 = this.createImageFromBlob(data, this.reader1, 1);
        }
      ), error => {
        console.log('get image1 failed: ' + JSON.stringify(error));
        this.authService.logOut();
      }
    }
    if (recipe.image2 !== null) {
      this.backendService.getImage(Number(this.recipeId), 2).subscribe(data => {
          this.image2 = this.createImageFromBlob(data, this.reader2,2);
        }
      ), error => {
        console.log('get image2 failed: ' + JSON.stringify(error));
        this.authService.logOut();
      }
    }
    if (recipe.image3 !== null) {
      this.backendService.getImage(Number(this.recipeId), 3).subscribe(data => {
          this.image3 = this.createImageFromBlob(data, this.reader3, 3);
        }
      ), error => {
        console.log('get image3 failed: ' + JSON.stringify(error));
        this.authService.logOut();
      }
    }
  }

  public createImageFromBlob(image: Blob, reader: FileReader, imageNumber: number) {
    reader.addEventListener("load", () => {
      switch (imageNumber) {
        case 1:
          this.image1 = reader.result;
          break;
        case 2:
          this.image2 = reader.result;
          break;
        case 3:
          this.image3 = reader.result;
          break;
        default:
          console.log("invalid image number")
          break;
      }
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  public cancel() {
    this.router.navigate(['/dashboard']);
  }

  public isNew() {
    return this.recipeId === 'new';
  }
}
