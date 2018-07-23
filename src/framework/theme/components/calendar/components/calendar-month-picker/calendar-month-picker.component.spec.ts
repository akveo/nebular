import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbDateTimeUtil } from '../../service/date-time-util';
import { NbNativeDateTimeUtilService } from '../../service/native-date-time-util.service';
import { NbCalendarMonthPickerComponent } from './calendar-month-picker.component';


describe('Component: NbCalendarMonthPicker', () => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let fixture: ComponentFixture<NbCalendarMonthPickerComponent<Date>>;
  let component: NbCalendarMonthPickerComponent<Date>;
  let componentEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbCalendarMonthPickerComponent],
      providers: [{ provide: NbDateTimeUtil, useClass: NbNativeDateTimeUtilService }],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent<NbCalendarMonthPickerComponent<Date>>(NbCalendarMonthPickerComponent);
    component = fixture.componentInstance;
    componentEl = fixture.debugElement.nativeElement;
  });

  it('should contain header and body', () => {
    expect(componentEl.querySelector('nb-calendar-header')).toBeDefined();
    expect(componentEl.querySelector('.body')).toBeDefined();
  });

  it('should fire changeMode event when click on header', () => {
    component.changeMode.subscribe(e => expect(e).toBeUndefined());
    componentEl.querySelector('nb-calendar-header').dispatchEvent(new Event('click'));
  });

  it('should render twelve month', async(() => {
    component.activeMonth = new Date(2018, 6, 23);
    component.today = new Date(2018, 6, 23);
    fixture.detectChanges();
    expect(componentEl.querySelectorAll('.month').length).toBe(12);
  }));

  it('should render three rows', async(() => {
    component.activeMonth = new Date(2018, 6, 23);
    component.today = new Date(2018, 6, 23);
    // TODO rename chunk-row class to something more meaningful
    fixture.detectChanges();
    expect(componentEl.querySelectorAll('.chunk-row').length).toBe(3);
  }));

  it('should render four month for each row', () => {
    [].forEach.call(componentEl.querySelectorAll('.chunk-row'), row => {
      expect(row.length).toBe(4);
    });
  });

  it('should add selected class on activeMonth', () => {
    component.activeMonth = new Date(2018, 6, 23);
    fixture.detectChanges();
    expect(componentEl.querySelectorAll('.selected').length).toBe(1);
    expect(componentEl.querySelector('.selected').textContent).toContain('Jul');
  });

  it('should render months with correct labels', () => {
    const monthEls = componentEl.querySelectorAll('.month');
    const months = [].map.call(monthEls, month => month.textContent);
    months.forEach((month, i) => {
      expect(month).toContain(monthNames[i]);
    });
  });

  it('should fire change when click on a month', () => {
    component.activeMonth = new Date(2018, 6, 23);
    fixture.detectChanges();
    const monthEls = componentEl.querySelectorAll('.month');
    monthEls[6].dispatchEvent(new Event('click'));

    component.change.subscribe(date => {
      expect(date.getFullYear()).toBe(2018);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(23);
    });
  });
});
