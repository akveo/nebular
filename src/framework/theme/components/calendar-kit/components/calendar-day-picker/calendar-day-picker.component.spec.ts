/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbCalendarDayPickerComponent } from './calendar-day-picker.component';

import { Component, DebugElement, NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { NbCalendarDaysService, NbCalendarKitModule } from '@nebular/theme';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'nb-calendar-day-picker-test',
  template: `
    <nb-calendar-day-picker [activeMonth]="activeMonth" [value]="value">
      <span *nbCalendarDay calendar-day-cell></span>
    </nb-calendar-day-picker>
  `,
})
export class NbCalendarDayPickerTestComponent {
  activeMonth = new Date();
  value = new Date();
}

describe('Component: NbCalendarDayPicker', () => {
  let testComponentEl: DebugElement;

  let component: NbCalendarDayPickerComponent<Date>;
  let fixture: ComponentFixture<NbCalendarDayPickerComponent<Date>>;
  let componentEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbCalendarKitModule],
      declarations: [NbCalendarDayPickerTestComponent],
      providers: [NbCalendarDaysService],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent<NbCalendarDayPickerComponent<Date>>(NbCalendarDayPickerComponent);
    component = fixture.componentInstance;
    componentEl = fixture.debugElement;

    const testFixture = TestBed.createComponent<NbCalendarDayPickerTestComponent>(NbCalendarDayPickerTestComponent);
    testComponentEl = testFixture.debugElement;
    testFixture.detectChanges();

    component.activeMonth = new Date();
    component.value = new Date();
    component.ngOnChanges({
      activeMonth: new SimpleChange(null, component.activeMonth, true),
      value: new SimpleChange(null, component.value, true),
    });
    fixture.detectChanges();
  });

  it('should render days names', () => {
    expect(componentEl.query(By.css('nb-calendar-days-names')).nativeElement).toBeTruthy();
  });

  it('should contain multiple weeks', () => {
    expect(componentEl.queryAll(By.css('.week')).length).toBeGreaterThanOrEqual(5);
  });

  it('should contain nbCalendarDay if passed', () => {
    expect(testComponentEl.query(By.css('[calendar-day-cell]'))).toBeTruthy();
  });

  it('should contain default calendar cell if no content projected', () => {
    expect(componentEl.query(By.css('nb-calendar-day-cell'))).toBeTruthy();
  });
});

