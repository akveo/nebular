import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbCalendarWeekComponent } from './calendar-week.component';
import { range } from '@nebular/theme/components/calendar/helpers';
import { NbCalendarCellState } from '@nebular/theme/components/calendar/model';


describe('Component: NbCalendarWeek', () => {
  let fixture: ComponentFixture<NbCalendarWeekComponent>;
  let component: NbCalendarWeekComponent;
  let componentEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbCalendarWeekComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(NbCalendarWeekComponent);
    component = fixture.componentInstance;
    componentEl = fixture.debugElement.nativeElement;
  });

  beforeEach(() => {
    component.week = {
      cells: range(7).map(i => ({
        year: 2018,
        month: 6,
        date: i,
        activeMonthDiff: 0,
        state: [NbCalendarCellState.SELECTED],
      })),
    };
    fixture.detectChanges();
  });

  it('should render cells', () => {
    expect(componentEl.querySelectorAll('nb-calendar-cell').length).toBe(7);
  });

  it('should fire click on cell click', () => {
    const clickedCellIndex = 3;
    componentEl.querySelectorAll('nb-calendar-cell')[clickedCellIndex].dispatchEvent(new Event('click'));
    component.click.subscribe(({ year, month, date, activeMonthDiff, state: [state] }) => {
      expect(year).toBe(2018);
      expect(month).toBe(6);
      expect(date).toBe(clickedCellIndex);
      expect(activeMonthDiff).toBe(0);
      expect(state).toBe(NbCalendarCellState.SELECTED);
    });
  });
});
