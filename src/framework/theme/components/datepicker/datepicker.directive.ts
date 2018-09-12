/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Directive, ElementRef, forwardRef, Inject, InjectionToken, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Type } from '@angular/core/src/type';

import { NB_DOCUMENT } from '../../theme.options';
import { NbDatepicker } from './datepicker';


export abstract class NbDateTransformer<T> {
  abstract picker: Type<any>;

  abstract fromValue(value: T): string;

  abstract fromString(value: string): T;
}

export const NB_DATE_TRANSFORMER = new InjectionToken<NbDateTransformer<any>>('date transformer');


@Directive({
  selector: 'input[nbDatepicker]', providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NbDatepickerDirective),
      multi: true,
    },
  ],
})
export class NbDatepickerDirective<T> implements ControlValueAccessor {

  protected transformer: NbDateTransformer<T>;
  protected picker: NbDatepicker<T>;
  protected onChange: Function = () => {};

  constructor(@Inject(NB_DOCUMENT) protected document,
              @Inject(NB_DATE_TRANSFORMER) protected transformers: NbDateTransformer<T>[],
              protected hostRef: ElementRef) {
  }

  @Input('nbDatepicker')
  set setPicker(picker: NbDatepicker<T>) {
    this.picker = picker;
    this.setupPicker();
  }

  writeValue(value: T) {
    const stringRepresentation = this.transformer.fromValue(value);
    this.hostRef.nativeElement.value = stringRepresentation;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
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
      this.picker.value = this.transformer.fromString(this.hostRef.nativeElement.value);
    }

    this.picker.valueChange.subscribe((value: T) => {
      this.picker.value = value;
      this.writeValue(value);
      this.onChange(value);
    });
  }

  protected noTransformerProvided() {
    return !this.transformer || !(this.transformer instanceof NbDateTransformer);
  }
}
