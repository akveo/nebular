import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbCalendarDaysNamesComponent } from './calendar-days-names.component';
import { NbDateTimeUtil } from '../../service/date-time-util';
import { NbNativeDateTimeUtilService } from '../../service/date-time-util';


describe('Component: NbCalendarDaysNames', () => {
  let component: NbCalendarDaysNamesComponent<Date>;
  let fixture: ComponentFixture<NbCalendarDaysNamesComponent<Date>>;
  let componentEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbCalendarDaysNamesComponent],
      providers: [{ provide: NbDateTimeUtil, useClass: NbNativeDateTimeUtilService }],
    });
    fixture = TestBed.createComponent<NbCalendarDaysNamesComponent<Date>>(NbCalendarDaysNamesComponent);
    component = fixture.componentInstance;
    componentEl = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should render seven days', () => {
    const days = componentEl.querySelectorAll('div');
    expect(days.length).toBe(7);
  });

  it('should render two holidays', () => {
    const days = componentEl.querySelectorAll('.holiday');
    expect(days.length).toBe(2);
  });

  it('should contain narrow names', () => {
    const days = componentEl.querySelectorAll('div');
    [].forEach.call(days, day => {
      expect(day.textContent.length).toBe(1);
    });
  });
});
