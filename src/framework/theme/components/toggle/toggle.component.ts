/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, HostBinding, forwardRef, ChangeDetectorRef, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NbLayoutDirectionService, NbLayoutDirection } from '../../services/direction.service';
import { NbComponentStatus } from '../component-status';

import { convertToBoolProperty } from '../helpers';

const ltrState = style({ right: 0 });
const rtlState = style({ left: 0 });
const defaultState = { params: { direction: '' } };

/**
 * Styled toggle component
 *
 * @stacked-example(Showcase, toggle/toggle-showcase.component)
 *
 * ### Installation
 *
 * Import `NbToggleComponent` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *   	 // ...
 *     NbToggleModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Can have one of the following statuses: primary, success, warning, danger, info
 *
 * @stacked-example(Colored Toggles, toggle/toggle-status.component)
 *
 * @additional-example(Disabled Toggles, toggle/toggle-disabled.component)
 *
 * @styles
 *
 * toggle-height:
 * toggle-width:
 * toggle-border-width:
 * toggle-border-radius:
 * toggle-border-color:
 * toggle-background-color:
 * toggle-outline-width:
 * toggle-outline-color:
 * toggle-switcher-size:
 * toggle-switcher-background-color:
 * toggle-switcher-checkmark-color:
 * toggle-disabled-background-color:
 * toggle-disabled-border-color:
 * toggle-disabled-checkmark-color:
 * toggle-primary-background-color:
 * toggle-primary-border-color:
 * toggle-primary-checked-background-color:
 * toggle-primary-checked-border-color:
 * toggle-primary-switcher-checkmark-color:
 * toggle-primary-focus-border-color:
 * toggle-primary-hover-background-color:
 * toggle-primary-hover-border-color:
 * toggle-primary-active-background-color:
 * toggle-primary-active-border-color:
 * toggle-success-background-color:
 * toggle-success-border-color:
 * toggle-success-checked-background-color:
 * toggle-success-checked-border-color:
 * toggle-success-switcher-checkmark-color:
 * toggle-success-focus-border-color:
 * toggle-success-hover-background-color:
 * toggle-success-hover-border-color:
 * toggle-success-active-background-color:
 * toggle-success-active-border-color:
 * toggle-info-background-color:
 * toggle-info-border-color:
 * toggle-info-checked-background-color:
 * toggle-info-checked-border-color:
 * toggle-info-switcher-checkmark-color:
 * toggle-info-focus-border-color:
 * toggle-info-hover-background-color:
 * toggle-info-hover-border-color:
 * toggle-info-active-background-color
 * toggle-info-active-border-color:
 * toggle-warning-background-color:
 * toggle-warning-border-color:
 * toggle-warning-checked-background-color:
 * toggle-warning-checked-border-color:
 * toggle-warning-switcher-checkmark-color:
 * toggle-warning-focus-border-color:
 * toggle-warning-hover-background-color:
 * toggle-warning-hover-border-color:
 * toggle-warning-active-background-color:
 * toggle-warning-active-border-color:
 * toggle-danger-background-color:
 * toggle-danger-border-color:
 * toggle-danger-checked-background-color:
 * toggle-danger-checked-border-color:
 * toggle-danger-switcher-checkmark-color:
 * toggle-danger-focus-border-color:
 * toggle-danger-hover-background-color:
 * toggle-danger-hover-border-color:
 * toggle-danger-active-background-color:
 * toggle-danger-active-border-color:
 */
@Component({
  selector: 'nb-toggle',
  animations: [
    trigger('onOff', [
      state('ltrOn', ltrState, defaultState),
      state('rtlOn', rtlState, defaultState),
      transition('* <=> *', [animate('0.25s')]),
    ]),
  ],
  template: `
    <label class="toggle-label">
      <input type="checkbox" class="native-input visually-hidden"
             [disabled]="disabled"
             [checked]="checked"
             (change)="checked = !checked"
             (blur)="setTouched()"
      >
      <div class="toggle" [class.checked]="checked">
        <span [@onOff]="checkState()" class="toggle-switcher">
          <nb-icon *ngIf="checked" icon="checkmark-bold-outline" pack="nebular-essentials"></nb-icon>
        </span>
      </div>
    </label>
  `,
  styleUrls: [ `./toggle.component.scss` ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NbToggleComponent),
    multi: true,
  }],
})
export class NbToggleComponent implements OnInit, ControlValueAccessor {
  private direction: NbLayoutDirection;
  disabled: boolean = false;

  /**
   * Toggle checked
   * @type {boolean}
   * @private
   */
  @Input('checked') _checked: boolean = false;

  /**
   * Toggle state
   * @param {string} val
   */
  @Input('disabled')
  set setDisabled(val: boolean) {
    this.disabled = convertToBoolProperty(val);
  }

  /**
   * Toggle status.
   * Possible values are: `primary` (default), `success`, `warning`, `danger`, `info`
   */
  @Input()
  status: '' | NbComponentStatus = '';

  @HostBinding('attr.tabindex')
  get tabbable(): string {
    return this.disabled ? '-1' : '0';
  }

  @HostBinding('class.disabled')
  get state() {
    return this.disabled === true;
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

  onChange: any = () => { };
  onTouched: any = () => { };

  get checked() {
    return this._checked;
  }

  set checked(val) {
    this._checked = val;
    this.onChange(val);
  }

  constructor(
    private changeDetector: ChangeDetectorRef,
    private layoutDirection: NbLayoutDirectionService,
  ) {}

  ngOnInit() {
    this.layoutDirection.onDirectionChange().subscribe(() => {
      this.direction = this.layoutDirection.getDirection();
    });
  }

  checkState(): string {
    if (this.checked) {
      if (this.direction === NbLayoutDirection.LTR) {
        return 'ltrOn';
      } else {
        return 'rtlOn';
      }
    }
  }

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
}
