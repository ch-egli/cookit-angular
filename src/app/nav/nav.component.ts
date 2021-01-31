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
        label:'Nouveau...',
        icon:'pi pi-fw pi-plus',
        routerLink: ['/menuitem/new']
      },
      {
        label:'Se déconnecter',
        icon:'pi pi-fw pi-power-off',
        routerLink: ['/'],
        command: (event) => {
          this.authService.logOut();
        }
      }
    ];
  }

}
