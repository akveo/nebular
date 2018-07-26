import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbCalendarCellComponent } from './calendar-cell.component';
import { NbCalendarCellStatus } from '../../model';
import { NbDateTimeUtil } from '../../services';

describe('Component: NbCalendarCell', () => {
  let component: NbCalendarCellComponent;
  let fixture: ComponentFixture<NbCalendarCellComponent>;
  let componentEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbCalendarCellComponent],
    });
    fixture = TestBed.createComponent(NbCalendarCellComponent);
    component = fixture.componentInstance;
    component.cell = { date: NbDateTimeUtil.createDate(2018, 6, 25), status: [] };
    componentEl = fixture.debugElement.nativeElement;
  });

  it('should render date', () => {
    component.date = 12;
    fixture.detectChanges();
    expect(componentEl.textContent).toContain('12');
  });

  it('should contain classes depends on status', () => {
    component.state = <NbCalendarCellStatus[]> [...Object.values(NbCalendarCellStatus)];
    fixture.detectChanges();
    Object.values(NbCalendarCellStatus).forEach(state => {
      expect(componentEl.classList).toContain(state);
    });
  });
});
