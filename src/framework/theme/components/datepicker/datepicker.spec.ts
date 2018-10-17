/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ApplicationRef, Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

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
}

describe('nb-datepicker', () => {
  let fixture: ComponentFixture<NbDatepickerTestComponent>;
  let appRef: ApplicationRef;
  let datepicker: NbDatepickerComponent<Date>;
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
    overlay = fixture.nativeElement.querySelector('nb-layout');
    input = fixture.nativeElement.querySelector('input');
  });

  it('should render calendar', () => {
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
});
