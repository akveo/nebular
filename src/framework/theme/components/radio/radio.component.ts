/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'nb-radio',
  styleUrls: ['./_radio.component.theme.scss'],
  template: `
    <label [attr.for]="id">
      <input
        type="radio"
        [name]="name"
        [attr.id]="id"
        [value]="value"
        [checked]="checked"
        (change)="onChange($event)"
        (click)="onClick($event)"
      >
      <span class="radio-indicator"></span>
      <span class="radio-description">
        <ng-content></ng-content>
      </span>
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbRadioComponent<T> {
  protected static NEXT_UNIQUE_ID: number = 0;

  @Input() name: string;

  @Input() id: string = `nb-radio-${++NbRadioComponent.NEXT_UNIQUE_ID}`;

  @Input() checked: boolean;

  @Input() value: T;

  @Output() valueChange: EventEmitter<T> = new EventEmitter();

  onChange(event: Event) {
    event.stopPropagation();
    this.checked = true;
    this.valueChange.emit(this.value);
  }

  onClick(event: Event) {
    event.stopPropagation();
  }
}
