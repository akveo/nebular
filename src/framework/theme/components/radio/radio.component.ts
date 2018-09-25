/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { convertToBoolProperty } from '../helpers';


@Component({
  selector: 'nb-radio',
  template: `
    <label [attr.for]="id">
      <input
        type="radio"
        [name]="name"
        [attr.id]="id"
        [value]="value"
        [checked]="checked"
        [disabled]="disabled"
        (change)="onChange($event)"
        (click)="onClick($event)">
      <span class="radio-indicator"></span>
      <span class="radio-description">
        <ng-content></ng-content>
      </span>
    </label>
  `,
})
export class NbRadioComponent {
  protected static NEXT_UNIQUE_ID: number = 0;

  @Input() name: string;

  @Input() id: string = `nb-radio-${++NbRadioComponent.NEXT_UNIQUE_ID}`;

  @Input() checked: boolean;

  @Input() value: any;

  @Input('disabled')
  set setDisabled(disabled: boolean) {
    this.disabled = convertToBoolProperty(disabled);
  }

  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  disabled: boolean;

  constructor(protected cd: ChangeDetectorRef) {}

  markForCheck() {
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

  onChange(event: Event) {
    event.stopPropagation();
    this.checked = true;
    this.valueChange.emit(this.value);
  }

  onClick(event: Event) {
    event.stopPropagation();
  }
}
