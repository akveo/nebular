/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbCalendarYearPickerComponent, NbCalendarKitModule } from '@nebular/theme';

describe('Component: NbCalendarYearPicker', () => {
  let fixture: ComponentFixture<NbCalendarYearPickerComponent<Date>>;
  let component: NbCalendarYearPickerComponent<Date>;
  let componentEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbCalendarKitModule],
    });
    fixture = TestBed.createComponent<NbCalendarYearPickerComponent<Date>>(NbCalendarYearPickerComponent);
    component = fixture.componentInstance;
    componentEl = fixture.debugElement.nativeElement;
  });

  beforeEach(() => {
    component.date = new Date(2018, 6, 23);
    component.year = new Date(2018, 6, 23);
    component.ngOnChanges();
    fixture.detectChanges();
  });

  it('should contain calendar picker', () => {
    expect(componentEl.querySelector('nb-calendar-picker')).toBeDefined();
  });

  it('should fire yearChange when click on a year', () => {
    const yearChangeSpy = jasmine.createSpy('yearChange spy');

    component.yearChange.subscribe(yearChangeSpy);
    componentEl.querySelector('nb-calendar-picker').dispatchEvent(new CustomEvent('select'));

    expect(yearChangeSpy).toHaveBeenCalled();
  });
});
