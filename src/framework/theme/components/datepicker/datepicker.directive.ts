/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Directive, ElementRef, forwardRef, Inject, InjectionToken, Input, OnDestroy } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator, ValidatorFn,
  Validators,
} from '@angular/forms';
import { Type } from '@angular/core/src/type';
import { fromEvent, Observable } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

import { NB_DOCUMENT } from '../../theme.options';
import { NbDateService } from '../calendar-kit';


export abstract class NbDatepickerAdapter<D> {
  abstract picker: Type<any>;

  abstract parse(value: string, format: string): D;

  abstract format(value: D, format: string): string;

  abstract isValid(value: string, format: string): boolean;
}

export interface NbDatepickerValidatorConfig<D> {
  min: D;
  max: D;
  filter: (D) => boolean;
}

export abstract class NbDatepicker<T> {
  abstract format: string;

  abstract get value(): T;

  abstract set value(value: T);

  abstract get valueChange(): Observable<T>;

  abstract attach(hostRef: ElementRef);

  abstract getValidatorConfig(): NbDatepickerValidatorConfig<T>;
}

export const NB_DATE_ADAPTER = new InjectionToken<NbDatepickerAdapter<any>>('date datepickerAdapter');


/**
 * The `NbDatepickerDirective` binds html input element and `nb-datepicker`/`nb-rangepicker` together.
 * */
@Directive({
  selector: 'input[nbDatepicker]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NbDatepickerDirective),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NbDatepickerDirective),
      multi: true,
    },
  ],
})
export class NbDatepickerDirective<D> implements OnDestroy, ControlValueAccessor, Validator {
  /**
   * Datepicker adapter.
   * */
  protected datepickerAdapter: NbDatepickerAdapter<D>;
  /**
   * Datepicker instance.
   * */
  protected picker: NbDatepicker<D>;
  protected alive: boolean = true;
  protected onChange: (D) => void = () => {};

  /**
   * Form control validators will be called in validators context, so, we need to bind them.
   * */
  protected validator: ValidatorFn = Validators.compose([
    this.parseValidator,
    this.minValidator,
    this.maxValidator,
    this.filterValidator,
  ].map(fn => fn.bind(this)));

  constructor(@Inject(NB_DOCUMENT) protected document,
              @Inject(NB_DATE_ADAPTER) protected datepickerAdapters: NbDatepickerAdapter<D>[],
              protected hostRef: ElementRef,
              protected dateService: NbDateService<D>) {
    this.subscribeOnInputChange();
  }

  /**
   * Provides datepicker component.
   * */
  @Input('nbDatepicker')
  set setPicker(picker: NbDatepicker<D>) {
    this.picker = picker;
    this.setupPicker();
  }

  /**
   * Returns html input element.
   * */
  get input(): HTMLInputElement {
    return this.hostRef.nativeElement;
  }

  /**
   * Returns host input value.
   * */
  get inputValue(): string {
    return this.input.value;
  }

  ngOnDestroy() {
    this.alive = false;
  }

  /**
   * Writes value in picker and html input element.
   * */
  writeValue(value: D) {
    this.writePicker(value);
    this.writeInput(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  /**
   * Form control validation based on picker validator config.
   * */
  validate(): ValidationErrors | null {
    return this.validator(null);
  }

  /**
   * Validates that we can parse value correctly.
   * */
  protected parseValidator(): ValidationErrors | null {
    const isValid = this.datepickerAdapter.isValid(this.inputValue, this.picker.format);
    return isValid ? null : { nbDatepickerParse: { value: this.inputValue } };
  }

  /**
   * Validates passed value is greater than min.
   * */
  protected minValidator(): ValidationErrors | null {
    const config = this.picker.getValidatorConfig();
    const date = this.datepickerAdapter.parse(this.inputValue, this.picker.format);
    return (!config.min || !date || this.dateService.compareDates(config.min, date) <= 0) ?
      null : { nbDatepickerMin: { min: config.min, actual: date } };
  }

  /**
   * Validates passed value is smaller than max.
   * */
  protected maxValidator(): ValidationErrors | null {
    const config = this.picker.getValidatorConfig();
    const date = this.datepickerAdapter.parse(this.inputValue, this.picker.format);
    return (!config.max || !date || this.dateService.compareDates(config.max, date) >= 0) ?
      null : { nbDatepickerMax: { max: config.max, actual: date } };
  }

  /**
   * Validates passed value satisfy the filter.
   * */
  protected filterValidator(): ValidationErrors | null {
    const config = this.picker.getValidatorConfig();
    const date = this.datepickerAdapter.parse(this.inputValue, this.picker.format);
    return (!config.filter || !date || config.filter(date)) ?
      null : { nbDatepickerFilter: true };
  }

  /**
   * Chooses datepicker adapter based on passed picker component.
   * */
  protected chooseDatepickerAdapter() {
    this.datepickerAdapter = this.datepickerAdapters.find(({ picker }) => this.picker instanceof picker);

    if (this.noDatepickerAdapterProvided()) {
      throw new Error('No datepickerAdapter provided for picker');
    }
  }

  /**
   * Attaches picker to the host input element and subscribes on value changes.
   * */
  protected setupPicker() {
    this.chooseDatepickerAdapter();
    this.picker.attach(this.hostRef);

    if (this.hostRef.nativeElement.value) {
      this.picker.value = this.datepickerAdapter.parse(this.hostRef.nativeElement.value, this.picker.format);
    }

    this.picker.valueChange
      .pipe(takeWhile(() => this.alive))
      .subscribe((value: D) => {
        this.writePicker(value);
        this.writeInput(value);
        this.onChange(value);
      });
  }

  protected writePicker(value: D) {
    this.picker.value = value;
  }

  protected writeInput(value: D) {
    const stringRepresentation = this.datepickerAdapter.format(value, this.picker.format);
    this.hostRef.nativeElement.value = stringRepresentation;
  }

  /**
   * Validates if no datepicker adapter provided.
   * */
  protected noDatepickerAdapterProvided(): boolean {
    return !this.datepickerAdapter || !(this.datepickerAdapter instanceof NbDatepickerAdapter);
  }

  protected subscribeOnInputChange() {
    fromEvent(this.input, 'input')
      .pipe(
        map(() => this.inputValue),
        takeWhile(() => this.alive),
      )
      .subscribe((value: string) => this.handleInputChange(value));
  }

  /**
   * Parses input value and write if it isn't null.
   * */
  protected handleInputChange(value: string) {
    const date = this.parseInputValue(value);

    if (date) {
      this.onChange(date);
      this.writePicker(date);
    }
  }

  protected parseInputValue(value): D | null {
    if (this.datepickerAdapter.isValid(value, this.picker.format)) {
      return this.datepickerAdapter.parse(value, this.picker.format);
    }

    return null;
  }
}
