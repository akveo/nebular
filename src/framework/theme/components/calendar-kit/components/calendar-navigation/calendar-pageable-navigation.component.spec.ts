/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbIconModule } from '@nebular/theme';

import { NbCalendarViewModeComponent } from './calendar-view-mode.component';
import { NbCalendarPageableNavigationComponent } from './calendar-pageable-navigation.component';
import { NbDateService } from '../../services/date.service';
import { NbNativeDateService } from '../../services/native-date.service';
import { NbThemeModule } from '../../../../theme.module';
import { DatePipe } from '@angular/common';

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
    fixture =
      TestBed.createComponent<NbCalendarPageableNavigationComponent<Date>>(NbCalendarPageableNavigationComponent);
    component = fixture.componentInstance;
    componentEl = fixture.debugElement.nativeElement;
  });

  it('should fire next when next button clicked', () => {
    fixture.detectChanges();
    component.next.subscribe(e => expect(e).toBeUndefined());
    componentEl.querySelector('button:first-child').dispatchEvent(new Event('click'));
  });

  it('should fire prev when prev button clicked', () => {
    fixture.detectChanges();
    component.prev.subscribe(e => expect(e).toBeUndefined());
    componentEl.querySelector('button:last-child').dispatchEvent(new Event('click'));
  });
});
