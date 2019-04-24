/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbAlertComponent } from './alert.component';

describe('Component: NbAlert', () => {

  let alert: NbAlertComponent;
  let fixture: ComponentFixture<NbAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbAlertComponent],
    });

    fixture = TestBed.createComponent(NbAlertComponent);
    alert = fixture.componentInstance;
  });

  it('should set class danger', () => {
    alert.status = 'danger';
    fixture.detectChanges();
    expect(
      fixture
        .debugElement.nativeElement.classList.contains('status-danger'))
      .toBeTruthy()
  });

  it('should set outline class', () => {
    alert.outline = 'success';
    fixture.detectChanges();
    expect(
      fixture
        .debugElement.nativeElement.classList.contains('outline-success'))
      .toBeTruthy()
  });

  it('should set shape class', () => {
    alert.accent = 'warning';
    fixture.detectChanges();
    expect(
      fixture
        .debugElement.nativeElement.classList.contains('accent-warning'))
      .toBeTruthy()
  });

  it('should set size class', () => {
    alert.size = 'small';
    fixture.detectChanges();
    expect(
      fixture
        .debugElement.nativeElement.classList.contains('size-small'))
      .toBeTruthy()
  });
});
