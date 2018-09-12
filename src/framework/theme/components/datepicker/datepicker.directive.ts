/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Directive, ElementRef, Inject, InjectionToken, Input } from '@angular/core';
import { Type } from '@angular/core/src/type';
import { NB_DOCUMENT } from '../../theme.options';
import { NbDatepicker } from './datepicker';


export abstract class NbDateTransformer<T> {
  abstract picker: Type<any>;

  abstract fromValue(value: T): string;

  abstract fromString(value: string): T;
}

export const NB_DATE_TRANSFORMER = new InjectionToken<NbDateTransformer<any>>('date transformer');


@Directive({ selector: 'input[nbDatepicker]' })
export class NbDatepickerDirective<T> {

  protected transformer: NbDateTransformer<T>;
  protected picker: NbDatepicker<T>;

  constructor(@Inject(NB_DOCUMENT) protected document,
              @Inject(NB_DATE_TRANSFORMER) protected transformers: NbDateTransformer<T>[],
              protected hostRef: ElementRef) {
  }

  @Input('nbDatepicker')
  set setPicker(picker: NbDatepicker<T>) {
    this.picker = picker;
    this.setupPicker();
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
    this.picker.valueChange.subscribe((value: T) => {
      this.picker.value = value;
      this.writeValue(value);
    });
  }

  protected writeValue(value: T) {
    const stringRepresentation = this.transformer.fromValue(value);
    this.hostRef.nativeElement.value = stringRepresentation;
  }

  protected noTransformerProvided() {
    return !this.transformer || !(this.transformer instanceof NbDateTransformer);
  }
}
