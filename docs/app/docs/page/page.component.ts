/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { NbMenuService } from '@nebular/theme';
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

@Component({
  selector: 'ngd-page',
  styleUrls: ['page.component.scss'],
  template: `
    <nb-card>
      <nb-card-header *ngIf="isHeader"><h1>{{ currentItem?.name }}</h1></nb-card-header>
      <nb-card-body>
        <ng-container *ngFor="let item of currentItem?.children">
          <ng-container [ngSwitch]="item.block">

            <ngd-markdown-block *ngSwitchCase="'markdown'" [block]="item"></ngd-markdown-block>
            <ngd-component-block *ngSwitchCase="'component'" [blockData]="item.blockData"></ngd-component-block>
            <ngd-theme-block *ngSwitchCase="'theme'" [block]="item"></ngd-theme-block>

          </ng-container>
        </ng-container>
       </nb-card-body>
     </nb-card>
  `,
})
export class NgdPageComponent implements OnDestroy, OnInit {
  currentItem: any;
  isHeader: boolean = true;

  private routerSubscription: Subscription;
  private initialSubscription: Subscription;

  constructor(private menuService: NbMenuService,
              private router: Router,
              private titleService: Title) { }

  ngOnInit() {

    this.initialSubscription = this.menuService.getSelectedItem('leftMenu')
      .subscribe((event: {tag: string, item: any}) => {
        if (event && event.item && event.item.data) {
          this.setupPage(event);
        }
      });

    this.routerSubscription = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .switchMap(event => this.menuService.getSelectedItem('leftMenu'))
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
    this.initialSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }
}
