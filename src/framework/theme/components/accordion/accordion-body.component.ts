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
      height: '{{ contentHeight }}',
    }),
    { params: { contentHeight: '1rem' } },
  ),
  transition('collapsed => expanded', animate('100ms ease-in')),
  transition('expanded => collapsed', animate('100ms ease-out')),
]);

@Component({
  selector: 'nb-accordion-body',
  styleUrls: ['./accordion-body.component.scss'],
  template: `
    <div [@accordion-body]="{ value: state, params: { contentHeight: contentHeight } }">
      <div class="accordion-body">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  animations: [accordionBodyTrigger],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionBodyComponent implements OnInit, OnDestroy {
  contentHeight: string;

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

  get state(): string {
    if (this.isCollapsed) {
      return 'collapsed';
    }
    if (this.isExpanded) {
      return 'expanded';
    }
  }

  ngOnInit() {
    this.contentHeight = `${this.el.nativeElement.clientHeight}px`;

    merge(this.accordion.opened, this.accordion.closed, this.accordion.inputChanges)
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.cdr.markForCheck());
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
