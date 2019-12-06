/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, HostBinding, forwardRef, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NbComponentStatus } from '../component-status';
import { convertToBoolProperty, emptyStatusWarning } from '../helpers';

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
 * Checkbox is available in multiple colors using `status` property:
 * @stacked-example(Colored Checkboxes, checkbox/checkbox-status.component)
 *
 * Indeterminate state is also supported:
 * @stacked-example(Indeterminate Checkbox, checkbox/checkbox-indeterminate.component)
 *
 * Checkbox can be disabled via `disabled` attribute.
 * @stacked-example(Disabled Checkbox, checkbox/checkbox-disabled.component)
 *
 * @styles
 *
 * checkbox-height:
 * checkbox-width:
 * checkbox-border-style:
 * checkbox-border-width:
 * checkbox-border-radius:
 * checkbox-outline-width:
 * checkbox-outline-color:
 * checkbox-text-font-family:
 * checkbox-text-font-size:
 * checkbox-text-font-weight:
 * checkbox-text-line-height:
 * checkbox-text-space:
 * checkbox-padding:
 * checkbox-basic-text-color:
 * checkbox-basic-background-color:
 * checkbox-basic-border-color:
 * checkbox-basic-checked-background-color:
 * checkbox-basic-checked-border-color:
 * checkbox-basic-checked-checkmark-color:
 * checkbox-basic-indeterminate-background-color:
 * checkbox-basic-indeterminate-border-color:
 * checkbox-basic-indeterminate-checkmark-color:
 * checkbox-basic-focus-background-color:
 * checkbox-basic-focus-border-color:
 * checkbox-basic-focus-checked-background-color:
 * checkbox-basic-focus-checked-border-color:
 * checkbox-basic-hover-background-color:
 * checkbox-basic-hover-border-color:
 * checkbox-basic-hover-checked-background-color:
 * checkbox-basic-hover-checked-border-color:
 * checkbox-basic-active-background-color:
 * checkbox-basic-active-border-color:
 * checkbox-basic-active-checked-background-color:
 * checkbox-basic-active-checked-border-color:
 * checkbox-basic-disabled-background-color:
 * checkbox-basic-disabled-border-color:
 * checkbox-basic-disabled-checkmark-color:
 * checkbox-basic-disabled-text-color:
 * checkbox-basic-disabled-checked-background-color:
 * checkbox-primary-text-color:
 * checkbox-primary-background-color:
 * checkbox-primary-border-color:
 * checkbox-primary-checked-background-color:
 * checkbox-primary-checked-border-color:
 * checkbox-primary-checked-checkmark-color:
 * checkbox-primary-indeterminate-background-color:
 * checkbox-primary-indeterminate-border-color:
 * checkbox-primary-indeterminate-checkmark-color:
 * checkbox-primary-focus-background-color:
 * checkbox-primary-focus-border-color:
 * checkbox-primary-focus-checked-background-color:
 * checkbox-primary-focus-checked-border-color:
 * checkbox-primary-hover-background-color:
 * checkbox-primary-hover-border-color:
 * checkbox-primary-hover-checked-background-color:
 * checkbox-primary-hover-checked-border-color:
 * checkbox-primary-active-background-color:
 * checkbox-primary-active-border-color:
 * checkbox-primary-active-checked-background-color:
 * checkbox-primary-active-checked-border-color:
 * checkbox-primary-disabled-background-color:
 * checkbox-primary-disabled-border-color:
 * checkbox-primary-disabled-checkmark-color:
 * checkbox-primary-disabled-text-color:
 * checkbox-primary-disabled-checked-background-color:
 * checkbox-success-text-color:
 * checkbox-success-background-color:
 * checkbox-success-border-color:
 * checkbox-success-checked-background-color:
 * checkbox-success-checked-border-color:
 * checkbox-success-checked-checkmark-color:
 * checkbox-success-indeterminate-background-color:
 * checkbox-success-indeterminate-border-color:
 * checkbox-success-indeterminate-checkmark-color:
 * checkbox-success-focus-background-color:
 * checkbox-success-focus-border-color:
 * checkbox-success-focus-checked-background-color:
 * checkbox-success-focus-checked-border-color:
 * checkbox-success-hover-background-color:
 * checkbox-success-hover-border-color:
 * checkbox-success-hover-checked-background-color:
 * checkbox-success-hover-checked-border-color:
 * checkbox-success-active-background-color:
 * checkbox-success-active-border-color:
 * checkbox-success-active-checked-background-color:
 * checkbox-success-active-checked-border-color:
 * checkbox-success-disabled-background-color:
 * checkbox-success-disabled-border-color:
 * checkbox-success-disabled-checkmark-color:
 * checkbox-success-disabled-text-color:
 * checkbox-success-disabled-checked-background-color:
 * checkbox-info-text-color:
 * checkbox-info-background-color:
 * checkbox-info-border-color:
 * checkbox-info-checked-background-color:
 * checkbox-info-checked-border-color:
 * checkbox-info-checked-checkmark-color:
 * checkbox-info-indeterminate-background-color:
 * checkbox-info-indeterminate-border-color:
 * checkbox-info-indeterminate-checkmark-color:
 * checkbox-info-focus-background-color:
 * checkbox-info-focus-border-color:
 * checkbox-info-focus-checked-background-color:
 * checkbox-info-focus-checked-border-color:
 * checkbox-info-hover-background-color:
 * checkbox-info-hover-border-color:
 * checkbox-info-hover-checked-background-color:
 * checkbox-info-hover-checked-border-color:
 * checkbox-info-active-background-color:
 * checkbox-info-active-border-color:
 * checkbox-info-active-checked-background-color:
 * checkbox-info-active-checked-border-color:
 * checkbox-info-disabled-background-color:
 * checkbox-info-disabled-border-color:
 * checkbox-info-disabled-checkmark-color:
 * checkbox-info-disabled-text-color:
 * checkbox-info-disabled-checked-background-color:
 * checkbox-warning-text-color:
 * checkbox-warning-background-color:
 * checkbox-warning-border-color:
 * checkbox-warning-checked-background-color:
 * checkbox-warning-checked-border-color:
 * checkbox-warning-checked-checkmark-color:
 * checkbox-warning-indeterminate-background-color:
 * checkbox-warning-indeterminate-border-color:
 * checkbox-warning-indeterminate-checkmark-color:
 * checkbox-warning-focus-background-color:
 * checkbox-warning-focus-border-color:
 * checkbox-warning-focus-checked-background-color:
 * checkbox-warning-focus-checked-border-color:
 * checkbox-warning-hover-background-color:
 * checkbox-warning-hover-border-color:
 * checkbox-warning-hover-checked-background-color:
 * checkbox-warning-hover-checked-border-color:
 * checkbox-warning-active-background-color:
 * checkbox-warning-active-border-color:
 * checkbox-warning-active-checked-background-color:
 * checkbox-warning-active-checked-border-color:
 * checkbox-warning-disabled-background-color:
 * checkbox-warning-disabled-border-color:
 * checkbox-warning-disabled-checkmark-color:
 * checkbox-warning-disabled-text-color:
 * checkbox-warning-disabled-checked-background-color:
 * checkbox-danger-text-color:
 * checkbox-danger-background-color:
 * checkbox-danger-border-color:
 * checkbox-danger-checked-background-color:
 * checkbox-danger-checked-border-color:
 * checkbox-danger-checked-checkmark-color:
 * checkbox-danger-indeterminate-background-color:
 * checkbox-danger-indeterminate-border-color:
 * checkbox-danger-indeterminate-checkmark-color:
 * checkbox-danger-focus-background-color:
 * checkbox-danger-focus-border-color:
 * checkbox-danger-focus-checked-background-color:
 * checkbox-danger-focus-checked-border-color:
 * checkbox-danger-hover-background-color:
 * checkbox-danger-hover-border-color:
 * checkbox-danger-hover-checked-background-color:
 * checkbox-danger-hover-checked-border-color:
 * checkbox-danger-active-background-color:
 * checkbox-danger-active-border-color:
 * checkbox-danger-active-checked-background-color:
 * checkbox-danger-active-checked-border-color:
 * checkbox-danger-disabled-background-color:
 * checkbox-danger-disabled-border-color:
 * checkbox-danger-disabled-checkmark-color:
 * checkbox-danger-disabled-text-color:
 * checkbox-danger-disabled-checked-background-color:
 * checkbox-control-text-color:
 * checkbox-control-background-color:
 * checkbox-control-border-color:
 * checkbox-control-checked-background-color:
 * checkbox-control-checked-border-color:
 * checkbox-control-checked-checkmark-color:
 * checkbox-control-indeterminate-background-color:
 * checkbox-control-indeterminate-border-color:
 * checkbox-control-indeterminate-checkmark-color:
 * checkbox-control-focus-background-color:
 * checkbox-control-focus-border-color:
 * checkbox-control-focus-checked-background-color:
 * checkbox-control-focus-checked-border-color:
 * checkbox-control-hover-background-color:
 * checkbox-control-hover-border-color:
 * checkbox-control-hover-checked-background-color:
 * checkbox-control-hover-checked-border-color:
 * checkbox-control-active-background-color:
 * checkbox-control-active-border-color:
 * checkbox-control-active-checked-background-color:
 * checkbox-control-active-checked-border-color:
 * checkbox-control-disabled-background-color:
 * checkbox-control-disabled-border-color:
 * checkbox-control-disabled-checkmark-color:
 * checkbox-control-disabled-text-color:
 * checkbox-control-disabled-checked-background-color:
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
    this._checked = convertToBoolProperty(value);
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
   * Possible values are: `basic`, `primary`, `success`, `warning`, `danger`, `info`, `control`.
   */
  @Input()
  get status(): NbComponentStatus {
    return this._status;
  }
  set status(value: NbComponentStatus) {
    if ((value as string) === '') {
      emptyStatusWarning('NbCheckbox');
      this._status = 'basic';
    } else {
      this._status = value;
    }
  }
  protected _status: NbComponentStatus = 'basic';

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

  @HostBinding('class.status-basic')
  get basic() {
    return this.status === 'basic';
  }

  @HostBinding('class.status-control')
  get control() {
    return this.status === 'control';
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
