/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbCalendarDatePipe } from '../calendar-date/calendar-date.pipe';
import { NbCalendarNavigationComponent } from './calendar-navigation.component';
import { NbCalendarPageableNavigationComponent } from './calendar-pageable-navigation.component';
import { NbLocaleService } from '../../services';
import { NbThemeModule } from '../../../../theme.module';


describe('Component: NbCalendarPageableNavigation', () => {
  let fixture: ComponentFixture<NbCalendarPageableNavigationComponent>;
  let component: NbCalendarPageableNavigationComponent;
  let componentEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbThemeModule.forRoot({ name: 'default' })],
      declarations: [NbCalendarDatePipe, NbCalendarNavigationComponent, NbCalendarPageableNavigationComponent],
      providers: [NbLocaleService],
    });
    fixture = TestBed.createComponent(NbCalendarPageableNavigationComponent);
    component = fixture.componentInstance;
    componentEl = fixture.debugElement.nativeElement;
  });

  it('should render date', () => {
    component.date = new Date(2018, 6, 23);
    fixture.detectChanges();
    expect(componentEl.querySelector('button').textContent).toContain('Jul 2018');
  });

  it('should render empty button with when null date', () => {
    fixture.detectChanges();
    expect(componentEl.querySelector('button').textContent).toContain('');
  });

  it('should fire click when interior button clicked', () => {
    component.changeMode.subscribe(e => expect(e).toBeUndefined());
    componentEl.querySelector('button').dispatchEvent(new Event('click'));
  });

  it('should fire next when next button clicked', () => {
    fixture.detectChanges();
    component.next.subscribe(e => expect(e).toBeUndefined());
    componentEl.querySelector('.nb-arrow-left').dispatchEvent(new Event('click'));
  });

  it('should fire prev when prev button clicked', () => {
    fixture.detectChanges();
    component.prev.subscribe(e => expect(e).toBeUndefined());
    componentEl.querySelector('.nb-arrow-right').dispatchEvent(new Event('click'));
  });
});
