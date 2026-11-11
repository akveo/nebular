import { Component, EventEmitter, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbThemeModule } from '../../theme.module';
import { NbCalendarCell } from '../calendar-kit/model';
import { NbCalendarRangeModule } from './calendar-range.module';
import { NbCalendarRange, NbCalendarRangeComponent } from './calendar-range.component';

@Component({
  template: '',
  standalone: false,
})
class CustomMonthCellComponent implements NbCalendarCell<Date, NbCalendarRange<Date>> {
  date: Date;
  select = new EventEmitter<Date>();
}

@Component({
  template: '<nb-calendar-range [monthCellComponent]="monthCellComponent"></nb-calendar-range>',
  standalone: false,
})
class CalendarRangeTestComponent {
  monthCellComponent: Type<CustomMonthCellComponent> = CustomMonthCellComponent;

  @ViewChild(NbCalendarRangeComponent) calendar: NbCalendarRangeComponent<Date>;
}

describe('NbCalendarRangeComponent', () => {
  let fixture: ComponentFixture<CalendarRangeTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbThemeModule.forRoot(), NbCalendarRangeModule],
      declarations: [CalendarRangeTestComponent, CustomMonthCellComponent],
    });

    fixture = TestBed.createComponent(CalendarRangeTestComponent);
    fixture.detectChanges();
  });

  it('should accept a custom month cell through its public input alias', () => {
    expect(fixture.componentInstance.calendar.monthCellComponent).toBe(CustomMonthCellComponent);
  });
});
