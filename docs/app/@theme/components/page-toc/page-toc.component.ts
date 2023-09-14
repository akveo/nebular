/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';
import { takeUntil, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subject, Observable } from 'rxjs';

@Component({
  selector: 'ngd-page-toc',
  styleUrls: ['./page-toc.component.scss'],
  template: `
    <ng-container *ngIf="items?.length > 0">
      <h4>Overview</h4>
      <ul>
        <li *ngFor="let item of items" [class.selected]="item.selected">
          <a routerLink="." [fragment]="item.fragment">{{ item.title }}</a>
        </li>
      </ul>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdPageTocComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  items: any[];

  @Input()
  set toc(value: Observable<any[]>) {
    combineLatest([value, this.activatedRoute.fragment])
      .pipe(
        map(([toc, fragment]) => {
          toc = toc.map((item: any) => ({ ...item, selected: fragment === item.fragment }));
          if (toc.length && !toc.find((item) => item.selected)) {
            toc[0].selected = true;
          }
          return toc;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((toc) => {
        this.items = toc;
        this.cd.detectChanges();
      });
  }

  constructor(private activatedRoute: ActivatedRoute, private cd: ChangeDetectorRef) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
