/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NbCalendarMonthPickerComponent } from './calendar-month-picker.component';
import { NbLocaleService } from '../../services';


describe('Component: NbCalendarMonthPicker', () => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let fixture: ComponentFixture<NbCalendarMonthPickerComponent>;
  let component: NbCalendarMonthPickerComponent;
  let componentEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbCalendarMonthPickerComponent],
      providers: [NbLocaleService],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(NbCalendarMonthPickerComponent);
    component = fixture.componentInstance;
    componentEl = fixture.debugElement.nativeElement;
  });

  it('should contain header and body', () => {
    expect(componentEl.querySelector('nb-calendar-navigation')).toBeDefined();
    expect(componentEl.querySelector('.body')).toBeDefined();
  });

  it('should render twelve month', async(() => {
    component.value = new Date(2018, 6, 23);
    fixture.detectChanges();
    expect(componentEl.querySelectorAll('nb-calendar-month-cell').length).toBe(12);
  }));

  it('should render three rows', async(() => {
    component.value = new Date(2018, 6, 23);
    fixture.detectChanges();
    expect(componentEl.querySelectorAll('.chunk-row').length).toBe(3);
  }));

  it('should render four month for each row', () => {
    [].forEach.call(componentEl.querySelectorAll('.chunk-row'), row => {
      expect(row.length).toBe(4);
    });
  });

  it('should render months with correct labels', () => {
    const monthEls = componentEl.querySelectorAll('nb-calendar-month-cell');
    const months = [].map.call(monthEls, month => month.textContent);
    months.forEach((month, i) => {
      expect(month).toContain(monthNames[i]);
    });
  });

  it('should fire valueChange when click on a month', () => {
    component.value = new Date(2018, 6, 23);
    fixture.detectChanges();
    const monthEls = componentEl.querySelectorAll('nb-calendar-month-cell');
    monthEls[6].dispatchEvent(new Event('click'));

    component.valueChange.subscribe(date => {
      expect(date.getFullYear()).toBe(2018);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(23);
    });
  });
});
