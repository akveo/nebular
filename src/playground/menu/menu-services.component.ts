/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { NbMenuBag } from '@nebular/theme/components/menu/menu.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'nb-menu-item1',
  template: `
    <h1>Home</h1>
  `,
})
export class NbMenuServiceItem1Component { }

@Component({
  selector: 'nb-menu-item2',
  template: `
    <h1>User account</h1>
  `,
})
export class NbMenuServiceItem2Component { }

@Component({
  selector: 'nb-menu-item3',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class NbMenuServiceItem3Component { }

@Component({
  selector: 'nb-menu-item31',
  template: `
    <h1>Services</h1>
  `,
})
export class NbMenuServiceItem31Component { }

@Component({
  selector: 'nb-menu-item32',
  template: `
    <h1>Hardware</h1>
  `,
})
export class NbMenuServiceItem32Component { }

@Component({
  selector: 'nb-menu-item33',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class NbMenuServiceItem33Component { }

@Component({
  selector: 'nb-menu-item331',
  template: `
    <h1>Open Source Software</h1>
  `,
})
export class NbMenuServiceItem331Component { }

@Component({
  selector: 'nb-menu-item332',
  template: `
    <h1>Commercial Software</h1>
  `,
})
export class NbMenuServiceItem332Component { }

@Component({
  selector: 'nb-menu-item4',
  template: `
    <h1>Menu Item #4</h1>
  `,
})
export class NbMenuServiceItem4Component { }

@Component({
  selector: 'nb-menu-services',
  template: `
    <nb-card size="xxlarge">
      <nb-card-body>
        <nb-menu id="menu-first" tag="firstMenu" [items]="firstMenuItems" [autoCollapse]="true"></nb-menu>
        <router-outlet></router-outlet>
        <div>Selected item: <strong>{{ selectedItem }}</strong></div>
        <button nbButton id="addBtn" (click)="addMenuItem()">Add Menu Item</button>
        <button nbButton id="collapseBtn" (click)="collapseAll()">Collapse all menu items</button>
        <button nbButton id="homeBtn" (click)="navigateHome()">Home</button>
        <button nbButton id="getSelectedItemBtn" (click)="getSelectedItem()">Get Selected Item</button>
      </nb-card-body>
    </nb-card>
  `,
  styles: [`
    [nbButton] {
      margin-right: 1rem;
      margin-bottom: 1rem;
      margin-top: 1rem;
    }
  `],
})
export class NbMenuServicesComponent implements OnInit, OnDestroy {

  firstMenuItems = [
    {
      title: 'Home',
      link: '/example/menu/menu-services.component/1',
      icon: 'nb-keypad',
      home: true,
    },
    {
      title: 'User account',
      link: '/example/menu/menu-services.component/2',
      icon: 'nb-keypad',
    },
    {
      title: 'Shop',
      icon: 'nb-keypad',
      expanded: true,
      children: [
        {
          title: 'Services',
          link: '/example/menu/menu-services.component/3/1',
          icon: 'nb-keypad',
        },
        {
          title: 'Hardware',
          link: '/example/menu/menu-services.component/3/2',
          icon: 'nb-keypad',
        },
        {
          title: 'Software',
          icon: 'nb-keypad',
          expanded: true,
          children: [
            {
              title: 'Open Source',
              link: '/example/menu/menu-services.component/3/3/1',
              icon: 'nb-keypad',
            },
            {
              title: 'Commercial',
              link: '/example/menu/menu-services.component/3/3/2',
              icon: 'nb-keypad',
              queryParams: {param: 2},
              fragment: 'fragment',
            },
          ],
        },
      ],
    },
  ];

  private alive: boolean = true;
  selectedItem: string;

  constructor(private menuService: NbMenuService) { }

  ngOnInit() {}

  ngOnDestroy() {
    this.alive = false;
  }

  addMenuItem() {
    this.menuService.addItems([{
      title: '@nebular/theme',
      target: '_blank',
      icon: 'nb-keypad',
      url: 'https://github.com/akveo/ngx-admin',
    }], 'firstMenu');
  }

  collapseAll() {
    this.menuService.collapseAll('firstMenu');
  }

  navigateHome() {
    this.menuService.navigateHome('firstMenu');
  }

  getSelectedItem() {
    this.menuService.getSelectedItem('firstMenu')
      .pipe(takeWhile(() => this.alive))
      .subscribe( (menuBag: NbMenuBag) => {
        this.selectedItem = menuBag.item.title;
      });
  }
}
