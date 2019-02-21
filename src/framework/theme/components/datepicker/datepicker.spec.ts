/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ApplicationRef, Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbDatepickerDirective } from '@nebular/theme';

import { NbDatepickerModule } from './datepicker.module';
import { NbThemeModule } from '../../theme.module';
import { NbLayoutModule } from '../layout/layout.module';
import { NbDatepickerComponent } from './datepicker.component';


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
  @ViewChild(NbDatepickerComponent) datepicker: NbDatepickerComponent<Date>;
  @ViewChild(NbDatepickerDirective) datepickerDirective: NbDatepickerDirective<Date>;
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

  it('should select date typed in to the input', () => {
    datepicker.visibleDate = new Date(2018, 8, 17);
    input.value = 'Sep 17, 2018';
    input.dispatchEvent(new Event('input'));
    showDatepicker();
    appRef.tick();

    const cell = overlay.querySelector('.day-cell.selected'); // it's input value date cell

    expect(cell.textContent).toContain('17');
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
