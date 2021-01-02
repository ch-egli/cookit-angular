import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/auth.service';
import {BackendService} from '../core/backend.service';
import {MenuItem} from '../core/backend.models';
import {first} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [BackendService, AuthService]
})
export class DashboardComponent implements OnInit {
  title = 'Cookit - Dashboard';
  recipes: MenuItem[];

  get hasValidSession() {
    return this.authService.isLoggedIn();
  }

  constructor(private authService: AuthService, private backendService: BackendService, private route: ActivatedRoute) {
    route.params.subscribe(val => {
      // console.log('route activated: ' + JSON.stringify(val));
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    if (this.hasValidSession) {
      this.getRecipes();
    } else {
      this.authService.getEvents().pipe(first((e) => e.type === 'token_received')).subscribe((event) => {
        console.log('authService event: ' + JSON.stringify(event));
        this.getRecipes();
      });
    }
  }

  getRecipes() {
    this.backendService.getRecipes().subscribe(
      data => {
        this.recipes = data;
      }, error => {
        console.log('getRecipes error: ' + JSON.stringify(error));
        this.authService.logOut();
      });
  }
}
