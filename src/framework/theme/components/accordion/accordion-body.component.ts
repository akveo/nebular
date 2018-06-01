/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ChangeDetectionStrategy, Host } from '@angular/core';

import { NbAccordionComponent } from './accordion.component';

@Component({
  selector: 'nb-accordion-body',
  styleUrls: ['./accordion-body.component.scss'],
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionBodyComponent {
  constructor(@Host() public accordion: NbAccordionComponent) {}
}
