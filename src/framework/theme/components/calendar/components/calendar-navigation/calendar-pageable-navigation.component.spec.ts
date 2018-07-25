import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbCalendarDatePipe } from '../calendar-date/calendar-date.pipe';
import { NbCalendarNavigationComponent } from './calendar-navigation.component';
import { NbCalendarPageableNavigationComponent } from './calendar-pageable-navigation.component';
import { NbLocaleAdapter, NbNativeLocaleAdapter } from '../../service';


describe('Component: NbCalendarPageableNavigation', () => {
  let fixture: ComponentFixture<NbCalendarPageableNavigationComponent>;
  let component: NbCalendarPageableNavigationComponent;
  let componentEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbCalendarDatePipe, NbCalendarNavigationComponent, NbCalendarPageableNavigationComponent],
      providers: [{ provide: NbLocaleAdapter, useClass: NbNativeLocaleAdapter }],
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
    component.select.subscribe(e => expect(e).toBeUndefined());
    componentEl.querySelector('button').dispatchEvent(new Event('click'));
  });

  it('should fire next when next button clicked', () => {
    component.next.subscribe(e => expect(e).toBeUndefined());
    componentEl.querySelector('.nb-arrow-left').dispatchEvent(new Event('click'));
  });

  it('should fire prev when prev button clicked', () => {
    component.prev.subscribe(e => expect(e).toBeUndefined());
    componentEl.querySelector('.nb-arrow-right').dispatchEvent(new Event('click'));
  });
});
