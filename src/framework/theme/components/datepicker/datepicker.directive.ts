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


const NB_DEFAULT_FORMAT = 'MM/dd/yyyy';

export abstract class NbDateTransformer<D> {
  abstract picker: Type<any>;

  abstract parse(value: string, format: string): D;

  abstract format(value: D, format: string): string;
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
export class NbDatepickerDirective<D> implements ControlValueAccessor {

  protected transformer: NbDateTransformer<D>;
  protected picker: NbDatepicker<D>;
  protected onChange: Function = () => {};

  constructor(@Inject(NB_DOCUMENT) protected document,
              @Inject(NB_DATE_TRANSFORMER) protected transformers: NbDateTransformer<D>[],
              protected hostRef: ElementRef) {
  }

  @Input('nbDatepicker')
  set setPicker(picker: NbDatepicker<D>) {
    this.picker = picker;
    this.setupPicker();
  }

  writeValue(value: D) {
    const stringRepresentation = this.transformer.format(value, NB_DEFAULT_FORMAT);
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
      this.picker.value = this.transformer.parse(this.hostRef.nativeElement.value, NB_DEFAULT_FORMAT);
    }

    this.picker.valueChange.subscribe((value: D) => {
      this.picker.value = value;
      this.writeValue(value);
      this.onChange(value);
    });
  }

  protected noTransformerProvided() {
    return !this.transformer || !(this.transformer instanceof NbDateTransformer);
  }
}
