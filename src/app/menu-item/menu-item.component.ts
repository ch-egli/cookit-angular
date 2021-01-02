import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  menuId: string;

  constructor(private route: ActivatedRoute) {
    route.params.subscribe(val => {
      // console.log('route activated: ' + JSON.stringify(val));
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    // console.log('paramMap: ' + JSON.stringify(this.route.snapshot.paramMap));
    this.menuId = this.route.snapshot.paramMap.get('mi');
  }

}
