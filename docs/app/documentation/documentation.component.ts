/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators/takeWhile';
import { NbThemeService, NbMenuItem } from '@nebular/theme';

import { NgdMenuService } from './menu.service';

@Component({
  selector: 'ngd-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
})
export class NgdDocumentationComponent implements OnDestroy {

  menuItems: NbMenuItem[] = [];
  private alive = true;

  constructor(private service: NgdMenuService,
              private router: Router,
              private  themeService: NbThemeService) {
    this.themeService.changeTheme('docs-page');

    this.menuItems = this.service.getPreparedMenu('/docs');

    // TODO: can we do any better?
    this.router.events
      .pipe(takeWhile(() => this.alive))
      .subscribe((event: any) => {
        if (event.url === '/docs') {
          const firstMenuItem = this.menuItems[0].children[0];
          // angular bug with replaceUrl, temp fix with setTimeout
          setTimeout(() => this.router.navigateByUrl(firstMenuItem.link, {replaceUrl: true}));
        }
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
