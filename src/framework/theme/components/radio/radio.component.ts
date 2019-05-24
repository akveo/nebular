/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';

import { convertToBoolProperty } from '../helpers';
import { NbComponentStatus } from '../component-status';

/**
 * The `NbRadioComponent` provides the same functionality as native `<input type="radio">`
 * with Nebular styles and animations.
 *
 * @stacked-example(Showcase, radio/radio-showcase.component)
 *
 * ### Installation
 *
 * Import `NbRadioModule` to your feature module.
 *
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbRadioModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 *
 * ### Usage
 *
 * Radio buttons should be wrapped in `nb-radio-group` to provide form bindings.
 *
 * ```html
 * <nb-radio-group [(ngModel)]="selectedOption">
 *   <nb-radio value="1">Option 1</nb-radio>
 *   <nb-radio value="2">Option 2</nb-radio>
 *   <nb-radio value="3">Option 3</nb-radio>
 * </nb-radio-group>
 * ```
 *
 * You can disable some radios in the group using a `disabled` attribute.
 *
 * @stacked-example(Disabled, radio/radio-disabled.component)
 *
 *
 * @styles
 *
 * radio-width
 * radio-height:
 * radio-background-color:
 * radio-border-style:
 * radio-border-width:
 * radio-text-color:
 * radio-text-font-family:
 * radio-text-font-size:
 * radio-text-font-weight:
 * radio-text-line-height:
 * radio-outline-color:
 * radio-outline-width:
 * radio-disabled-border-color:
 * radio-disabled-text-color:
 * radio-disabled-inner-circle-color:
 * radio-primary-border-color:
 * radio-primary-inner-circle-color:
 * radio-primary-focus-border-color:
 * radio-primary-focus-inner-circle-color:
 * radio-primary-hover-border-color:
 * radio-primary-hover-inner-circle-color:
 * radio-primary-active-border-color:
 * radio-primary-active-inner-circle-color:
 * radio-success-border-color:
 * radio-success-inner-circle-color:
 * radio-success-focus-border-color:
 * radio-success-focus-inner-circle-color:
 * radio-success-hover-border-color:
 * radio-success-hover-inner-circle-color:
 * radio-success-active-border-color:
 * radio-success-active-inner-circle-color:
 * radio-warning-border-color:
 * radio-warning-inner-circle-color:
 * radio-warning-focus-border-color:
 * radio-warning-focus-inner-circle-color:
 * radio-warning-hover-border-color:
 * radio-warning-hover-inner-circle-color:
 * radio-warning-active-border-color:
 * radio-warning-active-inner-circle-color:
 * radio-danger-border-color:
 * radio-danger-inner-circle-color:
 * radio-danger-focus-border-color:
 * radio-danger-focus-inner-circle-color:
 * radio-danger-hover-border-color:
 * radio-danger-hover-inner-circle-color:
 * radio-danger-active-border-color:
 * radio-danger-active-inner-circle-color:
 * radio-info-border-color:
 * radio-info-inner-circle-color:
 * radio-info-focus-border-color:
 * radio-info-focus-inner-circle-color:
 * radio-info-hover-border-color:
 * radio-info-hover-inner-circle-color:
 * radio-info-active-border-color:
 * radio-info-active-inner-circle-color:
 * */
@Component({
  selector: 'nb-radio',
  template: `
    <label>
      <input
        type="radio"
        class="native-input visually-hidden"
        [name]="name"
        [value]="value"
        [checked]="checked"
        [disabled]="disabled"
        (change)="onChange($event)"
        (click)="onClick($event)">
      <span class="radio-circle"></span>
      <span class="text">
        <ng-content></ng-content>
      </span>
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./radio.component.scss'],
})
export class NbRadioComponent {

  @Input()
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    if (this._name !== value) {
      this._name = value;
      this.cd.detectChanges();
    }
  }
  private _name: string;

  @Input()
  get checked(): boolean {
    return this._checked;
  }
  set checked(value: boolean) {
    const boolValue = convertToBoolProperty(value);
    if (this._checked !== boolValue) {
      this._checked = boolValue;
      this.cd.markForCheck();
    }
  }
  private _checked: boolean = false;

  @Input()
  get value(): any {
    return this._value;
  }
  set value(value: any) {
    if (this._value !== value) {
      this._value = value;
      this.cd.markForCheck();
    }
  }
  private _value: any;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(disabled: boolean) {
    const boolValue = convertToBoolProperty(disabled);
    if (this._disabled !== boolValue) {
      this._disabled = boolValue;
      this.cd.markForCheck();
    }
  }
  private _disabled: boolean = false;

  @Input()
  get status(): '' | NbComponentStatus {
    return this._status;
  }
  set status(value: '' | NbComponentStatus) {
    if (this._status !== value) {
      this._status = value;
      this.cd.markForCheck();
    }
  }
  private _status: '' | NbComponentStatus;

  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  @Output() blur: EventEmitter<void> = new EventEmitter();

  constructor(protected cd: ChangeDetectorRef) {}

  @HostBinding('class.status-primary')
  get isPrimary(): boolean {
    return this.status === 'primary';
  }

  @HostBinding('class.status-success')
  get isSuccess(): boolean {
    return this.status === 'success';
  }

  @HostBinding('class.status-warning')
  get isWarning(): boolean {
    return this.status === 'warning';
  }

  @HostBinding('class.status-danger')
  get isDanger(): boolean {
    return this.status === 'danger';
  }

  @HostBinding('class.status-info')
  get isInfo(): boolean {
    return this.status === 'info';
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
