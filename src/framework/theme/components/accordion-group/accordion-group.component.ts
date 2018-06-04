/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'nb-accordion-group',
  styleUrls: ['./accordion-group.component.scss'],
  template: `
    <ng-content select="nb-accordion"></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionGroupComponent {
  @Input() multi: boolean = false;
  @Input() hideToggle: boolean = false;

  @Output() closeAll = new EventEmitter<void>();
  @Output() openAll = new EventEmitter<void>();
}
