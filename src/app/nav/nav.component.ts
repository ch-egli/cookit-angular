import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {AuthService} from '../core/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  items: MenuItem[];

  get claims() {
    return this.authService.claims;
  }  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.items = [
      {
        label:'Home',
        icon:'pi pi-fw pi-home',
        routerLink: ['/dashboard']
      },
      {
        label:'New...',
        icon:'pi pi-fw pi-plus',
        routerLink: ['/menuitem/new']
      },
      {
        label:'Menu 1',
        icon:'pi pi-fw pi-file',
        routerLink: ['/menuitem/1']
      },
      {
        label:'Menu 2',
        icon:'pi pi-fw pi-file',
        routerLink: ['/menuitem/2']
      },
      {
        label:'Logout',
        icon:'pi pi-fw pi-power-off',
        routerLink: ['/'],
        command: (event) => {
          this.authService.logOut();
        }
      }
    ];
  }

}
