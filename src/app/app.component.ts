import { Component } from '@angular/core';

import { AuthService } from './core/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = `Cookit`;

  apiResult: Object = '';

  get claims() {
    return this.authService.claims;
  }

  get scopes() {
    return this.authService.scopes;
  }

  constructor(private authService: AuthService, private http: HttpClient) {}

  async loadUserProfile() {
    // Loads additional user data if available and adds them to the identity claims.
    await this.authService.loadUserProfile();
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logOut();
  }

  callApi() {
    const authHeaders = new HttpHeaders({'Authorization': 'Bearer ' + this.authService.getIdToken()});
    this.http.get('https://cookit-api.snoopfish.ch/api/recipes', {headers: authHeaders, responseType: 'json'})
      .subscribe((data => this.apiResult = data));
  }
}
