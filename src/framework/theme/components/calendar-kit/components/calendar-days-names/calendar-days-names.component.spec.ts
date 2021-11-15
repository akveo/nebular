/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { NbCalendarDaysNamesComponent, NbDateService, NbNativeDateService } from '@nebular/theme';

describe('Component: NbCalendarDaysNames', () => {
  let fixture: ComponentFixture<NbCalendarDaysNamesComponent<Date>>;
  let componentEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbCalendarDaysNamesComponent],
      providers: [{ provide: NbDateService, useClass: NbNativeDateService }, DatePipe],
    });
    fixture = TestBed.createComponent<NbCalendarDaysNamesComponent<Date>>(NbCalendarDaysNamesComponent);
    componentEl = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should render seven days', () => {
    const days = componentEl.querySelectorAll('div');
    expect(days.length).toBe(7);
  });

  it('should render two holidays', () => {
    const days = componentEl.querySelectorAll('.holiday');
    expect(days.length).toBe(2);
  });

  it('should contain narrow names', () => {
    const days = componentEl.querySelectorAll('div');
    days.forEach((day) => {
      expect(day.textContent.length).toBe(2);
    });
  });
});
