/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NbCalendarMonthPickerComponent } from './calendar-month-picker.component';
import { NbLocaleService } from '../../services';
import { NbCalendarMonthCellComponent } from './calendar-month-cell.component';


describe('Component: NbCalendarMonthPicker', () => {
  let fixture: ComponentFixture<NbCalendarMonthPickerComponent>;
  let component: NbCalendarMonthPickerComponent;
  let componentEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbCalendarMonthPickerComponent],
      providers: [NbLocaleService],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(NbCalendarMonthPickerComponent);
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
