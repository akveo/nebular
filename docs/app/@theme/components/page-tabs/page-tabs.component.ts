/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators/takeWhile';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map, publishReplay, refCount } from 'rxjs/operators';

@Component({
  selector: 'ngd-page-tabs',
  styleUrls: ['./page-tabs.component.scss'],
  template: `
    <a *ngFor="let item of items$ | async" [class.selected]="item.selected" [routerLink]="['../', item.tab]">
      <i [class]="item.icon"></i>
      <span>{{ item.title }}</span>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdPageTabsComponent implements OnDestroy {

  items$: Observable<any[]> = observableOf([]);

  @Input()
  set tabs(value) {
    this.items$ = combineLatest(
      observableOf(value || []).pipe(
        map(tabs => this.availableTabs.filter(tab => tabs[tab.tab])),
      ),
      this.activatedRoute.params.pipe(publishReplay(), refCount()),
    )
      .pipe(
        takeWhile(() => this.alive),
        map(([tabs, params]) => (tabs.map((item: any) => ({...item, selected: item.tab === params.tab})))),
      );
  }

  private availableTabs: {
    tab: string;
    title: string;
    icon: string;
    selected?: boolean;
  }[] = [
    {
      tab: 'overview',
      title: 'Overview',
      icon: 'some icon',
      selected: true,
    },
    {
      tab: 'api',
      title: 'API',
      icon: 'some icon',
    },
    {
      tab: 'theme',
      title: 'Theme',
      icon: 'some icon',
    },
    {
      tab: 'examples',
      title: 'Examples',
      icon: 'some icon',
    },
  ];
  private alive = true;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
