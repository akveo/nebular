import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbCalendarWeekComponent } from './calendar-week.component';
import { range } from '../../helpers';
import { NbCalendarCellState } from '../../model';
import { NbDateTimeUtil } from '../../service';


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
    component.week = range(7).map(i => ({
      date: NbDateTimeUtil.createDate(2018, 6, i),
      state: [NbCalendarCellState.SELECTED],
    }));
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
