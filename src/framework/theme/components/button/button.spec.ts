/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbButtonComponent } from './button.component';

describe('Component: NbButton', () => {

  let button: NbButtonComponent;
  let fixture: ComponentFixture<NbButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbButtonComponent],
    });

    fixture = TestBed.createComponent(NbButtonComponent);
    button = fixture.componentInstance;
  });

  it('should set class danger', () => {
    button.status = 'danger';
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain('status-danger');
  });

  it('should set size small', () => {
    button.size = 'small';
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain('size-small');
  });

  it('should set outline class', () => {
    button.outline = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain('appearance-outline');
  });

  it('should set hero class', () => {
    button.hero = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain('appearance-hero');
  });

  it('should set shape class', () => {
    button.shape = 'semi-round';
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain('shape-semi-round');
  });

  it('should set full-width class', () => {
    button.fullWidth = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain('full-width');
  });
});
