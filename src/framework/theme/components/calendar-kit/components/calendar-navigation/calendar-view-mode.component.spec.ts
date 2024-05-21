/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';

import { NbCalendarViewMode, NbCalendarViewModeComponent, NbCalendarKitModule, NbThemeModule } from '@nebular/theme';

describe('Component: NbCalendarViewModeComponent', () => {
  let fixture: ComponentFixture<NbCalendarViewModeComponent<Date>>;
  let component: NbCalendarViewModeComponent<Date>;
  let componentEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbThemeModule.forRoot(), NbCalendarKitModule],
    });
    fixture = TestBed.createComponent<NbCalendarViewModeComponent<Date>>(NbCalendarViewModeComponent);
    component = fixture.componentInstance;
    componentEl = fixture.debugElement.nativeElement;
  });

  it('should render empty button with when null date', () => {
    fixture.detectChanges();
    expect(componentEl.querySelector('button').textContent).toContain('');
  });

  it('should render moth with year in date mode', () => {
    component.date = new Date(2018, 6, 23);
    fixture.detectChanges();
    expect(componentEl.querySelector('button').textContent).toContain('July 2018');
  });

  it('should render year in month mode', () => {
    component.date = new Date(2018, 6, 23);
    component.viewMode = NbCalendarViewMode.MONTH;
    fixture.detectChanges();
    expect(componentEl.querySelector('button').textContent).toContain('2018');
  });

  it('should render years range in year mode', () => {
    component.date = new Date(2018, 6, 23);
    component.viewMode = NbCalendarViewMode.YEAR;
    fixture.detectChanges();
    expect(componentEl.querySelector('button').textContent).toContain('2016 - 2027');
  });

  it('should has down icon in date mode', () => {
    component.date = new Date(2018, 6, 23);
    fixture.detectChanges();
    expect(component.getIcon()).toBe('chevron-down-outline');
  });

  it('should has up icon in date mode', () => {
    component.date = new Date(2018, 6, 23);
    component.viewMode = NbCalendarViewMode.MONTH;
    fixture.detectChanges();
    expect(component.getIcon()).toBe('chevron-up-outline');
  });

  it('should has up icon in date mode', () => {
    component.date = new Date(2018, 6, 23);
    component.viewMode = NbCalendarViewMode.YEAR;
    fixture.detectChanges();
    expect(component.getIcon()).toBe('chevron-up-outline');
  });

  it('should emit change mode when button clicked', fakeAsync(() => {
    const changeModeSpy = jasmine.createSpy('changeMode spy');
    component.changeMode.subscribe(changeModeSpy);

    componentEl.querySelector('button').dispatchEvent(new Event('click'));
    flush();

    expect(changeModeSpy).toHaveBeenCalled();
  }));
});
