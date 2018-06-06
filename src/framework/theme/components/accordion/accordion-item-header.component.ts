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
import { filter, takeWhile } from 'rxjs/operators';

import { NbAccordionItemComponent } from './accordion-item.component';

const expansionIndicatorTrigger = trigger('expansionIndicator', [
  state(
    'expanded',
    style({
      transform: 'rotate(180deg)',
    }),
  ),
  transition('collapsed => expanded', animate('100ms ease-in')),
  transition('expanded => collapsed', animate('100ms ease-out')),
]);

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
    <i [@expansionIndicator]="state" *ngIf="showToggle" class="nb-arrow-down"></i>
  `,
  animations: [expansionIndicatorTrigger],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionItemHeaderComponent implements OnInit, OnDestroy {
  private alive: boolean = true;

  constructor(@Host() private accordionItem: NbAccordionItemComponent, private cdr: ChangeDetectorRef) {}

  @HostBinding('class.accordion-item-header-collapsed')
  get isCollapsed(): boolean {
    return !!this.accordionItem.collapsed;
  }

  @HostBinding('class.accordion-item-header-expanded')
  @HostBinding('attr.aria-expanded')
  get isExpanded(): boolean {
    return !this.accordionItem.collapsed;
  }

  @HostBinding('attr.tabindex')
  get isTabbable(): string {
    return this.accordionItem.disabled ? '-1' : '0';
  }

  @HostBinding('attr.aria-disabled')
  get isDisabled(): boolean {
    return !!this.accordionItem.disabled;
  }

  @HostListener('click')
  toggle() {
    this.accordionItem.toggle();
  }

  protected get state(): string {
    if (this.isCollapsed) {
      return 'collapsed';
    }
    if (this.isExpanded) {
      return 'expanded';
    }
  }

  protected get showToggle(): boolean {
    return !this.accordionItem.hideToggle;
  }

  ngOnInit() {
    // Since the toggle state depends on an @Input on the panel, we
    // need to  subscribe and trigger change detection manually.
    merge(
      this.accordionItem.closed,
      this.accordionItem.opened,
      this.accordionItem.accordionItemInputChanges.pipe(
        filter(changes => !!(changes['disabled'] || changes['hideToggle'])),
      ),
    )
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.cdr.markForCheck());
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
