/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, OnDestroy } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { MENU_ITEMS } from './menu-service-items';

@Component({
  selector: 'nb-menu-services',
  template: `
    <nb-card size="giant">
      <nb-menu tag="menu" [items]="menuItems"></nb-menu>
      <div class="control-panel">
        <router-outlet></router-outlet>
        <h3 class="h4">Selected item: {{ selectedItem }}</h3>
        <button nbButton (click)="addMenuItem()">Add Menu Item</button>
        <button nbButton (click)="collapseAll()">Collapse all menu items</button>
        <button nbButton (click)="navigateHome()">Home</button>
        <button nbButton (click)="getSelectedItem()">Get Selected Item</button>
      </div>
    </nb-card>
  `,
  styleUrls: ['./menu-service.component.scss'],
})
export class MenuServiceComponent implements OnDestroy {

  menuItems = MENU_ITEMS;

  private alive: boolean = true;
  selectedItem: string;

  constructor(private menuService: NbMenuService) { }

  ngOnDestroy() {
    this.alive = false;
  }

  addMenuItem() {
    this.menuService.addItems([{
      title: '@nebular/theme',
      target: '_blank',
      icon: 'plus-outline',
      url: 'https://github.com/akveo/ngx-admin',
    }], 'menu');
  }

  collapseAll() {
    this.menuService.collapseAll('menu');
  }

  navigateHome() {
    this.menuService.navigateHome('menu');
  }

  getSelectedItem() {
    this.menuService.getSelectedItem('menu')
      .pipe(takeWhile(() => this.alive))
      .subscribe( (menuBag) => {
        this.selectedItem = menuBag.item.title;
      });
  }
}
