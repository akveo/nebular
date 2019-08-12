/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  Input,
  HostBinding,
  forwardRef,
  ChangeDetectorRef,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NbLayoutDirectionService, NbLayoutDirection } from '../../services/direction.service';
import { NbComponentStatus } from '../component-status';

import { convertToBoolProperty } from '../helpers';

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
 *     // ...
 *     NbToggleModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Toggle may have one of the following statuses: `primary`, `success`, `warning`, `danger`, `info`
 *
 * @stacked-example(Colored Toggles, toggle/toggle-status.component)
 *
 * You can disable toggle
 *
 * @stacked-example(Disabled Toggles, toggle/toggle-disabled.component)
 *
 * Toggle may have a label with following positions: `left`, `right`, `start`, `end` (default)
 *
 * @stacked-example(Toggles With Labels, toggle/toggle-label-position.component.ts)
 *
 * You can set checked state via `checked` binding:
 *
 * ```html
 * <nb-toggle [(checked)]="checked"></nb-toggle>
 * ```
 *
 * Or you can set control value via reactive forms or ngModel bindings:
 *
 * @stacked-example(Toggle form binding, toggle/toggle-form.component)
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
 * toggle-text-color:
 * toggle-text-font-family:
 * toggle-text-font-size:
 * toggle-text-font-weight:
 * toggle-text-line-height:
 * toggle-cursor:
 * toggle-disabled-background-color:
 * toggle-disabled-border-color:
 * toggle-disabled-switcher-checkmark-color:
 * toggle-disabled-text-color:
 * toggle-disabled-cursor:
 * toggle-primary-background-color:
 * toggle-primary-border-color:
 * toggle-primary-checked-background-color:
 * toggle-primary-checked-border-color:
 * toggle-primary-checked-switcher-checkmark-color:
 * toggle-primary-focus-border-color:
 * toggle-primary-hover-background-color:
 * toggle-primary-hover-border-color:
 * toggle-primary-active-background-color:
 * toggle-primary-active-border-color:
 * toggle-success-background-color:
 * toggle-success-border-color:
 * toggle-success-checked-background-color:
 * toggle-success-checked-border-color:
 * toggle-success-checked-switcher-checkmark-color:
 * toggle-success-focus-border-color:
 * toggle-success-hover-background-color:
 * toggle-success-hover-border-color:
 * toggle-success-active-background-color:
 * toggle-success-active-border-color:
 * toggle-info-background-color:
 * toggle-info-border-color:
 * toggle-info-checked-background-color:
 * toggle-info-checked-border-color:
 * toggle-info-checked-switcher-checkmark-color:
 * toggle-info-focus-border-color:
 * toggle-info-hover-background-color:
 * toggle-info-hover-border-color:
 * toggle-info-active-background-color:
 * toggle-info-active-border-color:
 * toggle-warning-background-color:
 * toggle-warning-border-color:
 * toggle-warning-checked-background-color:
 * toggle-warning-checked-border-color:
 * toggle-warning-checked-switcher-checkmark-color:
 * toggle-warning-focus-border-color:
 * toggle-warning-hover-background-color:
 * toggle-warning-hover-border-color:
 * toggle-warning-active-background-color:
 * toggle-warning-active-border-color:
 * toggle-danger-background-color:
 * toggle-danger-border-color:
 * toggle-danger-checked-background-color:
 * toggle-danger-checked-border-color:
 * toggle-danger-checked-switcher-checkmark-color:
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
      state('ltrOn', style({ right: 0 })),
      state('rtlOn', style({ left: 0 })),
      transition(':enter', [animate(0)]),
      transition('* <=> *', [animate('0.15s')]),
    ]),
  ],
  template: `
    <label class="toggle-label">
      <input type="checkbox"
             class="native-input visually-hidden"
             role="switcher"
             [attr.aria-checked]="checked"
             [disabled]="disabled"
             [checked]="checked"
             (change)="updateValue($event)"
             (blur)="onTouched()"
             (click)="onInputClick($event)">
      <div class="toggle" [class.checked]="checked">
        <span [@onOff]="checkState()" class="toggle-switcher">
          <nb-icon *ngIf="checked" icon="checkmark-bold-outline" pack="nebular-essentials"></nb-icon>
        </span>
      </div>
      <span class="text">
        <ng-content></ng-content>
      </span>
    </label>
  `,
  styleUrls: [ `./toggle.component.scss` ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NbToggleComponent),
    multi: true,
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbToggleComponent implements OnInit, OnDestroy, ControlValueAccessor {

  onChange: any = () => { };
  onTouched: any = () => { };

  private destroy$ = new Subject<void>();

  /**
   * Toggle checked
   * @type {boolean}
   */
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
   * Toggle status.
   * Possible values are: `primary`, `success`, `warning`, `danger`, `info`
   */
  @Input()
  status: '' | NbComponentStatus = '';

  /**
   * Toggle label position.
   * Possible values are: `left`, `right`, `start`, `end` (default)
   */
  @Input() labelPosition: 'left' | 'right' | 'start' | 'end' = 'end';

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

  @HostBinding('class.toggle-label-left')
  get labelLeft() {
    return this.labelPosition === 'left';
  }

  @HostBinding('class.toggle-label-right')
  get labelRight() {
    return this.labelPosition === 'right';
  }

  @HostBinding('class.toggle-label-start')
  get labelStart() {
    return this.labelPosition === 'start';
  }

  @HostBinding('class.toggle-label-end')
  get labelEnd() {
    return this.labelPosition === 'end';
  }

  constructor(
    private changeDetector: ChangeDetectorRef,
    private layoutDirection: NbLayoutDirectionService,
  ) {}

  ngOnInit(): void {
    this.layoutDirection.onDirectionChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.changeDetector.detectChanges());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  checkState(): string {
    if (this.checked) {
      if (this.layoutDirection.getDirection() === NbLayoutDirection.LTR) {
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
    this.checked = val;
    this.changeDetector.markForCheck();
  }

  setDisabledState(val: boolean) {
    this.disabled = convertToBoolProperty(val);
    this.changeDetector.markForCheck();
  }

  updateValue(event: Event): void {
    const input = (event.target as HTMLInputElement);
    this.checked = input.checked;
    this.checkedChange.emit(this.checked);
    this.onChange(this.checked);
  }

  onInputClick(event: Event) {
    event.stopPropagation();
  }
}
