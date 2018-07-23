import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbDateTimeUtil } from '../../service/date-time-util';
import { NbNativeDateTimeUtilService } from '../../service/native-date-time-util.service';
import { NbCalendarDatePipe } from '../calendar-date.pipe';
import { NbCalendarPageableHeaderComponent } from './calendar-pageable-header.component';


describe('Component: NbCalendarPageableHeader', () => {
  let fixture: ComponentFixture<NbCalendarPageableHeaderComponent<Date>>;
  let component: NbCalendarPageableHeaderComponent<Date>;
  let componentEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbCalendarDatePipe, NbCalendarPageableHeaderComponent],
      providers: [{ provide: NbDateTimeUtil, useClass: NbNativeDateTimeUtilService }],
    });
    fixture = TestBed.createComponent<NbCalendarPageableHeaderComponent<Date>>(NbCalendarPageableHeaderComponent);
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

  it('should fire next when next button clicked', () => {
    component.next.subscribe(e => expect(e).toBeUndefined());
    componentEl.querySelector('.nb-arrow-left').dispatchEvent(new Event('click'));
  });

  it('should fire prev when prev button clicked', () => {
    component.prev.subscribe(e => expect(e).toBeUndefined());
    componentEl.querySelector('.nb-arrow-right').dispatchEvent(new Event('click'));
  });
});
