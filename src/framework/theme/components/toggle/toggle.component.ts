/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, HostBinding, forwardRef, ChangeDetectorRef, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NbLayoutDirectionService, NbLayoutDirection } from '../../services/direction.service';

import { convertToBoolProperty } from '../helpers';

const ltrState = style({ transform: 'translateX(100%)' });
const rtlState = style({ transform: 'translateX(-100%)' });
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
 * toggle-background-color:
 * toggle-size:
 * toggle-border-width:
 * toggle-off-opacity:
 * toggle-outline-width:
 * toggle-outline-opacity:
 * toggle-disabled-opacity:
 * toggle-switcher-background-color:
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
      <input type="checkbox"
             [disabled]="disabled"
             [checked]="value"
             (change)="value = !value"
             (blur)="setTouched()"
      >
      <div class="toggle">
        <span [@onOff]="checkState()" class="toggle-switcher"></span>
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
  status: string;
  disabled: boolean = false;

  /**
   * Toggle value
   * @type {boolean}
   * @private
   */
  @Input('value') _value: boolean = false;

  /**
   * Toggle state
   * @param {string} val
   */
  @Input('disabled')
  set setDisabled(val: boolean) {
    this.disabled = convertToBoolProperty(val);
  }

  /**
   * Toggle status (primary, success, warning, danger, info)
   * @param {string} val
   */
  @Input('status')
  set setStatus(val: string) {
    this.status = val;
  }

  @HostBinding('attr.tabindex')
  get tabbable(): string {
    return this.disabled ? '-1' : '0';
  }

  @HostBinding('class.disabled')
  get state() {
    return this.disabled === true;
  }

  @HostBinding('class.primary')
  get primary() {
    return this.status === 'primary';
  }

  @HostBinding('class.success')
  get success() {
    return this.status === 'success';
  }

  @HostBinding('class.warning')
  get warning() {
    return this.status === 'warning';
  }

  @HostBinding('class.danger')
  get danger() {
    return this.status === 'danger';
  }

  @HostBinding('class.info')
  get info() {
    return this.status === 'info';
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
    if (this.value) {
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
