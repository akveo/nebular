/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbCalendarMonthCellComponent } from './calendar-month-cell.component';
import { NbDateService } from '../../services/date.service';
import { NbNativeDateService } from '../../services/native-date.service';
import { DatePipe } from '@angular/common';


describe('Component: NbCalendarMonthCell', () => {
  let component: NbCalendarMonthCellComponent<Date>;
  let fixture: ComponentFixture<NbCalendarMonthCellComponent<Date>>;
  let componentEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbCalendarMonthCellComponent],
      providers: [{ provide: NbDateService, useClass: NbNativeDateService }, DatePipe],
    });
    fixture = TestBed.createComponent<NbCalendarMonthCellComponent<Date>>(NbCalendarMonthCellComponent);
    component = fixture.componentInstance;
    componentEl = fixture.debugElement.nativeElement;
  });

  it('should render month', () => {
    component.date = new Date(2018, 6, 12);
    component.selectedValue = new Date();
    fixture.detectChanges();
    expect(componentEl.textContent).toContain('Jul');
  });

  it('should contain selected class if selected', () => {
    component.date = new Date();
    component.selectedValue = new Date();
    fixture.detectChanges();
    expect(componentEl.classList).toContain('selected');
  });

  it('should contain cell class', () => {
    expect(componentEl.classList).toContain('month-cell');
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
    component.date = new Date(2018, 1, 1);
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
