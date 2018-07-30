/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbLocaleService } from '../../services';
import { NbCalendarYearCellComponent } from './calendar-year-cell.component';


describe('Component: NbCalendarYearCell', () => {
  let component: NbCalendarYearCellComponent;
  let fixture: ComponentFixture<NbCalendarYearCellComponent>;
  let componentEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbCalendarYearCellComponent],
      providers: [NbLocaleService],
    });
    fixture = TestBed.createComponent(NbCalendarYearCellComponent);
    component = fixture.componentInstance;
    componentEl = fixture.debugElement.nativeElement;
  });

  it('should render year', () => {
    component.date = new Date(2018, 6, 12);
    component.selectedValue = new Date();
    component.activeMonth = new Date();
    fixture.detectChanges();
    expect(componentEl.textContent).toContain('2018');
  });

  it('should contain selected class if selected', () => {
    component.date = new Date();
    component.selectedValue = new Date();
    component.activeMonth = new Date();
    fixture.detectChanges();
    expect(componentEl.classList).toContain('selected');
  });
});
