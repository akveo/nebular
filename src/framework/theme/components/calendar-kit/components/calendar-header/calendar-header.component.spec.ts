/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NbCalendarDatePipe, NbCalendarHeaderComponent, NbLocaleService } from '@nebular/theme';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Component: NbCalendarHeader', () => {

  let component: NbCalendarHeaderComponent;
  let fixture: ComponentFixture<NbCalendarHeaderComponent>;
  let componentEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NbLocaleService],
      declarations: [NbCalendarHeaderComponent, NbCalendarDatePipe],
    });
    fixture = TestBed.createComponent(NbCalendarHeaderComponent);
    component = fixture.componentInstance;
    componentEl = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should render today', () => {
    expect(componentEl.query(By.css('span')).nativeElement.textContent).toBe('Today');
  });

  it('should render today date', () => {
    component.date = new Date(2018, 6, 30);
    fixture.detectChanges();
    expect(componentEl.query(By.css('h5')).nativeElement.textContent).toBe('Jul 2018');
  });
});
