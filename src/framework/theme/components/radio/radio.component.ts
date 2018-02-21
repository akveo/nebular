import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, Input } from '@angular/core';
import { CanStatus, mixinStatus, Status } from '../../mixins/mixinStatus';
import { mixinControlValueAccessor } from '../../mixins/mixinControlValueAccessor';
import { BaseInputAttributes, mixinBaseInputAttributes } from '../../mixins/mixinBaseInputAtributes';

// Increasing integer for generating unique ids for radio components.
let nextUniqueId = 0;

export class NbRadioBase {
}

export const _NbRadioMixinBase = mixinBaseInputAttributes(mixinControlValueAccessor(mixinStatus(NbRadioBase)));

/**
 * Styled radio component
 *
 * @example Basic example
 *
 * ```
 *  <nb-radio [(ngModel)]="enabled">Enabled?</nb-radio>
 * ```
 *
 * @example Example with status
 *
 * ```
 *  <nb-radio [(ngModel)]="enabled" status="danger">Enabled?</nb-radio>
 * ```
 *
 * @styles
 *
 * radio-bg:
 * radio-size:
 * radio-border-size:
 * radio-border-color:
 * radio-checkmark:
 * radio-checked-bg:
 * radio-checked-size:
 * radio-checked-border-size:
 * radio-checked-border-color:
 * radio-checked-checkmark:
 * radio-disabled-bg:
 * radio-disabled-size:
 * radio-disabled-border-size:
 * radio-disabled-border-color:
 * radio-disabled-checkmark:
 */
@Component({
  selector: 'nb-radio',
  template: `
    <label class="customised-control customised-radio">
      <input type="radio" class="customised-control-input"
             [id]="id"
             [disabled]="disabled"
             [checked]="checked"
             [name]="name"
             (change)="value = !value">
      <span class="customised-control-indicator"></span>
      <span class="customised-control-description">
        <ng-content></ng-content>
      </span>
    </label>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NbRadioComponent),
    multi: true,
  }],
})

export class NbRadioComponent extends _NbRadioMixinBase implements ControlValueAccessor,
  BaseInputAttributes, CanStatus {

  private _uniqueId: string = `nb-radio-${++nextUniqueId}`;

  /**
   * A unique value to group couple of radios
   * @type {string}
   */
  @Input('name') name: string = '';

  /**
   * Element status. Adds specific styles:
   * success, warning, danger. Either leave it empty
   * @constructor
   */
  @Input() status: Status = Status.EMPTY;

  /**
   * A unique id for the radio input. If none is supplied, it will be auto-generated
   * @type {string}
   */
  @Input() id: string = this._uniqueId;

  /** @type {boolean} */

  @Input() disabled: boolean = false;

  /** @type {boolean} */
  @Input() required: boolean = false;

  /** @type {boolean} */
  @Input() checked: boolean = false;
}
