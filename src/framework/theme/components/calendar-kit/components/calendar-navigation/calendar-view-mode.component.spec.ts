/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbCalendarViewModeComponent } from './calendar-view-mode.component';
import { NbCalendarKitModule } from '../../calendar-kit.module';


describe('Component: NbCalendarViewModeComponent', () => {
  let fixture: ComponentFixture<NbCalendarViewModeComponent<Date>>;
  let component: NbCalendarViewModeComponent<Date>;
  let componentEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbCalendarKitModule],
    });
    fixture = TestBed.createComponent<NbCalendarViewModeComponent<Date>>(NbCalendarViewModeComponent);
    component = fixture.componentInstance;
    componentEl = fixture.debugElement.nativeElement;
  });

  it('should render date', () => {
    component.date = new Date(2018, 6, 23);
    fixture.detectChanges();
    expect(componentEl.querySelector('button').textContent).toContain('July 2018');
  });

  it('should render empty button with when null date', () => {
    fixture.detectChanges();
    expect(componentEl.querySelector('button').textContent).toContain('');
  });

  it('should fire click when interior button clicked', () => {
    component.changeMode.subscribe(e => expect(e).toBeUndefined());
    componentEl.querySelector('button').dispatchEvent(new Event('click'));
  });
});
