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
} from '@angular/core';
import { NbRadioComponent } from './radio.component';
import { merge } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'nb-radio-group',
  template: `
    <ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NbRadioGroupComponent),
      multi: true,
    },
  ],
})
export class NbRadioGroupComponent implements AfterContentInit, OnDestroy, ControlValueAccessor {

  @ContentChildren(NbRadioComponent, { descendants: true }) radios: QueryList<NbRadioComponent>;

  @Input() value: any;

  @Input() name: string;

  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  protected alive: boolean = true;
  protected onChange: Function = () => {
  };

  ngAfterContentInit() {
    this.updateRadiosNames();
    this.updateValues();
    this.subscribeOnRadiosValueChange();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(value: any): void {
    this.value = value;
  }

  protected updateRadiosNames() {
    this.radios.forEach((radio: NbRadioComponent) => radio.name = this.name);
  }

  protected updateValues() {
    this.radios.forEach((radio: NbRadioComponent) => {
      radio.checked = radio.value === this.value;
    });
  }

  protected subscribeOnRadiosValueChange() {
    merge(...this.radios.map((radio: NbRadioComponent) => radio.valueChange))
      .pipe(takeWhile(() => this.alive))
      .subscribe((value: any) => {
        this.writeValue(value);
        this.propagateValue(value);
      });
  }

  protected propagateValue(value: any) {
    this.valueChange.emit(value);
    this.onChange(value);
  }
}
