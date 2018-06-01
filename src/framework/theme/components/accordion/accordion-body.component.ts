/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ChangeDetectionStrategy, Host, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { NbAccordionComponent } from './accordion.component';

@Component({
  selector: 'nb-accordion-body',
  styleUrls: ['./accordion-body.component.scss'],
  template: `
    <div [@accordion]="state">
      <ng-content></ng-content>
    </div>
  `,
  animations: [
    trigger('accordion', [
      state(
        'collapsed',
        style({
          height: '0px',
        }),
      ),
      state(
        'expanded',
        style({
          height: '500px',
        }),
      ),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionBodyComponent {
  constructor(@Host() private accordion: NbAccordionComponent, private el: ElementRef) {}

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
}
