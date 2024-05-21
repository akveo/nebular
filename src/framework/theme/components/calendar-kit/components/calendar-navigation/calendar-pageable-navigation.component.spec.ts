/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import {
  NbIconModule,
  NbCalendarViewModeComponent,
  NbCalendarPageableNavigationComponent,
  NbDateService,
  NbNativeDateService,
  NbThemeModule,
} from '@nebular/theme';

describe('Component: NbCalendarPageableNavigation', () => {
  let fixture: ComponentFixture<NbCalendarPageableNavigationComponent<Date>>;
  let component: NbCalendarPageableNavigationComponent<Date>;
  let componentEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbThemeModule.forRoot(), NbIconModule],
      declarations: [NbCalendarViewModeComponent, NbCalendarPageableNavigationComponent],
      providers: [{ provide: NbDateService, useClass: NbNativeDateService }, DatePipe],
    });
    fixture = TestBed.createComponent<NbCalendarPageableNavigationComponent<Date>>(
      NbCalendarPageableNavigationComponent,
    );
    component = fixture.componentInstance;
    componentEl = fixture.debugElement.nativeElement;
  });

  it('should fire prev when prev button clicked', (done) => {
    fixture.detectChanges();
    component.prev.subscribe((e) => {
      expect(e).toBeUndefined();
      done();
    });
    componentEl.querySelector('button:first-child').dispatchEvent(new Event('click'));
  });

  it('should fire next when next button clicked', (done) => {
    fixture.detectChanges();
    component.next.subscribe((e) => {
      expect(e).toBeUndefined();
      done();
    });
    componentEl.querySelector('button:last-child').dispatchEvent(new Event('click'));
  });
});
