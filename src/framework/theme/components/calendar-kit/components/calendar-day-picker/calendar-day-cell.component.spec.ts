/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbCalendarDayCellComponent } from './calendar-day-cell.component';


describe('Component: NbCalendarCell', () => {
  let component: NbCalendarDayCellComponent;
  let fixture: ComponentFixture<NbCalendarDayCellComponent>;
  let componentEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbCalendarDayCellComponent],
    });
    fixture = TestBed.createComponent(NbCalendarDayCellComponent);
    component = fixture.componentInstance;
    componentEl = fixture.debugElement.nativeElement;
  });

  it('should render date', () => {
    component.date = new Date(2018, 6, 12);
    component.selectedValue = new Date();
    component.activeMonth = new Date();
    fixture.detectChanges();
    expect(componentEl.textContent).toContain('12');
  });

  it('should contain today class if today', () => {
    component.date = new Date();
    component.selectedValue = new Date();
    component.activeMonth = new Date();
    fixture.detectChanges();
    expect(componentEl.classList).toContain('today');
  });

  it('should contain selected class if selected', () => {
    component.date = new Date();
    component.selectedValue = new Date();
    component.activeMonth = new Date();
    fixture.detectChanges();
    expect(componentEl.classList).toContain('selected');
  });

  it('should contain bounding-month class if it adjoin to the activeMonth', () => {
    component.date = new Date(2018, 7, 1);
    component.activeMonth = new Date(2018, 6, 30);
    component.selectedValue = new Date();
    fixture.detectChanges();
    expect(componentEl.classList).toContain('bounding-month');
  });
});
