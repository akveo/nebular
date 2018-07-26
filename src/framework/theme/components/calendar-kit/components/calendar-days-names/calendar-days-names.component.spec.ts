/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbCalendarDaysNamesComponent } from './calendar-days-names.component';
import { NbLocaleService } from '../../services';


describe('Component: NbCalendarDaysNames', () => {
  let fixture: ComponentFixture<NbCalendarDaysNamesComponent>;
  let componentEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbCalendarDaysNamesComponent],
      providers: [NbLocaleService],
    });
    fixture = TestBed.createComponent(NbCalendarDaysNamesComponent);
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
    [].forEach.call(days, day => {
      expect(day.textContent.length).toBe(1);
    });
  });
});
