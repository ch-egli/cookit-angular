import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SbbButtonModule } from '@sbb-esta/angular-business/button';
import { SbbLinksModule } from '@sbb-esta/angular-business/links';
import { SBB_ICON_REGISTRY_PROVIDER } from '@sbb-esta/angular-core/icon';
import { OAuthModule } from 'angular-oauth2-oidc';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SbbButtonModule,
    SbbLinksModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        // Add your api addresses here. When sendAccessToken is set to true
        // and you send a request to these, the access token is appended.
        // Documentation:
        // https://manfredsteyer.github.io/angular-oauth2-oidc/docs/additional-documentation/working-with-httpinterceptors.html
        allowedUrls: ['https://cookit.snoopfish.ch', 'http://localhost:8080'],
        sendAccessToken: false,
      },
    }),
    AppRoutingModule,
  ],
  providers: [SBB_ICON_REGISTRY_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
