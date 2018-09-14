/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Directive, ElementRef, forwardRef, Inject, InjectionToken, Input, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { Type } from '@angular/core/src/type';
import { fromEvent } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

import { NB_DOCUMENT } from '../../theme.options';
import { NbDatepicker } from './datepicker.component';


const NB_DEFAULT_FORMAT = 'DD.MM.YYYY';

export abstract class NbDateTransformer<D> {
  abstract picker: Type<any>;

  abstract parse(value: string, format: string): D;

  abstract format(value: D, format: string): string;

  abstract isValid(value: string, format: string): boolean;
}

export const NB_DATE_TRANSFORMER = new InjectionToken<NbDateTransformer<any>>('date transformer');


@Directive({
  selector: 'input[nbDatepicker]', providers: [
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

  protected transformer: NbDateTransformer<D>;
  protected picker: NbDatepicker<D>;
  protected alive: boolean = true;
  protected onChange: (D) => void = () => {
  };

  constructor(@Inject(NB_DOCUMENT) protected document,
              @Inject(NB_DATE_TRANSFORMER) protected transformers: NbDateTransformer<D>[],
              protected hostRef: ElementRef) {
    this.subscribeOnInputChange();
  }

  get input(): HTMLInputElement {
    return this.hostRef.nativeElement;
  }

  get inputValue(): string {
    return this.input.value;
  }

  @Input('nbDatepicker')
  set setPicker(picker: NbDatepicker<D>) {
    this.picker = picker;
    this.setupPicker();
  }

  ngOnDestroy() {
    this.alive = false;
  }

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

  validate(c: AbstractControl): ValidationErrors | null {
    const isValid = this.transformer.isValid(this.inputValue, NB_DEFAULT_FORMAT);
    return isValid ? null : { nbDatepickerInvalid: true };
  }

  protected chooseTransformer() {
    this.transformer = this.transformers.find(({ picker }) => this.picker instanceof picker);

    if (this.noTransformerProvided()) {
      throw new Error('No transformer provided for picker');
    }
  }

  protected setupPicker() {
    this.chooseTransformer();
    this.picker.attach(this.hostRef);

    if (this.hostRef.nativeElement.value) {
      this.picker.value = this.transformer.parse(this.hostRef.nativeElement.value, NB_DEFAULT_FORMAT);
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
    const stringRepresentation = this.transformer.format(value, NB_DEFAULT_FORMAT);
    this.hostRef.nativeElement.value = stringRepresentation;
  }

  protected noTransformerProvided() {
    return !this.transformer || !(this.transformer instanceof NbDateTransformer);
  }

  protected subscribeOnInputChange() {
    fromEvent(this.input, 'input')
      .pipe(
        map(() => this.inputValue),
        takeWhile(() => this.alive),
      )
      .subscribe((value: string) => this.handleInputChange(value));
  }

  protected handleInputChange(value: string) {
    const date = this.parseInputValue(value);

    if (date) {
      this.onChange(date);
      this.writePicker(date);
    }
  }

  protected parseInputValue(value): D | null {
    if (this.transformer.isValid(value, NB_DEFAULT_FORMAT)) {
      return this.transformer.parse(value, NB_DEFAULT_FORMAT);
    }

    return null;
  }
}
