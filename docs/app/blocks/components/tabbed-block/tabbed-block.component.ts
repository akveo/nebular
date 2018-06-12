/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject,  combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NgdTabbedService } from '../../../@theme/services';

@Component({
  selector: 'ngd-tabbed-block',
  templateUrl: './tabbed-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdTabbedBlockComponent implements OnDestroy {

  currentTab;

  @Input() source;

  @Input()
  set tabs(value) {
    if (value) {
      value = Object
        .entries(value)
        .filter(([key, val]) => val)
        .map(([key, val]) => ({ tab: key }));

      this.tabs$.next(value);
    }
  }

  private tabs$ = new BehaviorSubject(null);
  private alive = true;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private cd: ChangeDetectorRef,
              private tabbedService: NgdTabbedService) {

    combineLatest([
      this.activatedRoute.params.pipe(filter((params) => !params.tab)),
      this.tabs$.pipe(filter((tabs) => tabs && tabs.length)),
    ])
      .subscribe(([params, tabs]) => {
        this.router.navigate([tabs[0].tab], { relativeTo: activatedRoute });
      });

    combineLatest([
      this.activatedRoute.params.pipe(filter((params) => params.tab)),
      this.tabs$.pipe(filter((tabs) => tabs && tabs.length)),
    ])
      .subscribe(([params, tabs]) => {
        this.currentTab = tabs.find(tab => tab.tab === params.tab);
        this.cd.detectChanges();
      });
  }

  hasOverview(component) {
    return this.tabbedService.componentHasOverview(component);
  }

  hasExamples(component) {
    return this.tabbedService.componentHasExamples(component);
  }

  hasTheme(component) {
    return this.tabbedService.componentHasTheme(component);
  }

  hasMethods(component) {
    return this.tabbedService.componentHasMethods(component);
  }

  hasProps(component) {
    return this.tabbedService.componentHasProps(component);
  }

  hasAPI(component) {
    return this.hasMethods(component) || this.hasProps(component);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
