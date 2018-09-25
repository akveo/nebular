/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { convertToBoolProperty } from '@nebular/theme/components/helpers';


@Component({
  selector: 'nb-radio-group',
  template: `
    <ng-content></ng-content>`,
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

  @Input('value')
  set setValue(value: any) {
    this.value = value;
    this.updateValues();
  }

  @Input('name')
  set setName(name: string){
    this.name = name;
    this.updateNames();
  }

  @Input('disabled')
  set setDisabled(disabled: boolean) {
    this.disabled = convertToBoolProperty(disabled);
    this.updateDisabled();
  }

  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  protected disabled: boolean;
  protected value: any;
  protected name: string;
  protected alive: boolean = true;
  protected onChange: Function = () => {
  };

  constructor(protected cd: ChangeDetectorRef) {}

  ngAfterContentInit() {
    this.updateNames();
    this.updateValues();
    this.updateDisabled();
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

  protected updateNames() {
    if (this.radios) {
      this.radios.forEach((radio: NbRadioComponent) => radio.name = this.name);
      this.markRadiosForCheck();
    }
  }

  protected updateValues() {
    if (this.radios) {
      this.radios.forEach((radio: NbRadioComponent) => radio.checked = radio.value === this.value);
      this.markRadiosForCheck();
    }
  }

  protected updateDisabled() {
    if (this.radios) {
      this.radios.forEach((radio: NbRadioComponent) => {
        if (!radio.hasOwnProperty('disabled')) {
          radio.setDisabled = this.disabled
        }
      });
      this.markRadiosForCheck();
    }
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

  protected markRadiosForCheck() {
    this.radios.forEach((radio: NbRadioComponent) => radio.markForCheck());
  }
}
