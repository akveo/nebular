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

import { NbExpansionPanelComponent } from './expansion-panel.component';

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

@Component({
  selector: 'nb-expansion-panel-header',
  styleUrls: ['./expansion-panel-header.component.scss'],
  template: `
    <ng-content select="nb-expansion-panel-title"></ng-content>
    <ng-content select="nb-expansion-panel-description"></ng-content>
    <ng-content></ng-content>
    <i [@expansionIndicator]="state" *ngIf="showToggle" class="nb-arrow-down"></i>
  `,
  animations: [expansionIndicatorTrigger],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbExpansionPanelHeaderComponent implements OnInit, OnDestroy {
  private alive: boolean = true;

  constructor(@Host() private panel: NbExpansionPanelComponent, private cdr: ChangeDetectorRef) {}

  @HostBinding('class.panel-header-collapsed')
  get isCollapsed(): boolean {
    return !!this.panel.collapsed;
  }

  @HostBinding('class.panel-header-expanded')
  @HostBinding('attr.aria-expanded')
  get isExpanded(): boolean {
    return !this.panel.collapsed;
  }

  @HostBinding('attr.tabindex')
  get isTabbable(): string {
    return this.panel.disabled ? '-1' : '0';
  }

  @HostBinding('attr.aria-disabled')
  get isDisabled(): boolean {
    return !!this.panel.disabled;
  }

  @HostListener('click')
  toggle() {
    this.panel.toggle();
  }

  get state(): string {
    if (this.isCollapsed) {
      return 'collapsed';
    }
    if (this.isExpanded) {
      return 'expanded';
    }
  }

  get showToggle(): boolean {
    return !this.panel.hideToggle;
  }

  ngOnInit() {
    merge(this.panel.closed, this.panel.opened, this.panel.inputChanges.pipe(filter(changes => !!changes['disabled'])))
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.cdr.markForCheck());
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
