/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CanStatus, mixinStatus, Status } from '../../mixins/mixinStatus';
import { mixinControlValueAccessor } from '../../mixins/mixinControlValueAccessor';
import { BaseInputAttributes, mixinBaseInputAttributes } from '../../mixins/mixinBaseInputAtributes';

// Increasing integer for generating unique ids for checkbox components.
let nextUniqueId = 0;

export class NbCheckboxBase {
}

export const _NbCheckboxMixinBase = mixinBaseInputAttributes(mixinControlValueAccessor(mixinStatus(NbCheckboxBase)));

/**
 * Styled checkbox component
 *
 * @example Basic example
 *
 * ```
 *  <nb-checkbox [(ngModel)]="enabled">Enabled?</nb-checkbox>
 * ```
 *
 * @example Example with status
 *
 * ```
 *  <nb-checkbox [(ngModel)]="enabled" status="danger">Enabled?</nb-checkbox>
 * ```
 *
 * @styles
 *
 * checkbox-bg:
 * checkbox-size:
 * checkbox-border-size:
 * checkbox-border-color:
 * checkbox-checkmark:
 * checkbox-checked-bg:
 * checkbox-checked-size:
 * checkbox-checked-border-size:
 * checkbox-checked-border-color:
 * checkbox-checked-checkmark:
 * checkbox-disabled-bg:
 * checkbox-disabled-size:
 * checkbox-disabled-border-size:
 * checkbox-disabled-border-color:
 * checkbox-disabled-checkmark:
 */
@Component({
  selector: 'nb-checkbox',
  template: `
    <label class="customised-control customised-checkbox">
      <input type="checkbox" class="customised-control-input"
             [id]="id"
             [disabled]="disabled"
             [required]="required"
             [checked]="checked"
             (change)="value = !value">
      <span class="customised-control-indicator"></span>
      <span class="customised-control-description">
        <ng-content></ng-content>
      </span>
    </label>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NbCheckboxComponent),
    multi: true,
  }],
})
export class NbCheckboxComponent extends _NbCheckboxMixinBase implements ControlValueAccessor,
  BaseInputAttributes, CanStatus {

  private _uniqueId: string = `nb-checkbox-${++nextUniqueId}`;

  @Input() value: boolean = false;

  @Input() status: Status = Status.EMPTY;

  /** A unique id for the checkbox input. If none is supplied, it will be auto-generated. */
  @Input() id: string = this._uniqueId;

  @Input() disabled: boolean = false;

  @Input() required: boolean = false;

  @Input() checked: boolean = false;

}
