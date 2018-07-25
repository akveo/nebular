import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbCalendarDaysNamesComponent } from './calendar-days-names.component';
import { NbLocaleAdapter, NbNativeLocaleAdapter } from '../../service';


describe('Component: NbCalendarDaysNames', () => {
  let component: NbCalendarDaysNamesComponent;
  let fixture: ComponentFixture<NbCalendarDaysNamesComponent>;
  let componentEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbCalendarDaysNamesComponent],
      providers: [{ provide: NbLocaleAdapter, useClass: NbNativeLocaleAdapter }],
    });
    fixture = TestBed.createComponent(NbCalendarDaysNamesComponent);
    component = fixture.componentInstance;
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
