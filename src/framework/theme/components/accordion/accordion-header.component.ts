/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  ChangeDetectionStrategy,
  Host,
  HostListener,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { merge } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { NbAccordionComponent } from './accordion.component';

@Component({
  selector: 'nb-accordion-header',
  styleUrls: ['./accordion-header.component.scss'],
  template: `
    <ng-content select="nb-accordion-title"></ng-content>
    <ng-content select="nb-accordion-description"></ng-content>
    <ng-content></ng-content>
    <i *ngIf="isExpanded" class="nb-arrow-up"></i>
    <i *ngIf="isCollapsed" class="nb-arrow-down"></i>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionHeaderComponent implements OnInit, OnDestroy {
  private alive: boolean = true;

  constructor(@Host() private accordion: NbAccordionComponent, private cdr: ChangeDetectorRef) {}

  get isCollapsed(): boolean {
    return !!this.accordion.collapsed;
  }

  get isExpanded(): boolean {
    return !this.accordion.collapsed;
  }

  @HostListener('click')
  toggle() {
    this.accordion.toggle();
  }

  ngOnInit() {
    merge(this.accordion.closed, this.accordion.opened, this.accordion.inputChanges)
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.cdr.markForCheck());
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
