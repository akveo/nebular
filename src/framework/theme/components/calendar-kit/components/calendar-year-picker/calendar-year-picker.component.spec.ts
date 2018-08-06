/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbCalendarYearPickerComponent } from './calendar-year-picker.component';


describe('Component: NbCalendarYearPicker', () => {
  let fixture: ComponentFixture<NbCalendarYearPickerComponent>;
  let component: NbCalendarYearPickerComponent;
  let componentEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbCalendarYearPickerComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(NbCalendarYearPickerComponent);
    component = fixture.componentInstance;
    componentEl = fixture.debugElement.nativeElement;
  });

  beforeEach(() => {
    component.date = new Date(2018, 6, 23);
    component.year = new Date(2018, 6, 23);
    component.ngOnChanges();
    fixture.detectChanges();
  });

  it('should contain calendar picker', () => {
    expect(componentEl.querySelector('nb-calendar-picker')).toBeDefined();
  });

  it('should fire monthChange when click on a year', done => {
    component.yearChange.subscribe(done);
    componentEl.querySelector('nb-calendar-picker')
      .dispatchEvent(new CustomEvent('select'));
  });
});
