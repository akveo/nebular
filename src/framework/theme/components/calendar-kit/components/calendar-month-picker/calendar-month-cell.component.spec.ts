/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbCalendarMonthCellComponent } from './calendar-month-cell.component';
import { NbLocaleService } from '../../services';


describe('Component: NbCalendarMonthCell', () => {
  let component: NbCalendarMonthCellComponent;
  let fixture: ComponentFixture<NbCalendarMonthCellComponent>;
  let componentEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbCalendarMonthCellComponent],
      providers: [NbLocaleService],
    });
    fixture = TestBed.createComponent(NbCalendarMonthCellComponent);
    component = fixture.componentInstance;
    componentEl = fixture.debugElement.nativeElement;
  });

  it('should render month', () => {
    component.date = new Date(2018, 6, 12);
    component.selectedValue = new Date();
    component.activeMonth = new Date();
    fixture.detectChanges();
    expect(componentEl.textContent).toContain('Jul');
  });

  it('should contain selected class if selected', () => {
    component.date = new Date();
    component.selectedValue = new Date();
    component.activeMonth = new Date();
    fixture.detectChanges();
    expect(componentEl.classList).toContain('selected');
  });
});
