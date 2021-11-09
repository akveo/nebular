/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { DebugElement, NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  NbCalendarDayPickerComponent,
  NbCalendarDayCellComponent,
  NbCalendarMonthModelService,
  NbCalendarKitModule,
} from '@nebular/theme';

describe('Component: NbCalendarDayPicker', () => {
  let component: NbCalendarDayPickerComponent<Date, Date>;
  let fixture: ComponentFixture<NbCalendarDayPickerComponent<Date, Date>>;
  let componentEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbCalendarKitModule],
      providers: [NbCalendarMonthModelService],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent<NbCalendarDayPickerComponent<Date, Date>>(NbCalendarDayPickerComponent);
    component = fixture.componentInstance;
    componentEl = fixture.debugElement;

    component.visibleDate = new Date();
    component.date = new Date();
    component.ngOnChanges({
      activeMonth: new SimpleChange(null, component.visibleDate, true),
      value: new SimpleChange(null, component.date, true),
    });
    fixture.detectChanges();
  });

  it('should render days names', () => {
    expect(componentEl.query(By.css('nb-calendar-days-names'))).toBeTruthy();
  });

  it('should render calendar picker', () => {
    expect(componentEl.query(By.css('nb-calendar-picker'))).toBeTruthy();
  });

  it('should provide default cell component', () => {
    expect(component.cellComponent).toBe(NbCalendarDayCellComponent);
  });

  it('should fire dateChange when cell selected', () => {
    const dateChangeSpy = jasmine.createSpy('dateChange spy');
    component.dateChange.subscribe(dateChangeSpy);
    componentEl.query(By.css('nb-calendar-picker')).nativeElement.dispatchEvent(new CustomEvent('select'));
    expect(dateChangeSpy).toHaveBeenCalled();
  });
});
