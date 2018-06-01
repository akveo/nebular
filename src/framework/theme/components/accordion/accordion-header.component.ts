/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ChangeDetectionStrategy, Host } from '@angular/core';

import { NbAccordionComponent } from './accordion.component';

@Component({
  selector: 'nb-accordion-header',
  styleUrls: ['./accordion-header.component.scss'],
  template: `
    <ng-content select="nb-accordion-title"></ng-content>
    <ng-content select="nb-accordion-description"></ng-content>
    <ng-content></ng-content>
    <i *ngIf="isExpanded" class="nb-arrow-up"></i>
    <i *ngIf="isCollapsed" class="nb-arrow-down"></i>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionHeaderComponent {
  constructor(@Host() private accordion: NbAccordionComponent) {}

  get isCollapsed(): boolean {
    return !!this.accordion.collapsed;
  }

  get isExpanded(): boolean {
    return !this.accordion.collapsed;
  }
}
