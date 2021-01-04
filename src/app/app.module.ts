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
import { MenuItemComponent } from './menu-item/menu-item.component';
import { NavComponent } from './nav/nav.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';

@NgModule({
  declarations: [AppComponent, DashboardComponent, MenuItemComponent, NavComponent, PageNotFoundComponent],
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
    SharedModule,
    AppRoutingModule,
    CommonModule,
    MenubarModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    CalendarModule,
    InputTextareaModule,
    DropdownModule,
    MultiSelectModule,
/*
    ButtonModule,
    RadioButtonModule,
    ToggleButtonModule,
    SelectButtonModule,
    InputMaskModule,
    AccordionModule,
    FieldsetModule,
    DataTableModule,
    GrowlModule,
    PanelModule,
    CheckboxModule,
    InputSwitchModule,
    SpinnerModule,
    InputTextModule,
    ListboxModule,
    SliderModule,
    PaginatorModule,
    TabViewModule,
    ConfirmDialogModule,
    StepsModule,
    ProgressBarModule,
    ChartsModule,
    TabMenuModule,
    OverlayPanelModule,
    RatingModule
*/
  ],
  providers: [SBB_ICON_REGISTRY_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
