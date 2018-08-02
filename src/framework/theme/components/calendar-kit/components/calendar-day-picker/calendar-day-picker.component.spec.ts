/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { DebugElement, NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NbCalendarDayPickerComponent } from './calendar-day-picker.component';
import { NbCalendarDayCellComponent } from './calendar-day-cell.component';
import { NbCalendarDaysService } from '../../services';
import { NbCalendarKitModule } from '../../calendar-kit.module';


describe('Component: NbCalendarDayPicker', () => {
  let component: NbCalendarDayPickerComponent<Date>;
  let fixture: ComponentFixture<NbCalendarDayPickerComponent<Date>>;
  let componentEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbCalendarKitModule],
      providers: [NbCalendarDaysService],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent<NbCalendarDayPickerComponent<Date>>(NbCalendarDayPickerComponent);
    component = fixture.componentInstance;
    componentEl = fixture.debugElement;

    component.activeMonth = new Date();
    component.value = new Date();
    component.ngOnChanges({
      activeMonth: new SimpleChange(null, component.activeMonth, true),
      value: new SimpleChange(null, component.value, true),
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

  it('should fire valueChange when cell selected', done => {
    component.valueChange.subscribe(done);
    componentEl.query(By.css('nb-calendar-picker'))
      .nativeElement
      .dispatchEvent(new CustomEvent('select'));
  })
});

