/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'nb-accordion-title',
  styleUrls: ['./accordion-title.component.scss'],
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionTitleComponent {}
