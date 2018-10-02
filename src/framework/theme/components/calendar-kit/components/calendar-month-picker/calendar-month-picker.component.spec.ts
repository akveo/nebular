/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NbCalendarMonthPickerComponent } from './calendar-month-picker.component';
import { NbDateService, NbNativeDateService } from '../../services';
import { NbCalendarMonthCellComponent } from './calendar-month-cell.component';
import { DatePipe } from '@angular/common';


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

  it('should fire monthChange when cell selected', done => {
    component.monthChange.subscribe(done);
    componentEl.query(By.css('nb-calendar-picker'))
      .nativeElement
      .dispatchEvent(new CustomEvent('select'));
  })
});
