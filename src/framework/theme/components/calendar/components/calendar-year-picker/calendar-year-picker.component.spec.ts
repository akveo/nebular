import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbDateTimeUtil } from '../../service/date-time-util';
import { NbNativeDateTimeUtilService } from '../../service/native-date-time-util.service';
import { NbCalendarYearPickerComponent } from './calendar-year-picker.component';


describe('Component: NbCalendarYearPicker', () => {
  let fixture: ComponentFixture<NbCalendarYearPickerComponent<Date>>;
  let component: NbCalendarYearPickerComponent<Date>;
  let componentEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbCalendarYearPickerComponent],
      providers: [{ provide: NbDateTimeUtil, useClass: NbNativeDateTimeUtilService }],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent<NbCalendarYearPickerComponent<Date>>(NbCalendarYearPickerComponent);
    component = fixture.componentInstance;
    componentEl = fixture.debugElement.nativeElement;
  });

  beforeEach(() => {
    component.activeMonth = new Date(2018, 6, 23);
    component.startYear = 2010;
    fixture.detectChanges();
  });

  it('should contain header and body', () => {
    expect(componentEl.querySelector('nb-calendar-pageable-header')).toBeDefined();
    expect(componentEl.querySelector('.body')).toBeDefined();
  });

  it('should fire changeMode event when click on header', () => {
    component.changeMode.subscribe(e => expect(e).toBeUndefined());
    componentEl.querySelector('nb-calendar-pageable-header').dispatchEvent(new Event('click'));
  });

  it('should render 20 years', () => {
    expect(componentEl.querySelectorAll('.year').length).toBe(20);
  });

  it('should add selected class on active year', () => {
    expect(componentEl.querySelectorAll('.selected').length).toBe(1);
    expect(componentEl.querySelector('.selected').textContent).toContain('2018');
  });

  it('should fire change when click on a year', () => {
    const yearEls = componentEl.querySelectorAll('.year');
    yearEls[6].dispatchEvent(new Event('click'));

    component.change.subscribe(date => {
      expect(date.getFullYear()).toBe(2014);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(23);
    });
  });

  it('should render years with step equals to one', () => {
    [].reduce.call(componentEl.querySelectorAll('.year'), (prev, curr) => {
      expect(+prev.textContent.trim() + 1).toBe(+curr.textContent.trim());
      return curr;
    });
  });
});
