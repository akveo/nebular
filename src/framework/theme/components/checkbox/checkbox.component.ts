/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, HostBinding, forwardRef, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { convertToBoolProperty } from '../helpers';

/**
 * Styled checkbox component
 *
 * @stacked-example(Showcase, checkbox/checkbox-showcase.component)
 *
 * ### Installation
 *
 * Import `NbCheckboxComponent` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *   	// ...
 *     NbCheckboxModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Can have one of the following statuses: danger, success or warning
 *
 * @stacked-example(Colored Checkboxes, checkbox/checkbox-status.component)
 *
 * @additional-example(Disabled Checkbox, checkbox/checkbox-disabled.component)
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
    <label class="customised-control">
      <input type="checkbox" class="customised-control-input"
             [disabled]="disabled"
             [checked]="value"
             (change)="value = !value"
             (blur)="setTouched()">
      <span class="customised-control-indicator"></span>
      <span class="customised-control-description">
        <ng-content></ng-content>
      </span>
    </label>
  `,
  styleUrls: [ `./checkbox.component.scss` ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NbCheckboxComponent),
    multi: true,
  }],
})
export class NbCheckboxComponent implements ControlValueAccessor {

  status: string = 'primary';

  /**
   * Checkbox value
   * @type {boolean}
   * @private
   */
  @Input('value') _value: boolean = false;

  disabled: boolean = false;
  @Input('disabled')
  set setDisabled(val: boolean) {
    this.disabled = convertToBoolProperty(val);
  }

  /**
   * Checkbox status (primary (default), success, warning, danger, info, white)
   * @param {string} val
   */
  @Input('status')
  set setStatus(val: string) {
    this.status = val;
  }

  @HostBinding('class.status-primary')
  get primary() {
    return this.status === 'primary';
  }

  @HostBinding('class.status-success')
  get success() {
    return this.status === 'success';
  }

  @HostBinding('class.status-warning')
  get warning() {
    return this.status === 'warning';
  }

  @HostBinding('class.status-danger')
  get danger() {
    return this.status === 'danger';
  }

  @HostBinding('class.status-info')
  get info() {
    return this.status === 'info';
  }

  @HostBinding('class.status-white')
  get white() {
    return this.status === 'white';
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
  }

  constructor(private changeDetector: ChangeDetectorRef) {}

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(val: any) {
    this._value = val;
    this.changeDetector.detectChanges();
  }

  setDisabledState(val: boolean) {
    this.disabled = convertToBoolProperty(val);
  }

  setTouched() {
    this.onTouched();
  }
}
