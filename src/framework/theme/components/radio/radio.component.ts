/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

import { convertToBoolProperty } from '../helpers';


/**
 * The `NbRadioComponent` provides the same functionality as native `<input type="radio">`
 * with Nebular styles and animations.
 *
 * @stacked-example(Showcase, radio/radio-showcase.component)
 *
 * Radio buttons should be wrapped in `nb-radio-group` to provide form bindings.
 *
 * ```html
 * <nb-radio-group [(ngModule)]="selectedOption">
 *   <nb-radio>Option 1</nb-radio>
 *   <nb-radio>Option 2</nb-radio>
 *   <nb-radio>Option 3</nb-radio>
 * </nb-radio-group>
 * ```
 *
 * You can disable some radios in the group using `disabled` attribute.
 *
 * @stacked-example(Disabled, radio/radio-disabled.component)
 *
 *
 * @styles
 *
 * radio-bg
 * radio-fg
 * radio-size
 * radio-border-size
 * radio-border-color
 * radio-checkmark
 * radio-checked-bg
 * radio-checked-size
 * radio-checked-border-size
 * radio-checked-border-color
 * radio-checked-checkmark
 * radio-disabled-bg
 * radio-disabled-size
 * radio-disabled-border-size
 * radio-disabled-border-color
 * radio-disabled-checkmark
 * */
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
