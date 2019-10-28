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
import { fromEvent, merge } from 'rxjs';
import { filter, switchMap, takeUntil, takeWhile } from 'rxjs/operators';
import { convertToBoolProperty, emptyStatusWarning } from '../helpers';
import { NB_DOCUMENT } from '../../theme.options';
import { NbRadioComponent } from './radio.component';
import { NbComponentStatus } from '../component-status';

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
 * */
@Component({
  selector: 'nb-radio-group',
  template: `
    <ng-content select="nb-radio"></ng-content>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NbRadioGroupComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbRadioGroupComponent implements AfterContentInit, OnDestroy, ControlValueAccessor {

  protected alive: boolean = true;
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

  /**
   * Radio buttons status.
   * Possible values are `primary` (default), `success`, `warning`, `danger`, `info`.
   */
  @Input()
  get status(): NbComponentStatus {
    return this._status;
  }
  set status(value: NbComponentStatus) {
    if ((value as string) === '') {
      emptyStatusWarning('NbRadio');
      value = 'basic';
    }

    if (this._status !== value) {
      this._status = value;
      this.updateStatus();
    }
  }
  protected _status: NbComponentStatus = 'basic';

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

    Promise.resolve().then(() => this.updateAndSubscribeToRadios());

    this.radios.changes
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        // 'changes' emit during change detection run and we can't update
        // option properties right of since they already was initialized.
        // Instead we schedule microtask to update radios after change detection
        // run is finished.
        Promise.resolve().then(() => this.updateAndSubscribeToRadios());
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.value = value;

    if (typeof value !== 'undefined') {
      this.updateValues();
    }
  }

  protected updateAndSubscribeToRadios() {
    this.updateNames();
    this.updateValues();
    this.updateDisabled();
    this.updateStatus();
    this.subscribeOnRadiosValueChange();
    this.subscribeOnRadiosBlur();
  }

  protected updateNames() {
    if (this.radios) {
      this.radios.forEach((radio: NbRadioComponent) => radio.name = this.name);
    }
  }

  protected updateValues() {
    if (this.radios && typeof this.value !== 'undefined') {
      this.radios.forEach((radio: NbRadioComponent) => radio.checked = radio.value === this.value);
    }
  }

  protected updateDisabled() {
    if (this.radios && typeof this.disabled !== 'undefined') {
      this.radios.forEach((radio: NbRadioComponent) => radio.disabled = this.disabled);
    }
  }

  protected subscribeOnRadiosValueChange() {
    if (!this.radios || !this.radios.length) {
      return;
    }

    merge(...this.radios.map((radio: NbRadioComponent) => radio.valueChange))
      .pipe(
        takeWhile(() => this.alive),
        takeUntil(this.radios.changes),
      )
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
        takeWhile(() => this.alive),
        filter(event => hostElement.contains(event.target as Node)),
        switchMap(() => merge(
          fromEvent<Event>(this.document, 'focusin'),
          fromEvent<Event>(this.document, 'click'),
        )),
        filter(event => !hostElement.contains(event.target as Node)),
        takeUntil(this.radios.changes),
      )
      .subscribe(() => this.onTouched());
  }

  protected updateStatus() {
    if (this.radios) {
      this.radios.forEach((radio: NbRadioComponent) => radio.status = this.status);
    }
  }
}
