import { Component, OnInit } from '@angular/core';
import {AuthService} from '../core/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  title = 'Cookit - Dashboard';

  get hasValidSession() {
    return this.authService.isLoggedIn();
  }

  constructor(private authService: AuthService) {
  }

}
