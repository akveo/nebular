/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, HostBinding, Host } from '@angular/core';

@Component({
  selector: 'nb-accordion-title',
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionTitleComponent {}

@Component({
  selector: 'nb-accordion-description',
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionDescriptionComponent {}

@Component({
  selector: 'nb-accordion-header',
  template: `
    <ng-content select="nb-accordion-title"></ng-content>
    <ng-content select="nb-accordion-description"></ng-content>
    <ng-content></ng-content>
    <i class="nb-arrow-up"></i>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionHeaderComponent {
  constructor(@Host() private accordion: NbAccordionComponent) {}
}

@Component({
  selector: 'nb-accordion-body',
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionBodyComponent {}

export type AccordionStats = 'collapsed' | 'expanded';

@Component({
  selector: 'nb-accordion',
  styleUrls: ['./accordion.component.scss'],
  template: `
    <ng-content select="nb-accordion-header"></ng-content>
    <ng-content select="nb-accordion-body"></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionComponent {
  @Input() collapsed: boolean = true;

  @Output() opened = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<boolean>();
}
