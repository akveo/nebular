/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { By } from '@angular/platform-browser';
import {
  NbCalendarMonthPickerComponent,
  NbDateService,
  NbNativeDateService,
  NbCalendarMonthCellComponent,
} from '@nebular/theme';

describe('Component: NbCalendarMonthPicker', () => {
  let fixture: ComponentFixture<NbCalendarMonthPickerComponent<Date, Date>>;
  let component: NbCalendarMonthPickerComponent<Date, Date>;
  let componentEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbCalendarMonthPickerComponent],
      providers: [{ provide: NbDateService, useClass: NbNativeDateService }, DatePipe],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent<NbCalendarMonthPickerComponent<Date, Date>>(NbCalendarMonthPickerComponent);
    component = fixture.componentInstance;
    componentEl = fixture.debugElement;
  });

  it('should contain calendar picker', () => {
    expect(componentEl.query(By.css('nb-calendar-picker'))).toBeDefined();
  });

  it('should provide default cell component', () => {
    expect(component.cellComponent).toBe(NbCalendarMonthCellComponent);
  });

  it('should fire monthChange when cell selected', () => {
    const monthChangeSpy = jasmine.createSpy('monthChange spy');
    component.monthChange.subscribe(monthChangeSpy);
    componentEl.query(By.css('nb-calendar-picker')).nativeElement.dispatchEvent(new CustomEvent('select'));
    expect(monthChangeSpy).toHaveBeenCalled();
  });

  it('should not have duplicate months', () => {
    component.month = new Date(2019, 0, 30);
    component.initMonths();

    let expectedMonthIndex = 0;
    for (const monthRow of component.months) {
      for (const month of monthRow) {
        expect(month.getMonth()).toEqual(expectedMonthIndex);
        expectedMonthIndex++;
      }
    }
  });
});
