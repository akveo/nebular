/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'nb-accordion-header',
  styleUrls: ['./accordion-header.component.scss'],
  template: `
    <ng-content select="nb-accordion-title"></ng-content>
    <ng-content select="nb-accordion-description"></ng-content>
    <ng-content></ng-content>
    <i class="nb-arrow-up"></i>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionHeaderComponent {}
