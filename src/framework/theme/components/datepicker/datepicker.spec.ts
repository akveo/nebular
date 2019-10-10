/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ApplicationRef, Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { skip } from 'rxjs/operators';
import { NbCalendarRange, NbDatepickerDirective } from '@nebular/theme';

import { NbDatepickerModule } from './datepicker.module';
import { NbThemeModule } from '../../theme.module';
import { NbLayoutModule } from '../layout/layout.module';
import { NbDatepickerComponent, NbRangepickerComponent } from './datepicker.component';

@Component({
  selector: 'nb-datepicker-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <input [nbDatepicker]="datepicker">
        <nb-datepicker #datepicker></nb-datepicker>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbDatepickerTestComponent {
  @ViewChild(NbDatepickerComponent, { static: false }) datepicker: NbDatepickerComponent<Date>;
  @ViewChild(NbDatepickerDirective, { static: false }) datepickerDirective: NbDatepickerDirective<Date>;
}

@Component({
  selector: 'nb-rangepicker-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <input [nbDatepicker]="rangepicker">
        <nb-rangepicker #rangepicker></nb-rangepicker>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbRangepickerTestComponent {
  @ViewChild(NbRangepickerComponent, { static: false }) rangepicker: NbRangepickerComponent<Date>;
  @ViewChild(NbDatepickerDirective, { static: false }) datepickerDirective: NbDatepickerDirective<Date>;
}

describe('nb-datepicker', () => {
  let fixture: ComponentFixture<NbDatepickerTestComponent>;
  let appRef: ApplicationRef;
  let datepicker: NbDatepickerComponent<Date>;
  let datepickerDirective: NbDatepickerDirective<Date>;
  let overlay: HTMLElement;
  let input: HTMLInputElement;

  const showDatepicker = () => {
    datepicker.show();
    appRef.tick();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        NbThemeModule.forRoot(),
        NbLayoutModule,
        NbDatepickerModule.forRoot(),
      ],
      declarations: [NbDatepickerTestComponent],
    });

    fixture = TestBed.createComponent(NbDatepickerTestComponent);
    appRef = TestBed.get(ApplicationRef);

    fixture.detectChanges();
  });

  beforeEach(() => {
    datepicker = fixture.componentInstance.datepicker;
    datepickerDirective = fixture.componentInstance.datepickerDirective;
    overlay = fixture.nativeElement.querySelector('nb-layout');
    input = fixture.nativeElement.querySelector('input');
  });

  it('should not throw when destroyed right after creation', () => {
    const picker = TestBed.createComponent(NbDatepickerComponent).componentInstance;
    expect(picker.ngOnDestroy.bind(picker)).not.toThrow();
  });

  it('should render calendar', () => {
    showDatepicker();
    const calendar = overlay.querySelector('nb-calendar');
    expect(calendar).toBeTruthy();
  });

  it('should not render overlay on load', () => {
    const datepickerContainer = overlay.querySelector('nb-datepicker-container');
    expect(datepickerContainer).toBeNull();
  });

  it('should render overlay lazily', () => {
    const datepickerContainer = overlay.querySelector('nb-datepicker-container');
    expect(datepickerContainer).toBeNull();
    showDatepicker();
    const calendar = overlay.querySelector('nb-calendar');
    expect(calendar).toBeTruthy();
  });

  it('should write selected date in the input', () => {
    const date = new Date(2018, 8, 17);
    datepicker.visibleDate = date;
    showDatepicker();

    datepicker.dateChange.subscribe(e => {
      expect(e).toEqual(date);
      expect(input.value).toEqual('Sep 17, 2018');
    });

    const cell = overlay.querySelectorAll('.day-cell')[22]; // it's visible date cell
    cell.dispatchEvent(new Event('click'));
  });

  it('should start from date typed into the input', () => {
    input.value = 'Sep 17, 2018';
    input.dispatchEvent(new Event('input'));
    showDatepicker();
    appRef.tick();

    const cell = overlay.querySelector('.day-cell.selected'); // it's input value date cell

    expect(cell.textContent).toContain('17');
  });

  it('should start from current date if input is empty', () => {
    showDatepicker();
    appRef.tick();
    expect(overlay.querySelector('.day-cell.today')).toBeDefined();
  });

  it('should start from current date if input value is invalid', () => {
    input.value = 'definitely not a date';
    input.dispatchEvent(new Event('input'));
    showDatepicker();
    appRef.tick();
    expect(overlay.querySelector('.day-cell.today')).toBeDefined();
  });

  it('should update visible date if input value changed', () => {
    const initialDate = new Date(2000, 0, 1);
    datepicker.visibleDate = initialDate;

    const date = 17;
    const month = 8;
    const year = 2018;
    input.value = 'Sep 17, 2018';
    input.dispatchEvent(new Event('input'));
    showDatepicker();
    appRef.tick();

    expect(datepicker.visibleDate.getDate()).toEqual(date);
    expect(datepicker.visibleDate.getMonth()).toEqual(month);
    expect(datepicker.visibleDate.getFullYear()).toEqual(year);
  });

  it('should be valid if empty', () => {
    expect(datepickerDirective.validate()).toBe(null);
  });

  it('should not be valid if empty contain incorrectly formatted date', () => {
    input.value = 'somecurruptedinput';
    input.dispatchEvent(new Event('input'));
    showDatepicker();

    expect(datepickerDirective.validate()).not.toBe(null);
  });
});

describe('nb-rangepicker', () => {
  let fixture: ComponentFixture<NbRangepickerTestComponent>;
  let appRef: ApplicationRef;
  let rangepicker: NbRangepickerComponent<Date>;
  let datepickerDirective: NbDatepickerDirective<Date>;
  let overlay: HTMLElement;
  let input: HTMLInputElement;

  const showRangepicker = () => {
    rangepicker.show();
    appRef.tick();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        NbThemeModule.forRoot(),
        NbLayoutModule,
        NbDatepickerModule.forRoot(),
      ],
      declarations: [NbRangepickerTestComponent],
    });

    fixture = TestBed.createComponent(NbRangepickerTestComponent);
    appRef = TestBed.get(ApplicationRef);

    fixture.detectChanges();
  });

  beforeEach(() => {
    rangepicker = fixture.componentInstance.rangepicker;
    datepickerDirective = fixture.componentInstance.datepickerDirective;
    overlay = fixture.nativeElement.querySelector('nb-layout');
    input = fixture.nativeElement.querySelector('input');
  });

  it('should render calendar', () => {
    showRangepicker();
    const calendar = overlay.querySelector('nb-calendar-range');
    expect(calendar).toBeTruthy();
  });

  it('should not render overlay on load', () => {
    const datepickerContainer = overlay.querySelector('nb-datepicker-container');
    expect(datepickerContainer).toBeNull();
  });

  it('should render overlay lazily', () => {
    const datepickerContainer = overlay.querySelector('nb-datepicker-container');
    expect(datepickerContainer).toBeNull();
    showRangepicker();
    const calendar = overlay.querySelector('nb-calendar-range');
    expect(calendar).toBeTruthy();
  });

  it('should emit rangeChange when selected start date', (done) => {
    rangepicker.visibleDate = new Date(2018, 8, 17);
    showRangepicker();

    rangepicker.rangeChange.subscribe((range: NbCalendarRange<Date>) => {
      expect(range.start.getFullYear()).toEqual(2018);
      expect(range.start.getMonth()).toEqual(8);
      expect(range.start.getDate()).toEqual(1);
      expect(range.end).not.toBeDefined();
      done();
    });

    // click on Sep 1
    const startCell = overlay.querySelectorAll('.day-cell')[6];
    (startCell as HTMLElement).click();

    fixture.detectChanges();
  }, 5000);

  it('should emit rangeChange when selected start and end dates', (done) => {
    rangepicker.visibleDate = new Date(2018, 8, 17);
    showRangepicker();

    rangepicker.rangeChange
      .pipe(skip(1))
      .subscribe((range: NbCalendarRange<Date>) => {
        expect(range.start.getFullYear()).toEqual(2018);
        expect(range.end.getFullYear()).toEqual(2018);
        expect(range.start.getMonth()).toEqual(8);
        expect(range.end.getMonth()).toEqual(8);
        expect(range.start.getDate()).toEqual(1);
        expect(range.end.getDate()).toEqual(3);
        done();
      });

    // click on Sep 1
    const startCell = overlay.querySelectorAll('.day-cell')[6];
    (startCell as HTMLElement).click();
    // click on Sep 3
    const endCell = overlay.querySelectorAll('.day-cell')[8];
    (endCell as HTMLElement).click();

    fixture.detectChanges();
  }, 5000);

  it('should start from date typed into the input', () => {
    input.value = 'Sep 17, 2018 - Sep 19, 2018';
    input.dispatchEvent(new Event('input'));
    showRangepicker();
    appRef.tick();

    const startCell = overlay.querySelector('.day-cell.in-range.start');
    const endCell = overlay.querySelector('.day-cell.in-range.end');

    expect(startCell.textContent).toContain('17');
    expect(endCell.textContent).toContain('19');
  });

  it('should start from current date if input is empty', () => {
    showRangepicker();
    appRef.tick();
    expect(overlay.querySelector('.day-cell.today')).toBeDefined();
  });

  it('should start from current date if input value is invalid', () => {
    input.value = 'definitely not a date';
    input.dispatchEvent(new Event('input'));
    showRangepicker();
    appRef.tick();
    expect(overlay.querySelector('.day-cell.today')).toBeDefined();
  });

  it('should set visible date to start date if input value changed', () => {
    const initialDate = new Date(2000, 0, 1);
    rangepicker.visibleDate = initialDate;

    const date = 17;
    const month = 8;
    const year = 2018;
    input.value = 'Sep 17, 2018 - Sep 19, 2018';
    input.dispatchEvent(new Event('input'));
    appRef.tick();
    showRangepicker();

    expect(rangepicker.visibleDate.getDate()).toEqual(date);
    expect(rangepicker.visibleDate.getMonth()).toEqual(month);
    expect(rangepicker.visibleDate.getFullYear()).toEqual(year);
  });

  it('should be valid if empty', () => {
    expect(datepickerDirective.validate()).toBe(null);
  });

  it('should not be valid if empty contain incorrectly formatted date', () => {
    input.value = 'somecurruptedinput';
    input.dispatchEvent(new Event('input'));
    showRangepicker();

    expect(datepickerDirective.validate()).not.toBe(null);
  });
});
