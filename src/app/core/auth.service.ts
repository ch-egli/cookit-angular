import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService, UserInfo } from 'angular-oauth2-oidc';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Promise that resolves once the login process has been completed.
  // This only works for forceful logins.
  private readonly initialized: Promise<unknown>;

  get claims() {
    return this.oauthService.getIdentityClaims() as { email: string; name: string };
  }

  get scopes() {
    return this.oauthService.getGrantedScopes() as string[];
  }

  constructor(private oauthService: OAuthService, private router: Router, location: Location) {
    this.oauthService.configure(environment.authConfig);
    this.oauthService.setupAutomaticSilentRefresh();
    // If the user should not be forcefully logged in (e.g. if you have pages, which can be
    // accessed anonymously), change loadDiscoveryDocumentAndLogin to
    // loadDiscoveryDocumentAndTryLogin and have a login functionality in the
    // template of the component injecting the AuthService which calls the login() method.
    this.initialized = this.oauthService
      //.loadDiscoveryDocumentAndLogin({ state: location.path() })
      .loadDiscoveryDocumentAndTryLogin()


      // If the user is not logged in, he will be forwarded to the identity provider
      // and this promise will not resolve. After being redirected from the identity
      // provider, the login promise will return true.
      .then((v) => (v ? true : new Promise(() => {})));
    // Redirect the user to the url configured with state above or in a separate login call.
    this.oauthService.events.pipe(first((e) => e.type === 'token_received')).subscribe(() => {
      // This is required for RedHat SSO, since they encode the state.
      const state = decodeURIComponent(this.oauthService.state || '');
      if (state && state !== '/') {
        this.router.navigate([state]);
      }
    });
  }

  // Optional. Can be removed, if the user user is forcefully logged in as defined above.
  login() {
    // Set the current url as the state. This will enable redirection after login.
    return this.oauthService.initLoginFlow(this.router.url);
  }

  // Optional. Can be removed, if the user user is forcefully logged in as defined above.
  logOut() {
    // With providing true to .logOut, the app does not redirect after logging out.
    return this.oauthService.logOut(true);
  }

  loadUserProfile(): Promise<UserInfo> {
    return this.oauthService.loadUserProfile();
  }

  getIdToken() {
    const idToken = this.oauthService.getIdToken();
    console.log('ID Token: ' + idToken);
    return idToken;
  }
}
