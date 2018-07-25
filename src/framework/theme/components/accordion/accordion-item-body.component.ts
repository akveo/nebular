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
import { takeWhile } from 'rxjs/operators';

import { NbAccordionItemComponent } from './accordion-item.component';

const accordionItemBodyTrigger = trigger('accordionItemBody', [
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

/**
 * Component intended to be used within `<nb-accordion-item>` component
 */
@Component({
  selector: 'nb-accordion-item-body',
  template: `
    <div [@accordionItemBody]="{ value: state, params: { contentHeight: contentHeight } }">
      <div class="item-body">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  animations: [accordionItemBodyTrigger],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionItemBodyComponent implements OnInit, OnDestroy {

  contentHeight: string;

  private alive: boolean = true;

  constructor(
    @Host() private accordionItem: NbAccordionItemComponent,
    private el: ElementRef,
    private cd: ChangeDetectorRef) {
  }

  get state(): string {
    return this.accordionItem.collapsed ? 'collapsed' : 'expanded';
  }

  ngOnInit() {
    this.contentHeight = `${this.el.nativeElement.clientHeight}px`;
    this.accordionItem.accordionItemInvalidate
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.cd.markForCheck());
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
