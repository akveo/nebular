/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';

import { NbCalendarDayCellComponent, NbDateService, NbNativeDateService, NbCalendarKitModule } from '@nebular/theme';

describe('Component: NbCalendarDayCell', () => {
  let component: NbCalendarDayCellComponent<Date>;
  let fixture: ComponentFixture<NbCalendarDayCellComponent<Date>>;
  let componentEl: HTMLElement;
  let dateService: NbDateService<Date>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbCalendarKitModule],
      providers: [DatePipe, NbNativeDateService, { provide: NbDateService, useExisting: NbNativeDateService }],
    });
    fixture = TestBed.createComponent<NbCalendarDayCellComponent<Date>>(NbCalendarDayCellComponent);
    component = fixture.componentInstance;
    componentEl = fixture.nativeElement;
    dateService = TestBed.inject(NbNativeDateService);
  });

  it('should contain cell class', () => {
    fixture.detectChanges();
    expect(componentEl.classList).toContain('day-cell');
  });

  it('should render date', () => {
    component.date = new Date(2018, 6, 12);
    component.selectedValue = new Date();
    component.visibleDate = new Date();
    fixture.detectChanges();
    expect(componentEl.textContent).toContain('12');
  });

  it('should fire select after click', (done) => {
    const date = new Date();
    component.date = date;
    component.selectedValue = new Date();
    component.visibleDate = new Date();
    fixture.detectChanges();
    component.select.subscribe((e) => {
      expect(e).toBe(date);
      done();
    });
    componentEl.dispatchEvent(new Event('click'));
  });

  it('should contain today class if today', () => {
    component.date = new Date();
    component.selectedValue = new Date();
    component.visibleDate = new Date();
    fixture.detectChanges();
    expect(componentEl.classList).toContain('today');
  });

  it('should contain selected class if selected', () => {
    component.date = new Date();
    component.selectedValue = new Date();
    component.visibleDate = new Date();
    fixture.detectChanges();
    expect(componentEl.classList).toContain('selected');
  });

  it('should contain bounding-month class if it adjoin to the year', () => {
    component.date = new Date(2018, 7, 1);
    component.visibleDate = new Date(2018, 6, 30);
    component.selectedValue = new Date();
    fixture.detectChanges();
    expect(componentEl.classList).toContain('bounding-month');
  });

  it('should contain empty if no date provided', () => {
    component.date = null;
    component.selectedValue = new Date();
    component.visibleDate = new Date();
    fixture.detectChanges();
    expect(componentEl.classList).toContain('empty');
  });

  it('should not contain disabled if greater than min', () => {
    component.date = new Date();
    component.min = dateService.addDay(new Date(), -1);
    fixture.detectChanges();
    expect(componentEl.classList).not.toContain('disabled');
  });

  it('should not contain disabled if smaller than max', () => {
    component.date = new Date();
    component.max = dateService.addDay(new Date(), 1);
    fixture.detectChanges();
    expect(componentEl.classList).not.toContain('disabled');
  });

  it('should not contain disabled if in min-max range', () => {
    component.date = new Date();
    component.min = dateService.addDay(new Date(), -1);
    component.max = dateService.addDay(new Date(), 1);
    fixture.detectChanges();
    expect(componentEl.classList).not.toContain('disabled');
  });

  it('should contain disabled if out of min-max range', () => {
    component.date = new Date();
    component.min = dateService.addDay(new Date(), 1);
    component.max = dateService.addDay(new Date(), 10);
    fixture.detectChanges();
    expect(componentEl.classList).toContain('disabled');
  });

  it('should contain disabled if smaller than min', () => {
    component.date = new Date();
    component.min = dateService.addDay(new Date(), 1);
    fixture.detectChanges();
    expect(componentEl.classList).toContain('disabled');
  });

  it('should contain disabled if greater than max', () => {
    component.date = new Date();
    component.max = dateService.addDay(new Date(), -1);
    fixture.detectChanges();
    expect(componentEl.classList).toContain('disabled');
  });

  it('should contain disable if fit the filter', () => {
    component.date = new Date(2018, 7, 2);
    component.filter = (date) => date.getDate() % 2 !== 0;
    fixture.detectChanges();
    expect(componentEl.classList).toContain('disabled');
  });

  it("should not contain disable if doesn't fit the filter", () => {
    component.date = new Date(2018, 7, 2);
    component.filter = (date) => date.getDate() % 2 !== 0;
    fixture.detectChanges();
    expect(componentEl.classList).toContain('disabled');
  });
});
