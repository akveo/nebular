/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  NbTimepickerModule,
  NbTimePickerComponent,
  NbTimePickerDirective,
  NbLayoutModule,
  NbThemeModule,
  NB_TIME_PICKER_CONFIG,
} from '@nebular/theme';


describe('NbTimePickerComponent', () => {
  let timePicker: NbTimePickerComponent<Date>;
  let fixture: ComponentFixture<NbTimePickerComponent<Date>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ NbTimepickerModule, NbThemeModule.forRoot() ],
      providers: [NbTimePickerComponent, {provide: NB_TIME_PICKER_CONFIG, useValue: {}}],
    });

    fixture = TestBed.createComponent<NbTimePickerComponent<Date>>(NbTimePickerComponent);
    timePicker = fixture.componentInstance;
  });

  it('should set correct time format', () => {
    timePicker.twelveHoursFormat = false;
    expect(timePicker.buildTimeFormat()).toEqual('HH:mm');
  });

  it('should set twelve hours format', () => {
    timePicker.twelveHoursFormat = true;
    timePicker.withSeconds = true;
    expect(timePicker.buildTimeFormat()).toEqual('hh:mm:ss a');
  });
});

@Component({
  template: `
    <nb-layout>
      <nb-layout-column>
        <input [formControl]="control" [nbTimepicker]="picker">
        <nb-timepicker #picker></nb-timepicker>
      </nb-layout-column>
    </nb-layout>
  `,
  standalone: false,
})
class NbTimePickerHostComponent {
  control = new FormControl(new Date(2026, 10, 12, 13));
  @ViewChild(NbTimePickerDirective) directive: NbTimePickerDirective<Date>;
}

describe('NbTimePickerDirective', () => {
  it('should close the open popup when the form control is disabled', () => {
    TestBed.configureTestingModule({
      declarations: [NbTimePickerHostComponent],
      imports: [RouterTestingModule.withRoutes([]), NbLayoutModule, NbThemeModule.forRoot(),
        NbTimepickerModule.forRoot(), ReactiveFormsModule],
    });
    const fixture = TestBed.createComponent(NbTimePickerHostComponent);
    fixture.detectChanges();
    const { control, directive } = fixture.componentInstance;

    directive.show();
    fixture.detectChanges();
    expect(directive.isOpen).toBe(true);

    control.disable();
    fixture.detectChanges();
    expect(directive.isClosed).toBe(true);
  });
});
