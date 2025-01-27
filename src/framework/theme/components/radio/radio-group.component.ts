/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  Output,
  QueryList,
  PLATFORM_ID,
  Inject,
  ElementRef,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { from, fromEvent, merge, Subject } from 'rxjs';
import { filter, startWith, switchMap, takeUntil } from 'rxjs/operators';

import { convertToBoolProperty, NbBooleanInput } from '../helpers';
import { NB_DOCUMENT } from '../../theme.options';
import { NbComponentOrCustomStatus } from '../component-status';
import { NbRadioComponent } from './radio.component';

/**
 * The `NbRadioGroupComponent` is the wrapper for `nb-radio` button.
 * It provides form bindings:
 *
 * ```html
 * <nb-radio-group [(ngModel)]="selectedOption">
 *   <nb-radio value="1">Option 1</nb-radio>
 *   <nb-radio value="2">Option 2</nb-radio>
 *   <nb-radio value="3">Option 3</nb-radio>
 * </nb-radio-group>
 * ```
 *
 * Also, you can use `value` and `valueChange` for binding without forms.
 *
 * ```html
 * <nb-radio-group [(value)]="selectedOption">
 *   <nb-radio value="1">Option 1</nb-radio>
 *   <nb-radio value="2">Option 2</nb-radio>
 *   <nb-radio value="3">Option 3</nb-radio>
 * </nb-radio-group>
 * ```
 *
 * Radio items name has to be provided through `name` input property of the radio group.
 *
 * ```html
 * <nb-radio-group name="my-radio-group">
 *   ...
 * </nb-radio-group>
 * ```
 *
 * You can change radio group status by setting `status` input.
 * @stacked-example(Statuses, radio/radio-statuses.component)
 *
 * Also, you can disable the whole group using `disabled` attribute.
 * @stacked-example(Disabled group, radio/radio-disabled-group.component)
 *
 * Radio group supports `ngModel` and reactive forms:
 * @stacked-example(Radio Group with forms, radio/radio-form.component)
 *
 * */
@Component({
  selector: 'nb-radio-group',
  template: ` <ng-content select="nb-radio"></ng-content>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NbRadioGroupComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class NbRadioGroupComponent implements AfterContentInit, OnDestroy, ControlValueAccessor {
  protected destroy$ = new Subject<void>();
  protected onChange = (value: any) => {};
  protected onTouched = () => {};

  @Input()
  get value(): any {
    return this._value;
  }
  set value(value: any) {
    this._value = value;
    this.updateValues();
  }
  protected _value: any;

  @Input()
  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
    this.updateNames();
  }
  protected _name: string;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(disabled: boolean) {
    this._disabled = convertToBoolProperty(disabled);
    this.updateDisabled();
  }
  protected _disabled: boolean;
  static ngAcceptInputType_disabled: NbBooleanInput;

  /**
   * Radio buttons status.
   * Possible values are `primary` (default), `success`, `warning`, `danger`, `info`.
   */
  @Input()
  get status(): NbComponentOrCustomStatus {
    return this._status;
  }
  set status(value: NbComponentOrCustomStatus) {
    if (this._status !== value) {
      this._status = value;
      this.updateStatus();
    }
  }
  protected _status: NbComponentOrCustomStatus = 'basic';

  @ContentChildren(NbRadioComponent, { descendants: true }) radios: QueryList<NbRadioComponent>;

  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  constructor(
    protected hostElement: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) protected platformId,
    @Inject(NB_DOCUMENT) protected document,
  ) {}

  ngAfterContentInit() {
    // In case option 'name' isn't set on nb-radio component,
    // we need to set it's name right away, so it won't overlap with options
    // without names from other radio groups. Otherwise they all would have
    // same name and will be considered as options from one group so only the
    // last option will stay selected.
    this.updateNames();

    this.radios.changes
      .pipe(
        startWith(this.radios),
        // 'changes' emit during change detection run and we can't update
        // option properties right of since they already was initialized.
        // Instead we schedule microtask to update radios after change detection
        // run is finished and trigger one more change detection run.
        switchMap((radios: QueryList<NbRadioComponent>) => from(Promise.resolve(radios))),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.updateAndSubscribeToRadios());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  protected updateAndSubscribeToRadios() {
    this.updateValueFromCheckedOption();
    this.updateNames();
    this.updateValues();
    this.updateDisabled();
    this.updateStatus();
    this.subscribeOnRadiosValueChange();
    this.subscribeOnRadiosBlur();
  }

  protected updateNames() {
    if (this.radios) {
      this.radios.forEach((radio: NbRadioComponent) => radio._setName(this.name));
    }
  }

  protected updateValues() {
    this.updateAndMarkForCheckRadios((radio: NbRadioComponent) => (radio.checked = radio.value === this.value));
  }

  protected updateDisabled() {
    if (typeof this.disabled !== 'undefined') {
      this.updateAndMarkForCheckRadios((radio: NbRadioComponent) => (radio.disabled = this.disabled));
    }
  }

  protected subscribeOnRadiosValueChange() {
    if (!this.radios || !this.radios.length) {
      return;
    }

    merge(...this.radios.map((radio: NbRadioComponent) => radio.valueChange))
      .pipe(takeUntil(merge(this.radios.changes, this.destroy$)))
      .subscribe((value: any) => {
        this.writeValue(value);
        this.propagateValue(value);
      });
  }

  protected propagateValue(value: any) {
    this.valueChange.emit(value);
    this.onChange(value);
  }

  protected subscribeOnRadiosBlur() {
    const hasNoRadios = !this.radios || !this.radios.length;
    if (!isPlatformBrowser(this.platformId) || hasNoRadios) {
      return;
    }

    const hostElement = this.hostElement.nativeElement;
    fromEvent<Event>(hostElement, 'focusin')
      .pipe(
        filter((event) => hostElement.contains(event.target as Node)),
        switchMap(() => merge(fromEvent<Event>(this.document, 'focusin'), fromEvent<Event>(this.document, 'click'))),
        filter((event) => !hostElement.contains(event.target as Node)),
        takeUntil(merge(this.radios.changes, this.destroy$)),
      )
      .subscribe(() => this.onTouched());
  }

  protected updateStatus() {
    this.updateAndMarkForCheckRadios((radio: NbRadioComponent) => (radio.status = this.status));
  }

  protected updateAndMarkForCheckRadios(updateFn: (NbRadioComponent) => void) {
    if (this.radios) {
      this.radios.forEach((radio) => {
        updateFn(radio);
        radio._markForCheck();
      });
    }
  }

  protected updateValueFromCheckedOption() {
    const checkedRadio = this.radios.find((radio) => radio.checked);
    const isValueMissing = this.value === undefined || this.value === null;
    if (checkedRadio && isValueMissing && checkedRadio.value !== this.value) {
      this.value = checkedRadio.value;
    }
  }
}
