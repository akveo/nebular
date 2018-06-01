/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ChangeDetectionStrategy, Host, ElementRef } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import { NbAccordionComponent } from './accordion.component';

@Component({
  selector: 'nb-accordion-body',
  styleUrls: ['./accordion-body.component.scss'],
  template: `
    <ng-content></ng-content>
  `,
  animations: [],
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
}
