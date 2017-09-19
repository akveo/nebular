/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/merge';

import { NbMenuItem } from '@nebular/theme';
import { NbMenuInternalService } from '@nebular/theme/components/menu/menu.service';
import { DocsService } from './docs.service';

import 'rxjs/add/operator/filter';

@Component({
  selector: 'ngd-docs',
  styleUrls: ['docs.component.scss'],
  template: `
     <nb-layout>
      <nb-layout-header fixed>
        <ngd-header></ngd-header>
      </nb-layout-header>
      <nb-sidebar>
        <nb-menu [items]="menuItems" tag="leftMenu"></nb-menu>
      </nb-sidebar>
      <nb-layout-column>
        <router-outlet></router-outlet>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NgdDocsComponent implements OnDestroy {

  structure: any;
  menuItems: NbMenuItem[] = [];
  private routerSubscription: Subscription;

  constructor(private service: DocsService,
              private router: Router,
              private menuInternalService: NbMenuInternalService) {

    this.menuItems = this.service.getPreparedMenu();
    this.structure = this.service.getPreparedStructure();

    this.routerSubscription = this.router.events
      .subscribe((event) => {
        if (event['url'] === '/docs') {
          const firstMenuItem = this.menuItems[0].children[0];
          this.menuInternalService.itemSelect(firstMenuItem);
          // angular bug with replaceUrl, temp fix with setTimeout
          setTimeout(() => this.router.navigateByUrl(firstMenuItem.link, { replaceUrl: true }));
        }
      });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
