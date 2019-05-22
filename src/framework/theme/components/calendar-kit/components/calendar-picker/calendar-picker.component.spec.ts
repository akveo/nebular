/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NbCalendarPickerComponent } from './calendar-picker.component';
import { NbCalendarPickerRowComponent } from './calendar-picker-row.component';
import { NbCalendarDayCellComponent } from '../calendar-day-picker/calendar-day-cell.component';
import { DatePipe } from '@angular/common';
import { NbDateService } from '../../services/date.service';
import { NbNativeDateService } from '../../services/native-date.service';


@NgModule({
  declarations: [NbCalendarDayCellComponent],
  entryComponents: [NbCalendarDayCellComponent],
})
export class NbCalendarPickerTestModule {
}

describe('Component: NbCalendarPicker', () => {
  let fixture: ComponentFixture<NbCalendarPickerComponent<Date, Date>>;
  let component: NbCalendarPickerComponent<Date, Date>;
  let componentEl: HTMLElement;

  const queryTestRow = (): NbCalendarPickerRowComponent<Date, Date> => {
    return fixture.debugElement
      .query(By.directive(NbCalendarPickerRowComponent))
      .componentInstance;
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbCalendarPickerRowComponent, NbCalendarPickerComponent],
      providers: [DatePipe, { provide: NbDateService, useClass: NbNativeDateService }],
      imports: [NbCalendarPickerTestModule],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent<NbCalendarPickerComponent<Date, Date>>(NbCalendarPickerComponent);
    component = fixture.componentInstance;
    componentEl = fixture.debugElement.nativeElement;
    component.cellComponent = NbCalendarDayCellComponent;
    component.data = [[new Date()]];
  });

  it('should render grid of data', function () {
    component.data = [[new Date(), new Date()], [new Date(), new Date()]];
    fixture.detectChanges();
    expect(componentEl.querySelectorAll('nb-calendar-day-cell').length).toBe(4);
  });

  it('should provide year for cell', () => {
    const activeMonth = new Date();
    component.visibleDate = activeMonth;
    fixture.detectChanges();
    const row: NbCalendarPickerRowComponent<Date, Date> = queryTestRow();
    expect(row.visibleDate).toBe(activeMonth);
  });

  it('should provide selectedValue for cell', () => {
    const selectedValue = new Date();
    component.selectedValue = selectedValue;
    fixture.detectChanges();
    const row: NbCalendarPickerRowComponent<Date, Date> = queryTestRow();
    expect(row.selectedValue).toBe(selectedValue);
  });

  it('should provide min for cell', () => {
    const min = new Date();
    component.min = min;
    fixture.detectChanges();
    const row: NbCalendarPickerRowComponent<Date, Date> = queryTestRow();
    expect(row.min).toBe(min);
  });

  it('should provide max for cell', () => {
    const max = new Date();
    component.max = max;
    fixture.detectChanges();
    const row: NbCalendarPickerRowComponent<Date, Date> = queryTestRow();
    expect(row.max).toBe(max);
  });

  it('should provide filter for cell', () => {
    const filter = () => true;
    component.filter = filter;
    fixture.detectChanges();
    const row: NbCalendarPickerRowComponent<Date, Date> = queryTestRow();
    expect(row.filter).toBe(filter);
  });

  it('should fire select when entire cell selected', () => {
    const date = new Date();
    component.data = [[date]];
    fixture.detectChanges();
    const row: NbCalendarPickerRowComponent<Date, Date> = queryTestRow();
    component.select.subscribe(e => expect(e).toBe(date));
    row.select.emit(date);
  });
});
