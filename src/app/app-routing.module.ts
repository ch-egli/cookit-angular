import { NgModule}  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './core/auth-guard';

// Use the AuthGuard in routes that should require a logged in user.
// Do NOT use it for the root route. If the user should always be logged in,
// see comment in the AppComponent constructor.
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'menuitem/:mi', component: MenuItemComponent, canActivate: [AuthGuard] },
  { path: '', component: DashboardComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', useHash: false, enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
