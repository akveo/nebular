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
import { takeWhile, filter } from 'rxjs/operators';

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
  styleUrls: ['./accordion-item-body.component.scss'],
  template: `
    <div [@accordionItemBody]="{ value: state, params: { contentHeight: contentHeight } }">
      <div class="accordion-item-body">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  animations: [accordionItemBodyTrigger],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionItemBodyComponent implements OnInit, OnDestroy {
  protected contentHeight: string;

  private alive: boolean = true;

  constructor(
    @Host() private accordionItem: NbAccordionItemComponent,
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
  ) {}

  protected get isCollapsed(): boolean {
    return !!this.accordionItem.collapsed;
  }

  protected get isExpanded(): boolean {
    return !this.accordionItem.collapsed;
  }

  protected get state(): string {
    if (this.isCollapsed) {
      return 'collapsed';
    }
    if (this.isExpanded) {
      return 'expanded';
    }
  }

  ngOnInit() {
    this.contentHeight = `${this.el.nativeElement.clientHeight}px`;

    // Since the toggle state depends on an @Input on the panel, we
    // need to  subscribe and trigger change detection manually.
    merge(
      this.accordionItem.opened,
      this.accordionItem.closed,
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
