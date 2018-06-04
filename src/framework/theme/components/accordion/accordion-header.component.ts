/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  ChangeDetectionStrategy,
  Host,
  HostBinding,
  HostListener,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { merge } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { NbAccordionComponent } from './accordion.component';

const expansionIndicatorTrigger = trigger('expansion-indicator', [
  state(
    'expanded',
    style({
      transform: 'rotate(180deg)',
    }),
  ),
  transition('collapsed => expanded', animate('100ms ease-in')),
  transition('expanded => collapsed', animate('100ms ease-out')),
]);

@Component({
  selector: 'nb-accordion-header',
  styleUrls: ['./accordion-header.component.scss'],
  template: `
    <ng-content select="nb-accordion-title"></ng-content>
    <ng-content select="nb-accordion-description"></ng-content>
    <ng-content></ng-content>
    <i [@expansion-indicator]="state" class="nb-arrow-down"></i>
  `,
  animations: [expansionIndicatorTrigger],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionHeaderComponent implements OnInit, OnDestroy {
  private alive: boolean = true;

  constructor(@Host() private accordion: NbAccordionComponent, private cdr: ChangeDetectorRef) {}

  @HostBinding('class.accordion-header-collapsed')
  get isCollapsed(): boolean {
    return !!this.accordion.collapsed;
  }

  @HostBinding('class.accordion-header-expanded')
  get isExpanded(): boolean {
    return !this.accordion.collapsed;
  }

  @HostBinding('attr.tabindex')
  get isTabbable(): string {
    return this.accordion.disabled ? '-1' : '0';
  }

  get state(): string {
    if (this.isCollapsed) {
      return 'collapsed';
    }
    if (this.isExpanded) {
      return 'expanded';
    }
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
