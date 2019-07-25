/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, HostBinding, forwardRef, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NbComponentStatus } from '../component-status';
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
 *     // ...
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
 * Indeterminate state is also supported:
 * @stacked-example(Indeterminate Checkbox, checkbox/checkbox-indeterminate.component)
 *
 * @additional-example(Disabled Checkbox, checkbox/checkbox-disabled.component)
 *
 * @styles
 *
 * checkbox-height:
 * checkbox-width:
 * checkbox-background-color:
 * checkbox-border-color:
 * checkbox-border-style:
 * checkbox-border-width:
 * checkbox-border-radius:
 * checkbox-outline-width:
 * checkbox-outline-color:
 * checkbox-text-color:
 * checkbox-text-font-family:
 * checkbox-text-font-size:
 * checkbox-text-font-weight:
 * checkbox-text-line-height:
 * checkbox-disabled-background-color:
 * checkbox-disabled-border-color:
 * checkbox-disabled-checkmark-color:
 * checkbox-disabled-text-color:
 * checkbox-primary-background-color:
 * checkbox-primary-border-color:
 * checkbox-primary-checked-background-color:
 * checkbox-primary-checked-border-color:
 * checkbox-primary-checked-checkmark-color:
 * checkbox-primary-indeterminate-background-color:
 * checkbox-primary-indeterminate-border-color:
 * checkbox-primary-indeterminate-checkmark-color:
 * checkbox-primary-focus-border-color:
 * checkbox-primary-hover-background-color:
 * checkbox-primary-hover-border-color:
 * checkbox-primary-active-background-color:
 * checkbox-primary-active-border-color:
 * checkbox-success-background-color:
 * checkbox-success-border-color:
 * checkbox-success-checked-background-color:
 * checkbox-success-checked-border-color:
 * checkbox-success-checked-checkmark-color:
 * checkbox-success-indeterminate-background-color:
 * checkbox-success-indeterminate-border-color:
 * checkbox-success-indeterminate-checkmark-color:
 * checkbox-success-focus-border-color:
 * checkbox-success-hover-background-color:
 * checkbox-success-hover-border-color:
 * checkbox-success-active-background-color:
 * checkbox-success-active-border-color:
 * checkbox-warning-background-color:
 * checkbox-warning-border-color:
 * checkbox-warning-checked-background-color:
 * checkbox-warning-checked-border-color:
 * checkbox-warning-checked-checkmark-color:
 * checkbox-warning-indeterminate-background-color:
 * checkbox-warning-indeterminate-border-color:
 * checkbox-warning-indeterminate-checkmark-color:
 * checkbox-warning-focus-border-color:
 * checkbox-warning-hover-background-color:
 * checkbox-warning-hover-border-color:
 * checkbox-warning-active-background-color:
 * checkbox-warning-active-border-color:
 * checkbox-danger-background-color:
 * checkbox-danger-border-color:
 * checkbox-danger-checked-background-color:
 * checkbox-danger-checked-border-color:
 * checkbox-danger-checked-checkmark-color:
 * checkbox-danger-indeterminate-background-color:
 * checkbox-danger-indeterminate-border-color:
 * checkbox-danger-indeterminate-checkmark-color:
 * checkbox-danger-focus-border-color:
 * checkbox-danger-hover-background-color:
 * checkbox-danger-hover-border-color:
 * checkbox-danger-active-background-color:
 * checkbox-danger-active-border-color:
 * checkbox-info-background-color:
 * checkbox-info-border-color:
 * checkbox-info-checked-background-color:
 * checkbox-info-checked-border-color:
 * checkbox-info-checked-checkmark-color:
 * checkbox-info-indeterminate-background-color:
 * checkbox-info-indeterminate-border-color:
 * checkbox-info-indeterminate-checkmark-color:
 * checkbox-info-focus-border-color:
 * checkbox-info-hover-background-color:
 * checkbox-info-hover-border-color:
 * checkbox-info-active-background-color:
 * checkbox-info-active-border-color:
 */
@Component({
  selector: 'nb-checkbox',
  template: `
    <label class="label">
      <input type="checkbox" class="native-input visually-hidden"
             [disabled]="disabled"
             [checked]="checked"
             (change)="updateValueAndIndeterminate($event)"
             (blur)="setTouched()"
             (click)="$event.stopPropagation()"
             [indeterminate]="indeterminate">
      <span [class.indeterminate]="indeterminate" [class.checked]="checked" class="custom-checkbox">
        <nb-icon *ngIf="indeterminate" icon="minus-bold-outline" pack="nebular-essentials"></nb-icon>
        <nb-icon *ngIf="checked && !indeterminate" icon="checkmark-bold-outline" pack="nebular-essentials"></nb-icon>
      </span>
      <span class="text">
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

  onChange: any = () => { };
  onTouched: any = () => { };

  /**
   * Checkbox value
   * @deprecated
   * @breaking-change Remove @5.0.0
   */
  @Input()
  get value(): boolean {
    return this.checked;
  }

  /**
   * @deprecated
   * @breaking-change Remove @5.0.0
   */
  set value(value: boolean) {
    console.warn('NbCheckbox: `value` is deprecated and will be removed in 5.0.0. Use `checked` instead.');
    this.checked = value;
  }

  @Input()
  get checked(): boolean {
    return this._checked;
  }
  set checked(value: boolean) {
    this._checked = value;
  }
  private _checked: boolean = false;

  /**
   * Controls input disabled state
   */
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = convertToBoolProperty(value);
  }
  private _disabled: boolean = false;

  /**
   * Checkbox status.
   * Possible values are: `primary` (default), `success`, `warning`, `danger`, `info`
   */
  @Input()
  status: '' | NbComponentStatus = '';


  /**
   * Controls checkbox indeterminate state
   */
  @Input()
  get indeterminate(): boolean {
    return this._indeterminate;
  }
  set indeterminate(value: boolean) {
    this._indeterminate = convertToBoolProperty(value);
  }
  private _indeterminate: boolean = false;

  /**
   * Output when checked state is changed by a user
   * @deprecated
   * @breaking-change Remove @5.0.0
   * @type EventEmitter<boolean>
   */
  @Output()
  get valueChange(): EventEmitter<boolean> {
    console.warn('NbCheckbox: `valueChange` is deprecated and will be removed in 5.0.0. Use `checkedChange` instead.');
    return this.checkedChange;
  }
  set valueChange(valueChange: EventEmitter<boolean>) {
    this.checkedChange = valueChange;
  }

  /**
   * Output when checked state is changed by a user
   * @type EventEmitter<boolean>
   */
  @Output() checkedChange = new EventEmitter<boolean>();

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

  constructor(private changeDetector: ChangeDetectorRef) {}

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(val: any) {
    this._checked = val;
    this.changeDetector.detectChanges();
  }

  setDisabledState(val: boolean) {
    this.disabled = convertToBoolProperty(val);
  }

  setTouched() {
    this.onTouched();
  }

  updateValueAndIndeterminate(event: Event): void {
    const input = (event.target as HTMLInputElement);
    this.checked = input.checked;
    this.checkedChange.emit(this.checked);
    this.onChange(this.checked);
    this.indeterminate = input.indeterminate;
  }
}
