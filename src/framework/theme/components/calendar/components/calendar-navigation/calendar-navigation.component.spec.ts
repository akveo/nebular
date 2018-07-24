import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbDateTimeUtil } from '../../service/date-time-util';
import { NbNativeDateTimeUtilService } from '../../service/native-date-time-util.service';
import { NbCalendarNavigationComponent } from './calendar-navigation.component';
import { NbCalendarDatePipe } from '../calendar-date.pipe';


describe('Component: NbCalendarNavigation', () => {
  let fixture: ComponentFixture<NbCalendarNavigationComponent<Date>>;
  let component: NbCalendarNavigationComponent<Date>;
  let componentEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbCalendarDatePipe, NbCalendarNavigationComponent],
      providers: [{ provide: NbDateTimeUtil, useClass: NbNativeDateTimeUtilService }],
    });
    fixture = TestBed.createComponent<NbCalendarNavigationComponent<Date>>(NbCalendarNavigationComponent);
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
    component.click.subscribe(e => expect(e).toBeUndefined());
    componentEl.querySelector('button').dispatchEvent(new Event('click'));
  });
});
