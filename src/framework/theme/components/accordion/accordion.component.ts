/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';

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
  @Input('collapsed')
  get collapsed(): boolean {
    return this._collapsed;
  }
  set collapsed(value: boolean) {
    this._collapsed = value;
  }

  @Output() opened = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<boolean>();

  private _collapsed: boolean = true;

  toggle() {
    this.collapsed = !this.collapsed;
  }
}
