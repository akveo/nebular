/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NbCalendarPickerRowComponent } from './calendar-picker-row.component';
import { NbCalendarDayCellComponent } from '../calendar-day-picker/calendar-day-cell.component';
import { DatePipe } from '@angular/common';
import { NbDateService } from '../../services/date.service';
import { NbNativeDateService } from '../../services/native-date.service';


@NgModule({
  declarations: [NbCalendarDayCellComponent],
  entryComponents: [NbCalendarDayCellComponent],
})
export class NbCalendarPickerRowTestModule {
}

describe('Component: NbCalendarPickerRow', () => {
  let fixture: ComponentFixture<NbCalendarPickerRowComponent<Date, Date>>;
  let component: NbCalendarPickerRowComponent<Date, Date>;
  let componentEl: HTMLElement;

  const queryTestCell = (): NbCalendarDayCellComponent<Date> => {
    return fixture.debugElement
      .query(By.directive(NbCalendarDayCellComponent))
      .componentInstance;
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbCalendarPickerRowComponent],
      imports: [NbCalendarPickerRowTestModule],
      providers: [DatePipe, { provide: NbDateService, useClass: NbNativeDateService }],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent<NbCalendarPickerRowComponent<Date, Date>>(NbCalendarPickerRowComponent);
    component = fixture.componentInstance;
    componentEl = fixture.debugElement.nativeElement;
    component.component = NbCalendarDayCellComponent;
    component.row = [new Date()];
  });

  it('should render row of data', function () {
    component.row = [new Date(), new Date()];
    component.ngOnChanges();
    fixture.detectChanges();
    expect(componentEl.querySelectorAll('nb-calendar-day-cell').length).toBe(2);
  });

  it('should provide date for cell', () => {
    const date = new Date();
    component.row = [date];
    component.ngOnChanges();
    fixture.detectChanges();
    const cell: NbCalendarDayCellComponent<Date> = queryTestCell();
    expect(cell.date).toBe(date);
  });

  it('should provide year for cell', () => {
    const activeMonth = new Date();
    component.visibleDate = activeMonth;
    component.ngOnChanges();
    fixture.detectChanges();
    const cell: NbCalendarDayCellComponent<Date> = queryTestCell();
    expect(cell.visibleDate).toBe(activeMonth);
  });

  it('should provide selectedValue for cell', () => {
    const selectedValue = new Date();
    component.selectedValue = selectedValue;
    component.ngOnChanges();
    fixture.detectChanges();
    const cell: NbCalendarDayCellComponent<Date> = queryTestCell();
    expect(cell.selectedValue).toBe(selectedValue);
  });

  it('should provide min for cell', () => {
    const min = new Date();
    component.min = min;
    component.ngOnChanges();
    fixture.detectChanges();
    const cell: NbCalendarDayCellComponent<Date> = queryTestCell();
    expect(cell.min).toBe(min);
  });

  it('should provide max for cell', () => {
    const max = new Date();
    component.max = max;
    component.ngOnChanges();
    fixture.detectChanges();
    const cell: NbCalendarDayCellComponent<Date> = queryTestCell();
    expect(cell.max).toBe(max);
  });

  it('should provide filter for cell', () => {
    const filter = () => true;
    component.filter = filter;
    component.ngOnChanges();
    fixture.detectChanges();
    const cell: NbCalendarDayCellComponent<Date> = queryTestCell();
    expect(cell.filter).toBe(filter);
  });

  it('should fire select when entire cell selected', () => {
    const date = new Date();
    component.row = [date];
    component.ngOnChanges();
    fixture.detectChanges();
    const cell: NbCalendarDayCellComponent<Date> = queryTestCell();
    component.select.subscribe(e => expect(e).toBe(date));
    cell.select.emit(cell.date);
  });
});

