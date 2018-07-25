import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbCalendarCellComponent } from './calendar-cell.component';
import { NbCalendarCellState } from '../../model';

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
    component.value = 0;
    component.state = [];
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

  it('should contain classes depends on state', () => {
    component.state = <NbCalendarCellState[]> [...Object.values(NbCalendarCellState)];
    fixture.detectChanges();
    Object.values(NbCalendarCellState).forEach(state => {
      expect(componentEl.classList).toContain(state);
    });
  });
});
