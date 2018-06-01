/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'nb-accordion-description',
  styleUrls: ['./accordion-description.component.scss'],
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionDescriptionComponent {}
