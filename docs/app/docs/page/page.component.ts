/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, OnDestroy } from '@angular/core';

import { NbMenuService } from '@nebular/theme';
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'ngd-page',
  styleUrls: ['page.component.scss'],
  template: `
    <nb-card>
      <nb-card-header *ngIf="isHeader"><h1>{{ currentItem?.name }}</h1></nb-card-header>
      <nb-card-body>
        <ng-container *ngFor="let block of currentItem?.children">
          <ngd-block [block]="block"></ngd-block>
        </ng-container>
       </nb-card-body>
     </nb-card>
  `,
})
export class NgdPageComponent implements OnDestroy {
  currentItem: any;
  isHeader: boolean = true;

  private menuSubscription: Subscription;

  constructor(private menuService: NbMenuService,
              private titleService: Title) {

    this.menuSubscription = this.menuService.onItemSelect()
      .subscribe((event: {tag: string, item: any}) => {
        if (event && event.item && event.item.data) {
          this.setupPage(event);
        }
      });
  }

  setupPage(event) {
    this.currentItem = event.item.data;
    this.isHeader = !this.currentItem.children ||
      !this.currentItem.children[0].block ||
      this.currentItem.children[0].block !== 'theme';

    this.titleService.setTitle(`Nebular Documentation - ${event.item.data.name}`);
    window.scrollTo(0, 0);
  }

  ngOnDestroy() {
    this.menuSubscription.unsubscribe();
  }
}
