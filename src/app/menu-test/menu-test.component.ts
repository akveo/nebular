/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/takeWhile';
import { NbMenuService, NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'nb-menu-item1',
  template: `
    <h1>Menu Item #1</h1>
  `,
})
export class NbMenuItem1Component { }

@Component({
  selector: 'nb-menu-item2',
  template: `
    <h1>Menu Item #2</h1>
  `,
})
export class NbMenuItem2Component { }

@Component({
  selector: 'nb-menu-item3',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class NbMenuItem3Component { }

@Component({
  selector: 'nb-menu-item31',
  template: `
    <h1>Menu Item #3.1</h1>
  `,
})
export class NbMenuItem31Component { }

@Component({
  selector: 'nb-menu-item32',
  template: `
    <h1>Menu Item #3.2</h1>
  `,
})
export class NbMenuItem32Component { }

@Component({
  selector: 'nb-menu-item33',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class NbMenuItem33Component { }

@Component({
  selector: 'nb-menu-item331',
  template: `
    <h1>Menu Item #3.3.1</h1>
  `,
})
export class NbMenuItem331Component { }

@Component({
  selector: 'nb-menu-item332',
  template: `
    <h1>Menu Item #3.3.2</h1>
  `,
})
export class NbMenuItem332Component { }

@Component({
  selector: 'nb-menu-item4',
  template: `
    <h1>Menu Item #4</h1>
  `,
})
export class NbMenuItem4Component { }

@Component({
  selector: 'nb-menu-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card size="medium">
          <nb-card-body>
            <nb-menu tag="firstMenu" [items]="menuItems"></nb-menu>
            <router-outlet></router-outlet>
            <button class="btn btn-primary" id="addBtn" (click)="addMenuItem()">Add</button>
            <button class="btn btn-primary" id="homeBtn" (click)="navigateHome()">Home</button>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbMenuTestComponent implements OnInit, OnDestroy {
  menuItems = [
    {
      title: 'Menu Items',
      group: true,
    },
    {
      title: 'Menu #1',
      link: '/menu/1',
    },
    {
      title: 'Menu #2',
      link: '/menu/2',
    },
  ];

  private alive: boolean = true;

  constructor(private menuService: NbMenuService) { }

  ngOnInit() {
    this.menuService
      .onItemClick()
      .takeWhile(() => this.alive)
      .subscribe((data: { tag: string; item: NbMenuItem }) => console.info(data));

    this.menuService
      .onItemSelect()
      .takeWhile(() => this.alive)
      .subscribe((data: { tag: string; item: NbMenuItem }) => console.info(data));

    // this.itemHoverSubscription = this.menuService.onItemHover()
    //   .subscribe((data: { tag: string, item: NbMenuItem }) => console.info(data));

    this.menuService
      .onSubmenuToggle()
      .takeWhile(() => this.alive)
      .subscribe((data: { tag: string; item: NbMenuItem }) => console.info(data));

    this.menuService.addItems(
      [
        {
          title: 'Menu #3',
          children: [
            {
              title: 'Menu #3.1',
              link: '/menu/3/1',
            },
            {
              title: 'Menu #3.2',
              link: '/menu/3/2',
            },
            {
              title: 'Menu #3.3',
              children: [
                {
                  title: 'Menu #3.3.1',
                  link: '/menu/3/3/1',
                },
                {
                  title: 'Menu #3.3.2',
                  link: '/menu/3/3/2',
                  home: true,
                },
                {
                  title: '@nebular/theme',
                  target: '_blank',
                  url: 'https://github.com/akveo/ng2-admin',
                },
              ],
            },
          ],
        },
      ],
      'firstMenu',
    );
  }

  ngOnDestroy() {
    this.alive = false;
  }

  addMenuItem() {
    this.menuService.addItems([{ title: 'New Menu Item' }], 'firstMenu');
  }

  navigateHome() {
    this.menuService.navigateHome('firstMenu');
  }
}
