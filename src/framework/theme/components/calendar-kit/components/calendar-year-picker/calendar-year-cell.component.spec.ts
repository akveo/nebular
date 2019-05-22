/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbDateService } from '../../services/date.service';
import { NbNativeDateService } from '../../services/native-date.service';
import { NbCalendarYearCellComponent } from './calendar-year-cell.component';
import { DatePipe } from '@angular/common';


describe('Component: NbCalendarYearCell', () => {
  let component: NbCalendarYearCellComponent<Date>;
  let fixture: ComponentFixture<NbCalendarYearCellComponent<Date>>;
  let componentEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbCalendarYearCellComponent],
      providers: [{ provide: NbDateService, useClass: NbNativeDateService }, DatePipe],
    });
    fixture = TestBed.createComponent<NbCalendarYearCellComponent<Date>>(NbCalendarYearCellComponent);
    component = fixture.componentInstance;
    componentEl = fixture.debugElement.nativeElement;
  });

  it('should render year', () => {
    component.date = new Date(2018, 6, 12);
    component.selectedValue = new Date();
    fixture.detectChanges();
    expect(componentEl.textContent).toContain('2018');
  });

  it('should contain selected class if selected', () => {
    component.date = new Date();
    component.selectedValue = new Date();
    fixture.detectChanges();
    expect(componentEl.classList).toContain('selected');
  });

  it('should contain cell class', () => {
    expect(componentEl.classList).toContain('year-cell');
  });

  it('should fire select on click', () => {
    const date = new Date();
    component.date = date;
    component.selectedValue = new Date();
    fixture.detectChanges();
    component.select.subscribe(e => expect(e).toBe(date));
    componentEl.dispatchEvent(new Event('click'));
    expect(componentEl.classList).toContain('selected');
  });

  it('should contain disabled class if fully out of min-max range', () => {
    component.date = new Date(2017, 7, 1);
    component.selectedValue = new Date();
    component.min = new Date(2018, 5, 1);
    component.max = new Date(2018, 10, 1);
    fixture.detectChanges();
    expect(componentEl.classList).toContain('disabled');
  });

  it('should not contain disabled class if partially out of min-max range', () => {
    component.date = new Date(2018, 1, 1);
    component.selectedValue = new Date();
    component.min = new Date(2018, 1, 15);
    component.max = new Date(2018, 10, 1);
    fixture.detectChanges();
    expect(componentEl.classList).not.toContain('disabled');
  });

  it('should not contain disabled class if fully in min-max range', () => {
    component.date = new Date(2018, 5, 1);
    component.selectedValue = new Date();
    component.min = new Date(2018, 1, 15);
    component.max = new Date(2018, 10, 1);
    fixture.detectChanges();
    expect(componentEl.classList).not.toContain('disabled');
  });
});
