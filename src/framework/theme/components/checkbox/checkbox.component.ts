/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, HostBinding, forwardRef, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
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
    <label class="label">
      <input type="checkbox" class="native-input visually-hidden"
             [disabled]="disabled"
             [checked]="value"
             (change)="updateValueAndIndeterminate($event)"
             (fosus)="setFocus()"
             (blur)="removeFocusAndMarkTouched()"
             [indeterminate]="indeterminate">
      <span [class.indeterminate]="indeterminate"
            [class.checked]="value"
            [class.focus]="isFocused"
            class="custom-checkbox">
        <ng-container *ngIf="indeterminate || value"
                      [ngTemplateOutlet]="indeterminate ? minus : checkMark">
        </ng-container>
      </span>
      <span class="text">
        <ng-content></ng-content>
      </span>
    </label>

    <ng-template #checkMark>
      <svg viewBox="0 0 8 7"
           width="10"
           height="10"
           xmlns="http://www.w3.org/2000/svg"
           xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
        <path id="nb-checkbox-checkmark" d="M6.039 1.43a1.11 1.11 0 0 1 1.517-.228c.483.342.588.998.234 1.466L4.431
            7.1a1 1 0 0 1-1.492.115L.317 4.677a1.023 1.023 0 0 1 .002-1.483 1.113 1.113 0 0 1 1.535.002l1.641 1.59L6.04
            1.428z"/>
        </defs>
        <use fill="#FFF" xlink:href="#nb-checkbox-checkmark" transform="translate(0 -1)" fill-rule="evenodd"/>
      </svg>
    </ng-template>

    <ng-template #minus>
      <svg viewBox="0 0 8 2"
           width="10"
           height="10"
           xmlns="http://www.w3.org/2000/svg"
           xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
          <rect id="nb-checkbox-minus" y="3" width="8" height="2" rx="1"/>
        </defs>
        <use fill="#FFF" xlink:href="#nb-checkbox-minus" transform="translate(0 -3)" fill-rule="evenodd"/>
      </svg>
    </ng-template>
  `,
  styleUrls: [ `./checkbox.component.scss` ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NbCheckboxComponent),
    multi: true,
  }],
})
export class NbCheckboxComponent implements ControlValueAccessor {

  isFocused: boolean;
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

  /**
   * Controls checkbox indeterminate state
   */
  @Input('indeterminate')
  set indeterminate(value: boolean) {
    this._indeterminate = convertToBoolProperty(value);
  }
  get indeterminate(): boolean {
    return this._indeterminate;
  }
  private _indeterminate: boolean = false;

  @Output() change = new EventEmitter();

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
    this.change.emit(val);
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

  removeFocusAndMarkTouched(): void {
    this.removeFocus();
    this.setTouched();
  }

  setFocus(): void {
    this.isFocused = true;
  }

  removeFocus(): void {
    this.isFocused = false;
  }

  updateValueAndIndeterminate(event: Event): void {
    const input = (event.target as HTMLInputElement);
    this.value = input.checked;
    this.indeterminate = input.indeterminate;
  }
}
