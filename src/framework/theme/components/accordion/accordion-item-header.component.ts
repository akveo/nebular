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
import { takeWhile } from 'rxjs/operators';

import { NbAccordionItemComponent } from './accordion-item.component';

/**
 * Component intended to be used within `<nb-accordion-item>` component
 */
@Component({
  selector: 'nb-accordion-item-header',
  styleUrls: ['./accordion-item-header.component.scss'],
  template: `
    <ng-content select="nb-accordion-item-title"></ng-content>
    <ng-content select="nb-accordion-item-description"></ng-content>
    <ng-content></ng-content>
    <nb-icon icon="chevron-down-outline"
             pack="nebular-essentials"
             [@expansionIndicator]="state"
             *ngIf="!disabled"
             class="expansion-indicator">
    </nb-icon>
  `,
  animations: [
    trigger('expansionIndicator', [
      state(
        'expanded',
        style({
          transform: 'rotate(180deg)',
        }),
      ),
      transition('collapsed => expanded', animate('100ms ease-in')),
      transition('expanded => collapsed', animate('100ms ease-out')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionItemHeaderComponent implements OnInit, OnDestroy {

  @HostBinding('class.accordion-item-header-collapsed')
  get isCollapsed(): boolean {
    return this.accordionItem.collapsed;
  }

  @HostBinding('class.accordion-item-header-expanded')
  @HostBinding('attr.aria-expanded')
  get expanded(): boolean {
    return !this.accordionItem.collapsed;
  }

  // issue #794
  @HostBinding('attr.tabindex')
  get tabbable(): string {
    return this.accordionItem.disabled ? '-1' : '0';
  }

  @HostBinding('attr.aria-disabled')
  get disabled(): boolean {
    return this.accordionItem.disabled;
  }

  @HostListener('click')
  @HostListener('keydown.space')
  @HostListener('keydown.enter')
  toggle() {
    this.accordionItem.toggle();
  }

  get state(): string {
    if (this.isCollapsed) {
      return 'collapsed';
    }
    if (this.expanded) {
      return 'expanded';
    }
  }

  private alive: boolean = true;
  constructor(@Host() private accordionItem: NbAccordionItemComponent, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.accordionItem.accordionItemInvalidate
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.cd.markForCheck());
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
