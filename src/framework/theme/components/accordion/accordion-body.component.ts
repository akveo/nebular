/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  ChangeDetectionStrategy,
  Host,
  ElementRef,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { merge } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { NbAccordionComponent } from './accordion.component';

const accordionBodyTrigger = trigger('accordion-body', [
  state(
    'collapsed',
    style({
      overflow: 'hidden',
      visibility: 'hidden',
      height: 0,
    }),
  ),
  state(
    'expanded',
    style({
      overflow: 'hidden',
      visibility: 'visible',
      height: '100px',
    }),
  ),
  transition('collapsed => expanded', animate('500ms ease-in')),
  transition('expanded => collapsed', animate('500ms ease-out')),
]);

@Component({
  selector: 'nb-accordion-body',
  styleUrls: ['./accordion-body.component.scss'],
  template: `
    <div [@accordion-body]="state">
      <div class="ttt">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  animations: [accordionBodyTrigger],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionBodyComponent implements OnInit, OnDestroy {
  private alive: boolean = true;

  constructor(
    @Host() private accordion: NbAccordionComponent,
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
  ) {}

  get isCollapsed(): boolean {
    return !!this.accordion.collapsed;
  }

  get isExpanded(): boolean {
    return !this.accordion.collapsed;
  }

  get contentHeight(): number {
    return this.el.nativeElement.clientHeight;
  }

  get state(): string {
    if (this.isCollapsed) {
      return 'collapsed';
    }
    if (this.isExpanded) {
      return 'expanded';
    }
  }

  ngOnInit() {
    merge(this.accordion.opened, this.accordion.closed, this.accordion.inputChanges)
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.cdr.markForCheck());
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
