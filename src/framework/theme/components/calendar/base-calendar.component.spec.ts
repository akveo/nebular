/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  NbBaseCalendarComponent,
  NbCalendarModule,
  NbCalendarViewMode,
  NbCalendarYearModelService,
  NbThemeModule,
} from '@nebular/theme';

describe('NbBaseCalendarComponent', () => {
  let fixture: ComponentFixture<NbBaseCalendarComponent<Date, Date>>;
  let calendarComponent: NbBaseCalendarComponent<Date, Date>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ NbCalendarModule, NbThemeModule.forRoot() ],
    });

    fixture = TestBed.createComponent<NbBaseCalendarComponent<Date, Date>>(NbBaseCalendarComponent);
    calendarComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('navigatePrev', () => {
    it('should navigate to previous month in date view mode', () => {
      calendarComponent.activeViewMode = NbCalendarViewMode.DATE;
      calendarComponent.visibleDate = new Date(2018, 1, 1);

      calendarComponent.navigatePrev();

      expect(calendarComponent.visibleDate.getMonth()).toBe(0);
    });

    it('should navigate to previous year in month view mode', () => {
      calendarComponent.activeViewMode = NbCalendarViewMode.MONTH;
      calendarComponent.visibleDate = new Date(2018, 0, 1);

      calendarComponent.navigatePrev();

      expect(calendarComponent.visibleDate.getFullYear()).toBe(2017);
    });

    it('should navigate to previous years range in year view mode', () => {
      const initialDate = new Date(2018, 0, 1);
      const yearModelService: NbCalendarYearModelService<Date> = TestBed.inject(NbCalendarYearModelService);
      const expectedDate = initialDate.getFullYear() - yearModelService.getYearsInView();

      calendarComponent.activeViewMode = NbCalendarViewMode.YEAR;
      calendarComponent.visibleDate = initialDate;

      calendarComponent.navigatePrev();

      expect(calendarComponent.visibleDate.getFullYear()).toBe(expectedDate);
    });
  });

  describe('navigateNext', () => {
    it('should navigate to next month in date view mode', () => {
      calendarComponent.activeViewMode = NbCalendarViewMode.DATE;
      calendarComponent.visibleDate = new Date(2018, 0, 1);

      calendarComponent.navigateNext();

      expect(calendarComponent.visibleDate.getMonth()).toBe(1);
    });

    it('should navigate to next year in month view mode', () => {
      calendarComponent.activeViewMode = NbCalendarViewMode.MONTH;
      calendarComponent.visibleDate = new Date(2018, 0, 1);

      calendarComponent.navigateNext();

      expect(calendarComponent.visibleDate.getFullYear()).toBe(2019);
    });

    it('should navigate to next years range in year view mode', () => {
      const initialDate = new Date(2018, 0, 1);
      const yearModelService: NbCalendarYearModelService<Date> = TestBed.inject(NbCalendarYearModelService);
      const expectedDate = initialDate.getFullYear() + yearModelService.getYearsInView();

      calendarComponent.activeViewMode = NbCalendarViewMode.YEAR;
      calendarComponent.visibleDate = initialDate;

      calendarComponent.navigateNext();

      expect(calendarComponent.visibleDate.getFullYear()).toBe(expectedDate);
    });
  });

  describe('onChangeViewMode', () => {
    it('should change view mode to year in date view mode', () => {
      calendarComponent.activeViewMode = NbCalendarViewMode.DATE;
      calendarComponent.onChangeViewMode();
      expect(calendarComponent.activeViewMode).toBe(NbCalendarViewMode.YEAR);
    });

    it('should change view mode to date in month view mode', () => {
      calendarComponent.activeViewMode = NbCalendarViewMode.MONTH;
      calendarComponent.onChangeViewMode();
      expect(calendarComponent.activeViewMode).toBe(NbCalendarViewMode.DATE);
    });

    it('should change view mode to date in year view mode', () => {
      calendarComponent.activeViewMode = NbCalendarViewMode.YEAR;
      calendarComponent.onChangeViewMode();
      expect(calendarComponent.activeViewMode).toBe(NbCalendarViewMode.DATE);
    });
  });
});
