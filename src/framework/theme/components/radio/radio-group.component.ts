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
  Input, OnDestroy,
  Output,
  QueryList,
} from '@angular/core';
import { NbRadioComponent } from './radio.component';
import { merge } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'nb-radio-group',
  template: `
    <ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbRadioGroupComponent<T> implements AfterContentInit, OnDestroy {

  @ContentChildren(NbRadioComponent, { descendants: true }) radios: QueryList<NbRadioComponent<T>>;

  @Input() value: T;

  @Input() name: string;

  @Output() valueChange: EventEmitter<T> = new EventEmitter();

  protected alive: boolean = true;

  ngAfterContentInit() {
    this.updateRadiosNames();
    this.updateValues();
    this.subscribeOnRadiosValueChange();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  protected updateRadiosNames() {
    this.radios.forEach((radio: NbRadioComponent<T>) => radio.name = this.name);
  }

  protected updateValues() {
    this.radios.forEach((radio: NbRadioComponent<T>) => {
      radio.checked = radio.value === this.value;
    });
  }

  protected subscribeOnRadiosValueChange() {
    merge(...this.radios.map((radio: NbRadioComponent<T>) => radio.valueChange))
      .pipe(takeWhile(() => this.alive))
      .subscribe((value: T) => {
        this.value = value;
        this.valueChange.emit(value);
      });
  }
}
