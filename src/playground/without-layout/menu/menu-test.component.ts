/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbMenuService, NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'nb-menu-test',
  template: `
    <nb-layout>
      <nb-sidebar state="compacted">
        <nb-menu id="menu-sidebar" tag="sidebarMenu" [items]="sidebarMenuItems"></nb-menu>
      </nb-sidebar>
      <nb-layout-column>
        <nb-card size="giant">
          <nb-card-body>
            <nb-menu id="menu-first" tag="firstMenu" [items]="firstMenuItems" [autoCollapse]="true"></nb-menu>
            <router-outlet></router-outlet>
            <button nbButton id="addBtn" (click)="addMenuItem()">Add</button>
            <button nbButton id="homeBtn" (click)="navigateHome()">Home</button>
          </nb-card-body>
        </nb-card>
        <nb-card size="giant">
          <nb-card-body>
            <nb-menu id="menu-second" tag="SecondMenu" [items]="secondMenuItems"></nb-menu>
            <router-outlet></router-outlet>
            <button nbButton id="addBtn" (click)="addMenuItem()">Add</button>
            <button nbButton id="homeBtn" (click)="navigateHome()">Home</button>
          </nb-card-body>
        </nb-card>
        <nb-card size="giant">
          <nb-card-body>
            <nb-menu id="menu-third" tag="thirdMenu" [items]="thirdMenuItems"></nb-menu>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
  standalone: false,
})
export class MenuTestComponent implements OnInit, OnDestroy {
  sidebarMenuItems: NbMenuItem[] = [
    {
      title: 'Menu Items',
      group: true,
      icon: 'home-outline',
    },
    {
      title: 'Menu #1',
      link: '/menu/menu-test.component/1',
      icon: 'home-outline',
      queryParams: { param: 1 },
      fragment: '#fragment',
    },
    {
      title: 'Menu #2',
      link: '/menu/menu-test.component/2',
      icon: 'home-outline',
    },
    {
      title: 'Menu #3',
      icon: 'home-outline',
      children: [
        {
          title: 'Menu #3.1',
          link: '/menu/menu-test.component/3/1',
        },
        {
          title: 'Menu #3.2',
          link: '/menu/menu-test.component/3/2',
        },
        {
          title: 'Menu #3.3',
          children: [
            {
              title: 'Menu #3.3.1',
              link: '/menu/menu-test.component/3/3/1',
            },
            {
              title: 'Menu #3.3.2',
              link: '/menu/menu-test.component/3/3/2',
              queryParams: { param: 2 },
              fragment: '#fragment',
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
  ];
  firstMenuItems: NbMenuItem[] = [
    {
      title: 'Menu Items',
      group: true,
      icon: 'home-outline',
    },
    {
      title: 'Menu #1',
      link: '/menu/menu-test.component/1',
      icon: 'home-outline',
      queryParams: { param: 1 },
      fragment: '#fragment',
    },
    {
      title: 'Menu #2',
      link: '/menu/menu-test.component/2',
      icon: 'home-outline',
    },
  ];
  secondMenuItems: NbMenuItem[] = [
    {
      title: 'Menu items with fragments ',
      group: true,
    },
    {
      title: 'Menu #1',
      link: '/menu/menu-test.component/1',
      icon: 'home-outline',
      pathMatch: 'prefix',
    },
    {
      title: 'Menu #12 + fragment',
      link: '/menu/menu-test.component/12',
      fragment: 'fragment',
      icon: 'home-outline',
    },
    {
      title: 'Menu #3',
      link: '/menu/menu-test.component/3',
      icon: 'home-outline',
    },
  ];
  thirdMenuItems = [
    {
      title: 'Menu #1',
    },
    {
      title: 'Menu #2',
      children: [
        {
          title: 'Menu #2.1',
        },
        {
          title: 'Hidden Submenu Item',
          hidden: true,
        },
      ],
    },
    {
      title: 'Hidden Menu Item',
      hidden: true,
    },
  ];

  private destroy$ = new Subject<void>();

  constructor(private menuService: NbMenuService) {}

  ngOnInit() {
    this.menuService
      .onItemClick()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: { tag: string; item: NbMenuItem }) => console.info(data));

    this.menuService
      .onItemSelect()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: { tag: string; item: NbMenuItem }) => console.info(data));

    // this.itemHoverSubscription = this.menuService.onItemHover()
    //   .subscribe((data: { tag: string, item: NbMenuItem }) => console.info(data));

    this.menuService
      .onSubmenuToggle()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: { tag: string; item: NbMenuItem }) => console.info(data));

    this.menuService.addItems(
      [
        {
          title: 'Menu #3',
          icon: 'home-outline',
          children: [
            {
              title: 'Menu #3.1',
              link: '/menu/menu-test.component/3/1',
            },
            {
              title: 'Menu #3.2',
              link: '/menu/menu-test.component/3/2',
            },
            {
              title: 'Menu #3.3',
              children: [
                {
                  title: 'Menu #3.3.1',
                  link: '/menu/menu-test.component/3/3/1',
                },
                {
                  title: 'Menu #3.3.2',
                  link: '/menu/menu-test.component/3/3/2',
                  queryParams: { param: 2 },
                  fragment: '#fragment',
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
    this.destroy$.next();
    this.destroy$.complete();
  }

  addMenuItem() {
    this.menuService.addItems([{ title: 'New Menu Item' }], 'firstMenu');
  }

  navigateHome() {
    this.menuService.navigateHome('firstMenu');
  }
}
