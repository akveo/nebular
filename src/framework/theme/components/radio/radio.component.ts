import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, Input } from '@angular/core';
import { CanStatus, mixinStatus, Status } from '../../mixins/mixinStatus';
import { mixinControlValueAccessor } from '../../mixins/mixinControlValueAccessor';
import { BaseInputAttributes, mixinBaseInputAttributes } from '../../mixins/mixinBaseInputAtributes';

// Increasing integer for generating unique ids for checkbox components.
let nextUniqueId = 0;

export class NbRadioBase {
}

export const _NbRadioMixinBase = mixinBaseInputAttributes(mixinControlValueAccessor(mixinStatus(NbRadioBase)));

@Component({
  selector: 'nb-radio',
  template: `
    <label class="customised-control customised-radio">
      <input type="radio" class="customised-control-input"
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

  @Input('name') name: string = '';

  @Input() value: boolean = false;

  @Input() status: Status = Status.EMPTY;

  /** A unique id for the checkbox input. If none is supplied, it will be auto-generated. */
  @Input() id: string = this._uniqueId;

  @Input() disabled: boolean = false;

  @Input() required: boolean = false;

  @Input() checked: boolean = false;
}
