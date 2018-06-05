/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * Component intended to be used within `<nb-accordion-item-header>` component
 */
@Component({
  selector: 'nb-accordion-item-description',
  styleUrls: ['./accordion-item-description.component.scss'],
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionItemDescriptionComponent {}
