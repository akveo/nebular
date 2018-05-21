/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { AfterViewInit, Component, Inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Title} from '@angular/platform-browser';
import {
  distinctUntilChanged,
  filter,
  map,
  publishBehavior,
  publishReplay,
  refCount,
  tap,
  takeWhile,
} from 'rxjs/operators';
import { NB_WINDOW } from '@nebular/theme';
import { NgdStructureService, NgdTocStateService } from '../../@theme/services';
import { fromEvent,  combineLatest,  Subject } from 'rxjs';

@Component({
  selector: 'ngd-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class NgdPageComponent implements OnDestroy, AfterViewInit, OnInit {

  currentItem;
  private alive = true;
  private handleTocScroll$ = new Subject();

  constructor(@Inject(NB_WINDOW) private window,
              private ngZone: NgZone,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private structureService: NgdStructureService,
              private tocState: NgdTocStateService,
              private titleService: Title) {
  }

  ngOnInit() {
    this.handlePageNavigation();
    this.handleTocScroll();
  }

  ngAfterViewInit() {
    this.handleTocScroll$.next(null);
  }

  handlePageNavigation() {
    this.activatedRoute.params
      .pipe(
        takeWhile(() => this.alive),
        filter((params: any) => params.subPage),
        map((params: any) => {
          const slag = `${params.page}_${params.subPage}`;

          this.window.scrollTo(0, 0);

          return this.structureService.findPageBySlag(this.structureService.getPreparedStructure(), slag);
        }),
        filter(item => item),
        tap((item: any) => {
          this.titleService.setTitle(`Nebular - ${item.name}`);
        }),
        publishReplay(),
        refCount(),
      )
      .subscribe((item) => {
        this.currentItem = item;
        this.handleTocScroll$.next(null);
      });
  }

  handleTocScroll() {
    this.ngZone.runOutsideAngular(() => {
      combineLatest([
        this.handleTocScroll$,
        fromEvent(this.window, 'scroll').pipe(distinctUntilChanged(), publishBehavior(null), refCount()),
      ])
        .pipe(
          takeWhile(() => this.alive),
        )
        .subscribe(() => {

          this.tocState.list().map(item => item.setInView(false));

          const current: any = this.tocState.list().reduce((acc, item) => {
            return item.y > 0 && item.y < acc.y ? item : acc;
          }, { y: Number.POSITIVE_INFINITY, fake: true });

          if (current && !current.fake) {
            current.setInView(true);
            this.router.navigate([], { fragment: current.fragment });
          }
        });
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
