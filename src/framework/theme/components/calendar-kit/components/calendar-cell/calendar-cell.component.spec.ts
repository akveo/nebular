import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbCalendarCellComponent } from './calendar-cell.component';
import { NbCalendarCellStatus } from '../../model';
import { NbDateTimeUtil } from '../../../service/index';

describe('Component: NbCalendarCell', () => {
  let component: NbCalendarCellComponent;
  let fixture: ComponentFixture<NbCalendarCellComponent>;
  let componentEl: HTMLElement;
  let div: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbCalendarCellComponent],
    });
    fixture = TestBed.createComponent(NbCalendarCellComponent);
    component = fixture.componentInstance;
    component._date = NbDateTimeUtil.createDate(2018, 6, 25);
    component.status = [];
    componentEl = fixture.debugElement.nativeElement;
    div = componentEl.querySelector('div');
  });

  it('should render date', () => {
    component.date = 12;
    fixture.detectChanges();
    expect(div.textContent).toContain('12');
  });

  it('should fire click when interior div was clicked', () => {
    component.click.subscribe(e => expect(e).toBeUndefined());
    div.dispatchEvent(new Event('click'));
  });

  it('should contain classes depends on status', () => {
    component.state = <NbCalendarCellStatus[]> [...Object.values(NbCalendarCellStatus)];
    fixture.detectChanges();
    Object.values(NbCalendarCellStatus).forEach(state => {
      expect(componentEl.classList).toContain(state);
    });
  });
});
