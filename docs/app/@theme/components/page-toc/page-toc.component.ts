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
import { publishReplay, refCount, map } from 'rxjs/operators';

@Component({
  selector: 'ngd-page-toc',
  styleUrls: ['./page-toc.component.scss'],
  template: `
    <h4>Overview</h4>
    <ul *ngIf="(items$ | async).length > 0">
      <li *ngFor="let item of (items$ | async)" [class.selected]="item.selected">
        <a [routerLink]="item.link" [fragment]="item.fragment">{{ item.title }}</a>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdPageTocComponent implements OnDestroy {

  items$: Observable<any[]> = observableOf([]);

  @Input()
  set toc(value) {
    this.items$ = combineLatest(
      observableOf(value || []),
      this.fragment$,
    )
      .pipe(
        takeWhile(() => this.alive),
        map(([toc, fragment]) => {
          return toc.map((item: any) => ({ ...item, selected: fragment === item.fragment }));
        }),
      );
  }

  private alive = true;
  private fragment$: Observable<any>;

  constructor(private activatedRoute: ActivatedRoute) {
    this.fragment$ = this.activatedRoute.fragment.pipe(publishReplay(), refCount());
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
