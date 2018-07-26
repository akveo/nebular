import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbCalendarYearPickerComponent } from './calendar-year-picker.component';


describe('Component: NbCalendarYearPicker', () => {
  let fixture: ComponentFixture<NbCalendarYearPickerComponent>;
  let component: NbCalendarYearPickerComponent;
  let componentEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbCalendarYearPickerComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(NbCalendarYearPickerComponent);
    component = fixture.componentInstance;
    componentEl = fixture.debugElement.nativeElement;
  });

  beforeEach(() => {
    component.value = new Date(2018, 6, 23);
    fixture.detectChanges();
  });

  it('should contain header and body', () => {
    expect(componentEl.querySelector('nb-calendar-pageable-navigation')).toBeDefined();
    expect(componentEl.querySelector('.body')).toBeDefined();
  });

  it('should render 20 years', () => {
    expect(componentEl.querySelectorAll('.year').length).toBe(20);
  });

  it('should add selected class on active year', () => {
    expect(componentEl.querySelectorAll('.selected').length).toBe(1);
    expect(componentEl.querySelector('.selected').textContent).toContain('2018');
  });

  it('should fire valueChange when click on a year', () => {
    const yearEls = componentEl.querySelectorAll('.year');
    yearEls[6].dispatchEvent(new Event('click'));

    component.valueChange.subscribe(date => {
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
